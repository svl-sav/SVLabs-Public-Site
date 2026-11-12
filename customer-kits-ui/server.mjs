import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { loadResearch } from './data.mjs';
import { services } from './services.mjs';
import { defaults, esc, publicOrigin, renderHome, renderServices, renderService, renderPlan, render404, sitemap } from './pages.mjs';

const assets = {'/internal':['internal.html','text/html'],'/customer.css':['customer.css','text/css'],'/customer.js':['customer.js','text/javascript'],'/internal.css':['internal.css','text/css'],'/internal.js':['internal.js','text/javascript'],'/shared.js':['shared.js','text/javascript'],'/sales-model.mjs':['sales-model.mjs','text/javascript'],'/invoices.js':['invoices.js','text/javascript'],'/invoice-model.mjs':['invoice-model.mjs','text/javascript'],'/favicon.svg':['favicon.svg','image/svg+xml']};
const internalPaths = new Set(['/internal','/internal/','/api/research','/internal.css','/internal.js','/shared.js','/sales-model.mjs','/invoices.js','/invoice-model.mjs']);
export function createServer(config = defaults, {mode = 'all'} = {}) {
  if (!['all','public','internal'].includes(mode)) throw new Error('SITE_MODE must be all, public or internal.');
  return http.createServer(async (req,res) => {
    const send = (status,type,body,extra={}) => {
      res.writeHead(status,{'Content-Type':type + '; charset=utf-8','Cache-Control':'no-cache','X-Content-Type-Options':'nosniff',...extra});
      res.end(req.method === 'HEAD' ? undefined : body);
    };
    try {
      const url = new URL(req.url,'http://localhost'), pathname = url.pathname;
      if (!['GET','HEAD'].includes(req.method)) return send(405,'text/plain','Method not allowed',{'Allow':'GET, HEAD'});
      if (pathname === '/healthz') return send(200,'application/json',JSON.stringify({status:'ok',mode}),{'Cache-Control':'no-store','X-Robots-Tag':'noindex'});
      if (mode === 'public' && internalPaths.has(pathname)) return send(404,'text/html',render404(config),{'X-Robots-Tag':'noindex'});
      if (mode === 'internal') {
        if (pathname === '/') return send(308,'text/plain','Redirecting',{'Location':'/internal','X-Robots-Tag':'noindex'});
        if (pathname === '/robots.txt') return send(200,'text/plain','User-agent: *\nDisallow: /\n',{'X-Robots-Tag':'noindex'});
        if (!internalPaths.has(pathname) && !['/favicon.svg','/favicon.ico'].includes(pathname)) return send(404,'text/plain','Not found',{'X-Robots-Tag':'noindex'});
      }
      if (pathname.length > 1 && pathname.endsWith('/')) {
        const normalized = pathname.replace(/\/+$/, '');
        if (normalized === '/internal' || normalized === '/services' || normalized === '/plan' || services.some(s => normalized === '/services/' + s.slug)) return send(308,'text/plain','Redirecting',{'Location':normalized + url.search});
      }
      if (pathname === '/api/research') return send(200,'application/json',JSON.stringify(await loadResearch()),{'Cache-Control':'no-store','X-Robots-Tag':'noindex, nofollow'});
      if (pathname === '/robots.txt') {
        const origin = publicOrigin(config.siteUrl);
        return send(200,'text/plain','User-agent: *\nAllow: /\n' + (origin ? 'Sitemap: ' + origin + '/sitemap.xml\n' : ''));
      }
      if (pathname === '/sitemap.xml') {
        const xml = sitemap(config);
        return xml ? send(200,'application/xml',xml) : send(503,'text/plain','Configure the public siteUrl in site-config.json to enable the sitemap.',{'X-Robots-Tag':'noindex'});
      }
      if (pathname === '/favicon.ico') return send(308,'text/plain','Redirecting',{'Location':'/favicon.svg'});
      if (pathname === '/') return send(200,'text/html',renderHome(config));
      if (pathname === '/services') return send(200,'text/html',renderServices(config));
      if (pathname === '/plan') return send(200,'text/html',renderPlan(config));
      const service = services.find(s => pathname === '/services/' + s.slug);
      if (service) return send(200,'text/html',renderService(service,config));
      const asset = assets[pathname];
      if (asset) {
        let body = await readFile(new URL(asset[0],import.meta.url));
        if (pathname === '/internal' && mode === 'internal') {
          const customerUrl = config.customerUrl || 'http://127.0.0.1:4173/';
          const parsed = new URL(customerUrl);
          if (!['http:','https:'].includes(parsed.protocol)) throw new Error('CUSTOMER_URL must use http or https.');
          body = body.toString().replace('href="/" target="_blank"', 'href="' + esc(parsed.href) + '" target="_blank"');
        }
        return send(200,asset[1],body,internalPaths.has(pathname) ? {'X-Robots-Tag':'noindex, nofollow'} : {});
      }
      return send(404,'text/html',render404(config),{'X-Robots-Tag':'noindex'});
    } catch (error) {
      console.error(error);
      if (!res.headersSent) send(500,'text/plain','Unable to load this page. Please try again.',{'X-Robots-Tag':'noindex'});
      else res.end();
    }
  });
}
if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  const saved = JSON.parse(await readFile(new URL('./site-config.json',import.meta.url),'utf8'));
  const config = {...defaults,...saved,siteUrl:process.env.SITE_URL || saved.siteUrl || '',customerUrl:process.env.CUSTOMER_URL || ''};
  const port = Number(process.env.PORT || 4173);
  const host = process.env.HOST || '127.0.0.1';
  const mode = process.env.SITE_MODE || 'all';
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('PORT must be between 1 and 65535.');
  if (mode !== 'public' && !['127.0.0.1','::1','localhost'].includes(host)) throw new Error('Internal tools must bind to loopback. Use SITE_MODE=public for a network-facing listener.');
  const server = createServer(config,{mode});
  server.on('error', error => {
    console.error(error.code === 'EADDRINUSE' ? 'Port ' + port + ' is already in use. Stop the existing preview or set a different PORT.' : error);
    process.exitCode = 1;
  });
  server.listen(port,host,() => console.log('Signal Vector Labs (' + mode + '): http://' + host + ':' + port));
  const shutdown = () => {
    server.close(()=>process.exit(0));
    setTimeout(()=>process.exit(1),10000).unref();
  };
  process.on('SIGTERM',shutdown);
  process.on('SIGINT',shutdown);
}

import http from 'node:http';
import {existsSync} from 'node:fs';
import {readFile,stat} from 'node:fs/promises';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {extname,resolve,sep} from 'node:path';
import {services,publicPaths} from './services.mjs';
import {defaults,esc,publicOrigin,renderHome,renderServices,renderService,renderPlan,render404,sitemap} from './pages.mjs';

const appRoot=resolve(fileURLToPath(new URL('.',import.meta.url)));
const builtRoot=resolve(appRoot,'dist');
const mime={'.html':'text/html','.css':'text/css','.js':'text/javascript','.mjs':'text/javascript','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.ico':'image/x-icon','.xml':'application/xml','.txt':'text/plain','.json':'application/json','.woff2':'font/woff2'};
const legacyAssets={'/customer.css':['customer.css','text/css'],'/customer.js':['customer.js','text/javascript'],'/favicon.svg':['favicon.svg','image/svg+xml']};

async function readBuiltFile(root,pathname){
  if(!root)return null;
  const decoded=decodeURIComponent(pathname).replaceAll('\\','/');
  const relative=decoded==='/'?'index.html':extname(decoded)?decoded.replace(/^\/+/, ''):decoded.replace(/^\/+/, '')+'/index.html';
  const file=resolve(root,relative);
  if(file!==root&&!file.startsWith(root+sep))return null;
  try{if(!(await stat(file)).isFile())return null;return{body:await readFile(file),type:mime[extname(file).toLowerCase()]||'application/octet-stream'};}
  catch(error){if(error.code==='ENOENT'||error.code==='ENOTDIR')return null;throw error;}
}

export function createServer(config=defaults,{mode='all',staticRoot=builtRoot}={}){
  if(!['all','public'].includes(mode))throw new Error('This repository serves the public customer site only.');
  return http.createServer(async(req,res)=>{
    const send=(status,type,body,extra={})=>{
      const textual=/^(text\/|application\/(json|xml|javascript))/.test(type);
      res.writeHead(status,{'Content-Type':type+(textual?'; charset=utf-8':''),'Cache-Control':'no-cache','X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin','X-Frame-Options':'DENY',...extra});
      res.end(req.method==='HEAD'?undefined:body);
    };
    try{
      const url=new URL(req.url,'http://localhost'),pathname=url.pathname;
      if(!['GET','HEAD'].includes(req.method))return send(405,'text/plain','Method not allowed',{'Allow':'GET, HEAD'});
      if(pathname==='/healthz')return send(200,'application/json',JSON.stringify({status:'ok',mode:'public'}),{'Cache-Control':'no-store','X-Robots-Tag':'noindex'});
      if(pathname==='/robots.txt'){
        const origin=publicOrigin(config.siteUrl);
        return send(200,'text/plain','User-agent: *\nAllow: /\n'+(origin?'Sitemap: '+origin+'/sitemap.xml\n':''));
      }
      if(pathname==='/sitemap.xml'){
        const xml=sitemap(config);
        return xml?send(200,'application/xml',xml):send(503,'text/plain','Configure siteUrl in site-config.json to enable the sitemap.',{'X-Robots-Tag':'noindex'});
      }
      if(pathname==='/favicon.ico')return send(308,'text/plain','Redirecting',{'Location':'/favicon.svg'});
      if(pathname.length>1&&pathname.endsWith('/')){
        const normalized=pathname.replace(/\/+$/,'');
        if(normalized==='/services'||normalized==='/plan'||services.some(service=>normalized==='/services/'+service.slug))return send(308,'text/plain','Redirecting',{'Location':normalized+url.search});
      }

      const built=await readBuiltFile(staticRoot,pathname);
      if(built)return send(200,built.type,built.body,{'Cache-Control':built.type==='text/html'?'no-cache':pathname.startsWith('/_astro/')?'public, max-age=31536000, immutable':'public, max-age=3600'});
      const legacyAsset=legacyAssets[pathname];
      if(legacyAsset){const body=await readFile(resolve(appRoot,legacyAsset[0]));return send(200,legacyAsset[1],body,{'Cache-Control':'public, max-age=3600'});}
      const slugs=new Set(services.map(service=>'/services/'+service.slug));
      const isCustomerRoute=pathname==='/'||pathname==='/services'||pathname==='/plan'||slugs.has(pathname);
      if(staticRoot&&isCustomerRoute&&!existsSync(resolve(staticRoot,'index.html'))){
        return send(503,'text/plain','Build the customer site first with npm run build.',{'Retry-After':'60','X-Robots-Tag':'noindex'});
      }
      if(staticRoot&&existsSync(resolve(staticRoot,'index.html'))){
        const notFound=await readBuiltFile(staticRoot,'/404.html');
        return send(404,'text/html',notFound?.body||render404(config),{'X-Robots-Tag':'noindex'});
      }
      if(pathname==='/')return send(200,'text/html',renderHome(config));
      if(pathname==='/services')return send(200,'text/html',renderServices(config));
      if(pathname==='/plan')return send(200,'text/html',renderPlan(config));
      const service=services.find(item=>pathname==='/services/'+item.slug);
      if(service)return send(200,'text/html',renderService(service,config));
      return send(404,'text/html',render404(config),{'X-Robots-Tag':'noindex'});
    }catch(error){
      console.error(error);
      if(!res.headersSent)send(500,'text/plain','Unable to load this page. Please try again.',{'X-Robots-Tag':'noindex'});
      else res.end();
    }
  });
}

if(process.argv[1]&&pathToFileURL(resolve(process.argv[1])).href===import.meta.url){
  const saved=JSON.parse(await readFile(new URL('./site-config.json',import.meta.url),'utf8'));
  const config={...defaults,...saved,siteUrl:process.env.SITE_URL||saved.siteUrl||''};
  const port=Number(process.env.PORT||4173),host=process.env.HOST||'127.0.0.1';
  if(!Number.isInteger(port)||port<1||port>65535)throw new Error('PORT must be between 1 and 65535.');
  const server=createServer(config,{mode:'public'});
  server.on('error',error=>{console.error(error.code==='EADDRINUSE'?'Port '+port+' is already in use. Stop the preview or set another PORT.':error);process.exitCode=1;});
  server.listen(port,host,()=>console.log('Signal Vector Labs public site: http://'+host+':'+port));
  const shutdown=()=>{server.close(()=>process.exit(0));setTimeout(()=>process.exit(1),10000).unref();};
  process.on('SIGTERM',shutdown);process.on('SIGINT',shutdown);
}

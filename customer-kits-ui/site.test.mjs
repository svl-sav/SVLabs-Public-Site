import test from 'node:test';
import assert from 'node:assert/strict';
import { services, publicPaths, companySummary } from './services.mjs';
import { defaults, renderHome, renderService, publicOrigin, sitemap } from './pages.mjs';
import { createServer } from './server.mjs';

const config = {...defaults, businessName:'Test Integration Studio',siteUrl:'https://example.com',serviceAreas:['Example area']};
test('service pages expose substantive content and crawlable related links without JavaScript', () => {
  const titles = new Set(), descriptions = new Set();
  for (const service of services) {
    const html = renderService(service,config);
    titles.add(html.match(/<title>(.*?)<\/title>/s)[1]);
    descriptions.add(html.match(/<meta name="description" content="(.*?)">/s)[1]);
    assert.equal((html.match(/<h1>/g) || []).length,1);
    assert.ok(html.includes('<h1>' + service.serviceName.replace(/&/g,'&amp;') + '</h1>'));
    for (const [heading] of service.scope) assert.ok(html.includes(heading.replace(/&/g,'&amp;')));
    assert.ok(html.includes('<details><summary>'));
    for (const slug of service.related) assert.ok(html.includes('href="/services/' + slug + '"'));
    assert.ok(html.includes('rel="canonical" href="https://example.com/services/' + service.slug + '"'));
    const schema = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
    const entity = schema['@graph'].find(x=>x['@type']==='Service');
    assert.equal(entity.name,service.serviceName);
    assert.equal(entity.provider['@id'],'https://example.com/#organization');
    assert.equal(entity.audience.audienceType,service.whoFor);
    assert.equal(schema['@graph'].find(x=>x['@type']==='WebPage').mainEntity['@id'],entity['@id']);
    assert.ok(schema['@graph'].some(x=>x['@type']==='BreadcrumbList'));
    assert.ok(!html.includes('/api/research'));
  }
  assert.equal(titles.size,6);
  assert.equal(descriptions.size,6);
});
test('homepage is substantive without client rendering; no invented canonical or location', () => {
  const html = renderHome(defaults);
  assert.equal((html.match(/<h1>/g) || []).length,1);
  for (const service of services) assert.ok(html.includes('href="/services/' + service.slug + '"'));
  assert.ok(!html.includes('rel="canonical"'));
  assert.ok(!html.includes('areaServed'));
  assert.ok(!html.includes('<!-- ROOM -->'));
  assert.ok(!html.includes('<!-- FINDER -->'));
  assert.ok(!html.includes('gross margin'));
  const schema = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
  assert.equal(schema['@graph'][0].description,companySummary);
  assert.ok(html.includes(companySummary));
  const catalog = schema['@graph'].find(x=>x['@type']==='OfferCatalog');
  assert.equal(catalog.itemListElement.length,services.length);
  for (const [i, offer] of catalog.itemListElement.entries()) {
    assert.equal(offer.itemOffered.name,services[i].serviceName);
    assert.ok(!Object.hasOwn(offer,'price'));
  }
});
test('public metadata escapes user configuration and sitemap includes only public pages', () => {
  assert.equal(publicOrigin('https://example.com/path/'),'https://example.com');
  for (const url of ['http://localhost:4173','http://127.0.0.1:4173','file:///etc','https://user:password@example.com']) assert.equal(publicOrigin(url),'');
  assert.equal(sitemap(defaults),null);
  const xml = sitemap(config);
  assert.equal((xml.match(/<loc>/g)||[]).length,publicPaths.length);
  assert.ok(!xml.includes('/internal'));
  assert.ok(!xml.includes('/api'));
  const html = renderHome({...config,businessName:'<script>alert("x")</script>'});
  assert.ok(html.includes('&lt;script&gt;'));
  const schema = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
  assert.equal(schema['@graph'][0].name,'<script>alert("x")</script>');
});
test('HTTP routes, canonical redirects, internal noindex, assets and real 404 responses', async t => {
  const server = createServer(config,{staticRoot:null});
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  t.after(()=>new Promise(resolve=>server.close(resolve)));
  const base = 'http://127.0.0.1:' + server.address().port;
  for (const path of publicPaths) {
    const response = await fetch(base + path);
    assert.equal(response.status,200,path);
    const html = await response.text();
    assert.ok(html.includes('rel="canonical" href="https://example.com' + path + '"'),path);
    for (const match of html.matchAll(/(?:href|src)="(\/[^"#?]*)(?:[?#][^"]*)?"/g)) {
      const target = match[1];
      if (target === '/' || publicPaths.includes(target) || ['/customer.css','/customer.js','/favicon.svg'].includes(target)) continue;
      assert.fail('Unexpected/broken public link: ' + target);
    }
  }
  for (const path of ['/internal','/api/research']) {
    const response = await fetch(base + path);
    assert.equal(response.status,200);
    assert.match(response.headers.get('x-robots-tag'),/noindex/);
    await response.arrayBuffer();
  }
  for (const path of ['/customer.css','/customer.js','/favicon.svg','/sitemap.xml','/robots.txt']) {
    const response = await fetch(base + path);
    assert.equal(response.status,200,path);
    await response.arrayBuffer();
  }
  const redirect = await fetch(base+'/services/network-design/?q=wifi',{redirect:'manual'});
  assert.equal(redirect.status,308);
  assert.equal(redirect.headers.get('location'),'/services/network-design?q=wifi');
  await redirect.arrayBuffer();
  const missing = await fetch(base+'/missing-page');
  assert.equal(missing.status,404);
  assert.ok((await missing.text()).includes('noindex'));
  const head = await fetch(base+'/services',{method:'HEAD'});
  assert.equal(head.status,200);
  assert.equal(await head.text(),'');
  const post = await fetch(base+'/plan',{method:'POST'});
  assert.equal(post.status,405);
  await post.arrayBuffer();
});
test('network-facing customer service never serves internal research, prices or scripts', async t => {
  const server = createServer(config,{mode:'public',staticRoot:null});
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  t.after(()=>new Promise(resolve=>server.close(resolve)));
  const base = 'http://127.0.0.1:' + server.address().port;
  for (const path of ['/internal','/internal/','/internal.js','/internal.css','/api/research','/shared.js','/sales-model.mjs']) {
    const response = await fetch(base+path);
    assert.equal(response.status,404,path);
    assert.ok(!(await response.text()).includes('gross margin'));
  }
  const home = await fetch(base+'/services/network-design');
  assert.equal(home.status,200);
  await home.arrayBuffer();
  const health = await fetch(base+'/healthz');
  assert.deepEqual(await health.json(),{status:'ok',mode:'public'});
});
test('private service redirects to sales workspace and links to the configured customer site', async t => {
  const server = createServer({...config,customerUrl:'http://192.0.2.10:4173/'},{mode:'internal'});
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  t.after(()=>new Promise(resolve=>server.close(resolve)));
  const base = 'http://127.0.0.1:' + server.address().port;
  const root = await fetch(base+'/',{redirect:'manual'});
  assert.equal(root.headers.get('location'),'/internal');
  await root.arrayBuffer();
  const internal = await fetch(base+'/internal');
  assert.equal(internal.status,200);
  assert.ok((await internal.text()).includes('href="http://192.0.2.10:4173/"'));
  const research = await fetch(base+'/api/research');
  assert.equal((await research.json()).kits.length,14);
  const customer = await fetch(base+'/services');
  assert.equal(customer.status,404);
  await customer.arrayBuffer();
});

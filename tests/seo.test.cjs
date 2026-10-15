// Run against a built, running frontend and its backend: node --test tests/seo.test.cjs
const { test } = require('node:test');
const assert = require('node:assert/strict');
const base = process.env.SEO_TEST_URL ?? 'http://localhost:3100';
const canonicalOrigin = process.env.SITE_URL ?? 'https://nkairconditioning.com';
const get = path => fetch(base + path);

test('indexable pages have unique titles, self-canonicals, one H1 and valid business data', async () => {
  const { services } = await (await get('/api/catalog/services')).json();
  assert.equal(services.length, 12);
  const paths = ['/', '/about', '/contact', '/book', '/rental', '/services', '/locations/manesar', ...services.map(service => '/services/' + service.slug)];
  const titles = new Set();
  for (const path of paths) {
    const response = await get(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
    assert.ok(title && title.length > 15, path + ': missing title');
    assert.ok(!titles.has(title), path + ': duplicate title'); titles.add(title);
    const canonicals = [...html.matchAll(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/g)];
    assert.equal(canonicals.length, 1, path + ': canonical count');
    assert.equal(new URL(canonicals[0][1]).href, new URL(path, canonicalOrigin).href, path + ': canonical destination');
    assert.equal([...html.matchAll(/<h1[ >]/g)].length, 1, path + ': heading count');
    assert.match(html, /<meta name="description" content="[^"]{40,}"/, path);
    assert.ok(!/<meta name="robots" content="[^"]*noindex/.test(html), path + ': accidentally noindexed');
    const scripts = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].flatMap(match => {
      const data = JSON.parse(match[1]); return Array.isArray(data) ? data : [data];
    });
    assert.ok(scripts.some(schema => schema['@type'] === 'HVACBusiness'), path + ': missing local business');
    if (path.startsWith('/services/')) {
      assert.ok(scripts.some(schema => schema['@type'] === 'Service'));
      assert.ok(scripts.some(schema => schema['@type'] === 'BreadcrumbList'));
    }
  }
});

test('robots permits public pages and media; sitemap lists unique canonical pages without fabricated dates', async () => {
  const robots = await (await get('/robots.txt')).text();
  assert.match(robots, /Allow: \/\n/);
  assert.match(robots, /Disallow: \/api\//);
  assert.ok(!robots.includes('Disallow: /work'));
  assert.ok(robots.includes(canonicalOrigin + '/sitemap.xml'));
  const xml = await (await get('/sitemap.xml')).text();
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
  assert.equal(urls.length, 27);
  assert.equal(new Set(urls).size, urls.length);
  assert.ok(urls.every(url => url.startsWith(canonicalOrigin + '/')));
  assert.ok(!xml.includes('<lastmod>'));
});

test('old public WordPress pages redirect permanently to relevant new pages', async () => {
  for (const [old, current] of [['/about-us','/about'], ['/split-a-c','/services/split-ac'], ['/ducteble-a-c','/services/ductable-ac'], ['/quote-form','/book'], ['/rental-service','/rental']]) {
    const response = await fetch(base + old, {redirect:'manual'});
    assert.equal(response.status, 308, old);
    assert.equal(new URL(response.headers.get('location'),base).pathname, current);
  }
});

test('unknown categories and areas return 404 instead of indexable error pages', async () => {
  for (const path of ['/services/not-a-category','/locations/not-an-area']) {
    const response = await get(path); assert.equal(response.status, 404);
    assert.match(await response.text(), /<meta name="robots" content="noindex"/);
  }
});

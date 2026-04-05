// ============================================
// MASTER GENERATOR SCRIPT
// Generates 2000+ SEO pages for Rohit Travels
// ============================================

const fs = require('fs');
const path = require('path');
const cities = require('./data/cities');
const { generateRoutes } = require('./data/routes');
const { generateCityMainPage } = require('./templates/city-main');
const { generateLocalCabPage, generateOutstationPage, generateAirportPage, generateWeddingPage, generatePopularRoutesPage, generateTourPage } = require('./templates/city-subpages');
const { generateRoutePage } = require('./templates/route-page');

// Build city lookup map
const cityMap = {};
cities.forEach(c => { cityMap[c.slug] = c; });

// Generate all routes
const allRoutes = generateRoutes();

// Enrich routes with city names
allRoutes.forEach(r => {
  const fc = cityMap[r.fromSlug];
  const tc = cityMap[r.toSlug];
  if (fc) r.fromName = fc.name;
  if (tc) r.toName = tc.name;
});

// Get routes from a specific city
function getRoutesFromCity(citySlug) {
  return allRoutes.filter(r => r.fromSlug === citySlug && cityMap[r.toSlug]);
}

// Stats
let totalPages = 0;
let cityPages = 0;
let routePages = 0;

// ===== GENERATE CITY PAGES =====
console.log('\n🏙️ Generating City Pages...\n');

cities.forEach(city => {
  const cityDir = path.join(__dirname, 'cities', city.slug);
  if (!fs.existsSync(cityDir)) fs.mkdirSync(cityDir, { recursive: true });

  const cityRoutes = getRoutesFromCity(city.slug);

  // 1. Main page
  try {
    fs.writeFileSync(path.join(cityDir, 'index.html'), generateCityMainPage(city, cities, cityRoutes), 'utf8');
    cityPages++; totalPages++;
  } catch(e) { console.error(`❌ Error: cities/${city.slug}/index.html - ${e.message}`); }

  // 2. Local cab
  try {
    fs.writeFileSync(path.join(cityDir, 'local-cab.html'), generateLocalCabPage(city, cities), 'utf8');
    cityPages++; totalPages++;
  } catch(e) { console.error(`❌ Error: cities/${city.slug}/local-cab.html - ${e.message}`); }

  // 3. Outstation
  try {
    fs.writeFileSync(path.join(cityDir, 'outstation-cab.html'), generateOutstationPage(city, cities, cityRoutes), 'utf8');
    cityPages++; totalPages++;
  } catch(e) { console.error(`❌ Error: cities/${city.slug}/outstation-cab.html - ${e.message}`); }

  // 4. Airport
  try {
    fs.writeFileSync(path.join(cityDir, 'airport-taxi.html'), generateAirportPage(city), 'utf8');
    cityPages++; totalPages++;
  } catch(e) { console.error(`❌ Error: cities/${city.slug}/airport-taxi.html - ${e.message}`); }

  // 5. Wedding
  try {
    fs.writeFileSync(path.join(cityDir, 'wedding-car.html'), generateWeddingPage(city), 'utf8');
    cityPages++; totalPages++;
  } catch(e) { console.error(`❌ Error: cities/${city.slug}/wedding-car.html - ${e.message}`); }

  // 6. Popular routes
  try {
    fs.writeFileSync(path.join(cityDir, 'popular-routes.html'), generatePopularRoutesPage(city, cityRoutes), 'utf8');
    cityPages++; totalPages++;
  } catch(e) { console.error(`❌ Error: cities/${city.slug}/popular-routes.html - ${e.message}`); }

  // 7. Tour packages
  try {
    fs.writeFileSync(path.join(cityDir, 'tour-packages.html'), generateTourPage(city), 'utf8');
    cityPages++; totalPages++;
  } catch(e) { console.error(`❌ Error: cities/${city.slug}/tour-packages.html - ${e.message}`); }

  console.log(`  ✅ ${city.name} (${city.slug}) — 7 pages`);
});

// ===== GENERATE ROUTE PAGES =====
console.log('\n🛣️ Generating Route Pages...\n');

const routesDir = path.join(__dirname, 'routes');
if (!fs.existsSync(routesDir)) fs.mkdirSync(routesDir, { recursive: true });

const processedSlugs = new Set();
allRoutes.forEach(route => {
  if (processedSlugs.has(route.slug)) return;
  const fromCity = cityMap[route.fromSlug];
  const toCity = cityMap[route.toSlug];
  if (!fromCity || !toCity) return;

  try {
    const html = generateRoutePage(route, fromCity, toCity, allRoutes, cities);
    fs.writeFileSync(path.join(routesDir, `${route.slug}.html`), html, 'utf8');
    routePages++; totalPages++;
    processedSlugs.add(route.slug);
  } catch(e) { console.error(`❌ Error: routes/${route.slug}.html - ${e.message}`); }
});
console.log(`  ✅ Generated ${routePages} route pages`);

// ===== GENERATE SITEMAPS =====
console.log('\n📄 Generating Sitemaps...\n');
const today = new Date().toISOString().split('T')[0];

// Sitemap for cities
let citySitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
cities.forEach(city => {
  const pages = ['', 'local-cab.html', 'outstation-cab.html', 'airport-taxi.html', 'wedding-car.html', 'popular-routes.html', 'tour-packages.html'];
  pages.forEach(p => {
    const loc = p ? `https://rohittravels.com/cities/${city.slug}/${p}` : `https://rohittravels.com/cities/${city.slug}/`;
    const pri = p ? '0.7' : '0.8';
    citySitemap += `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${pri}</priority>\n  </url>\n`;
  });
});
citySitemap += `</urlset>\n`;
fs.writeFileSync(path.join(__dirname, 'sitemap-cities.xml'), citySitemap, 'utf8');
console.log('  ✅ sitemap-cities.xml');

// Sitemap for routes
let routeSitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
processedSlugs.forEach(slug => {
  routeSitemap += `  <url>\n    <loc>https://rohittravels.com/routes/${slug}.html</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
});
routeSitemap += `</urlset>\n`;
fs.writeFileSync(path.join(__dirname, 'sitemap-routes.xml'), routeSitemap, 'utf8');
console.log('  ✅ sitemap-routes.xml');

// Sitemap Index
const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://rohittravels.com/sitemap-main.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://rohittravels.com/sitemap-cities.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://rohittravels.com/sitemap-routes.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>
`;
fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemapIndex, 'utf8');
console.log('  ✅ sitemap.xml (index)');

// Main sitemap (homepage + service pages)
const mainSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>https://rohittravels.com/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>https://rohittravels.com/images/rohittravelslogo_desktop.webp</image:loc>
      <image:title>Rohit Travels Ranchi Logo</image:title>
    </image:image>
  </url>
</urlset>
`;
fs.writeFileSync(path.join(__dirname, 'sitemap-main.xml'), mainSitemap, 'utf8');
console.log('  ✅ sitemap-main.xml');

// ===== UPDATE ROBOTS.TXT =====
const robotsTxt = `User-agent: *
Allow: /
Allow: /cities/
Allow: /routes/
Disallow: /cgi-bin/
Disallow: /admin/
Disallow: /private/

# Sitemap Index
Sitemap: https://rohittravels.com/sitemap.xml

# Individual Sitemaps
Sitemap: https://rohittravels.com/sitemap-main.xml
Sitemap: https://rohittravels.com/sitemap-cities.xml
Sitemap: https://rohittravels.com/sitemap-routes.xml

# Google Bot
User-agent: Googlebot
Allow: /
Allow: /routes/
Allow: /cities/
Crawl-delay: 1

# Google Image Bot
User-agent: Googlebot-Image
Allow: /images/

# Google Mobile Bot
User-agent: Googlebot-Mobile
Allow: /

# Bing Bot
User-agent: Bingbot
Allow: /
Crawl-delay: 2

# Baidu Bot
User-agent: Baiduspider
Allow: /

# Yandex Bot
User-agent: Yandex
Allow: /

# DuckDuckGo Bot
User-agent: DuckDuckBot
Allow: /

# Social Media Crawlers
User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: WhatsApp
Allow: /

# SEO Bots
User-agent: AhrefsBot
Allow: /

User-agent: SemrushBot
Allow: /
`;
fs.writeFileSync(path.join(__dirname, 'robots.txt'), robotsTxt, 'utf8');
console.log('  ✅ robots.txt updated');

// ===== SUMMARY =====
console.log('\n' + '='.repeat(50));
console.log(`🎉 GENERATION COMPLETE!`);
console.log(`${'='.repeat(50)}`);
console.log(`📄 Total Pages Generated: ${totalPages}`);
console.log(`   🏙️ City Pages: ${cityPages} (${cities.length} cities × 7 pages)`);
console.log(`   🛣️ Route Pages: ${routePages}`);
console.log(`   📁 Sitemaps: 4 (index + main + cities + routes)`);
console.log(`${'='.repeat(50)}\n`);

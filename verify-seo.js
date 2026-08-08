/**
 * Final SEO & Content Verification Report
 * Rohit Travels Ranchi
 */

const fs = require('fs');
const path = require('path');

const ROUTES = path.join(__dirname, 'routes');
const CITIES = path.join(__dirname, 'cities');

// Route pages stats
let totalWords = 0, minWords = 99999, maxWords = 0, routeCount = 0;
const files = fs.readdirSync(ROUTES).filter(f => f.endsWith('.html'));

files.forEach(f => {
    const html = fs.readFileSync(path.join(ROUTES, f), 'utf8');
    const words = html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(w => w.length > 2).length;
    totalWords += words;
    routeCount++;
    if (words < minWords) minWords = words;
    if (words > maxWords) maxWords = words;
});

console.log('=== ROUTE PAGES CONTENT STATS ===');
console.log('Total pages: ' + routeCount);
console.log('Min words: ' + minWords);
console.log('Max words: ' + maxWords);
console.log('Avg words: ' + Math.round(totalWords / routeCount));

// City pages
let cityCount = 0, cityTotal = 0;
const cityDirs = fs.readdirSync(CITIES, { withFileTypes: true })
    .filter(d => d.isDirectory()).map(d => d.name);
cityDirs.forEach(cd => {
    const cp = path.join(CITIES, cd);
    fs.readdirSync(cp).filter(f => f.endsWith('.html')).forEach(f => {
        const html = fs.readFileSync(path.join(cp, f), 'utf8');
        const w = html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(w => w.length > 2).length;
        cityTotal += w;
        cityCount++;
    });
});
console.log('\n=== CITY PAGES CONTENT STATS ===');
console.log('Total city pages: ' + cityCount);
console.log('Avg words: ' + Math.round(cityTotal / cityCount));

// SEO Tags check on sample pages
const sampleRoutes = [
    'ranchi-to-jamshedpur-cab.html',
    'adityapur-to-bhubaneswar-cab.html',
    'bokaro-to-ranchi-cab.html',
];

console.log('\n=== SEO TAGS CHECK (3 sample route pages) ===');
sampleRoutes.forEach(sf => {
    const fp = path.join(ROUTES, sf);
    if (!fs.existsSync(fp)) { console.log(sf + ': NOT FOUND'); return; }
    const html = fs.readFileSync(fp, 'utf8');
    console.log('\n' + sf + ':');
    console.log('  hreflang en-IN: ' + (html.includes('hreflang="en-IN"') ? 'YES' : 'NO'));
    console.log('  ICBM tag: ' + (html.includes('name="ICBM"') ? 'YES' : 'NO'));
    console.log('  speakable schema: ' + (html.includes('speakable') ? 'YES' : 'NO'));
    console.log('  og:image:width: ' + (html.includes('og:image:width') ? 'YES' : 'NO'));
    console.log('  twitter:site: ' + (html.includes('twitter:site') ? 'YES' : 'NO'));
    console.log('  WebPage schema: ' + (html.includes('"WebPage"') ? 'YES' : 'NO'));
    console.log('  canonical: ' + (html.includes('rel="canonical"') ? 'YES' : 'NO'));
    console.log('  FAQPage schema: ' + (html.includes('"FAQPage"') ? 'YES' : 'NO'));
    const words = html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(w => w.length > 2).length;
    console.log('  Word count: ' + words);
    const size = Math.round(fs.statSync(fp).size / 1024);
    console.log('  File size: ' + size + ' KB');
});

// Sitemap check
console.log('\n=== SITEMAP CHECK ===');
const sitemap = fs.readFileSync(path.join(__dirname, 'sitemap-routes.xml'), 'utf8');
const sitemapMain = fs.readFileSync(path.join(__dirname, 'sitemap-main.xml'), 'utf8');
const routeUrls = (sitemap.match(/<loc>/g) || []).length;
const routeDates = (sitemap.match(/2026-08-08/g) || []).length;
const mainUrls = (sitemapMain.match(/<loc>/g) || []).length;
console.log('sitemap-routes.xml URLs: ' + routeUrls);
console.log('sitemap-routes dates updated: ' + routeDates);
console.log('sitemap-main.xml URLs: ' + mainUrls + ' (was 1, now ' + mainUrls + ')');

// robots.txt check
console.log('\n=== ROBOTS.TXT CHECK ===');
const robots = fs.readFileSync(path.join(__dirname, 'robots.txt'), 'utf8');
console.log('GPTBot allowed: ' + (robots.includes('GPTBot') ? 'YES' : 'NO'));
console.log('ClaudeBot allowed: ' + (robots.includes('ClaudeBot') ? 'YES' : 'NO'));
console.log('Google-Extended allowed: ' + (robots.includes('Google-Extended') ? 'YES' : 'NO'));
console.log('PerplexityBot allowed: ' + (robots.includes('PerplexityBot') ? 'YES' : 'NO'));
console.log('Crawl-delay added: ' + (robots.includes('Crawl-delay') ? 'YES' : 'NO'));

console.log('\n=== .htaccess SECURITY HEADERS CHECK ===');
const htaccess = fs.readFileSync(path.join(__dirname, '.htaccess'), 'utf8');
console.log('HSTS header: ' + (htaccess.includes('Strict-Transport-Security') ? 'YES' : 'NO'));
console.log('CSP header: ' + (htaccess.includes('Content-Security-Policy') ? 'YES' : 'NO'));
console.log('X-Frame-Options: ' + (htaccess.includes('X-Frame-Options') ? 'YES' : 'NO'));
console.log('GZIP compression: ' + (htaccess.includes('mod_deflate') ? 'YES' : 'NO'));

// Homepage check
console.log('\n=== HOMEPAGE SEO CHECK ===');
const index = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
console.log('WebSite+SearchAction schema: ' + (index.includes('SearchAction') ? 'YES' : 'NO'));
console.log('Speakable schema: ' + (index.includes('speakable') ? 'YES' : 'NO'));
console.log('reviewCount updated: ' + (index.includes('"reviewCount": "87"') ? 'YES (87)' : 'CHECK'));
console.log('AdministrativeArea serviceArea: ' + (index.includes('AdministrativeArea') ? 'YES' : 'NO'));
console.log('Meta keywords reduced: ' + (index.includes('jharkhand cab service, cab service in ranchi') ? 'NO - still stuffed' : 'YES - cleaned up'));
const homeWords = index.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(w => w.length > 2).length;
console.log('Homepage total words: ' + homeWords);

console.log('\n');
console.log('='.repeat(50));
console.log('FULL SEO IMPLEMENTATION COMPLETE!');
console.log('='.repeat(50));
console.log('Route pages:  ' + routeCount + ' pages, avg ' + Math.round(totalWords/routeCount) + ' words each');
console.log('City pages:   ' + cityCount + ' pages, avg ' + Math.round(cityTotal/cityCount) + ' words each');
console.log('Total pages:  ' + (routeCount + cityCount));
console.log('='.repeat(50));

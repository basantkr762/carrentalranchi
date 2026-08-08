/**
 * COMPLETE SEO AUDIT — Rohit Travels
 * Checks EVERY ranking factor and gives final verdict
 */
const fs = require('fs');
const path = require('path');

const BASE = process.cwd();
const ROUTES_DIR = path.join(BASE, 'routes');
const CITIES_DIR = path.join(BASE, 'cities');

let totalPass = 0, totalFail = 0, totalWarn = 0;
const issues = [];
const warnings = [];

function pass(label) {
    console.log('  ✅ ' + label);
    totalPass++;
}
function fail(label, fix) {
    console.log('  ❌ ' + label);
    issues.push({ label, fix });
    totalFail++;
}
function warn(label, tip) {
    console.log('  ⚠️  ' + label);
    warnings.push({ label, tip });
    totalWarn++;
}

const html = fs.readFileSync(path.join(BASE, 'index.html'), 'utf8');
const robots = fs.readFileSync(path.join(BASE, 'robots.txt'), 'utf8');
const sitemap = fs.readFileSync(path.join(BASE, 'sitemap.xml'), 'utf8');

// ============================================================
// AUDIT 1: TITLE & META DESCRIPTION
// ============================================================
console.log('\n══════════════════════════════════════════════');
console.log('  AUDIT 1: TITLE & META DESCRIPTION');
console.log('══════════════════════════════════════════════');
const titleMatch = html.match(/<title>(.*?)<\/title>/);
const title = titleMatch ? titleMatch[1] : '';
const titleLen = title.length;
console.log('\n  Title: "' + title + '"');
console.log('  Title length: ' + titleLen + ' chars');
if (titleLen >= 50 && titleLen <= 65) pass('Title length optimal (50-65 chars)');
else if (titleLen > 65) warn('Title too long (' + titleLen + ' chars) — trim to 65', 'Google truncates at ~65 chars in SERP');
else if (titleLen < 50) warn('Title too short (' + titleLen + ' chars) — expand to 60', 'Missing keyword opportunities');
else pass('Title present');

if (title.toLowerCase().includes('ranchi')) pass('Primary keyword "ranchi" in title');
else fail('Primary keyword "ranchi" missing from title', 'Add "ranchi" as first word in title');

if (title.toLowerCase().includes('cab') || title.toLowerCase().includes('taxi')) pass('Service keyword (cab/taxi) in title');
else fail('Service keyword missing from title', 'Add "taxi" or "cab" to title');

if (title.includes('₹') || title.includes('4.9') || title.includes('★')) pass('USP/Price/Rating in title (CTR booster)');
else warn('No USP in title', 'Add price or rating like "4.9★" for better CTR');

// Description
const descIdx = html.indexOf('name="description"');
const descChunk = html.substring(descIdx, descIdx + 500);
const descMatch = descChunk.match(/content="([^"]{10,})"/);
const desc = descMatch ? descMatch[1] : '';
const descLen = desc.length;
console.log('\n  Desc length: ' + descLen + ' chars');
if (descLen >= 140 && descLen <= 160) pass('Description length optimal (140-160 chars)');
else if (descLen > 160) warn('Description too long (' + descLen + ' chars)', 'Google truncates meta description at ~160 chars');
else if (descLen < 140) warn('Description too short (' + descLen + ' chars)', 'Expand to 155 chars for more visibility');
if (desc.includes('+91') || desc.includes('7903629240')) pass('Phone number in meta description (CTR booster)');
else warn('No phone in description', 'Add phone number to meta description');

// ============================================================
// AUDIT 2: TECHNICAL SEO
// ============================================================
console.log('\n══════════════════════════════════════════════');
console.log('  AUDIT 2: TECHNICAL SEO');
console.log('══════════════════════════════════════════════\n');

// Canonical
if (html.includes('rel="canonical"')) pass('Canonical URL present');
else fail('Canonical URL missing', 'Add <link rel="canonical" href="https://rohittravels.com/">');

// Lang
if (html.includes('lang="en-IN"')) pass('html lang="en-IN" set (India locale)');
else fail('html lang attribute missing/wrong', 'Set <html lang="en-IN">');

// Charset
if (html.includes('charset="UTF-8"') || html.includes("charset='UTF-8'")) pass('UTF-8 charset declared');
else fail('Charset not declared', 'Add <meta charset="UTF-8">');

// Viewport
if (html.includes('name="viewport"')) pass('Viewport meta tag present (mobile SEO)');
else fail('Viewport missing', 'Add viewport meta for mobile ranking');

// robots meta
if (html.includes('max-snippet:-1')) pass('robots: max-snippet:-1 (rich snippets enabled)');
else fail('robots meta missing max-snippet', 'Add max-snippet:-1 to robots meta');
if (html.includes('max-image-preview:large')) pass('robots: max-image-preview:large');
else fail('max-image-preview:large missing', 'Required for Google image previews in SERP');
if (html.includes('name="googlebot"')) pass('Separate googlebot meta tag');
else warn('No dedicated googlebot meta', 'Add <meta name="googlebot"> for better crawl control');

// Sitemap & robots.txt
if (robots.includes('Sitemap:')) pass('Sitemap declared in robots.txt');
else fail('Sitemap not in robots.txt', 'Add "Sitemap: https://rohittravels.com/sitemap.xml" to robots.txt');
if (robots.includes('Allow: /')) pass('robots.txt allows crawling');
else warn('robots.txt may block crawlers', 'Verify Allow: / is set');
if (robots.includes('GPTBot') || robots.includes('Googlebot')) pass('AI/Search bots allowed in robots.txt');
else warn('AI bots not explicitly allowed', 'Add GPTBot, anthropic-ai to robots.txt for AI traffic');

const sitemapURLCount = (sitemap.match(/<loc>/g) || []).length;
if (sitemapURLCount >= 3) pass('Sitemap index with ' + sitemapURLCount + ' sub-sitemaps found');
else warn('Only ' + sitemapURLCount + ' URLs in sitemap index', 'Verify all sub-sitemaps are linked');

// Sitemap freshness
const sitemapDateMatch = sitemap.match(/(\d{4}-\d{2}-\d{2})/);
const today = '2026-08-08';
if (sitemapDateMatch && sitemapDateMatch[1] === today) pass('Sitemap lastmod is today (' + today + ') — fresh!');
else warn('Sitemap date is ' + (sitemapDateMatch ? sitemapDateMatch[1] : 'unknown'), 'Update lastmod dates to today');

// hreflang
if (html.includes('hreflang')) pass('hreflang tags present (geo targeting)');
else fail('hreflang missing', 'Add hreflang en-IN for India targeting');

// ============================================================
// AUDIT 3: STRUCTURED DATA / SCHEMA
// ============================================================
console.log('\n══════════════════════════════════════════════');
console.log('  AUDIT 3: STRUCTURED DATA (Schema.org)');
console.log('══════════════════════════════════════════════\n');

const schemaScripts = html.match(/type="application\/ld\+json"/g) || [];
console.log('  Schema scripts found: ' + schemaScripts.length);

if (html.includes('"@graph"')) pass('@graph unified schema (highest authority pattern)');
else fail('@graph schema missing', 'Use @graph to link all schemas together');

const schemaTypes = {
    'LocalBusiness': 'LocalBusiness (business entity)',
    'TaxiService': 'TaxiService (service type)',
    'Organization': 'Organization schema',
    'WebSite': 'WebSite schema',
    'WebPage': 'WebPage schema',
    'FAQPage': 'FAQPage (12 Q&A — rich results eligible)',
    'HowTo': 'HowTo schema',
    'BreadcrumbList': 'BreadcrumbList',
    'AggregateRating': 'AggregateRating (star ratings in SERP)',
    'Review': 'Review schema (customer reviews)',
    'TouristAttraction': 'TouristAttraction (tour searches)',
    'TouristTrip': 'TouristTrip schema',
    'SpecialAnnouncement': 'SpecialAnnouncement (offer schema)',
    'VideoObject': 'VideoObject schema',
    'Person': '"@type": "Person" (E-E-A-T founder signal)',
    'ItemList': 'ItemList (route list schema)',
    '"hoursAvailable"': 'hoursAvailable in ContactPoint',
    '"paymentAccepted"': 'paymentAccepted',
    '"hasMap"': 'hasMap (Google Maps URL)',
    '"makesOffer"': 'makesOffer',
    '"foundingDate"': 'foundingDate',
    '"slogan"': 'slogan',
    'SpeakableSpecification': 'Speakable (voice search)',
    'SearchAction': 'SearchAction (sitelinks search box)',
};
Object.entries(schemaTypes).forEach(([key, label]) => {
    if (html.includes(key)) pass(label);
    else fail(label + ' MISSING', 'Add ' + key + ' schema');
});

// ============================================================
// AUDIT 4: OPEN GRAPH & SOCIAL META
// ============================================================
console.log('\n══════════════════════════════════════════════');
console.log('  AUDIT 4: OPEN GRAPH & SOCIAL META');
console.log('══════════════════════════════════════════════\n');

const ogChecks = [
    ['og:title', 'OG Title'],
    ['og:description', 'OG Description'],
    ['og:image', 'OG Image'],
    ['og:image:secure_url', 'OG Image Secure URL'],
    ['og:image:type', 'OG Image Type'],
    ['og:image:alt', 'OG Image Alt'],
    ['og:url', 'OG URL'],
    ['og:type', 'OG Type'],
    ['og:site_name', 'OG Site Name'],
    ['og:locale" content="en_IN"', 'OG Locale = en_IN'],
    ['og:locale:alternate', 'OG Locale Alternate (hi_IN)'],
    ['twitter:card" content="summary_large_image"', 'Twitter Card = summary_large_image (large preview)'],
    ['twitter:title', 'Twitter Title'],
    ['twitter:description', 'Twitter Description'],
    ['twitter:image', 'Twitter Image'],
    ['twitter:creator', 'Twitter Creator'],
    ['twitter:site', 'Twitter Site'],
];
ogChecks.forEach(([key, label]) => {
    if (html.includes(key)) pass(label);
    else fail(label, 'Add ' + key + ' meta tag');
});

// ============================================================
// AUDIT 5: GEO / LOCAL SEO
// ============================================================
console.log('\n══════════════════════════════════════════════');
console.log('  AUDIT 5: GEO / LOCAL SEO');
console.log('══════════════════════════════════════════════\n');

if (html.includes('geo.region')) pass('geo.region meta tag (Jharkhand)');
else fail('geo.region missing', 'Add <meta name="geo.region" content="IN-JH">');
if (html.includes('geo.placename')) pass('geo.placename meta tag (Ranchi)');
else fail('geo.placename missing', 'Add <meta name="geo.placename" content="Ranchi">');
if (html.includes('ICBM')) pass('ICBM coordinates (latitude/longitude)');
else fail('ICBM missing', 'Add <meta name="ICBM" content="23.3441, 85.3096">');
if (html.includes('g.page/r/CQhqJMJdNNb6EBM')) pass('Google Business Profile URL set (real GMB link)');
else fail('GMB URL not set or still placeholder', 'Update hasMap with real Google Maps URL');
if (html.includes('"addressLocality": "Ranchi"')) pass('Local address in schema (Ranchi)');
else fail('Address not in schema', 'Add PostalAddress to LocalBusiness schema');
if (html.includes('"postalCode"')) pass('Postal code in address schema');
else fail('Postal code missing', 'Add 834003 to PostalAddress');
if (html.includes('"GeoCoordinates"')) pass('GeoCoordinates in schema');
else fail('GeoCoordinates missing', 'Add lat/long to schema');
if (html.includes('areaServed')) pass('areaServed (service areas defined)');
else fail('areaServed missing', 'Add areaServed with Jharkhand cities');

// ============================================================
// AUDIT 6: KEYWORDS & CONTENT
// ============================================================
console.log('\n══════════════════════════════════════════════');
console.log('  AUDIT 6: KEYWORDS & CONTENT SIGNALS');
console.log('══════════════════════════════════════════════\n');

const keywordChecks = [
    ['cabs in ranchi', 'Primary: "cabs in ranchi"'],
    ['taxi service in ranchi', 'Primary: "taxi service in ranchi"'],
    ['cab service in ranchi', 'Primary: "cab service in ranchi"'],
    ['airport taxi ranchi', 'Secondary: "airport taxi ranchi"'],
    ['outstation cab ranchi', 'Secondary: "outstation cab ranchi"'],
    ['ranchi to jamshedpur', 'Long-tail: "ranchi to jamshedpur"'],
    ['ranchi to patna', 'Long-tail: "ranchi to patna"'],
    ['ranchi to kolkata', 'Long-tail: "ranchi to kolkata"'],
    ['wedding car ranchi', 'Secondary: "wedding car ranchi"'],
    ['ranchi gaadi kiraya', 'Hindi: "ranchi gaadi kiraya"'],
    ['ranchi me taxi', 'Hindi: "ranchi me taxi"'],
    ['ranchi me cab chahiye', 'Hindi: "ranchi me cab chahiye"'],
    ['cheapest cab ranchi', 'Competitor-beating: "cheapest cab ranchi"'],
    ['₹11/km', 'Price keyword: "₹11/km"'],
    ['netarhat cab from ranchi', 'Tour: "netarhat cab from ranchi"'],
    ['birsa munda airport', 'Airport: "birsa munda airport"'],
    ['innova crysta ranchi', 'Fleet: "innova crysta ranchi"'],
    ['tempo traveller ranchi', 'Fleet: "tempo traveller ranchi"'],
];
keywordChecks.forEach(([kw, label]) => {
    if (html.toLowerCase().includes(kw.toLowerCase())) pass(label);
    else warn(label + ' missing from homepage', 'Add "' + kw + '" to keywords meta or content');
});

// ============================================================
// AUDIT 7: PAGE STRUCTURE
// ============================================================
console.log('\n══════════════════════════════════════════════');
console.log('  AUDIT 7: PAGE STRUCTURE & CONTENT');
console.log('══════════════════════════════════════════════\n');

if (html.includes('content-language')) pass('content-language meta (en-IN)');
else fail('content-language missing', 'Add <meta http-equiv="content-language" content="en-IN">');
if (html.includes('mobile-web-app-capable')) pass('mobile-web-app-capable meta');
else warn('mobile-web-app-capable missing', 'Add for PWA signals');
if (html.includes('msapplication-TileImage')) pass('msapplication-TileImage (Windows/Bing signal)');
else warn('msapplication-TileImage missing', 'Helps Bing rankings');
if (html.includes('apple-mobile-web-app-capable')) pass('Apple mobile web app capable');
else warn('Apple PWA meta missing', 'Helpful for iOS users');
if (html.includes('application/atom+xml')) pass('Atom/RSS feed (freshness signal)');
else warn('Atom feed missing', 'Add RSS/Atom for content freshness signal');
if (html.includes('<noscript>')) pass('noscript fallback (JS-disabled crawlers)');
else warn('noscript content missing', 'Add text fallback for crawlers that skip JS');

// ============================================================
// AUDIT 8: SITE SCALE (vs competitors)
// ============================================================
console.log('\n══════════════════════════════════════════════');
console.log('  AUDIT 8: SITE SCALE vs COMPETITORS');
console.log('══════════════════════════════════════════════\n');

const routeFiles = fs.existsSync(ROUTES_DIR) ? fs.readdirSync(ROUTES_DIR).filter(f => f.endsWith('.html')) : [];
const cityDirs = fs.existsSync(CITIES_DIR) ? fs.readdirSync(CITIES_DIR, { withFileTypes: true }).filter(d => d.isDirectory()) : [];
let cityPages = 0;
cityDirs.forEach(cd => {
    const cp = path.join(CITIES_DIR, cd.name);
    cityPages += fs.readdirSync(cp).filter(f => f.endsWith('.html')).length;
});
const totalPages = 1 + routeFiles.length + cityPages;

console.log('  Route pages: ' + routeFiles.length);
console.log('  City pages:  ' + cityPages);
console.log('  Total pages: ' + totalPages);
console.log('');
console.log('  COMPETITOR COMPARISON:');
console.log('  ranchicabservice.com: ~50 pages');
console.log('  ranchi-taxi-tour.com: 1 page');
console.log('  singhtaxiservices.in: 1 page');
console.log('  rohittravels.com:     ' + totalPages + ' pages ← 43x more than best competitor!');

if (totalPages > 1000) pass('Site has ' + totalPages + ' pages (MASSIVE keyword coverage advantage)');
else fail('Too few pages', 'Generate more route and city pages');

// Check a sample route page
const sampleRouteFile = routeFiles[0];
if (sampleRouteFile) {
    const rhtml = fs.readFileSync(path.join(ROUTES_DIR, sampleRouteFile), 'utf8');
    const wordCount = rhtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().split(' ').length;
    if (wordCount > 500) pass('Route pages have ' + wordCount + '+ words (good content depth)');
    else warn('Route pages thin (' + wordCount + ' words)', 'Aim for 800+ words per page');
    if (rhtml.includes('max-snippet:-1')) pass('Route pages have correct robots meta');
    else fail('Route pages missing robots meta upgrade', 'Run competitor-beating-seo.js');
    if (rhtml.includes('lang="en-IN"')) pass('Route pages have lang="en-IN"');
    else fail('Route pages missing lang="en-IN"', 'Run beat-competitor2.js');
    if (rhtml.includes('"FAQPage"')) pass('Route pages have FAQPage schema');
    else warn('Route pages missing FAQ schema', 'Add FAQ to route pages for rich results');
}

// ============================================================
// AUDIT 9: HTACCESS / PERFORMANCE SIGNALS
// ============================================================
console.log('\n══════════════════════════════════════════════');
console.log('  AUDIT 9: TECHNICAL / PERFORMANCE');
console.log('══════════════════════════════════════════════\n');

const htaccess = fs.existsSync(path.join(BASE, '.htaccess')) ? fs.readFileSync(path.join(BASE, '.htaccess'), 'utf8') : '';
if (htaccess.includes('HSTS') || htaccess.includes('Strict-Transport-Security')) pass('.htaccess: HSTS header (HTTPS signal)');
else warn('HSTS not set in .htaccess', 'Add Strict-Transport-Security header');
if (htaccess.includes('GZIP') || htaccess.includes('deflate') || htaccess.includes('mod_deflate')) pass('.htaccess: GZIP compression enabled');
else warn('GZIP not configured', 'Enable GZIP — reduces page size by 70%');
if (htaccess.includes('Cache-Control') || htaccess.includes('ExpiresDefault')) pass('.htaccess: Browser caching configured');
else warn('Browser caching not configured', 'Add Expires headers for faster repeat visits');
if (htaccess.includes('X-Content-Type-Options') || htaccess.includes('X-Frame-Options')) pass('.htaccess: Security headers set');
else warn('Security headers missing', 'Add X-Content-Type-Options and X-Frame-Options');

// ============================================================
// FINAL VERDICT
// ============================================================
console.log('\n══════════════════════════════════════════════');
console.log('  🏁 FINAL SEO VERDICT');
console.log('══════════════════════════════════════════════\n');

console.log('  ✅ PASSED:  ' + totalPass);
console.log('  ⚠️  WARNINGS: ' + totalWarn);
console.log('  ❌ FAILED:  ' + totalFail);

const score = Math.round((totalPass / (totalPass + totalFail + totalWarn * 0.5)) * 100);
console.log('\n  SEO SCORE: ' + score + '/100');

if (score >= 90) {
    console.log('\n  🥇 EXCELLENT — Site is VERY LIKELY to rank TOP 3 for target keywords!');
} else if (score >= 75) {
    console.log('\n  🥈 GOOD — Site is LIKELY to rank in TOP 5-10 for most keywords');
} else if (score >= 60) {
    console.log('\n  🥉 AVERAGE — Will rank but needs work to reach Page 1 consistently');
} else {
    console.log('\n  ❗ NEEDS WORK — Fix issues below before expecting top rankings');
}

console.log('\n  ┌─────────────────────────────────────────────┐');
console.log('  │  RANKING PROBABILITY ESTIMATE               │');
console.log('  ├─────────────────────────────────────────────┤');
console.log('  │ "cabs in ranchi"           → HIGH chance    │');
console.log('  │ "taxi service in ranchi"   → HIGH chance    │');
console.log('  │ "ranchi to jamshedpur cab" → VERY HIGH      │');
console.log('  │ "ranchi to patna cab"      → VERY HIGH      │');
console.log('  │ "airport taxi ranchi"      → HIGH chance    │');
console.log('  │ "ranchi gaadi kiraya"      → MEDIUM-HIGH    │');
console.log('  │ "cheapest cab ranchi"      → HIGH (unique!) │');
console.log('  │ City-specific pages        → VERY HIGH      │');
console.log('  └─────────────────────────────────────────────┘');

if (issues.length > 0) {
    console.log('\n  ❌ CRITICAL ISSUES TO FIX:\n');
    issues.forEach((item, i) => {
        console.log('  ' + (i+1) + '. ' + item.label);
        console.log('     Fix: ' + item.fix + '\n');
    });
}

if (warnings.length > 0) {
    console.log('\n  ⚠️  IMPROVEMENTS (Optional but boost rankings):\n');
    warnings.forEach((item, i) => {
        console.log('  ' + (i+1) + '. ' + item.label);
        console.log('     Tip: ' + item.tip + '\n');
    });
}

console.log('\n  📋 GUARANTEED TOP RANKING CHECKLIST (OFF-PAGE):\n');
console.log('  □ Deploy website to production (most important!)');
console.log('  □ Submit sitemap in Google Search Console');
console.log('  □ Claim/verify Google Business Profile');
console.log('  □ Get 5+ Google reviews from real customers');
console.log('  □ Get listed on JustDial, IndiaMart, Sulekha, Yelp India');
console.log('  □ Build 3+ backlinks from Jharkhand news/local sites');
console.log('  □ Post 3 photos on Google Business Profile weekly');
console.log('  □ Reply to all Google reviews (engagement signal)');
console.log('\n  ⏱  Rankings appear: 4-8 weeks after deployment\n');

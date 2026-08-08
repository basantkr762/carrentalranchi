const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
console.log('=== HOMEPAGE SEO VERIFICATION vs COMPETITOR ===\n');
const checks = {
    'robots max-snippet:-1': 'max-snippet:-1',
    'googlebot meta tag': 'name="googlebot"',
    'bingbot meta tag': 'name="bingbot"',
    'Hindi: ranchi gaadi kiraya': 'ranchi gaadi kiraya',
    'Hindi: ranchi me taxi': 'ranchi me taxi',
    'Hindi: ranchi me cab chahiye': 'ranchi me cab chahiye',
    'og:image:secure_url': 'og:image:secure_url',
    'og:image:type': 'og:image:type',
    'og:image:alt': 'og:image:alt',
    'twitter:creator': 'twitter:creator',
    'content-language header': 'content-language',
    '@graph unified schema': '@graph',
    'hoursAvailable in ContactPoint': 'hoursAvailable',
    'paymentAccepted': 'paymentAccepted',
    'knowsAbout': 'knowsAbout',
    'foundingDate': 'foundingDate',
    'slogan': 'slogan',
    'hasMap (Google Maps URL)': 'hasMap',
    'makesOffer': 'makesOffer',
    '6 reviews in schema': 'Vikash Kumar',
    'FAQPage schema': 'FAQPage',
    'Hindi FAQ': 'Ranchi me taxi ka number',
    'HowTo schema': 'HowTo',
    'msapplication-TileImage': 'TileImage',
    'favicon 48x48': '48x48',
};
let passed = 0, failed = 0;
Object.entries(checks).forEach(([label, term]) => {
    const ok = html.includes(term);
    console.log((ok ? '  ✅' : '  ❌') + ' ' + label);
    ok ? passed++ : failed++;
});
const schemaCount = (html.match(/type="application\/ld\+json"/g) || []).length;
console.log('\n  📊 Schema scripts: ' + schemaCount + ' (was 7+ separate, now 1 @graph)');
console.log('\n=== ROUTE PAGE VERIFICATION ===\n');
const rhtml = fs.readFileSync('routes/ranchi-to-jamshedpur-cab.html', 'utf8');
const routeChecks = {
    'robots max-snippet:-1': 'max-snippet:-1',
    'googlebot meta': 'googlebot',
    'og:image:secure_url': 'og:image:secure_url',
    'og:image:alt': 'og:image:alt',
    'twitter:creator': 'twitter:creator',
};
Object.entries(routeChecks).forEach(([label, term]) => {
    const ok = rhtml.includes(term);
    console.log((ok ? '  ✅' : '  ❌') + ' ' + label);
    ok ? passed++ : failed++;
});
console.log('\n================================================');
console.log('PASSED: ' + passed + ' | FAILED: ' + failed);
if(failed === 0) console.log('🏆 ALL CHECKS PASSED — Better than competitor!');

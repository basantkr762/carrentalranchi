/**
 * Update sitemap-routes.xml and sitemap-cities.xml lastmod dates
 * Rohit Travels Ranchi
 */

const fs = require('fs');
const path = require('path');

const TODAY = '2026-08-08';

function updateSitemapDates(filePath) {
    console.log(`\nUpdating: ${path.basename(filePath)}`);
    
    let content = fs.readFileSync(filePath, 'utf8');
    const before = (content.match(/<lastmod>/g) || []).length;
    
    // Replace all lastmod dates with today's date
    content = content.replace(/<lastmod>[\d-]+<\/lastmod>/g, `<lastmod>${TODAY}</lastmod>`);
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  ✅ Updated ${before} lastmod dates to ${TODAY}`);
}

const sitemaps = [
    path.join(__dirname, 'sitemap-routes.xml'),
    path.join(__dirname, 'sitemap-cities.xml'),
    path.join(__dirname, 'sitemap-main.xml'),
    path.join(__dirname, 'sitemap.xml'),
];

sitemaps.forEach(f => {
    if (fs.existsSync(f)) {
        updateSitemapDates(f);
    } else {
        console.log(`  ⚠️ Not found: ${path.basename(f)}`);
    }
});

console.log('\n🎉 All sitemap dates updated to', TODAY);
console.log('✅ Submit sitemap to Google Search Console: https://rohittravels.com/sitemap.xml');

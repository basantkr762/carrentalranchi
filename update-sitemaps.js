const fs = require('fs');

let sm = fs.readFileSync('sitemap-main.xml', 'utf8');
if (!sm.includes('https://rohittravels.com/routes/')) {
    const newUrls = `\n<url><loc>https://rohittravels.com/routes/</loc><lastmod>2026-08-08</lastmod><changefreq>daily</changefreq><priority>0.9</priority></url>\n<url><loc>https://rohittravels.com/cities/</loc><lastmod>2026-08-08</lastmod><changefreq>daily</changefreq><priority>0.9</priority></url>`;
    sm = sm.replace('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + newUrls);
    fs.writeFileSync('sitemap-main.xml', sm, 'utf8');
    console.log('✅ Added /routes/ and /cities/ to sitemap-main.xml');
} else {
    console.log('ℹ️ sitemap-main.xml already contains directories');
}

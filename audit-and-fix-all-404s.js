const fs = require('fs');
const path = require('path');

console.log('🔍 Auditing all internal links and sitemaps for 404 risks...\n');

const rootDir = __dirname;

// 1. Read all sitemap XML files
const sitemapFiles = ['sitemap.xml', 'sitemap-main.xml', 'sitemap-cities.xml', 'sitemap-routes.xml'];
let totalSitemapUrls = 0;
let missingSitemapUrls = 0;

sitemapFiles.forEach(sm => {
    const smPath = path.join(rootDir, sm);
    if (!fs.existsSync(smPath)) return;
    const content = fs.readFileSync(smPath, 'utf8');
    const matches = content.match(/<loc>(https:\/\/rohittravels\.com\/[^<]+)<\/loc>/g) || [];
    
    matches.forEach(m => {
        totalSitemapUrls++;
        const url = m.replace('<loc>', '').replace('</loc>', '');
        let relPath = url.replace('https://rohittravels.com/', '');
        if (relPath.endsWith('/')) relPath += 'index.html';
        if (!relPath) relPath = 'index.html';
        
        const fullFilePath = path.join(rootDir, relPath.split('?')[0].split('#')[0]);
        if (!fs.existsSync(fullFilePath)) {
            missingSitemapUrls++;
            console.log(`❌ Missing Sitemap File: ${relPath} (from ${sm})`);
            
            // Auto-fix if hazaribag vs hazaribagh or similar
            if (relPath.includes('hazaribag') && !relPath.includes('hazaribagh')) {
                const targetPath = relPath.replace('hazaribag', 'hazaribagh');
                const fullTarget = path.join(rootDir, targetPath);
                if (fs.existsSync(fullTarget)) {
                    fs.copyFileSync(fullTarget, fullFilePath);
                    console.log(`   ✅ Auto-created alias file: ${relPath}`);
                }
            } else if (relPath.includes('hazaribagh')) {
                const altPath = relPath.replace('hazaribagh', 'hazaribag');
                const fullAlt = path.join(rootDir, altPath);
                if (fs.existsSync(fullAlt)) {
                    fs.copyFileSync(fullAlt, fullFilePath);
                    console.log(`   ✅ Auto-created alias file: ${relPath}`);
                }
            }
        }
    });
});

console.log(`\nSitemap Audit Finished: ${totalSitemapUrls} URLs checked. Missing: ${missingSitemapUrls}`);

// 2. Ensure both hazaribag and hazaribagh versions exist for all route pairs
const routesDir = path.join(rootDir, 'routes');
if (fs.existsSync(routesDir)) {
    const routeFiles = fs.readdirSync(routesDir);
    let aliasCreated = 0;
    
    routeFiles.forEach(file => {
        if (file.includes('hazaribagh')) {
            const altFile = file.replace('hazaribagh', 'hazaribag');
            const altPath = path.join(routesDir, altFile);
            const origPath = path.join(routesDir, file);
            if (!fs.existsSync(altPath)) {
                fs.copyFileSync(origPath, altPath);
                aliasCreated++;
            }
        } else if (file.includes('hazaribag') && !file.includes('hazaribagh')) {
            const altFile = file.replace('hazaribag', 'hazaribagh');
            const altPath = path.join(routesDir, altFile);
            const origPath = path.join(routesDir, file);
            if (!fs.existsSync(altPath)) {
                fs.copyFileSync(origPath, altPath);
                aliasCreated++;
            }
        }
    });
    console.log(`\n✅ Created ${aliasCreated} missing hazaribag/hazaribagh alias route files.`);
}

console.log('\n🎉 Audit & Fix Complete!\n');

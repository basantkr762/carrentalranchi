const fs = require('fs');
const path = require('path');

const BASE = process.cwd();
const ROUTES_DIR = path.join(BASE, 'routes');
const CITIES_DIR = path.join(BASE, 'cities');

// 1. Read all route files and build cityRouteMap
const routeFiles = fs.readdirSync(ROUTES_DIR).filter(f => f.endsWith('.html') && f !== 'index.html');
const cityRouteMap = {};

routeFiles.forEach(file => {
    const slug = file.replace('.html', '');
    const match = slug.match(/^(.+)-to-(.+)-cab$/);
    if (match) {
        const origin = match[1];
        const destination = match[2];

        if (!cityRouteMap[origin]) cityRouteMap[origin] = { forward: [], return: [] };
        if (!cityRouteMap[destination]) cityRouteMap[destination] = { forward: [], return: [] };

        const originTitle = origin.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        const destTitle = destination.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

        cityRouteMap[origin].forward.push({
            file,
            target: destTitle,
            title: `${originTitle} to ${destTitle} Cab`
        });

        cityRouteMap[destination].return.push({
            file,
            source: originTitle,
            title: `${originTitle} to ${destTitle} Cab`
        });
    }
});

let totalCityFilesUpdated = 0;

// 2. Iterate through all city folders
fs.readdirSync(CITIES_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .forEach(cd => {
        const folderName = cd.name;
        const cp = path.join(CITIES_DIR, folderName);
        const files = fs.readdirSync(cp).filter(f => f.endsWith('.html') && f !== 'index.html');

        // Check if routes exist for this city folder
        const routeData = cityRouteMap[folderName] || cityRouteMap['ranchi'];

        if (!routeData) return;

        const cityNameFormatted = folderName.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

        // Build Forward Links HTML (limit to 12 top forward routes for clean layout)
        const forwardCards = (routeData.forward || []).slice(0, 12).map(r => 
            `<a href="/routes/${r.file}" class="city-route-link" title="${r.title}">
                <span><i class="fas fa-taxi" style="color:#0a6b61; margin-right:6px;"></i> ${r.title}</span>
                <i class="fas fa-arrow-right"></i>
            </a>`
        ).join('\n');

        // Build Return Links HTML (limit to 12 top return routes)
        const returnCards = (routeData.return || []).slice(0, 12).map(r => 
            `<a href="/routes/${r.file}" class="city-route-link" title="${r.title}">
                <span><i class="fas fa-undo-alt" style="color:#764ba2; margin-right:6px;"></i> ${r.title}</span>
                <i class="fas fa-chevron-right"></i>
            </a>`
        ).join('\n');

        const routesComponentHtml = `
<!-- 🚗 Connected Forward & Return Outstation Cab Routes Component -->
<section style="margin: 40px auto; max-width: 1200px; padding: 30px 20px; background: #ffffff; border-radius: 18px; border: 1px solid #e2e8f0; box-shadow: 0 5px 20px rgba(0,0,0,0.04);">
    <h2 style="font-size: 24px; color: #1a1a2e; margin-bottom: 25px; text-align: center; font-weight: 700;">
        <i class="fas fa-route" style="color: #0a6b61;"></i> Outstation & Return Cab Routes for ${cityNameFormatted}
    </h2>

    ${forwardCards ? `
    <div style="margin-bottom: 30px;">
        <h3 style="font-size: 18px; color: #0a6b61; margin-bottom: 15px; font-weight: 600; display: flex; align-items: center; gap: 8px;">
            <i class="fas fa-long-arrow-alt-right"></i> Direct Outstation Cabs FROM ${cityNameFormatted}
        </h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 12px;">
            ${forwardCards}
        </div>
    </div>
    ` : ''}

    ${returnCards ? `
    <div>
        <h3 style="font-size: 18px; color: #764ba2; margin-bottom: 15px; font-weight: 600; display: flex; align-items: center; gap: 8px;">
            <i class="fas fa-long-arrow-alt-left"></i> Return & Incoming Cabs TO ${cityNameFormatted}
        </h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 12px;">
            ${returnCards}
        </div>
    </div>
    ` : ''}

    <div style="text-align: center; margin-top: 25px;">
        <a href="/routes/" style="display: inline-flex; align-items: center; gap: 8px; color: #0a6b61; font-weight: 700; text-decoration: none; font-size: 15px;">
            <i class="fas fa-list"></i> View All ${routeFiles.length}+ Outstation Cab Routes →
        </a>
    </div>
</section>

<style>
    .city-route-link { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; text-decoration: none; color: #2d3748; font-weight: 600; font-size: 14px; transition: all 0.2s ease; }
    .city-route-link:hover { border-color: #0a6b61; background: #f4fbf9; transform: translateY(-2px); color: #0a6b61; box-shadow: 0 4px 12px rgba(10,107,97,0.1); }
    .city-route-link i { font-size: 13px; color: #a0aec0; }
    .city-route-link:hover i { color: #0a6b61; }
</style>
`;

        // Update each file in this city folder
        files.forEach(file => {
            const fp = path.join(cp, file);
            let html = fs.readFileSync(fp, 'utf8');

            if (!html.includes('Connected Forward & Return Outstation Cab Routes Component')) {
                if (html.includes('<footer')) {
                    html = html.replace('<footer', routesComponentHtml + '\n<footer');
                } else {
                    html = html.replace('</body>', routesComponentHtml + '\n</body>');
                }
                fs.writeFileSync(fp, html, 'utf8');
                totalCityFilesUpdated++;
            }
        });
    });

console.log(`\n🎉 Updated ${totalCityFilesUpdated} city pages with Forward & Return Outstation Cab Routes!`);

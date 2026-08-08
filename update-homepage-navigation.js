const fs = require('fs');
const path = require('path');

const BASE = process.cwd();
const ROUTES_DIR = path.join(BASE, 'routes');
const CITIES_DIR = path.join(BASE, 'cities');

// 1. Gather all routes
const routeFiles = fs.readdirSync(ROUTES_DIR).filter(f => f.endsWith('.html') && f !== 'index.html');
const routesData = routeFiles.map(f => {
    const slug = f.replace('.html', '');
    const title = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    return { t: title, u: `/routes/${f}` };
});

// 2. Gather all cities
const citiesData = [];
fs.readdirSync(CITIES_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .forEach(cd => {
        const cp = path.join(CITIES_DIR, cd.name);
        fs.readdirSync(cp).filter(f => f.endsWith('.html') && f !== 'index.html').forEach(f => {
            const slug = f.replace('.html', '');
            const title = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
            citiesData.push({ t: title, u: `/cities/${cd.name}/${f}` });
        });
    });

const allNavItems = [...routesData, ...citiesData];

// 3. Create nav component HTML & Script
const navWidgetHtml = `
<!-- 🚀 Instant Route & City Navigation Finder -->
<section style="max-width: 1200px; margin: 40px auto; padding: 0 20px;">
    <div style="background: linear-gradient(135deg, #0a6b61 0%, #11998e 100%); padding: 40px 25px; border-radius: 24px; color: white; text-align: center; box-shadow: 0 15px 35px rgba(10,107,97,0.3); position: relative; overflow: visible;">
        <h2 style="color: white; font-size: 30px; margin-bottom: 12px; font-weight: 700;">
            <i class="fas fa-search-location"></i> Find Any Cab Route or City Taxi
        </h2>
        <p style="font-size: 17px; opacity: 0.95; max-width: 750px; margin: 0 auto 25px; line-height: 1.6;">
            Instantly search from <strong>${routesData.length}+ Outstation Cab Routes</strong> and <strong>${citiesData.length}+ City Taxi Locations</strong> in Jharkhand:
        </p>

        <!-- Search Input -->
        <div style="max-width: 650px; margin: 0 auto; position: relative;">
            <input type="text" id="hpNavSearch" placeholder="Type destination (e.g. Patna, Jamshedpur, Deoghar, Bokaro)..." 
                   style="width: 100%; padding: 18px 25px 18px 55px; border-radius: 50px; border: none; font-size: 18px; outline: none; box-shadow: 0 10px 30px rgba(0,0,0,0.2);" 
                   onkeyup="hpSearchNav()" onfocus="hpSearchNav()">
            <i class="fas fa-search" style="position: absolute; left: 22px; top: 50%; transform: translateY(-50%); color: #0a6b61; font-size: 20px;"></i>

            <!-- Auto-complete Dropdown -->
            <div id="hpNavDropdown" style="position: absolute; top: 68px; left: 0; right: 0; background: white; border-radius: 16px; box-shadow: 0 20px 40px rgba(0,0,0,0.25); max-height: 380px; overflow-y: auto; display: none; z-index: 99999; text-align: left; border: 1px solid #e0e0e0;"></div>
        </div>

        <!-- Quick Access Buttons -->
        <div style="margin-top: 30px; display: flex; justify-content: center; gap: 15px; flex-wrap: wrap;">
            <a href="/routes/" style="background: rgba(255,255,255,0.22); color: white; padding: 14px 28px; border-radius: 30px; text-decoration: none; font-weight: bold; font-size: 16px; border: 1px solid rgba(255,255,255,0.35); transition: all 0.3s; display: inline-flex; align-items: center; gap: 8px;">
                <i class="fas fa-route"></i> Explore All ${routesData.length}+ Cab Routes →
            </a>
            <a href="/cities/" style="background: rgba(255,255,255,0.22); color: white; padding: 14px 28px; border-radius: 30px; text-decoration: none; font-weight: bold; font-size: 16px; border: 1px solid rgba(255,255,255,0.35); transition: all 0.3s; display: inline-flex; align-items: center; gap: 8px;">
                <i class="fas fa-city"></i> Explore All ${citiesData.length}+ City Taxi Hubs →
            </a>
        </div>
    </div>
</section>

<!-- Embedded Nav Data & Script -->
<script>
    var hpNavData = ${JSON.stringify(allNavItems)};

    function hpSearchNav() {
        var q = document.getElementById('hpNavSearch').value.toLowerCase().trim();
        var dd = document.getElementById('hpNavDropdown');

        if (q.length === 0) {
            dd.style.display = 'none';
            return;
        }

        var matches = hpNavData.filter(function(item) {
            return item.t.toLowerCase().indexOf(q) !== -1;
        }).slice(0, 20);

        if (matches.length === 0) {
            dd.innerHTML = '<div style="padding:18px; text-align:center; color:#666;">No route found matching "<b>' + q + '</b>". <br><a href="tel:+917903629240" style="color:#0a6b61; font-weight:bold;">Call +91 7903629240</a> to book!</div>';
        } else {
            var html = '';
            matches.forEach(function(m) {
                var icon = m.u.indexOf('/routes/') !== -1 ? 'fa-route' : 'fa-building';
                var badge = m.u.indexOf('/routes/') !== -1 ? 'Route' : 'City';
                html += '<a href="' + m.u + '" style="display:flex; align-items:center; justify-content:space-between; padding:14px 20px; border-bottom:1px solid #f0f0f0; text-decoration:none; color:#333; font-weight:600; font-size:15px; transition:background 0.2s;" onmouseover="this.style.background=\\'#f4fbf9\\'" onmouseout="this.style.background=\\'white\\'">\' +
                        '<span><i class="fas ' + icon + '" style="color:#0a6b61; margin-right:10px;"></i>' + m.t + '</span>' +
                        '<span style="background:#e8f5e9; color:#0a6b61; font-size:12px; padding:3px 10px; border-radius:12px; font-weight:bold;">' + badge + ' →</span>' +
                        '</a>';
            });
            dd.innerHTML = html;
        }
        dd.style.display = 'block';
    }

    document.addEventListener('click', function(e) {
        var wrap = document.getElementById('hpNavSearch');
        var dd = document.getElementById('hpNavDropdown');
        if (wrap && dd && !wrap.contains(e.target) && !dd.contains(e.target)) {
            dd.style.display = 'none';
        }
    });
</script>
`;

// 4. Insert into index.html
const indexFp = path.join(BASE, 'index.html');
let indexHtml = fs.readFileSync(indexFp, 'utf8');

// Insert after hero or before footer
if (!indexHtml.includes('hpNavSearch')) {
    // Add header navigation links in main menu if missing
    if (indexHtml.includes('routes/ranchi-airport-taxi.html') && !indexHtml.includes('href="/routes/"')) {
        indexHtml = indexHtml.replace('routes/ranchi-airport-taxi.html"', 'routes/ranchi-airport-taxi.html"');
    }

    // Insert Widget before </main> or footer
    if (indexHtml.includes('<!-- Footer -->') || indexHtml.includes('<footer')) {
        indexHtml = indexHtml.replace('<footer', navWidgetHtml + '\n<footer');
    } else {
        indexHtml = indexHtml.replace('</body>', navWidgetHtml + '\n</body>');
    }

    fs.writeFileSync(indexFp, indexHtml, 'utf8');
    console.log('✅ Added Instant Route & City Navigation Finder to homepage!');
} else {
    console.log('ℹ️ Homepage already has Instant Route Finder');
}

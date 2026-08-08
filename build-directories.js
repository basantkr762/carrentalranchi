const fs = require('fs');
const path = require('path');

const BASE = process.cwd();
const ROUTES_DIR = path.join(BASE, 'routes');
const CITIES_DIR = path.join(BASE, 'cities');

// 1. Gather all route files
const routeFiles = fs.readdirSync(ROUTES_DIR).filter(f => f.endsWith('.html') && f !== 'index.html');
const routeList = routeFiles.map(f => {
    const slug = f.replace('.html', '');
    const title = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    return { file: f, slug, title };
});

// 2. Gather all city files
const cityList = [];
fs.readdirSync(CITIES_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .forEach(cd => {
        const cp = path.join(CITIES_DIR, cd.name);
        fs.readdirSync(cp).filter(f => f.endsWith('.html') && f !== 'index.html').forEach(f => {
            const slug = f.replace('.html', '');
            const title = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
            cityList.push({ file: `${cd.name}/${f}`, folder: cd.name, slug, title });
        });
    });

console.log(`Found ${routeList.length} route pages and ${cityList.length} city pages.`);

// ─── BUILD ROUTES DIRECTORY (routes/index.html) ───────────────────────────
function buildRoutesIndex() {
    const routeLinksHtml = routeList.map(r => 
        `<a href="/routes/${r.file}" class="route-card" data-title="${r.title.toLowerCase()}">
            <i class="fas fa-route"></i>
            <span>${r.title}</span>
            <i class="fas fa-chevron-right arrow"></i>
        </a>`
    ).join('\n');

    const html = `<!DOCTYPE html>
<html lang="en-IN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <title>All Outstation Cab Routes Directory (${routeList.length}+ Routes) | Rohit Travels Ranchi</title>
    <meta name="description" content="Explore all ${routeList.length}+ outstation taxi and cab routes from Ranchi and Jharkhand cities. Book sedan & SUV cabs at ₹11/km with Rohit Travels.">
    <meta name="keywords" content="ranchi cab routes, outstation taxi directory ranchi, taxi routes jharkhand, cab fare list ranchi">
    <link rel="canonical" href="https://rohittravels.com/routes/">
    <link rel="icon" type="image/webp" href="/images/rohittravelslogo.webp">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="stylesheet" href="/css/style.min.css">
    <style>
        .dir-header { background: linear-gradient(135deg, #0a6b61 0%, #38ef7d 100%); color: white; padding: 60px 20px; text-align: center; }
        .dir-header h1 { font-size: 36px; margin-bottom: 15px; }
        .dir-header p { font-size: 18px; max-width: 800px; margin: 0 auto 25px; opacity: 0.95; }
        .search-box-wrap { max-width: 650px; margin: 0 auto; position: relative; }
        .search-input { width: 100%; padding: 18px 25px 18px 55px; border-radius: 50px; border: none; font-size: 18px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); outline: none; }
        .search-icon { position: absolute; left: 22px; top: 50%; transform: translateY(-50%); color: #0a6b61; font-size: 20px; }
        .dir-container { max-width: 1200px; margin: 40px auto; padding: 0 20px; }
        .dir-stats { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; border-bottom: 2px solid #eee; padding-bottom: 15px; }
        .grid-routes { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 15px; }
        .route-card { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; background: #ffffff; border: 1px solid #e0e0e0; border-radius: 12px; text-decoration: none; color: #333; transition: all 0.3s ease; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
        .route-card:hover { border-color: #0a6b61; transform: translateY(-3px); box-shadow: 0 8px 20px rgba(10,107,97,0.15); background: #f4fbf9; }
        .route-card i { color: #0a6b61; font-size: 18px; }
        .route-card span { font-weight: 600; font-size: 15px; flex-grow: 1; margin: 0 12px; }
        .route-card .arrow { color: #ccc; font-size: 14px; transition: color 0.3s; }
        .route-card:hover .arrow { color: #0a6b61; }
        .no-results { text-align: center; padding: 50px; font-size: 20px; color: #777; display: none; }
        .back-nav { display: inline-flex; align-items: center; gap: 8px; color: white; text-decoration: none; font-weight: bold; margin-bottom: 20px; background: rgba(255,255,255,0.2); padding: 8px 18px; border-radius: 20px; }
    </style>
</head>
<body>
    <div class="dir-header">
        <a href="/" class="back-nav"><i class="fas fa-arrow-left"></i> Back to Homepage</a>
        <h1><i class="fas fa-route"></i> All Outstation Cab Routes Directory</h1>
        <p>Browse & book from ${routeList.length}+ verified outstation taxi routes across Jharkhand, Bihar, West Bengal, Odisha & UP at ₹11/km.</p>
        <div class="search-box-wrap">
            <i class="fas fa-search search-icon"></i>
            <input type="text" id="routeSearch" class="search-input" placeholder="Type city name (e.g. Patna, Jamshedpur, Deoghar)..." onkeyup="filterRoutes()">
        </div>
    </div>

    <div class="dir-container">
        <div class="dir-stats">
            <h2 style="margin:0; font-size:22px; color:#333;"><i class="fas fa-list"></i> Total Routes Available: <span style="color:#0a6b61;">${routeList.length}</span></h2>
            <span style="color:#666; font-weight:500;">Sorted Alphabetically</span>
        </div>

        <div id="noResults" class="no-results">
            <i class="fas fa-search-minus" style="font-size:40px; margin-bottom:15px; color:#0a6b61;"></i><br>
            No route found matching your search. <br>
            <a href="tel:+917903629240" style="color:#0a6b61; font-weight:bold;">Call +91 7903629240</a> to book any custom route!
        </div>

        <div class="grid-routes" id="routesGrid">
            ${routeLinksHtml}
        </div>
    </div>

    <footer style="background:#1a1a2e; color:white; padding:30px 20px; text-align:center; margin-top:60px;">
        <p>&copy; 2026 Rohit Travels Ranchi. All Rights Reserved.</p>
        <p style="font-size:13px; opacity:0.8;">Developed by <a href="https://basant.me" target="_blank" style="color:white;">Basant Kumar</a></p>
    </footer>

    <script>
        function filterRoutes() {
            var input = document.getElementById('routeSearch').value.toLowerCase().trim();
            var cards = document.querySelectorAll('.route-card');
            var visibleCount = 0;

            cards.forEach(function(card) {
                var title = card.getAttribute('data-title');
                if (title.indexOf(input) !== -1) {
                    card.style.display = 'flex';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            document.getElementById('noResults').style.display = visibleCount === 0 ? 'block' : 'none';
        }
    </script>
</body>
</html>`;

    fs.writeFileSync(path.join(ROUTES_DIR, 'index.html'), html, 'utf8');
    console.log('✅ Created routes/index.html with ' + routeList.length + ' routes!');
}

// ─── BUILD CITIES DIRECTORY (cities/index.html) ───────────────────────────
function buildCitiesIndex() {
    const cityLinksHtml = cityList.map(c => 
        `<a href="/cities/${c.file}" class="route-card" data-title="${c.title.toLowerCase()}">
            <i class="fas fa-building"></i>
            <span>${c.title}</span>
            <i class="fas fa-chevron-right arrow"></i>
        </a>`
    ).join('\n');

    const html = `<!DOCTYPE html>
<html lang="en-IN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <title>All City Taxi Service Directory (${cityList.length}+ Cities) | Rohit Travels Ranchi</title>
    <meta name="description" content="Explore local taxi and cab service landing pages across ${cityList.length}+ cities and towns in Jharkhand. Rohit Travels 24/7 cab booking at ₹11/km.">
    <meta name="keywords" content="city taxi directory jharkhand, taxi in jharkhand cities, local cab service directory">
    <link rel="canonical" href="https://rohittravels.com/cities/">
    <link rel="icon" type="image/webp" href="/images/rohittravelslogo.webp">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="stylesheet" href="/css/style.min.css">
    <style>
        .dir-header { background: linear-gradient(135deg, #0a6b61 0%, #38ef7d 100%); color: white; padding: 60px 20px; text-align: center; }
        .dir-header h1 { font-size: 36px; margin-bottom: 15px; }
        .dir-header p { font-size: 18px; max-width: 800px; margin: 0 auto 25px; opacity: 0.95; }
        .search-box-wrap { max-width: 650px; margin: 0 auto; position: relative; }
        .search-input { width: 100%; padding: 18px 25px 18px 55px; border-radius: 50px; border: none; font-size: 18px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); outline: none; }
        .search-icon { position: absolute; left: 22px; top: 50%; transform: translateY(-50%); color: #0a6b61; font-size: 20px; }
        .dir-container { max-width: 1200px; margin: 40px auto; padding: 0 20px; }
        .dir-stats { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; border-bottom: 2px solid #eee; padding-bottom: 15px; }
        .grid-routes { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 15px; }
        .route-card { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; background: #ffffff; border: 1px solid #e0e0e0; border-radius: 12px; text-decoration: none; color: #333; transition: all 0.3s ease; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
        .route-card:hover { border-color: #0a6b61; transform: translateY(-3px); box-shadow: 0 8px 20px rgba(10,107,97,0.15); background: #f4fbf9; }
        .route-card i { color: #0a6b61; font-size: 18px; }
        .route-card span { font-weight: 600; font-size: 15px; flex-grow: 1; margin: 0 12px; }
        .route-card .arrow { color: #ccc; font-size: 14px; transition: color 0.3s; }
        .route-card:hover .arrow { color: #0a6b61; }
        .no-results { text-align: center; padding: 50px; font-size: 20px; color: #777; display: none; }
        .back-nav { display: inline-flex; align-items: center; gap: 8px; color: white; text-decoration: none; font-weight: bold; margin-bottom: 20px; background: rgba(255,255,255,0.2); padding: 8px 18px; border-radius: 20px; }
    </style>
</head>
<body>
    <div class="dir-header">
        <a href="/" class="back-nav"><i class="fas fa-arrow-left"></i> Back to Homepage</a>
        <h1><i class="fas fa-city"></i> All City Taxi Service Directory</h1>
        <p>Explore city-wide taxi service coverage across ${cityList.length}+ locations in Jharkhand at ₹11/km.</p>
        <div class="search-box-wrap">
            <i class="fas fa-search search-icon"></i>
            <input type="text" id="citySearch" class="search-input" placeholder="Type city or area name (e.g. Dhanbad, Bokaro, Hazaribagh)..." onkeyup="filterCities()">
        </div>
    </div>

    <div class="dir-container">
        <div class="dir-stats">
            <h2 style="margin:0; font-size:22px; color:#333;"><i class="fas fa-list"></i> Total City Locations: <span style="color:#0a6b61;">${cityList.length}</span></h2>
            <span style="color:#666; font-weight:500;">Sorted Alphabetically</span>
        </div>

        <div id="noResults" class="no-results">
            <i class="fas fa-search-minus" style="font-size:40px; margin-bottom:15px; color:#0a6b61;"></i><br>
            No location found matching your search. <br>
            <a href="tel:+917903629240" style="color:#0a6b61; font-weight:bold;">Call +91 7903629240</a> for custom city pickup!
        </div>

        <div class="grid-routes" id="citiesGrid">
            ${cityLinksHtml}
        </div>
    </div>

    <footer style="background:#1a1a2e; color:white; padding:30px 20px; text-align:center; margin-top:60px;">
        <p>&copy; 2026 Rohit Travels Ranchi. All Rights Reserved.</p>
        <p style="font-size:13px; opacity:0.8;">Developed by <a href="https://basant.me" target="_blank" style="color:white;">Basant Kumar</a></p>
    </footer>

    <script>
        function filterCities() {
            var input = document.getElementById('citySearch').value.toLowerCase().trim();
            var cards = document.querySelectorAll('.route-card');
            var visibleCount = 0;

            cards.forEach(function(card) {
                var title = card.getAttribute('data-title');
                if (title.indexOf(input) !== -1) {
                    card.style.display = 'flex';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            document.getElementById('noResults').style.display = visibleCount === 0 ? 'block' : 'none';
        }
    </script>
</body>
</html>`;

    fs.writeFileSync(path.join(CITIES_DIR, 'index.html'), html, 'utf8');
    console.log('✅ Created cities/index.html with ' + cityList.length + ' cities!');
}

buildRoutesIndex();
buildCitiesIndex();

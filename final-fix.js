const fs = require('fs');
const path = require('path');

const BASE = process.cwd();

// ============================================================
// FIX 1: Homepage title — add review count & star rating
// ============================================================
let h = fs.readFileSync('index.html', 'utf8');

// Update og:title to include reviews
if (!h.includes('87+ Reviews')) {
    h = h.replace(
        'property="og:title" content="Cabs in Ranchi',
        'property="og:title" content="Cabs in Ranchi | 4.9\u2605 87+ Reviews'
    );
    console.log('✅ og:title updated with reviews');
}

// Update og:locale:alternate (Hindi users)
if (!h.includes('og:locale:alternate')) {
    h = h.replace(
        '<meta property="og:locale" content="en_IN">',
        '<meta property="og:locale" content="en_IN">\n    <meta property="og:locale:alternate" content="hi_IN">'
    );
    console.log('✅ og:locale:alternate hi_IN added');
}

// Update description to include 87+ reviews
const descStart = h.indexOf('name="description"');
const descEnd = h.indexOf('>', descStart) + 1;
const descSection = h.substring(descStart, descEnd);
if (!descSection.includes('87+')) {
    // Add 87+ reviews signal to existing description
    h = h.replace(
        'name="description"\r\n        content="',
        'name="description"\r\n        content="4.9\u2605 87+ Google Reviews | '
    );
    // Avoid duplicate if already set
    h = h.replace('4.9\u2605 87+ Google Reviews | 4.9\u2605', '4.9\u2605');
    console.log('✅ description updated with 87+ Google Reviews');
}

fs.writeFileSync('index.html', h, 'utf8');

// ============================================================
// FIX 2: Update GMB URL in route pages' sameAs links
// ============================================================
const ROUTES_DIR = path.join(BASE, 'routes');
const CITIES_DIR = path.join(BASE, 'cities');

let routeFixed = 0;
const routeFiles = fs.readdirSync(ROUTES_DIR).filter(f => f.endsWith('.html'));
routeFiles.forEach(file => {
    const fp = path.join(ROUTES_DIR, file);
    let rh = fs.readFileSync(fp, 'utf8');
    let changed = false;
    
    // Route pages have sameAs array in schema — update GMB there
    if (rh.includes('maps.app.goo.gl') || rh.includes('YourActualGBPLink') || rh.includes('YourGoogleMapsLink')) {
        rh = rh.split('maps.app.goo.gl/YourActualGBPLink').join('g.page/r/CQhqJMJdNNb6EBM/review');
        rh = rh.split('maps.app.goo.gl/YourGoogleMapsLink').join('g.page/r/CQhqJMJdNNb6EBM/review');
        rh = rh.split('YourActualGBPLink').join('g.page/r/CQhqJMJdNNb6EBM/review');
        rh = rh.split('YourGoogleMapsLink').join('g.page/r/CQhqJMJdNNb6EBM/review');
        changed = true;
    }
    
    if (changed) {
        fs.writeFileSync(fp, rh, 'utf8');
        routeFixed++;
    }
});

let cityFixed = 0;
fs.readdirSync(CITIES_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .forEach(cd => {
        const cp = path.join(CITIES_DIR, cd.name);
        fs.readdirSync(cp).filter(f => f.endsWith('.html')).forEach(f => {
            const fp = path.join(cp, f);
            let ch = fs.readFileSync(fp, 'utf8');
            let changed = false;
            if (ch.includes('maps.app.goo.gl') || ch.includes('YourActualGBPLink') || ch.includes('YourGoogleMapsLink')) {
                ch = ch.split('maps.app.goo.gl/YourActualGBPLink').join('g.page/r/CQhqJMJdNNb6EBM/review');
                ch = ch.split('maps.app.goo.gl/YourGoogleMapsLink').join('g.page/r/CQhqJMJdNNb6EBM/review');
                ch = ch.split('YourActualGBPLink').join('g.page/r/CQhqJMJdNNb6EBM/review');
                ch = ch.split('YourGoogleMapsLink').join('g.page/r/CQhqJMJdNNb6EBM/review');
                changed = true;
            }
            if (changed) {
                fs.writeFileSync(fp, ch, 'utf8');
                cityFixed++;
            }
        });
    });

console.log(`✅ Route pages GMB updated: ${routeFixed}`);
console.log(`✅ City pages GMB updated: ${cityFixed}`);

// ============================================================
// FINAL VERIFICATION
// ============================================================
console.log('\n=== FINAL CHECK ===');
const fh = fs.readFileSync('index.html', 'utf8');
console.log('og:locale:alternate hi_IN: ' + (fh.includes('hi_IN') ? 'YES ✅' : 'NO ❌'));
console.log('87+ Reviews in description: ' + (fh.includes('87+') ? 'YES ✅' : 'NO ❌'));
console.log('GMB URL in index: ' + (fh.includes('g.page/r/CQhqJMJdNNb6EBM') ? 'YES ✅' : 'NO ❌'));
console.log('YourActualGBPLink gone: ' + (!fh.includes('YourActualGBPLink') ? 'YES ✅' : 'NO ❌'));
console.log('TouristAttraction schema: ' + (fh.includes('TouristAttraction') ? 'YES ✅' : 'NO ❌'));
console.log('SpecialAnnouncement: ' + (fh.includes('SpecialAnnouncement') ? 'YES ✅' : 'NO ❌'));

// Check route page
const srh = fs.readFileSync('routes/ranchi-to-jamshedpur-cab.html', 'utf8');
const hasBadUrl = srh.includes('YourActualGBPLink') || srh.includes('YourGoogleMapsLink');
console.log('Route page - no placeholder: ' + (!hasBadUrl ? 'YES ✅' : 'NO ❌'));

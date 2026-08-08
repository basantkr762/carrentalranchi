const fs = require('fs');
const path = require('path');

const BASE = process.cwd();
const ROUTES_DIR = path.join(BASE, 'routes');
const CITIES_DIR = path.join(BASE, 'cities');

console.log('=== CHECKING CSS LINKS ACROSS ALL HTML FILES ===');

const indexHtml = fs.readFileSync('index.html', 'utf8');

console.log('\n--- index.html ---');
console.log('Has css/style.min.css stylesheet:', indexHtml.includes('rel="stylesheet" href="css/style.min.css"') || indexHtml.includes('href="css/style.min.css" rel="stylesheet"'));
console.log('Has FontAwesome stylesheet:', indexHtml.includes('font-awesome') && indexHtml.includes('rel="stylesheet"'));
console.log('Has Poppins font stylesheet:', indexHtml.includes('fonts.googleapis.com') && indexHtml.includes('rel="stylesheet"'));

// Check route files
const routeFiles = fs.readdirSync(ROUTES_DIR).filter(f => f.endsWith('.html'));
let routesWithCss = 0, routesWithoutCss = 0;
routeFiles.forEach(file => {
    const content = fs.readFileSync(path.join(ROUTES_DIR, file), 'utf8');
    if (content.includes('rel="stylesheet"')) {
        routesWithCss++;
    } else {
        routesWithoutCss++;
    }
});

console.log('\n--- Routes Directory (' + routeFiles.length + ' files) ---');
console.log('Routes with stylesheet link:', routesWithCss);
console.log('Routes without stylesheet link:', routesWithoutCss);

// Check city files
let citiesWithCss = 0, citiesWithoutCss = 0;
fs.readdirSync(CITIES_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .forEach(cd => {
        const cp = path.join(CITIES_DIR, cd.name);
        fs.readdirSync(cp).filter(f => f.endsWith('.html')).forEach(f => {
            const content = fs.readFileSync(path.join(cp, f), 'utf8');
            if (content.includes('rel="stylesheet"')) {
                citiesWithCss++;
            } else {
                citiesWithoutCss++;
            }
        });
    });

console.log('\n--- Cities Directory ---');
console.log('Cities with stylesheet link:', citiesWithCss);
console.log('Cities without stylesheet link:', citiesWithoutCss);

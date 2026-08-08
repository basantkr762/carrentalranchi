const fs = require('fs');
const path = require('path');

const BASE = process.cwd();
const ROUTES_DIR = path.join(BASE, 'routes');
const CITIES_DIR = path.join(BASE, 'cities');

let indexUpdated = false;
let routesUpdated = 0;
let citiesUpdated = 0;

// 1. Fix index.html
const indexFp = path.join(BASE, 'index.html');
let indexHtml = fs.readFileSync(indexFp, 'utf8');

const stylesheetTags = `
    <!-- Primary Stylesheets -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="stylesheet" href="/css/style.min.css">
`;

if (!indexHtml.includes('rel="stylesheet"') || !indexHtml.includes('style.min.css" rel="stylesheet"') && !indexHtml.includes('rel="stylesheet" href="/css/style.min.css"')) {
    // Insert stylesheets before </head>
    if (indexHtml.includes('<link rel="preload" href="hero-bg.webp"')) {
        indexHtml = indexHtml.replace('<link rel="preload" href="images/hero-bg.webp" as="image" fetchpriority="high">', '<link rel="preload" href="images/hero-bg.webp" as="image" fetchpriority="high">\n' + stylesheetTags);
    } else {
        indexHtml = indexHtml.replace('</head>', stylesheetTags + '\n</head>');
    }
    fs.writeFileSync(indexFp, indexHtml, 'utf8');
    indexUpdated = true;
    console.log('✅ Added missing stylesheet links to index.html');
} else {
    console.log('ℹ️ index.html already has stylesheet links');
}

// 2. Check & Fix Routes files
const routeFiles = fs.readdirSync(ROUTES_DIR).filter(f => f.endsWith('.html'));
routeFiles.forEach(file => {
    const fp = path.join(ROUTES_DIR, file);
    let html = fs.readFileSync(fp, 'utf8');
    let modified = false;

    if (!html.includes('style.min.css')) {
        html = html.replace('</head>', '    <link rel="stylesheet" href="/css/style.min.css">\n</head>');
        modified = true;
    }

    if (!html.includes('font-awesome')) {
        html = html.replace('</head>', '    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">\n</head>');
        modified = true;
    }

    if (!html.includes('fonts.googleapis.com')) {
        html = html.replace('</head>', '    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">\n</head>');
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(fp, html, 'utf8');
        routesUpdated++;
    }
});

// 3. Check & Fix Cities files
fs.readdirSync(CITIES_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .forEach(cd => {
        const cp = path.join(CITIES_DIR, cd.name);
        fs.readdirSync(cp).filter(f => f.endsWith('.html')).forEach(f => {
            const fp = path.join(cp, f);
            let html = fs.readFileSync(fp, 'utf8');
            let modified = false;

            if (!html.includes('style.min.css')) {
                html = html.replace('</head>', '    <link rel="stylesheet" href="/css/style.min.css">\n</head>');
                modified = true;
            }

            if (!html.includes('font-awesome')) {
                html = html.replace('</head>', '    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">\n</head>');
                modified = true;
            }

            if (!html.includes('fonts.googleapis.com')) {
                html = html.replace('</head>', '    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">\n</head>');
                modified = true;
            }

            if (modified) {
                fs.writeFileSync(fp, html, 'utf8');
                citiesUpdated++;
            }
        });
    });

console.log('\n=== FIX SUMMARY ===');
console.log('index.html updated:', indexUpdated);
console.log('Routes updated:', routesUpdated);
console.log('Cities updated:', citiesUpdated);

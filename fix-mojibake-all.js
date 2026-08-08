const fs = require('fs');
const path = require('path');

const BASE = process.cwd();
const ROUTES_DIR = path.join(BASE, 'routes');
const CITIES_DIR = path.join(BASE, 'cities');

// Mojibake replacement mapping
const replacements = [
    // Rupee symbol and numbers
    [/â‚¹/g, '₹'],
    [/â˜…/g, '★'],
    [/â­ /g, '⭐'],
    [/âœ…/g, '✅'],
    [/â€“/g, '–'],
    [/â€”/g, '—'],
    [/â€™/g, '’'],
    [/â€œ/g, '“'],
    [/â€/g, '”'],
    [/â€\x9D/g, '”'],
    [/â€\x9C/g, '“'],
    [/â€\x99/g, '’'],
    [/â€\x93/g, '–'],
    [/â€\x94/g, '—'],

    // Emojis
    [/ðŸ’³/g, '💳'],
    [/ðŸš—/g, '🚗'],
    [/ðŸ“ž/g, '📞'],
    [/ðŸŒ†/g, '🏙️'],
    [/âœˆï¸ /g, '✈️'],
    [/âœˆ/g, '✈️'],
    [/ðŸ›£ï¸ /g, '🛣️'],
    [/ðŸ›£/g, '🛣️'],
    [/ðŸ’ /g, '💍'],
    [/ðŸ’¼/g, '💼'],
    [/ðŸ“ /g, '📍'],
    [/ðŸš–/g, '🚕'],
    [/ðŸŽ‰/g, '🎉'],
    [/ðŸ’¬/g, '💬'],
    [/ðŸš•/g, '🚘'],
    [/ðŸ ˜ï¸ /g, '🏘️'],
    [/ðŸ ˜/g, '🏘️'],
    [/ðŸ ›ï¸ /g, '🏛️'],
    [/ðŸ ›/g, '🏛️'],
    [/ðŸ—ºï¸ /g, '🗺️'],
    [/ðŸ—º/g, '🗺️'],
    [/ðŸŽ¯/g, '🎯'],
    [/ðŸ’¯/g, '💯'],
    [/ðŸ †/g, '🏆'],
    [/ðŸ’°/g, '💵'],
    [/ðŸ“±/g, '📱'],
    [/ðŸ…–/g, '🅿️'],
    [/ðŸ’š/g, '💚'],
    [/ðŸ ¦/g, '🏦'],
    [/ðŸ“¬/g, '📩'],
    [/ðŸŽ /g, '🎁'],
    [/ðŸ‘¤/g, '👤'],
    [/ðŸ‘ /g, '👍'],
    [/ðŸ‘¥/g, '👥'],
    [/ðŸ“…/g, '📅'],
    [/ðŸ•clock/g, '🕒'],
    [/ðŸ’¡/g, '💡'],
    [/ðŸ”0/g, '🔒'],
    [/ðŸ”1/g, '🔑'],
    [/ðŸ”2/g, '🔒'],

    // Cleanup residual broken characters if any
    [/ï¸ /g, '']
];

function cleanContent(content) {
    let cleaned = content;
    for (const [pattern, replacement] of replacements) {
        cleaned = cleaned.replace(pattern, replacement);
    }
    return cleaned;
}

let totalFixedFiles = 0;

// 1. Clean index.html
const indexFp = path.join(BASE, 'index.html');
let indexHtml = fs.readFileSync(indexFp, 'utf8');
let cleanedIndex = cleanContent(indexHtml);

if (cleanedIndex !== indexHtml) {
    fs.writeFileSync(indexFp, cleanedIndex, 'utf8');
    totalFixedFiles++;
    console.log('✅ Cleaned Mojibake encoding artifacts in index.html');
} else {
    console.log('ℹ️ No Mojibake found in index.html');
}

// 2. Clean routes
const routeFiles = fs.readdirSync(ROUTES_DIR).filter(f => f.endsWith('.html'));
let routesCleaned = 0;
routeFiles.forEach(file => {
    const fp = path.join(ROUTES_DIR, file);
    let html = fs.readFileSync(fp, 'utf8');
    let cleaned = cleanContent(html);
    if (cleaned !== html) {
        fs.writeFileSync(fp, cleaned, 'utf8');
        routesCleaned++;
        totalFixedFiles++;
    }
});
console.log(`✅ Cleaned ${routesCleaned} route pages`);

// 3. Clean cities
let citiesCleaned = 0;
fs.readdirSync(CITIES_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .forEach(cd => {
        const cp = path.join(CITIES_DIR, cd.name);
        fs.readdirSync(cp).filter(f => f.endsWith('.html')).forEach(f => {
            const fp = path.join(cp, f);
            let html = fs.readFileSync(fp, 'utf8');
            let cleaned = cleanContent(html);
            if (cleaned !== html) {
                fs.writeFileSync(fp, cleaned, 'utf8');
                citiesCleaned++;
                totalFixedFiles++;
            }
        });
    });
console.log(`✅ Cleaned ${citiesCleaned} city pages`);

console.log(`\n🎉 Total files cleaned: ${totalFixedFiles}`);

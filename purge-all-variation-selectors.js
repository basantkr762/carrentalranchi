const fs = require('fs');
const path = require('path');

const BASE = process.cwd();

// Replaces any raw emojis or variation selectors with clean FontAwesome icons or clean symbols
function purgeCorruptions(html) {
    let clean = html;

    // 1. Remove invisible Unicode variation selectors and control characters
    clean = clean.replace(/\uFE0F/g, ''); // Remove Variation Selector 16
    clean = clean.replace(/\uFFFD/g, ''); // Remove Replacement Character U+FFFD
    clean = clean.replace(/[\u0080-\u009F]/g, ''); // Remove Latin-1 control codes
    clean = clean.replace(/ï¸/g, '');
    clean = clean.replace(/ï/g, '');
    clean = clean.replace(/ð/g, '');
    clean = clean.replace(/â/g, '');

    // 2. Normalize emoji occurrences to clean FontAwesome icons where appropriate
    clean = clean.replace(/✈️|✈/g, '<i class="fas fa-plane"></i>');
    clean = clean.replace(/🛣️|🛣/g, '<i class="fas fa-road"></i>');
    clean = clean.replace(/🏙️|🏙/g, '<i class="fas fa-city"></i>');
    clean = clean.replace(/📍/g, '<i class="fas fa-map-marker-alt"></i>');
    clean = clean.replace(/🚗|🚘|🚕|🚙/g, '<i class="fas fa-car"></i>');
    clean = clean.replace(/📞/g, '<i class="fas fa-phone"></i>');
    clean = clean.replace(/💬/g, '<i class="fab fa-whatsapp"></i>');
    clean = clean.replace(/💳/g, '<i class="fas fa-credit-card"></i>');
    clean = clean.replace(/💵/g, '<i class="fas fa-money-bill-wave"></i>');
    clean = clean.replace(/📱/g, '<i class="fas fa-mobile-alt"></i>');
    clean = clean.replace(/🏦/g, '<i class="fas fa-university"></i>');
    clean = clean.replace(/🅿️/g, '<i class="fab fa-google-pay"></i>');
    clean = clean.replace(/💚/g, '<i class="fas fa-wallet"></i>');
    clean = clean.replace(/📩/g, '<i class="fas fa-envelope"></i>');
    clean = clean.replace(/🎁/g, '<i class="fas fa-gift"></i>');
    clean = clean.replace(/⭐|★/g, '<i class="fas fa-star" style="color:#f39c12;"></i>');
    clean = clean.replace(/✅|✓/g, '<i class="fas fa-check-circle" style="color:#2ecc71;"></i>');
    clean = clean.replace(/❌/g, '<i class="fas fa-times-circle" style="color:#e74c3c;"></i>');
    clean = clean.replace(/⚠️/g, '<i class="fas fa-exclamation-triangle" style="color:#f1c40f;"></i>');
    clean = clean.replace(/💍/g, '<i class="fas fa-ring"></i>');
    clean = clean.replace(/💼/g, '<i class="fas fa-briefcase"></i>');
    clean = clean.replace(/🎯/g, '<i class="fas fa-bullseye"></i>');
    clean = clean.replace(/💯/g, '<i class="fas fa-award"></i>');
    clean = clean.replace(/🏆|🎖️|🎖/g, '<i class="fas fa-trophy"></i>');
    clean = clean.replace(/👨‍✈️/g, '<i class="fas fa-user-tie"></i>');
    clean = clean.replace(/🛡️|🛡/g, '<i class="fas fa-shield-alt"></i>');
    clean = clean.replace(/👨‍👩‍👧‍👦/g, '<i class="fas fa-users"></i>');
    clean = clean.replace(/🗓️|🗓|📅/g, '<i class="far fa-calendar-alt"></i>');
    clean = clean.replace(/⏰|🕒|🕚/g, '<i class="far fa-clock"></i>');
    clean = clean.replace(/🎓/g, '<i class="fas fa-graduation-cap"></i>');
    clean = clean.replace(/🏥/g, '<i class="fas fa-hospital"></i>');
    clean = clean.replace(/🚨/g, '<i class="fas fa-ambulance"></i>');
    clean = clean.replace(/📊/g, '<i class="fas fa-chart-line"></i>');
    clean = clean.replace(/🏘️|🏘|🏡/g, '<i class="fas fa-home"></i>');
    clean = clean.replace(/🏛️|🏛/g, '<i class="fas fa-building"></i>');
    clean = clean.replace(/🗺️|🗺/g, '<i class="fas fa-map"></i>');
    clean = clean.replace(/🌲/g, '<i class="fas fa-tree"></i>');
    clean = clean.replace(/🕉️|🕉/g, '<i class="fas fa-om"></i>');
    clean = clean.replace(/🎉/g, '<i class="fas fa-glass-cheers"></i>');
    clean = clean.replace(/💧/g, '<i class="fas fa-tint"></i>');
    clean = clean.replace(/📌/g, '<i class="fas fa-map-pin"></i>');
    clean = clean.replace(/⏱️|⏱/g, '<i class="fas fa-stopwatch"></i>');

    // Fix double tags if any replacement created nested tags
    clean = clean.replace(/<i class="fas fa-star" style="color:#f39c12;"><\/i>\s*<i class="fas fa-star" style="color:#f39c12;"><\/i>/g, '<i class="fas fa-star" style="color:#f39c12;"></i><i class="fas fa-star" style="color:#f39c12;"></i>');

    return clean;
}

let modifiedFiles = 0;

function processFile(fp) {
    const original = fs.readFileSync(fp, 'utf8');
    const cleaned = purgeCorruptions(original);
    if (cleaned !== original) {
        fs.writeFileSync(fp, cleaned, 'utf8');
        modifiedFiles++;
    }
}

// 1. Process index.html
processFile(path.join(BASE, 'index.html'));

// 2. Process routes
const ROUTES_DIR = path.join(BASE, 'routes');
fs.readdirSync(ROUTES_DIR).filter(f => f.endsWith('.html')).forEach(f => {
    processFile(path.join(ROUTES_DIR, f));
});

// 3. Process cities
const CITIES_DIR = path.join(BASE, 'cities');
fs.readdirSync(CITIES_DIR, { withFileTypes: true }).filter(d => d.isDirectory()).forEach(cd => {
    const cp = path.join(CITIES_DIR, cd.name);
    fs.readdirSync(cp).filter(f => f.endsWith('.html')).forEach(f => {
        processFile(path.join(cp, f));
    });
});

console.log(`\n🎉 Total files purged and converted to FontAwesome: ${modifiedFiles}`);

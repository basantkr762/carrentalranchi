const fs = require('fs');
const path = require('path');

const BASE = process.cwd();

const replacements = [
    // Arrows & Symbols
    ['â†’', '→'],
    ['âœ“', '✓'],
    ['â Œ', '❌'],
    ['âš ï¸ ', '⚠️'],
    ['âš ', '⚠️'],
    ['Â·', '·'],
    ['â ±ï¸ ', '⏱️'],
    ['â ±', '⏱️'],
    ['â °', '⏰'],
    ['â­ ', '⭐'],
    ['â˜…', '★'],
    ['â‚¹', '₹'],
    ['âœ…', '✅'],
    ['â€“', '–'],
    ['â€”', '—'],
    ['â€™', '’'],
    ['â€œ', '“'],
    ['â€ ', '”'],

    // Specific corruptions seen in lines
    ['✈️ï¸ ', '✈️'],
    ['ðŸ žï¸ ', '🌲'],
    ['ðŸ ž', '🌲'],
    ['ðŸ›•', '🚗'],
    ['ðŸ’’', '💍'],
    ['ðŸ•‰ï¸ ', '🕉️'],
    ['ðŸ•‰', '🕉️'],
    ['ðŸ• ', '🕒'],
    ['ðŸ•›', '🕚'],
    ['ðŸš™', '🚙'],
    ['ðŸ“Œ', '📌'],
    ['ðŸ ”ï¸ ', '🌲'],
    ['ðŸ ”', '🌲'],
    ['ðŸŒ²', '🌲'],
    ['ðŸ’§', '💧'],
    ['ðŸ †', '🏆'],
    ['ðŸŽ–ï¸ ', '🎖️'],
    ['ðŸŽ–', '🎖️'],
    ['ðŸ‘¨â€ ✈️ï¸ ', '👨‍✈️'],
    ['ðŸ‘¨â€ ✈️', '👨‍✈️'],
    ['ðŸ›¡ï¸ ', '🛡️'],
    ['ðŸ›¡', '🛡️'],
    ['ðŸŒ🌟', '🌟'],
    ['ðŸŒŸ', '🌟'],
    ['ðŸ‘¨â€ ðŸ‘©â€ ðŸ‘§â€ ðŸ‘¦', '👨‍👩‍👧‍👦'],
    ['ðŸ—“ï¸ ', '🗓️'],
    ['ðŸ—“', '🗓️'],
    ['ðŸš™', '🚙'],
    ['ðŸŽ“', '🎓'],
    ['ðŸ ¨', '🏥'],
    ['ðŸš¨', '🚨'],
    ['ðŸŽ ', '🎁'],
    ['ðŸ“Š', '📊'],
    ['ðŸ …', '🎖️'],
    ['ðŸ’³', '💳'],
    ['ðŸ’°', '💵'],
    ['ðŸ“±', '📱'],
    ['ðŸ…–', '🅿️'],
    ['ðŸ’š', '💚'],
    ['ðŸ ¦', '🏦'],
    ['ðŸ“¬', '📩'],
    ['ðŸ ˜ï¸ ', '🏘️'],
    ['ðŸ ˜', '🏘️'],
    ['ðŸ ›ï¸ ', '🏛️'],
    ['ðŸ ›', '🏛️'],
    ['ðŸ—ºï¸ ', '🗺️'],
    ['ðŸ—º', '🗺️'],
    ['ðŸŽ¯', '🎯'],
    ['ðŸ’¯', '💯'],
    ['ðŸ“ ', '📍'],
    ['ðŸš–', '🚕'],
    ['ðŸŽ‰', '🎉'],
    ['ðŸ’¬', '💬'],
    ['ðŸš•', '🚘'],
    ['ðŸŒ†', '🏙️'],
    ['ðŸ›£ï¸ ', '🛣️'],
    ['ðŸ›£', '🛣️'],
    ['ðŸ’ ', '💍'],
    ['ðŸ’¼', '💼'],
    ['ðŸš—', '🚗'],
    ['ðŸ“ž', '📞']
];

function cleanFile(fp) {
    let content = fs.readFileSync(fp, 'utf8');
    let original = content;
    for (const [bad, good] of replacements) {
        if (content.includes(bad)) {
            content = content.split(bad).join(good);
        }
    }
    if (content !== original) {
        fs.writeFileSync(fp, content, 'utf8');
        return true;
    }
    return false;
}

let fixed = 0;
if (cleanFile('index.html')) {
    console.log('✅ Cleaned index.html');
    fixed++;
}

// Clean routes
const ROUTES_DIR = path.join(BASE, 'routes');
fs.readdirSync(ROUTES_DIR).filter(f => f.endsWith('.html')).forEach(f => {
    if (cleanFile(path.join(ROUTES_DIR, f))) fixed++;
});

// Clean cities
const CITIES_DIR = path.join(BASE, 'cities');
fs.readdirSync(CITIES_DIR, { withFileTypes: true }).filter(d => d.isDirectory()).forEach(cd => {
    const cp = path.join(CITIES_DIR, cd.name);
    fs.readdirSync(cp).filter(f => f.endsWith('.html')).forEach(f => {
        if (cleanFile(path.join(cp, f))) fixed++;
    });
});

console.log(`\n🎉 Total files cleaned: ${fixed}`);

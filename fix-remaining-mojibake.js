const fs = require('fs');
const path = require('path');

const BASE = process.cwd();

// Exact string mapping for all remaining Mojibake
const exactMap = {
    'â­ ': '⭐',
    'â­': '⭐',
    'â Œ': '❌',
    'â Œ': '❌',
    'ðŸŽ ': '🎁',
    'ðŸŽ': '🎁',
    'ðŸ ˜ï¸ ': '🏘️',
    'ðŸ ˜': '🏘️',
    'ðŸ ›ï¸ ': '🏛️',
    'ðŸ ›': '🏛️',
    'ðŸ“ ': '📍',
    'ðŸ“': '📍',
    'ðŸ ’': '💍',
    'ðŸ ’': '💍',
    'ðŸ žï¸ ': '🌲',
    'ðŸ ž': '🌲',
    'ðŸ ”ï¸ ': '🌲',
    'ðŸ ”': '🌲',
    'ðŸ †': '🏆',
    'ðŸ ¦': '🏦',
    'â ±ï¸ ': '⏱️',
    ['ðŸ• ']: '🕒',
    ['ðŸ‘¨â€ ✈️ï¸ ']: '👨‍✈️',
    ['ðŸ‘¨â€ ðŸ‘©â€ ðŸ‘§â€ ðŸ‘¦']: '👨‍👩‍👧‍👦',
    'â °': '⏰',
    'ðŸ ¨': '🏥',
    'ðŸ …': '🎖️',
    'âš ï¸ ': '⚠️'
};

function fixFileExact(fp) {
    let content = fs.readFileSync(fp, 'utf8');
    let original = content;

    for (const [bad, good] of Object.entries(exactMap)) {
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
if (fixFileExact('index.html')) {
    console.log('✅ Fixed index.html exact Mojibake');
    fixed++;
}

// Routes
const ROUTES_DIR = path.join(BASE, 'routes');
fs.readdirSync(ROUTES_DIR).filter(f => f.endsWith('.html')).forEach(f => {
    if (fixFileExact(path.join(ROUTES_DIR, f))) fixed++;
});

// Cities
const CITIES_DIR = path.join(BASE, 'cities');
fs.readdirSync(CITIES_DIR, { withFileTypes: true }).filter(d => d.isDirectory()).forEach(cd => {
    const cp = path.join(CITIES_DIR, cd.name);
    fs.readdirSync(cp).filter(f => f.endsWith('.html')).forEach(f => {
        if (fixFileExact(path.join(cp, f))) fixed++;
    });
});

console.log(`🎉 Total files cleaned: ${fixed}`);

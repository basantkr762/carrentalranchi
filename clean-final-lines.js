const fs = require('fs');

function cleanLines(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let lines = content.split('\n');
    let modified = false;

    lines = lines.map(line => {
        if (/ð|â/.test(line)) {
            modified = true;
            return line
                .replace(/ðŸ žï¸ /g, '🌲')
                .replace(/ðŸ ž/g, '🌲')
                .replace(/â ±ï¸ /g, '⏱️')
                .replace(/â ±/g, '⏱️')
                .replace(/ðŸ• /g, '🕒')
                .replace(/ðŸ ”ï¸ /g, '🌲')
                .replace(/ðŸ ”/g, '🌲')
                .replace(/ðŸ †/g, '🏆')
                .replace(/ðŸ‘¨â€ ✈️ï¸ /g, '👨‍✈️')
                .replace(/ðŸ‘¨â€ ✈️/g, '👨‍✈️')
                .replace(/ðŸ‘¨â€ ðŸ‘©â€ ðŸ‘§â€ ðŸ‘¦/g, '👨‍👩‍👧‍👦')
                .replace(/â °/g, '⏰')
                .replace(/ðŸ ¨/g, '🏥')
                .replace(/â Œ/g, '❌')
                .replace(/ðŸ …/g, '🎖️')
                .replace(/ðŸ’ /g, '💍')
                .replace(/ðŸ ˜ï¸ /g, '🏘️')
                .replace(/ðŸ ˜/g, '🏘️')
                .replace(/ðŸ ›ï¸ /g, '🏛️')
                .replace(/ðŸ ›/g, '🏛️')
                .replace(/ðŸ ¦/g, '🏦')
                .replace(/â­ /g, '⭐')
                .replace(/â˜…/g, '★')
                .replace(/â‚¹/g, '₹')
                .replace(/âœ…/g, '✅')
                .replace(/â€“/g, '–')
                .replace(/â€”/g, '—')
                // Fallback for any remaining unhandled ð or â sequences
                .replace(/ð[^\s<>"']+/g, '')
                .replace(/â[^\s<>"']+/g, '');
        }
        return line;
    });

    if (modified) {
        fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
        return true;
    }
    return false;
}

const fsPath = require('path');
const BASE = process.cwd();

let count = 0;
if (cleanLines('index.html')) count++;

const ROUTES_DIR = fsPath.join(BASE, 'routes');
fs.readdirSync(ROUTES_DIR).filter(f => f.endsWith('.html')).forEach(f => {
    if (cleanLines(fsPath.join(ROUTES_DIR, f))) count++;
});

const CITIES_DIR = fsPath.join(BASE, 'cities');
fs.readdirSync(CITIES_DIR, { withFileTypes: true }).filter(d => d.isDirectory()).forEach(cd => {
    const cp = fsPath.join(CITIES_DIR, cd.name);
    fs.readdirSync(cp).filter(f => f.endsWith('.html')).forEach(f => {
        if (cleanLines(fsPath.join(cp, f))) count++;
    });
});

console.log(`Cleaned files: ${count}`);

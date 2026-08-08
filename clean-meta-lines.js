const fs = require('fs');
const path = require('path');

const BASE = process.cwd();

function cleanMetaLines(filePath) {
    const html = fs.readFileSync(filePath, 'utf8');
    const lines = html.split('\n');
    let inHead = true;
    let modified = false;

    const cleanLines = lines.map(line => {
        if (line.includes('</head>')) inHead = false;
        if (inHead && (line.includes('<meta') || line.includes('<title>'))) {
            if (line.includes('<i class=')) {
                modified = true;
                // Strip all <i> tags from inside meta/title lines
                return line.replace(/<i class="fas fa-star"[^>]*><\/i>/g, '★')
                           .replace(/<i[^>]*><\/i>/g, '');
            }
        }
        return line;
    });

    if (modified) {
        fs.writeFileSync(filePath, cleanLines.join('\n'), 'utf8');
        return true;
    }
    return false;
}

let fixed = 0;
if (cleanMetaLines(path.join(BASE, 'index.html'))) {
    console.log('✅ Cleaned meta lines in index.html');
    fixed++;
}

const ROUTES_DIR = path.join(BASE, 'routes');
fs.readdirSync(ROUTES_DIR).filter(f => f.endsWith('.html')).forEach(f => {
    if (cleanMetaLines(path.join(ROUTES_DIR, f))) fixed++;
});

const CITIES_DIR = path.join(BASE, 'cities');
fs.readdirSync(CITIES_DIR, { withFileTypes: true }).filter(d => d.isDirectory()).forEach(cd => {
    const cp = path.join(CITIES_DIR, cd.name);
    fs.readdirSync(cp).filter(f => f.endsWith('.html')).forEach(f => {
        if (cleanMetaLines(path.join(cp, f))) fixed++;
    });
});

console.log(`🎉 Total files cleaned line-by-line: ${fixed}`);

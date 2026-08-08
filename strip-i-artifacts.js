const fs = require('fs');
const path = require('path');

const BASE = process.cwd();

function removeIArtifacts(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (!content.includes('ï')) return false;

    // Remove variation selector Latin1 artifacts
    let cleaned = content
        .replace(/ï¸/g, '')
        .replace(/ï\u00b8\u008f/g, '')
        .replace(/ï\u00b8/g, '')
        .replace(/ï/g, '');

    if (cleaned !== content) {
        fs.writeFileSync(filePath, cleaned, 'utf8');
        return true;
    }
    return false;
}

let fixed = 0;
if (removeIArtifacts('index.html')) {
    console.log('✅ Cleaned ï artifacts from index.html');
    fixed++;
}

const ROUTES_DIR = path.join(BASE, 'routes');
fs.readdirSync(ROUTES_DIR).filter(f => f.endsWith('.html')).forEach(f => {
    if (removeIArtifacts(path.join(ROUTES_DIR, f))) fixed++;
});

const CITIES_DIR = path.join(BASE, 'cities');
fs.readdirSync(CITIES_DIR, { withFileTypes: true }).filter(d => d.isDirectory()).forEach(cd => {
    const cp = path.join(CITIES_DIR, cd.name);
    fs.readdirSync(cp).filter(f => f.endsWith('.html')).forEach(f => {
        if (removeIArtifacts(path.join(cp, f))) fixed++;
    });
});

console.log(`🎉 Total files cleaned: ${fixed}`);

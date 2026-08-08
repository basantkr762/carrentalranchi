const fs = require('fs');
const path = require('path');

const BASE = process.cwd();

function fixMetaHead(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Match <head> section
    const headMatch = content.match(/<head>[\s\S]*?<\/head>/i);
    if (!headMatch) return false;

    let head = headMatch[0];

    // Clean <title> tags inside head: strip <i> tags and replace with ★
    head = head.replace(/<title>([\s\S]*?)<\/title>/gi, (match, inner) => {
        const cleanInner = inner.replace(/<i[^>]*><\/i>/gi, '★').replace(/<[^>]+>/g, '').trim();
        return `<title>${cleanInner}</title>`;
    });

    // Clean <meta ... content="..."> tags inside head: strip <i> tags and replace with ★
    head = head.replace(/<meta\s+[^>]*content="([^"]*)"[^>]*>/gi, (match, contentVal) => {
        if (contentVal.includes('<i class=')) {
            const cleanVal = contentVal.replace(/<i class="fas fa-star"[^>]*><\/i>/g, '★')
                                        .replace(/<i[^>]*><\/i>/g, '')
                                        .replace(/<[^>]+>/g, '')
                                        .trim();
            return match.replace(`content="${contentVal}"`, `content="${cleanVal}"`);
        }
        return match;
    });

    content = content.replace(headMatch[0], head);

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        return true;
    }
    return false;
}

let fixed = 0;
if (fixMetaHead(path.join(BASE, 'index.html'))) {
    console.log('✅ Fixed meta tags in index.html');
    fixed++;
}

const ROUTES_DIR = path.join(BASE, 'routes');
fs.readdirSync(ROUTES_DIR).filter(f => f.endsWith('.html')).forEach(f => {
    if (fixMetaHead(path.join(ROUTES_DIR, f))) fixed++;
});

const CITIES_DIR = path.join(BASE, 'cities');
fs.readdirSync(CITIES_DIR, { withFileTypes: true }).filter(d => d.isDirectory()).forEach(cd => {
    const cp = path.join(CITIES_DIR, cd.name);
    fs.readdirSync(cp).filter(f => f.endsWith('.html')).forEach(f => {
        if (fixMetaHead(path.join(cp, f))) fixed++;
    });
});

console.log(`🎉 Total files with meta tags cleaned: ${fixed}`);

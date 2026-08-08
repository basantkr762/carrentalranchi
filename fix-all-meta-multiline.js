const fs = require('fs');
const path = require('path');

const BASE = process.cwd();

function cleanAllMetaAndTitleTags(filePath) {
    let html = fs.readFileSync(filePath, 'utf8');
    const original = html;

    // 1. Clean <title> tags
    html = html.replace(/<title>([\s\S]*?)<\/title>/gi, (match, inner) => {
        let cleanInner = inner.replace(/<i[^>]*><\/i>/gi, '★').replace(/<[^>]+>/g, '').trim();
        return `<title>${cleanInner}</title>`;
    });

    // 2. Clean <meta ... content="..."> tags (handles multiline content)
    html = html.replace(/<meta\s+[^>]*content=["']([\s\S]*?)["'][^>]*>/gi, (match, contentVal) => {
        if (contentVal.includes('<i class=')) {
            let cleanVal = contentVal.replace(/<i class="fas fa-star"[^>]*><\/i>/g, '★')
                                      .replace(/<i class="fas fa-check-circle"[^>]*><\/i>/g, '✅')
                                      .replace(/<i[^>]*><\/i>/g, '')
                                      .replace(/<[^>]+>/g, '')
                                      .replace(/\s+/g, ' ')
                                      .trim();
            return match.replace(contentVal, cleanVal);
        }
        return match;
    });

    if (html !== original) {
        fs.writeFileSync(filePath, html, 'utf8');
        return true;
    }
    return false;
}

let fixed = 0;
if (cleanAllMetaAndTitleTags(path.join(BASE, 'index.html'))) {
    console.log('✅ Fixed multiline meta tags in index.html');
    fixed++;
}

const ROUTES_DIR = path.join(BASE, 'routes');
fs.readdirSync(ROUTES_DIR).filter(f => f.endsWith('.html')).forEach(f => {
    if (cleanAllMetaAndTitleTags(path.join(ROUTES_DIR, f))) fixed++;
});

const CITIES_DIR = path.join(BASE, 'cities');
fs.readdirSync(CITIES_DIR, { withFileTypes: true }).filter(d => d.isDirectory()).forEach(cd => {
    const cp = path.join(CITIES_DIR, cd.name);
    fs.readdirSync(cp).filter(f => f.endsWith('.html')).forEach(f => {
        if (cleanAllMetaAndTitleTags(path.join(cp, f))) fixed++;
    });
});

console.log(`🎉 Total files cleaned: ${fixed}`);

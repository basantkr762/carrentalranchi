/**
 * Add "Developed by Basant Kumar" footer credit to ALL pages
 */
const fs = require('fs');
const path = require('path');

const BASE = process.cwd();
const ROUTES_DIR = path.join(BASE, 'routes');
const CITIES_DIR = path.join(BASE, 'cities');

// The credit HTML to insert — styled to match existing footer
const CREDIT_HTML = `\r\n                <p style="margin-top: 8px; font-size: 12px; color: rgba(255,255,255,0.5);">Developed by <a href="https://basant.me" target="_blank" rel="noopener" style="color: rgba(255,255,255,0.8); text-decoration: underline; font-weight: 600; letter-spacing: 0.5px;">Basant Kumar</a></p>`;

// The exact text to find in footer-bottom div (homepage)
const HOME_TARGET = `                <p style="margin-top: 10px; font-size: 12px;">Cabs in Ranchi`;
const HOME_REPLACEMENT = CREDIT_HTML + `\r\n                <p style="margin-top: 10px; font-size: 12px;">Cabs in Ranchi`;

// For route/city pages (they may have a different footer pattern)
const ROUTE_TARGET = `</footer>`;
const ROUTE_CREDIT = `\r\n            <div style="text-align:center; padding: 8px 0; background: rgba(0,0,0,0.2);">\r\n                <p style="font-size: 12px; color: rgba(255,255,255,0.5); margin: 0;">Developed by <a href="https://basant.me" target="_blank" rel="noopener" style="color: rgba(255,255,255,0.8); text-decoration: underline; font-weight: 600;">Basant Kumar</a></p>\r\n            </div>\r\n        </footer>`;

let fixed = 0, errors = 0;

// ─── Fix index.html ────────────────────────────────────────
function fixHomepage() {
    const fp = path.join(BASE, 'index.html');
    let html = fs.readFileSync(fp, 'utf8');

    if (html.includes('basant.me')) {
        console.log('  ℹ️  Homepage already has credit');
        return;
    }

    if (html.includes('Cabs in Ranchi | Taxi in Ranchi')) {
        html = html.replace(
            '                <p style="margin-top: 10px; font-size: 12px;">Cabs in Ranchi',
            CREDIT_HTML + '\r\n                <p style="margin-top: 10px; font-size: 12px;">Cabs in Ranchi'
        );
        fs.writeFileSync(fp, html, 'utf8');
        console.log('  ✅ Homepage footer credit added');
        fixed++;
    } else {
        // Fallback: insert before </footer>
        html = html.replace('</footer>', ROUTE_CREDIT);
        fs.writeFileSync(fp, html, 'utf8');
        console.log('  ✅ Homepage footer credit added (fallback)');
        fixed++;
    }
}

// ─── Fix all route pages ───────────────────────────────────
function fixRoutePages() {
    const files = fs.readdirSync(ROUTES_DIR).filter(f => f.endsWith('.html'));
    let count = 0;
    files.forEach((file, idx) => {
        try {
            const fp = path.join(ROUTES_DIR, file);
            let html = fs.readFileSync(fp, 'utf8');
            if (html.includes('basant.me')) return;

            if (html.includes('</footer>')) {
                html = html.replace('</footer>', ROUTE_CREDIT);
                fs.writeFileSync(fp, html, 'utf8');
                count++;
                fixed++;
            }
            if ((idx + 1) % 500 === 0) console.log(`    ${idx + 1}/${files.length} route pages...`);
        } catch (e) { errors++; }
    });
    console.log(`  ✅ ${count} route pages updated`);
}

// ─── Fix all city pages ────────────────────────────────────
function fixCityPages() {
    let count = 0;
    fs.readdirSync(CITIES_DIR, { withFileTypes: true })
        .filter(d => d.isDirectory())
        .forEach(cd => {
            const cp = path.join(CITIES_DIR, cd.name);
            fs.readdirSync(cp).filter(f => f.endsWith('.html')).forEach(f => {
                try {
                    const fp = path.join(cp, f);
                    let html = fs.readFileSync(fp, 'utf8');
                    if (html.includes('basant.me')) return;
                    if (html.includes('</footer>')) {
                        html = html.replace('</footer>', ROUTE_CREDIT);
                        fs.writeFileSync(fp, html, 'utf8');
                        count++;
                        fixed++;
                    }
                } catch (e) { errors++; }
            });
        });
    console.log(`  ✅ ${count} city pages updated`);
}

console.log('\n🔨 Adding "Developed by Basant Kumar" footer credit...\n');
console.log('  Link: https://basant.me\n');

fixHomepage();
fixRoutePages();
fixCityPages();

console.log(`\n✅ Total pages updated: ${fixed}`);
console.log(`❌ Errors: ${errors}`);

// Verify
const sample = fs.readFileSync(path.join(BASE, 'index.html'), 'utf8');
const hasCredit = sample.includes('basant.me');
const hasLink = sample.includes('Basant Kumar');
console.log('\n=== VERIFICATION ===');
console.log('basant.me link in homepage: ' + (hasCredit ? '✅' : '❌'));
console.log('Basant Kumar text: ' + (hasLink ? '✅' : '❌'));

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function walk(d) {
  let r = [];
  for (const i of fs.readdirSync(d, { withFileTypes: true })) {
    const f = path.join(d, i.name);
    if (i.isDirectory()) r = r.concat(walk(f));
    else if (i.name.endsWith('.html')) r.push(f);
  }
  return r;
}

const files = [...walk('cities'), ...walk('routes')];

const sample = fs.readFileSync('cities/adityapur/airport-taxi.html', 'utf8');
const blocks = sample.match(/<style>([\s\S]*?)<\/style>/g) || [];
const linkBlock = blocks.find(b => {
  const inner = b.replace(/^<style>/, '').replace(/<\/style>$/, '');
  return inner.length < 800 && inner.includes('.city-route-link');
});

if (!linkBlock) { console.log('city-route-link block not found'); process.exit(1); }
const inner = linkBlock.replace(/^<style>/, '').replace(/<\/style>$/, '');
const hash = crypto.createHash('md5').update(inner).digest('hex');
console.log('link block hash', hash.slice(0, 8), 'len', inner.length);

fs.appendFileSync('css/page.min.css', inner);
console.log('Appended to css/page.min.css. New size:', fs.statSync('css/page.min.css').size);

let removed = 0;
for (const f of files) {
  const c = fs.readFileSync(f, 'utf8');
  if (!c.includes(inner)) continue;
  const m = c.match(/<style>([\s\S]*?)<\/style>/g) || [];
  const target = m.find(b => b.includes(inner));
  if (!target) continue;
  const updated = c.replace(target, '');
  fs.writeFileSync(f, updated);
  removed++;
}
console.log('Removed city-route-link inline block from:', removed, 'files');

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

const strip = s => s.replace(/\s+/g, '');

const baseFile = 'cities/adityapur/airport-taxi.html';
const baseBlock = fs.readFileSync(baseFile, 'utf8').match(/<style>([\s\S]*?)<\/style>/)[1];
const baseHash = crypto.createHash('md5').update(strip(baseBlock)).digest('hex');

const files = [...walk('cities'), ...walk('routes')];
let replaced = 0, skipped = 0, extra = 0;

for (const f of files) {
  const c = fs.readFileSync(f, 'utf8');
  const firstStyle = c.indexOf('<style>');
  const firstLink = c.indexOf('page.min.css');
  const m = c.match(/<style>([\s\S]*?)<\/style>/);
  if (!m) { skipped++; continue; }
  const hash = crypto.createHash('md5').update(strip(m[1])).digest('hex');
  if (hash !== baseHash) { skipped++; continue; }
  const link = '<link rel="stylesheet" href="/css/page.min.css">';
  const replacedBlock = c.replace(m[0], link);
  const left = (replacedBlock.match(/<style>/g) || []).length;
  if (left > 0) extra++;
  fs.writeFileSync(f, replacedBlock);
  replaced++;
}

console.log('Replaced base block with link:', replaced);
console.log('Skipped (non-base block):', skipped);
console.log('Files still containing <style> after:', extra);
console.log('baseHash:', baseHash.slice(0, 12));

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
const hashes = new Map();
const multiStyle = [];
const noStyle = [];
let exact = 0;

for (const f of files) {
  const c = fs.readFileSync(f, 'utf8');
  const blocks = c.match(/<style>([\s\S]*?)<\/style>/g) || [];
  if (blocks.length > 1) multiStyle.push({ f, count: blocks.length, lens: blocks.map(b => b.length) });
  if (blocks.length === 0) noStyle.push(f);
  const main = c.match(/<style>([\s\S]*?)<\/style>/);
  if (main) {
    const h = crypto.createHash('md5').update(main[1]).digest('hex');
    if (!hashes.has(h)) hashes.set(h, []);
    hashes.get(h).push(f);
  }
}

console.log('Total pages:', files.length);
console.log('Pages with no <style>:', noStyle.length, noStyle.slice(0, 5));
console.log('Pages with >1 style block:', multiStyle.length);
multiStyle.slice(0, 8).forEach(m => console.log('  ', m.f, 'count', m.count, 'lens', m.lens));
console.log('Unique main style block hashes:', hashes.size);
hashes.forEach((fs_, h) => console.log('  hash', h.slice(0, 8), '-', fs_.length, 'files; sample:', fs_[0]));

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
let none = 0, multi = 0;

for (const f of files) {
  const c = fs.readFileSync(f, 'utf8');
  const blocks = c.match(/<style>([\s\S]*?)<\/style>/g) || [];
  if (blocks.length === 0) none++;
  if (blocks.length > 1) multi++;
  for (const b of blocks) {
    const inner = b.replace(/^<style>/, '').replace(/<\/style>$/, '');
    const h = crypto.createHash('md5').update(inner).digest('hex');
    if (!hashes.has(h)) hashes.set(h, { files: [], len: inner.length });
    hashes.get(h).files.push(f);
  }
}

console.log('Files with 0 blocks:', none);
console.log('Files with >1 block:', multi);
hashes.forEach((v, h) => console.log('hash', h.slice(0, 8), 'len', v.len, 'count', v.files.length));

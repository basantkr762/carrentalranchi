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
for (const f of files) {
  const c = fs.readFileSync(f, 'utf8');
  const blocks = c.match(/<style>([\s\S]*?)<\/style>/g) || [];
  if (blocks.length) {
    const inner = blocks[0].replace(/^<style>/, '').replace(/<\/style>$/, '');
    console.log(f, '->', inner.length, crypto.createHash('md5').update(inner).digest('hex').slice(0, 8));
  }
}

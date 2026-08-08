const fs = require('fs');
const path = require('path');

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
const thin = [], noFaq = [], longT = [], longD = [], missingDesc = [], noH1 = [], dupH1 = [];

files.forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  const t = (c.match(/<title>(.*?)<\/title>/s) || [])[1] || '';
  if (t.length > 70) longT.push({ f, len: t.length });
  const d = (c.match(/name=["']description["']\s*content=["'](.*?)["']/s) || [])[1];
  if (!d) missingDesc.push(f);
  else if (d.length > 160) longD.push({ f, len: d.length });
  if (!c.includes('"FAQPage"')) noFaq.push(f);
  const h1 = c.match(/<h1[^>]*>/g) || [];
  if (h1.length === 0) noH1.push({ f, count: h1.length });
  else if (h1.length > 1) dupH1.push({ f, count: h1.length });
  const text = c.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  const wc = text.split(' ').filter(Boolean).length;
  if (wc < 500) thin.push({ f, words: wc });
});

function typeCount(arr, fn) {
  const m = {};
  arr.forEach(x => {
    const k = fn(x);
    m[k] = (m[k] || 0) + 1;
  });
  return m;
}

console.log('=== SUMMARY ===');
console.log('Total pages:', files.length);
console.log('Thin (<500 words):', thin.length, JSON.stringify(typeCount(thin, x => x.f.split(/[\\/]/).pop())));
console.log('Missing FAQPage schema:', noFaq.length, JSON.stringify(typeCount(noFaq, x => x.split(/[\\/]/).pop())));
console.log('Long titles (>70):', longT.length, JSON.stringify(typeCount(longT, x => x.f.split(/[\\/]/).pop())));
console.log('Long desc (>160):', longD.length, JSON.stringify(typeCount(longD, x => x.f.split(/[\\/]/).pop())));
console.log('Missing desc:', missingDesc.length);
console.log('No H1:', noH1.length, 'Dup H1:', dupH1.length);

function dump(list, file) {
  const txt = list.map(x => typeof x === 'string' ? x : x.f + (x.len ? ' (' + x.len + ')' : x.words ? ' (' + x.words + ' words)' : '')).join('\n');
  fs.writeFileSync(file, txt);
  console.log('Wrote', file, '-', list.length, 'entries');
}

dump(thin, 'diag-thin.txt');
dump(noFaq, 'diag-nofaq.txt');
dump(longT, 'diag-longtitle.txt');
dump(longD, 'diag-longdesc.txt');
dump(missingDesc, 'diag-missingdesc.txt');

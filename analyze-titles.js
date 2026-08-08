const fs = require('fs');
const l = fs.readFileSync('diag-longtitle.txt', 'utf8').trim().split(/\r?\n/).map(x => x.replace(/\s+\(\d+\)$/, ''));
const seen = new Set();
const out = [];
for (const f of l) {
  const t = (fs.readFileSync(f, 'utf8').match(/<title>(.*?)<\/title>/s) || [])[1] || '';
  const norm = t.replace(/[a-z0-9]+/gi, 'X');
  const k = norm + '||' + t.length;
  if (!seen.has(k)) {
    seen.add(k);
    out.push('[' + t.length + '] ' + t.replace(/(McCluskieganj|Chakradharpur|Bhubaneswar|Hazaribagh|Hussainabad|Daltonganj|Adityapur|Saraikela|Ghatshila)/g, 'CITY').replace(/Rohit Travels/g, 'RT'));
  }
}
fs.writeFileSync('diag-title-patterns.txt', out.join('\n'));
console.log('Unique patterns:', out.length);
console.log(out.slice(0, 30).join('\n'));

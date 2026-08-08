const fs = require('fs');
const crypto = require('crypto');
const files = ['cities/adityapur/airport-taxi.html', 'routes/adityapur-to-saraikela-cab.html', 'cities/index.html', 'routes/ranchi-to-hazaribag-cab.html'];
const blocks = files.map(f => ({
  f,
  hash: crypto.createHash('md5').update(fs.readFileSync(f, 'utf8').match(/<style>([\s\S]*?)<\/style>/)[1]).digest('hex').slice(0, 8),
  len: fs.readFileSync(f, 'utf8').match(/<style>([\s\S]*?)<\/style>/)[1].length
}));
console.log(blocks);

const base = fs.readFileSync('cities/adityapur/airport-taxi.html', 'utf8').match(/<style>([\s\S]*?)<\/style>/)[1];
const r = fs.readFileSync('routes/adityapur-to-saraikela-cab.html', 'utf8').match(/<style>([\s\S]*?)<\/style>/)[1];
const hub = fs.readFileSync('cities/index.html', 'utf8').match(/<style>([\s\S]*?)<\/style>/)[1];

// diff base vs route variant
let i = 0;
for (; i < Math.min(base.length, r.length); i++) if (base[i] !== r[i]) break;
console.log('base vs route variant first diff at', i);
console.log('base:', base.slice(i - 100, i + 120));
console.log('route:', r.slice(i - 100, i + 120));

let j = 0;
for (; j < Math.min(base.length, hub.length); j++) if (base[j] !== hub[j]) break;
console.log('\nbase vs hub first diff at', j);
console.log('hub:', hub.slice(j - 100, j + 120));

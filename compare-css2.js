const fs = require('fs');

function firstBlock(f) {
  const c = fs.readFileSync(f, 'utf8');
  const m = c.match(/<style>([\s\S]*?)<\/style>/);
  return m ? m[1] : '';
}

const norm = s => s.replace(/\s+/g, ' ').trim();

const base = firstBlock('cities/adityapur/airport-taxi.html'); // 6946 minified
const route = firstBlock('routes/adityapur-to-saraikela-cab.html'); // 11530 expanded
const rrh = firstBlock('routes/ranchi-to-hazaribag-cab.html'); // 5750
const hub = firstBlock('cities/index.html'); // 2111

console.log('base == route (normalized):', norm(base) === norm(route));
console.log('base == rrh (normalized):', norm(base) === norm(rrh));
console.log('base == hub (normalized):', norm(base) === norm(hub));

if (norm(base) !== norm(route)) {
  // find first diff
  const a = norm(base), b = norm(route);
  let i = 0; while (i < Math.min(a.length, b.length) && a[i] === b[i]) i++;
  console.log('route diff at', i, 'base:', JSON.stringify(a.slice(i - 60, i + 60)), 'route:', JSON.stringify(b.slice(i - 60, i + 60)));
}
if (norm(base) !== norm(rrh)) {
  const a = norm(base), b = norm(rrh);
  let i = 0; while (i < Math.min(a.length, b.length) && a[i] === b[i]) i++;
  console.log('rrh diff at', i, 'base:', JSON.stringify(a.slice(i - 60, i + 60)), 'rrh:', JSON.stringify(b.slice(i - 60, i + 60)));
}

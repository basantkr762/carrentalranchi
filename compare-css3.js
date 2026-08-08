const fs = require('fs');

function firstBlock(f) {
  const c = fs.readFileSync(f, 'utf8');
  const m = c.match(/<style>([\s\S]*?)<\/style>/);
  return m ? m[1] : '';
}

const strip = s => s.replace(/\s+/g, '');

const base = firstBlock('cities/adityapur/airport-taxi.html');
const route = firstBlock('routes/adityapur-to-saraikela-cab.html');
const rrh = firstBlock('routes/ranchi-to-hazaribag-cab.html');
const hub = firstBlock('cities/index.html');

console.log('base == route (all ws stripped):', strip(base) === strip(route));
console.log('base == rrh (all ws stripped):', strip(base) === strip(rrh));
console.log('base == hub (all ws stripped):', strip(base) === strip(hub));

if (strip(base) !== strip(route)) {
  const a = strip(base), b = strip(route);
  let i = 0; while (i < Math.min(a.length, b.length) && a[i] === b[i]) i++;
  console.log('route diff at', i, 'base:', JSON.stringify(a.slice(i - 80, i + 80)), '\nroute:', JSON.stringify(b.slice(i - 80, i + 80)));
}
if (strip(base) !== strip(rrh)) {
  const a = strip(base), b = strip(rrh);
  let i = 0; while (i < Math.min(a.length, b.length) && a[i] === b[i]) i++;
  console.log('rrh diff at', i, 'base:', JSON.stringify(a.slice(i - 80, i + 80)), '\nrrh:', JSON.stringify(b.slice(i - 80, i + 80)));
}

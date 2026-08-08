const fs = require('fs');
const crypto = require('crypto');

function firstBlock(f) {
  const c = fs.readFileSync(f, 'utf8');
  const m = c.match(/<style>([\s\S]*?)<\/style>/);
  return m ? m[1] : '';
}

const base = firstBlock('cities/adityapur/airport-taxi.html');
const route = firstBlock('routes/adityapur-to-saraikela-cab.html');
const hub = firstBlock('cities/index.html');
const rrh = firstBlock('routes/ranchi-to-hazaribag-cab.html');

console.log('base len', base.length, 'first 80:', JSON.stringify(base.slice(0, 80)));
console.log('route len', route.length, 'first 80:', JSON.stringify(route.slice(0, 80)));
console.log('hub len', hub.length, 'first 80:', JSON.stringify(hub.slice(0, 80)));
console.log('rrh len', rrh.length, 'first 80:', JSON.stringify(rrh.slice(0, 80)));

// Check if route block STARTS with base block
console.log('route starts with base:', route.startsWith(base));
console.log('rrh starts with base:', rrh.startsWith(base));
console.log('hub starts with base:', hub.startsWith(base));

// route block contains base?
console.log('route contains base:', route.includes(base));
console.log('rrh contains base:', rrh.includes(base));

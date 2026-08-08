const fs = require('fs');

function firstBlock(f) {
  const c = fs.readFileSync(f, 'utf8');
  const m = c.match(/<style>([\s\S]*?)<\/style>/);
  return m ? m[1] : '';
}

const base = firstBlock('cities/adityapur/airport-taxi.html');
const route = firstBlock('routes/adityapur-to-saraikela-cab.html');
const hub = firstBlock('cities/index.html');
const rrh = firstBlock('routes/ranchi-to-hazaribag-cab.html');

function selectors(css) {
  const re = /([^{}@]+)\{/g;
  const set = new Set();
  let m;
  while ((m = re.exec(css)) !== null) {
    set.add(m[1].trim());
  }
  return set;
}

const sBase = selectors(base);
const sRoute = selectors(route);
const sHub = selectors(hub);
const sRRH = selectors(rrh);

console.log('base selectors:', sBase.size);
console.log('route selectors:', sRoute.size);
console.log('hub selectors:', sHub.size);
console.log('rrh selectors:', sRRH.size);

const routeExtra = [...sRoute].filter(s => !sBase.has(s));
const baseExtra = [...sBase].filter(s => !sRoute.has(s));
console.log('\nIn route but NOT in base (' + routeExtra.length + '):');
console.log(routeExtra.join('\n'));
console.log('\nIn base but NOT in route (' + baseExtra.length + '):');
console.log(baseExtra.join('\n'));

const hubExtra = [...sHub].filter(s => !sBase.has(s));
console.log('\nIn hub but NOT in base (' + hubExtra.length + '):');
console.log(hubExtra.join('\n'));

const rrhExtra = [...sRRH].filter(s => !sBase.has(s));
console.log('\nIn rrh but NOT in base (' + rrhExtra.length + '):');
console.log(rrhExtra.join('\n'));

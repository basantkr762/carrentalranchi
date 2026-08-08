const fs = require('fs');
let h = fs.readFileSync('index.html', 'utf8');

// Check current title
const tm = h.match(/<title>(.*?)<\/title>/);
console.log('CURRENT TITLE:', tm ? tm[1] : 'not found');

// Check og:locale
const olIdx = h.indexOf('og:locale');
console.log('\nog:locale context:');
console.log(h.substring(olIdx - 5, olIdx + 120));

// Check description
const descIdx = h.indexOf('name="description"');
console.log('\ndescription context:');
console.log(h.substring(descIdx, descIdx + 200));

// Check route page for GMB
const rh = fs.readFileSync('routes/ranchi-to-jamshedpur-cab.html', 'utf8');
const gi = rh.indexOf('g.page');
console.log('\nRoute GMB (g.page):', gi > -1 ? rh.substring(gi - 10, gi + 60) : 'NOT FOUND');
const hi = rh.indexOf('hasMap');
console.log('Route hasMap:', hi > -1 ? rh.substring(hi, hi + 80) : 'NOT FOUND');
const sameAsIdx = rh.indexOf('goo.gl');
console.log('Route goo.gl:', sameAsIdx > -1 ? rh.substring(sameAsIdx - 10, sameAsIdx + 60) : 'NOT FOUND');

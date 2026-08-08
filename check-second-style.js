const fs = require('fs');
const crypto = require('crypto');

const files = ['cities/adityapur/airport-taxi.html', 'cities/gola/popular-routes.html', 'routes/gola-to-ranchi-cab.html', 'routes/adityapur-to-saraikela-cab.html', 'cities/ranchi/tour-packages.html'];
for (const f of files) {
  const c = fs.readFileSync(f, 'utf8');
  const blocks = c.match(/<style>([\s\S]*?)<\/style>/g) || [];
  console.log('=== ' + f + ' === ' + blocks.length + ' blocks');
  blocks.forEach((b, i) => {
    const inner = b.replace(/^<style>/, '').replace(/<\/style>$/, '');
    console.log('  block ' + i + ': len=' + inner.length + ' hash=' + crypto.createHash('md5').update(inner).digest('hex').slice(0, 8));
    if (inner.length < 800) console.log('    content: ' + JSON.stringify(inner.slice(0, 250)));
  });
}

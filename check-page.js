const fs = require('fs');

// Check a thin content page
const file = 'cities/bagodar/popular-routes.html';
const c = fs.readFileSync(file, 'utf-8');

// Word count
const t = c.replace(/<script[\s\S]*?<\/script>/g, '')
  .replace(/<style[\s\S]*?<\/style>/g, '')
  .replace(/<[^>]+>/g, ' ')
  .replace(/\s+/g, ' ');
console.log('File:', file);
console.log('Words:', t.split(' ').filter(w => w.length > 2).length);

// Title
const m = c.match(/<title>(.*?)<\/title>/);
if (m) { console.log('Title:', m[1]); console.log('Title len:', m[1].length); }

// Meta desc
const d = c.match(/name="description"\s+content="(.*?)"/);
if (d) console.log('Desc len:', d[1].length);
else console.log('MISSING meta description');

// Schema
if (c.includes('"FAQPage"')) console.log('Has FAQPage schema: YES');
else console.log('Has FAQPage schema: NO');

// Check how many route links
const routeLinks = (c.match(/route-link/g) || []).length;
console.log('Route link cards:', routeLinks);

console.log('\n--- Checking FAQPage schema across subpage types ---');

const subpages = ['local-cab', 'outstation-cab', 'airport-taxi', 'wedding-car', 'popular-routes', 'tour-packages'];
subpages.forEach(sp => {
  const f = 'cities/ranchi/' + sp + '.html';
  const content = fs.readFileSync(f, 'utf-8');
  const hasFaq = content.includes('"FAQPage"');
  const words = content.replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<style[\s\S]*?<\/style>/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .split(' ').filter(w => w.length > 2).length;
  console.log(`  ${sp}: FAQSchema=${hasFaq ? 'YES' : 'NO'}, Words=${words}`);
});

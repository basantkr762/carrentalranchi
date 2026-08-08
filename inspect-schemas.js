const fs = require('fs');

function inspect(f) {
  const c = fs.readFileSync(f, 'utf8');
  const m = c.match(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g) || [];
  console.log('===', f, '===');
  console.log('Schema blocks:', m.length);
  m.forEach((s, i) => {
    const t = (s.match(/"@type": "([^"]+)/) || [])[1];
    const name = (s.match(/"name": "([^"]+)/) || [])[1];
    console.log('  ' + i + ': ' + t + (name ? ' | ' + name.slice(0, 60) : ''));
  });
  console.log('FAQ html section:', /faq-section/.test(c), '| FAQPage schema:', /"FAQPage"/.test(c));
}

['cities/adityapur/index.html', 'cities/gola/popular-routes.html', 'cities/gola/tour-packages.html'].forEach(inspect);

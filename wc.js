const fs = require('fs');
function wc(f) {
  let c = fs.readFileSync(f, 'utf8');
  const text = c.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return text.split(' ').filter(Boolean).length;
}
const files = [
  'cities/adityapur/airport-taxi.html',
  'cities/adityapur/popular-routes.html',
  'cities/adityapur/tour-packages.html',
  'cities/asansol/airport-taxi.html',
  'cities/asansol/tour-packages.html',
  'cities/gola/popular-routes.html',
  'cities/jhalda/popular-routes.html',
  'cities/ranchi/popular-routes.html'
];
files.forEach(f => console.log(wc(f), f));

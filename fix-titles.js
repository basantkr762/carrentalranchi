const fs = require('fs');
const path = require('path');

function walk(d) {
  let r = [];
  for (const i of fs.readdirSync(d, { withFileTypes: true })) {
    const f = path.join(d, i.name);
    if (i.isDirectory()) r = r.concat(walk(f));
    else if (i.name.endsWith('.html')) r.push(f);
  }
  return r;
}

const files = [...walk('cities'), ...walk('routes')];
let fixed = 0, changed = 0;

function shortenTitle(title) {
  let t = title.trim();

  // Route pages: "A to B Cab @₹11/km | Taxi Fare, Booking | Rohit Travels"
  t = t.replace(/^(.*? Cab) @₹11\/km \| Taxi Fare, Booking \| Rohit Travels$/, '$1 | ₹11/km Taxi | Rohit Travels');

  // City index: "Cab Service in X | Taxi Service X @₹11/km | Rohit Travels"
  t = t.replace(/^Cab Service in (.+?) \| Taxi Service .+? @₹11\/km \| Rohit Travels$/, 'Cab Service in $1 @₹11/km | Rohit Travels');

  // Local: "Local Cab Service in X | Hourly Taxi Hire @₹11/km | Rohit Travels"
  t = t.replace(/^Local Cab Service in (.+?) \| Hourly Taxi Hire @₹11\/km \| Rohit Travels$/, 'Local Cab Service in $1 @₹11/km | Rohit Travels');

  // Outstation: "Outstation Cab from X | One-Way & Round Trip @₹11/km | Rohit Travels"
  t = t.replace(/^Outstation Cab from (.+?) \| One-Way & Round Trip @₹11\/km \| Rohit Travels$/, 'Outstation Cab from $1 @₹11/km | Rohit Travels');

  // Popular routes: "Popular Cab Routes from X | Outstation Taxi Fares | Rohit Travels"
  t = t.replace(/^Popular Cab Routes from (.+?) \| Outstation Taxi Fares \| Rohit Travels$/, 'Popular Cab Routes from $1 | Rohit Travels');

  // Tour packages: "Tour Packages X | Sightseeing Cab | Places to Visit | Rohit Travels"
  t = t.replace(/^Tour Packages (.+?) \| Sightseeing Cab \| Places to Visit \| Rohit Travels$/, 'Tour Packages in $1 | Sightseeing Cab | Rohit Travels');

  // Wedding: "Wedding Car Rental X | Marriage Car Booking | Luxury Cars | Rohit Travels"
  t = t.replace(/^Wedding Car Rental (.+?) \| Marriage Car Booking \| Luxury Cars \| Rohit Travels$/, 'Wedding Car Rental in $1 | Luxury Cars | Rohit Travels');

  // Airport: "Airport Taxi X | {Airport} Cab @₹11/km | Rohit Travels"
  t = t.replace(/^Airport Taxi (.+?) \| .*? Cab @₹11\/km \| Rohit Travels$/, 'Airport Taxi in $1 @₹11/km | Rohit Travels');

  // Airport fallback (different wording)
  t = t.replace(/^Airport Taxi (.+?) \| .*? Airport.*$/, 'Airport Taxi in $1 | Rohit Travels');

  // Routes directory hub
  t = t.replace(/^All Outstation Cab Routes Directory \([^)]*\) \| Rohit Travels Ranchi$/, 'All Outstation Cab Routes | Rohit Travels Ranchi');

  // Cities directory hub
  t = t.replace(/^All City Taxi Service Directory \([^)]*\) \| Rohit Travels Ranchi$/, 'All City Taxi Service Directory | Rohit Travels Ranchi');

  return t;
}

function rewriteInHtml(html, oldT, newT) {
  if (oldT === newT) return html;
  // <title>, og:title, twitter:title, WebPage schema "name"
  let out = html.split(oldT).join(newT);
  // Also fix WebPage schema name if it used different quoting (JSON escaped)
  return out;
}

for (const f of files) {
  let html = fs.readFileSync(f, 'utf8');
  const titleMatch = html.match(/<title>(.*?)<\/title>/s);
  if (!titleMatch) continue;
  const oldT = titleMatch[1].trim();
  const newT = shortenTitle(oldT);
  if (newT.length > 65) {
    console.log('STILL LONG [' + newT.length + ']: ' + f + ' => ' + newT);
    fixed++;
    continue;
  }
  if (newT === oldT) continue;
  const out = rewriteInHtml(html, oldT, newT);
  if (out !== html) {
    fs.writeFileSync(f, out);
    changed++;
  }
}

console.log('Total files scanned: ' + files.length);
console.log('Titles changed: ' + changed);
console.log('Still long after rewrite: ' + fixed);

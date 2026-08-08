const fs = require('fs');
const path = require('path');
const cities = require('./data/cities');

let fixed = 0, skipped = 0;

function trimDesc(desc, city) {
  let d = desc.trim();
  const callIdx = d.indexOf('Call +91');
  const prefix = callIdx > -1 ? d.slice(0, callIdx) : d;
  const suffix = callIdx > -1 ? d.slice(callIdx) : '';
  let body = prefix.trim().replace(/\s+/g, ' ');
  // Remove "& more." already present
  body = body.replace(/ ?& more\.?$/i, '');
  body = body.replace(/\.+$/, '');
  // Keep dropping "landmark," segments until fits, keeping at least 2 landmarks
  while ((body + ' & more. ' + suffix).length > 155 && body.includes(',')) {
    body = body.replace(/,\s*[^,]*$/, '').trim();
  }
  const out = (body + ' & more. ' + suffix).trim();
  return out;
}

cities.forEach(city => {
  const f = path.join('cities', city.slug, 'tour-packages.html');
  if (!fs.existsSync(f)) { skipped++; return; }
  let html = fs.readFileSync(f, 'utf8');
  const re = /(<meta name="description" content=")(.*?)(">)/s;
  const m = html.match(re);
  if (!m) { skipped++; return; }
  const newDesc = trimDesc(m[2], city);
  if (newDesc === m[2].trim() || m[2].length <= 160 && m[2].includes('& more.')) { skipped++; return; }
  html = html.replace(re, `$1${newDesc}$3`);
  // Also update og:description and twitter:description
  html = html.replace(/(<meta property="og:description" content=")(.*?)(">)/s, `$1${newDesc}$3`);
  html = html.replace(/(<meta name="twitter:description" content=")(.*?)(">)/s, `$1${newDesc}$3`);
  // WebPage schema description
  html = html.replace(/(<script type="application\/ld\+json">[\s\S]*?"@type": "WebPage"[\s\S]*?"description": ")(.*?)(",)/, `$1${newDesc}$3`);
  fs.writeFileSync(f, html);
  fixed++;
});

console.log('Descriptions trimmed:', fixed, '| skipped:', skipped);

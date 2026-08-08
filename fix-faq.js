const fs = require('fs');
const path = require('path');
const cities = require('./data/cities');
const { generateRoutes } = require('./data/routes');

const cityMap = {};
cities.forEach(c => { cityMap[c.slug] = c; });
const allRoutes = generateRoutes();
const cityRoutesFor = {};
allRoutes.forEach(r => {
  if (cityMap[r.toSlug]) {
    (cityRoutesFor[r.fromSlug] = cityRoutesFor[r.fromSlug] || []).push(r);
  }
});

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function stripTags(s) {
  return s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\s+/g, ' ').trim();
}

function getFAQItem(q, a, active) {
  return `                <div class="faq-item${active ? ' active' : ''}">
                    <div class="faq-q">${q} <i class="fas fa-chevron-down"></i></div>
                    <div class="faq-a">${a}</div>
                </div>`;
}

function faqSection(h2, items) {
  return `    <section class="route-section"><div class="container">
        <h2>${h2}</h2>
        <div class="faq-section">
${items.join('\n')}
        </div>
    </div></section>`;
}

// ===== 1. CITY INDEX PAGES: parse existing FAQ HTML -> FAQPage schema =====
function buildFAQSchemaFromHTML(html) {
  const items = [];
  const re = /<div class="faq-item[^"]*">\s*<div class="faq-q">([\s\S]*?)<i class="fas fa-chevron-down"><\/i><\/div>\s*<div class="faq-a">([\s\S]*?)<\/div>\s*<\/div>/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    const q = stripTags(m[1]).trim();
    const a = stripTags(m[2]).trim();
    if (q && a) items.push({ q, a });
  }
  return items;
}

function faqJSONLD(items) {
  const mainEntity = items.map(it => ({
    "@type": "Question",
    "name": it.q,
    "acceptedAnswer": { "@type": "Answer", "text": it.a }
  }));
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": mainEntity
  };
}

function injectFAQSchema(html, items) {
  if (!items.length) return html;
  const schema = faqJSONLD(items);
  const block = `\n    <!-- FAQPage Schema -->\n    <script type="application/ld+json">\n    ${JSON.stringify(schema, null, 2)}\n    </script>\n`;
  return html.replace('</head>', block + '</head>');
}

function injectFAQSection(html, section) {
  if (!html.includes('</main>')) return html;
  return html.replace('</main>', section + '\n    </main>');
}

let log = [];
function report(msg) { console.log(msg); log.push(msg); }

// ============ PASS 1: City index pages -> FAQPage schema ============
let idx = 0, idxSkipped = 0;
cities.forEach(city => {
  const f = path.join('cities', city.slug, 'index.html');
  const html = fs.readFileSync(f, 'utf8');
  const items = buildFAQSchemaFromHTML(html);
  if (!items.length) { idxSkipped++; return; }
  let out = injectFAQSchema(html, items);
  fs.writeFileSync(f, out);
  idx++;
});
report(`PASS 1: FAQPage schema added to ${idx} city index pages (${idxSkipped} skipped/no FAQ found)`);

// ============ PASS 2: popular-routes pages -> FAQ content + schema ============
let pr = 0;
cities.forEach(city => {
  const f = path.join('cities', city.slug, 'popular-routes.html');
  let html = fs.readFileSync(f, 'utf8');
  if (html.includes('"FAQPage"')) { pr++; return; }
  const n = city.name;
  const routes = (cityRoutesFor[city.slug] || []).slice(0, 6);
  const top = routes[0];
  const topNames = routes.map(r => r.toName).slice(0, 4).join(', ');
  const fareLine = top ? `Sedan one-way fares start at ₹${top.sedanOW} for ${n} to ${top.toName}, ₹${top.suvOW} for SUV.` : `All routes start at ₹11/km.`;

  const items = [
    getFAQItem(`Which are the most popular cab routes from ${n}?`, `Top outstation routes from ${n} include ${topNames || 'all major Jharkhand cities'}. ${fareLine} All fares include driver allowance and fuel. Book at ₹11/km with Rohit Travels.`, true),
    getFAQItem(`What is the taxi fare from ${n} to nearby cities?`, `${fareLine} Round-trip rates are roughly 1.8x the one-way fare and include driver stay. Crysta pricing adds ~30% to SUV fares. Call +91-7903629240 for exact quotes.`),
    getFAQItem(`How do I book an outstation cab from ${n}?`, `Call +91-7903629240 or WhatsApp with your destination, travel date, pickup time and passenger count. Get instant confirmation with driver details. One-way and round-trip both available 24/7.`),
    getFAQItem(`Is one-way cab available from ${n}?`, `Yes! One-way drop service from ${n} to all destinations — you pay only for the distance travelled with no return charges. Ideal for airport drops, relocations and one-time trips.`),
    getFAQItem(`Which cars are available for outstation travel from ${n}?`, `Sedan (Dzire/Aura, 4-seater), SUV (Ertiga, 7-seater) and Innova Crysta (premium 7-seater). All cars are AC, GPS-enabled and driven by experienced highway drivers.`),
    getFAQItem(`Are toll and night charges extra on ${n} routes?`, `Yes, toll taxes and parking are paid extra as per actuals. Night charges of ₹200 apply for travel between 10 PM and 6 AM. All other fares are all-inclusive with no hidden costs.`)
  ];
  const section = faqSection(`❓ FAQs – Outstation Cab Routes from ${n}`, items);
  let out = injectFAQSection(html, section);
  const qa = items.map(it => {
    const q = it.match(/<div class="faq-q">([\s\S]*?) <i class="fas fa-chevron-down"><\/i><\/div>/)[1];
    const a = it.match(/<div class="faq-a">([\s\S]*?)<\/div>/)[1];
    return { q: stripTags(q), a: stripTags(a) };
  });
  out = injectFAQSchema(out, qa);
  fs.writeFileSync(f, out);
  pr++;
});
report(`PASS 2: FAQ content + schema added to ${pr} popular-routes pages`);

// ============ PASS 3: tour-packages pages -> FAQ content + schema ============
let tp = 0;
cities.forEach(city => {
  const f = path.join('cities', city.slug, 'tour-packages.html');
  let html = fs.readFileSync(f, 'utf8');
  if (html.includes('"FAQPage"')) { tp++; return; }
  const n = city.name;
  const lms = city.landmarks.slice(0, 3).join(', ');
  const items = [
    getFAQItem(`What are the best tour packages in ${n}?`, `We offer half-day (4hr/40km from ₹1,200), full-day (8hr/80km from ₹2,000), extended (12hr/120km from ₹3,000) and 2-day tour packages starting ₹5,500. All include a driver-cum-guide, fuel and AC.`, true),
    getFAQItem(`How much does a sightseeing cab in ${n} cost?`, `Sightseeing cab in ${n} starts at ₹11/km. Sedan: ₹1,200 (4hr/40km), SUV: ₹1,600, Crysta: ₹2,000. Full-day sedan: ₹2,000 (8hr/80km). No surge pricing, transparent rates.`),
    getFAQItem(`Which places can I visit on a ${n} tour?`, `Popular attractions include ${lms}. ${city.localAttractions ? 'You can also explore ' + city.localAttractions + ' with our local drivers. ' : ''}Custom itineraries are welcome — tell us your preferred spots.`),
    getFAQItem(`Can I customize my tour itinerary in ${n}?`, `Absolutely! Our tour packages are fully customizable. Add or skip attractions, choose start time, and travel at your own pace. Your driver will help plan the best route and timing.`),
    getFAQItem(`How do I book a tour package in ${n}?`, `Call +91-7903629240 or WhatsApp with your preferred date, duration and places to visit. We confirm instantly with driver details. Customized packages available for families, groups and pilgrims.`),
    getFAQItem(`What is the best time for sightseeing in ${n}?`, `October to March offers the most pleasant weather for touring ${n}. Start early morning to cover maximum spots comfortably. November to February is ideal for outdoor visits.`)
  ];
  const section = faqSection(`❓ FAQs – Tour & Sightseeing in ${n}`, items);
  let out = injectFAQSection(html, section);
  const qa = items.map(it => {
    const q = it.match(/<div class="faq-q">([\s\S]*?) <i class="fas fa-chevron-down"><\/i><\/div>/)[1];
    const a = it.match(/<div class="faq-a">([\s\S]*?)<\/div>/)[1];
    return { q: stripTags(q), a: stripTags(a) };
  });
  out = injectFAQSchema(out, qa);
  fs.writeFileSync(f, out);
  tp++;
});
report(`PASS 3: FAQ content + schema added to ${tp} tour-packages pages`);

// ============ PASS 4: cities/index.html + routes/index.html ============
const hubFAQ = [
  getFAQItem('How many cities does Rohit Travels serve?', 'Rohit Travels serves 63+ cities across Jharkhand, Bihar, West Bengal, Odisha and Uttar Pradesh with local, outstation, airport and wedding cab services at ₹11/km.', true),
  getFAQItem('Which cities have cab services?', 'We cover Ranchi, Jamshedpur, Dhanbad, Bokaro, Hazaribagh, Deoghar, Giridih, Dumka, Asansol, Kolkata, Patna, Bhubaneswar and 50+ more cities. Every city has 7 dedicated pages: local cab, outstation, airport taxi, wedding car, popular routes and tour packages.'),
  getFAQItem('How to book a cab in any of these cities?', 'Simply call +91-7903629240 or WhatsApp. Share your city, pickup location, destination and time. We confirm instantly with driver details, 24/7 across all cities.'),
  getFAQItem('What is the per km rate for outstation cabs?', 'Outstation cab rate is ₹11/km for sedan and SUV, ₹13/km for Innova Crysta. Driver allowance and fuel are included. Toll, parking and night charges are extra.')
];
const hubSection = faqSection('❓ FAQs – Cab Service Cities & Routes', hubFAQ);
const hubQA = hubFAQ.map(it => {
  const q = it.match(/<div class="faq-q">([\s\S]*?) <i class="fas fa-chevron-down"><\/i><\/div>/)[1];
  const a = it.match(/<div class="faq-a">([\s\S]*?)<\/div>/)[1];
  return { q: stripTags(q), a: stripTags(a) };
});

['cities/index.html', 'routes/index.html'].forEach(f => {
  let html = fs.readFileSync(f, 'utf8');
  if (!html.includes('"FAQPage"')) {
    html = injectFAQSchema(html, hubQA);
    fs.writeFileSync(f, html);
    report(`PASS 4: FAQ schema added to ${f}`);
  } else {
    report(`PASS 4: ${f} already has FAQPage schema`);
  }
});

fs.writeFileSync('fix-faq.log', log.join('\n'), 'utf8');
console.log('DONE');

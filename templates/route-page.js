// ============================================
// ROUTE PAGE TEMPLATE
// City-to-City cab pages with 1200+ words
// ============================================

const { getHead, getHeader, getFooter, getFAQItem, getVehicleCards, getCTABanner } = require('./components');

function generateRoutePage(route, fromCity, toCity, allRoutes, allCities) {
  const from = fromCity.name, to = toCity.name;
  const reverseSlug = `${route.toSlug}-to-${route.fromSlug}-cab`;
  const title = `${from} to ${to} Cab @₹11/km | Taxi Fare, Booking | Rohit Travels`;
  const metaDesc = `Book ${from} to ${to} cab at ₹11/km. Distance ${route.dist}, Time ${route.time}. Sedan ₹${route.sedanOW}, SUV ₹${route.suvOW}. One-way & round trip. Call +91-7903629240`;
  const keywords = `${from.toLowerCase()} to ${to.toLowerCase()} cab, ${from.toLowerCase()} to ${to.toLowerCase()} taxi, ${from.toLowerCase()} to ${to.toLowerCase()} taxi fare, ${from.toLowerCase()} to ${to.toLowerCase()} car rental, cab from ${from.toLowerCase()} to ${to.toLowerCase()}, one way taxi ${from.toLowerCase()} ${to.toLowerCase()}, outstation cab ${from.toLowerCase()}, ${to.toLowerCase()} to ${from.toLowerCase()} cab`;
  const canonical = `https://rohittravels.com/routes/${route.slug}.html`;
  
  const bc = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://rohittravels.com/"},{"@type":"ListItem","position":2,"name":"Routes","item":"https://rohittravels.com/#routes"},{"@type":"ListItem","position":3,"name":`${from} to ${to} Cab`,"item":canonical}]};
  
  const taxiSchema = {"@context":"https://schema.org","@type":"TaxiService","name":`Rohit Travels - ${from} to ${to} Cab Service`,"description":`${from} to ${to} taxi service at ₹11/km. Distance: ${route.dist}. Book sedan, SUV or Innova Crysta for one-way or round trip.`,"url":canonical,"telephone":"+91-7903629240","provider":{"@type":"LocalBusiness","name":"Rohit Travels Ranchi","telephone":"+91-7903629240","address":{"@type":"PostalAddress","streetAddress":"Birsa chowk, road no a2, Hawai Nagar, Gitilpiri","addressLocality":"Ranchi","addressRegion":"Jharkhand","postalCode":"834003","addressCountry":"IN"},"priceRange":"₹₹","image":"https://rohittravels.com/images/rohittravelslogo_desktop.webp"},"areaServed":[{"@type":"City","name":from},{"@type":"City","name":to}],"offers":{"@type":"AggregateOffer","priceCurrency":"INR","lowPrice":route.sedanOW.replace(/,/g,''),"highPrice":route.crystaRT.replace(/,/g,''),"offerCount":"6"}};
  
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[
    {"@type":"Question","name":`What is the taxi fare from ${from} to ${to}?`,"acceptedAnswer":{"@type":"Answer","text":`The taxi fare from ${from} to ${to} starts at ₹${route.sedanOW} for sedan (one-way). SUV costs ₹${route.suvOW} and Innova Crysta costs ₹${route.crystaOW}. Round trip: Sedan ₹${route.sedanRT}, SUV ₹${route.suvRT}, Crysta ₹${route.crystaRT}. Fare includes driver allowance and fuel.`}},
    {"@type":"Question","name":`What is the distance from ${from} to ${to} by cab?`,"acceptedAnswer":{"@type":"Answer","text":`The distance from ${from} to ${to} by road is approximately ${route.dist}. Travel time is ${route.time} depending on traffic and road conditions.`}},
    {"@type":"Question","name":`How to book a cab from ${from} to ${to}?`,"acceptedAnswer":{"@type":"Answer","text":`Book by calling +91-7903629240 or WhatsApp. Share travel date, pickup time, passengers. Instant confirmation with driver details. No advance for most bookings.`}},
    {"@type":"Question","name":`Is one-way cab available from ${from} to ${to}?`,"acceptedAnswer":{"@type":"Answer","text":`Yes! One-way drop from ${from} to ${to} starting ₹${route.sedanOW} (sedan). No return charges. Pay only for one direction.`}},
    {"@type":"Question","name":`Which cars are available for ${from} to ${to}?`,"acceptedAnswer":{"@type":"Answer","text":`Sedan (Dzire/Aura, 4-seater), SUV (Ertiga, 7-seater), Innova Crysta (Premium, 7-seater), and luxury cars (Audi/BMW) for special occasions.`}},
    {"@type":"Question","name":`Is ${to} to ${from} cab also available?`,"acceptedAnswer":{"@type":"Answer","text":`Yes! We provide bi-directional service. ${to} to ${from} cab is available at the same rates. Book one-way or round-trip.`}},
    {"@type":"Question","name":`What is the per km rate from ${from} to ${to}?`,"acceptedAnswer":{"@type":"Answer","text":`Per km rate: Sedan ₹11/km, SUV (Ertiga) ₹11/km, Innova Crysta ₹13/km. These are all-inclusive rates with driver allowance.`}},
    {"@type":"Question","name":`Can I make stops during ${from} to ${to} trip?`,"acceptedAnswer":{"@type":"Answer","text":`Yes, you can make stops along the route. Popular stops include ${route.highlights}. Extra charges may apply for significant detours.`}}
  ]};

  // Get related routes
  const relatedRoutes = allRoutes.filter(r => r.slug !== route.slug && (r.fromSlug === route.fromSlug || r.toSlug === route.toSlug)).slice(0,6);

  // Build unique SEO paragraphs
  const fromDesc = fromCity.description || `${from} is a major city in ${fromCity.district} district of Jharkhand.`;
  const toDesc = toCity.description || `${to} is located in ${toCity.district} district.`;
  const fromLandmarks = fromCity.landmarks ? fromCity.landmarks.slice(0,4).join(', ') : from;
  const toLandmarks = toCity.landmarks ? toCity.landmarks.slice(0,4).join(', ') : to;

  const head = getHead({title,metaDesc,keywords,canonical,breadcrumbSchema:bc,extraSchema:taxiSchema});

  return `${head}

    <!-- FAQ Schema -->
    <script type="application/ld+json">
    ${JSON.stringify(faqSchema, null, 2)}
    </script>

${getHeader()}

    <div class="container">
        <div class="breadcrumb">
            <a href="/">Home</a> <span>›</span> <a href="/#routes">Routes</a> <span>›</span> <strong>${from} to ${to} Cab</strong>
        </div>
    </div>

    <section class="route-hero">
        <div class="container">
            <h1>${from} to ${to} Cab Booking – Taxi Service @₹11/km</h1>
            <p style="font-size:17px;opacity:.95;max-width:700px;margin:0 auto 20px">Book affordable & reliable ${from} to ${to} cab with Rohit Travels. Professional drivers, clean cars, 24/7 booking.</p>
            <div class="route-meta">
                <span><i class="fas fa-road"></i> ${route.dist}</span>
                <span><i class="fas fa-clock"></i> ${route.time}</span>
                <span><i class="fas fa-tag"></i> From ₹${route.sedanOW}</span>
                <span><i class="fas fa-star" style="color:#ffd200"></i> 5.0 Rated</span>
            </div>
            <div class="cta-buttons" style="margin-top:30px">
                <a href="tel:+917903629240" class="btn-call"><i class="fas fa-phone"></i> Call +91 7903629240</a>
                <a href="https://wa.me/917903629240?text=Hi, I need a cab from ${from} to ${to}" class="btn-wa"><i class="fab fa-whatsapp"></i> Book on WhatsApp</a>
            </div>
        </div>
    </section>

    <main>
    <!-- Fare Table -->
    <section class="route-section">
        <div class="container">
            <h2>🚖 ${from} to ${to} Taxi Fare – Price List</h2>
            <table class="fare-table">
                <thead><tr><th>Car Type</th><th>Capacity</th><th>One-Way Fare</th><th>Round Trip Fare</th><th>Per KM</th></tr></thead>
                <tbody>
                    <tr><td><strong>Sedan</strong> (Dzire/Aura)</td><td>4 Pax</td><td class="price">₹${route.sedanOW}</td><td class="price">₹${route.sedanRT}</td><td>₹11/km</td></tr>
                    <tr><td><strong>SUV</strong> (Ertiga 7-Seater)</td><td>6 Pax</td><td class="price">₹${route.suvOW}</td><td class="price">₹${route.suvRT}</td><td>₹11/km</td></tr>
                    <tr><td><strong>Innova Crysta</strong></td><td>7 Pax</td><td class="price">₹${route.crystaOW}</td><td class="price">₹${route.crystaRT}</td><td>₹13/km</td></tr>
                </tbody>
            </table>
            <p style="text-align:center;color:#888;margin-top:15px;font-size:13px">✅ Includes driver allowance & fuel. Night charges (10PM–6AM) ₹200 extra. Toll & parking extra.</p>
        </div>
    </section>

    <!-- Route Highlights -->
    <section class="route-section">
        <div class="container">
            <h2>🗺️ ${from} to ${to} Route Highlights</h2>
            <p style="text-align:center;color:#555;max-width:700px;margin:0 auto 20px">${route.roadDesc}</p>
            <div class="highlights-grid">
                <div class="highlight-card"><h3>📍 Distance</h3><p>${route.dist} via national highway. ${route.roadDesc}</p></div>
                <div class="highlight-card"><h3>⏱️ Travel Time</h3><p>Approximately ${route.time}. Our experienced drivers ensure safe & timely arrival.</p></div>
                <div class="highlight-card"><h3>🏞️ Key Stops</h3><p>${route.highlights}</p></div>
                <div class="highlight-card"><h3>💰 Best Price</h3><p>Starting from ₹${route.sedanOW} one-way. No hidden charges, transparent pricing.</p></div>
            </div>
        </div>
    </section>

    <!-- Vehicles -->
    <section class="route-section">
        <div class="container">
            <h2>🚗 Available Cars for ${from} to ${to}</h2>
            ${getVehicleCards(`${from} to ${to}`)}
        </div>
    </section>

    <!-- CTA -->
    <section class="route-section">
        <div class="container">
            ${getCTABanner(`${from} to ${to} Cab`)}
        </div>
    </section>

    <!-- FAQ -->
    <section class="route-section">
        <div class="container">
            <h2>❓ Frequently Asked Questions – ${from} to ${to} Cab</h2>
            <div class="faq-section">
${getFAQItem(`What is the taxi fare from ${from} to ${to}?`, `Sedan starts at ₹${route.sedanOW} one-way. SUV ₹${route.suvOW}, Crysta ₹${route.crystaOW}. Round trip: Sedan ₹${route.sedanRT}, SUV ₹${route.suvRT}, Crysta ₹${route.crystaRT}. Includes driver allowance & fuel.`, true)}
${getFAQItem(`What is the distance from ${from} to ${to}?`, `${route.dist} by road. Journey takes ${route.time}. Route passes through ${route.highlights}.`)}
${getFAQItem(`How to book ${from} to ${to} cab?`, `Call +91-7903629240 or WhatsApp. Share date, time, passengers. Instant confirmation. 24/7 available.`)}
${getFAQItem(`Is one-way cab available?`, `Yes! One-way drop ${from} to ${to} from ₹${route.sedanOW}. No return charges.`)}
${getFAQItem(`Which cars are available?`, `Sedan (Dzire/Aura), SUV (Ertiga), Crysta, and luxury cars. All AC, well-maintained with experienced drivers.`)}
${getFAQItem(`Is ${to} to ${from} cab available?`, `Yes! <a href="/routes/${reverseSlug}.html" style="color:#667eea">${to} to ${from} cab</a> at same rates. One-way & round-trip.`)}
${getFAQItem(`Is advance payment required?`, `No advance for most bookings. 20% advance for peak season. Balance after journey via cash/UPI/card.`)}
${getFAQItem(`Can I make stops en route?`, `Yes, stops at ${route.highlights} possible. Extra charges for significant detours from the main route.`)}
            </div>
        </div>
    </section>

    <!-- Related Routes -->
    ${relatedRoutes.length > 0 ? `
    <section class="route-section">
        <div class="container">
            <h2>🚗 Other Popular Routes</h2>
            <div class="other-routes">
${relatedRoutes.map(r => `                <a href="/routes/${r.slug}.html" class="route-link">
                    <div><strong>${r.fromName} to ${r.toName} Cab</strong><br><small style="color:#888">${r.dist} • ${r.time}</small></div>
                    <div class="route-fare">₹${r.sedanOW} →</div>
                </a>`).join('\n')}
            </div>
            <p style="text-align:center;margin-top:20px"><a href="/" style="color:#667eea;font-weight:600;text-decoration:none">← View All Routes</a></p>
        </div>
    </section>` : ''}

    <!-- SEO Content -->
    <section class="route-section">
        <div class="container">
            <div class="seo-content">
                <h2>${from} to ${to} Cab Service – Complete Travel Guide</h2>
                <p>Looking for the <strong>best ${from} to ${to} cab service</strong>? Rohit Travels offers affordable, reliable taxi service from ${from} to ${to} starting at just <strong>₹11/km</strong>. With over 10 years of experience, 5000+ happy customers, and a 5.0★ Google rating, we are the most trusted <strong>${from} to ${to} taxi</strong> provider.</p>

                <h3>About ${from}</h3>
                <p>${fromDesc} Key attractions in ${from} include ${fromLandmarks}. ${fromCity.famousFor ? `The city is famous for ${fromCity.famousFor}.` : ''}</p>

                <h3>About ${to}</h3>
                <p>${toDesc} Popular spots in ${to} include ${toLandmarks}. ${toCity.famousFor ? `${to} is renowned for ${toCity.famousFor}.` : ''}</p>

                <h3>The ${from} to ${to} Route</h3>
                <p>The distance from ${from} to ${to} is approximately <strong>${route.dist}</strong>, taking about <strong>${route.time}</strong> by cab. ${route.roadDesc} Key highlights along this route include ${route.highlights}. Our experienced drivers are familiar with every kilometer of this route and ensure a safe, comfortable journey.</p>

                <h3>Types of ${from} to ${to} Cab Services</h3>
                <ul>
                    <li><strong>One-Way Cab:</strong> Starting ₹${route.sedanOW} for sedan. Pay only for one side, no return charges.</li>
                    <li><strong>Round Trip:</strong> Starting ₹${route.sedanRT}. Includes driver stay. Best for 2-3 day trips.</li>
                    <li><strong>Airport Transfer:</strong> Direct service from ${fromCity.airport || 'airport'} to ${to}.</li>
                    <li><strong>Corporate Travel:</strong> Business trips with professional drivers.</li>
                </ul>

                <h3>Travel Tips for ${from} to ${to}</h3>
                <ul>
                    <li><strong>Best Time:</strong> Start early morning (5-6 AM) to avoid traffic and reach before sunset.</li>
                    <li><strong>Road Condition:</strong> ${route.roadDesc} Most of the route is well-paved national highway.</li>
                    <li><strong>Food Stops:</strong> Multiple dhabas and restaurants along the route. Ask your driver for recommendations.</li>
                    <li><strong>Essentials:</strong> Carry water, snacks, charger, and valid ID proof.</li>
                    ${route.distKm > 300 ? '<li><strong>Overnight:</strong> For long distances, consider breaking the journey at a midway city.</li>' : ''}
                </ul>

                <h3>Why Choose Rohit Travels for ${from} to ${to}?</h3>
                <p>We own our fleet — no aggregator markups. This means better maintained cars, trained local drivers who know every route, and consistent pricing without surge. Our <strong>${from} to ${to} taxi fare</strong> is the most competitive with no hidden charges. We also provide reverse service — <a href="/routes/${reverseSlug}.html" style="color:#667eea;font-weight:600">${to} to ${from} cab</a> at the same rates.</p>

                <h3>Book Your ${from} to ${to} Cab Now</h3>
                <p>Call <a href="tel:+917903629240" style="color:#667eea;font-weight:600">+91 7903629240</a> or <a href="https://wa.me/917903629240" style="color:#25D366;font-weight:600">WhatsApp</a> for instant booking. Available 24/7, 365 days a year.</p>
            </div>
        </div>
    </section>

    <!-- City Links -->
    <section class="route-section">
        <div class="container">
            <h2>🏙️ Explore More Cities</h2>
            <div class="city-links-grid">
                <a href="/cities/${fromCity.slug}/" class="city-link-item">🚖 Cab in ${from}</a>
                <a href="/cities/${toCity.slug}/" class="city-link-item">🚖 Cab in ${to}</a>
${allCities.filter(c => c.slug !== fromCity.slug && c.slug !== toCity.slug && c.tier <= 2).slice(0,8).map(c => `                <a href="/cities/${c.slug}/" class="city-link-item">🚖 Cab in ${c.name}</a>`).join('\n')}
            </div>
        </div>
    </section>
    </main>
${getFooter()}`;
}

module.exports = { generateRoutePage };

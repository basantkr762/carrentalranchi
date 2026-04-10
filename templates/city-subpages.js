// ============================================
// CITY SUB-PAGE TEMPLATES
// Local, Outstation, Airport, Wedding, Popular Routes, Tour
// ============================================

const { getHead, getHeader, getFooter, getFAQItem, getVehicleCards, getCTABanner } = require('./components');

// ===== LOCAL CAB PAGE =====
function generateLocalCabPage(city, allCities) {
  const n = city.name, s = city.slug;
  const title = `Local Cab Service in ${n} | Hourly Taxi Hire @₹11/km | Rohit Travels`;
  const metaDesc = `Book local cab in ${n} at ₹11/km. Hourly taxi hire: 4hr/40km ₹1,200, 8hr/80km ₹2,000. City tours, hospital visits, shopping trips. Call +91-7903629240`;
  const keywords = `local cab ${n.toLowerCase()}, local taxi ${n.toLowerCase()}, hourly cab hire ${n.toLowerCase()}, city taxi ${n.toLowerCase()}, local car rental ${n.toLowerCase()}, ${n.toLowerCase()} local cab service, taxi near me ${n.toLowerCase()}, cab near me ${n.toLowerCase()}`;
  const canonical = `https://rohittravels.com/cities/${s}/local-cab.html`;
  const bc = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://rohittravels.com/"},{"@type":"ListItem","position":2,"name":`Cab in ${n}`,"item":`https://rohittravels.com/cities/${s}/`},{"@type":"ListItem","position":3,"name":`Local Cab ${n}`,"item":canonical}]};
  const faq = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[
    {"@type":"Question","name":`What is the local cab rate in ${n}?`,"acceptedAnswer":{"@type":"Answer","text":`Local cab rates in ${n}: Sedan ₹11/km (min 4hr/40km ₹1,200), SUV ₹11/km (min ₹1,600), Crysta ₹13/km (min ₹2,000). Extra km: ₹9-13/km, extra hour: ₹100-200. Night charges extra.`}},
    {"@type":"Question","name":`How to book a local taxi in ${n}?`,"acceptedAnswer":{"@type":"Answer","text":`Call +91-7903629240 or WhatsApp. Share pickup location, destination, date & time. Instant confirmation with driver name and car number. 24/7 available.`}},
    {"@type":"Question","name":`Is hourly cab available in ${n}?`,"acceptedAnswer":{"@type":"Answer","text":`Yes, hourly cab packages in ${n}: 4hr/40km, 8hr/80km, 12hr/120km. Perfect for shopping, hospital visits, meetings, and city tours. Multiple stops allowed within package.`}},
    {"@type":"Question","name":`Which areas do you cover for local taxi in ${n}?`,"acceptedAnswer":{"@type":"Answer","text":`We cover all areas of ${n} and ${city.district} district including railway stations, bus stands, hospitals, malls, temples, markets, residential areas, and industrial zones.`}},
    {"@type":"Question","name":`Can I book a local cab for multiple stops in ${n}?`,"acceptedAnswer":{"@type":"Answer","text":`Absolutely! Our hourly packages allow multiple stops within ${n}. Perfect for shopping trips, meeting multiple clients, family outings, or city sightseeing. Extra charges for exceeding the package limit.`}},
    {"@type":"Question","name":`What cars are available for local hire in ${n}?`,"acceptedAnswer":{"@type":"Answer","text":`Sedan (Dzire/Aura, 4-seater), SUV (Ertiga, 7-seater), Premium (Innova Crysta, 7-seater). All AC, GPS-enabled, regularly cleaned cars with verified professional drivers.`}}
  ]};

  return `${getHead({title,metaDesc,keywords,canonical,breadcrumbSchema:bc,extraSchema:faq})}
${getHeader()}
    <div class="container"><div class="breadcrumb"><a href="/">Home</a> <span>›</span> <a href="/cities/${s}/">Cab in ${n}</a> <span>›</span> <strong>Local Cab ${n}</strong></div></div>
    <section class="route-hero">
        <div class="container">
            <h1>Local Cab Service in ${n} – Hourly Taxi Hire @₹11/km</h1>
            <p style="font-size:17px;opacity:.95;max-width:700px;margin:0 auto 20px">Book local taxi in ${n} for city travel, shopping, hospital visits, meetings & sightseeing. Hourly packages starting ₹1,200.</p>
            <div class="route-meta">
                <span><i class="fas fa-map-marker-alt"></i> ${n} City</span>
                <span><i class="fas fa-tag"></i> ₹11/km</span>
                <span><i class="fas fa-clock"></i> Hourly Packages</span>
                <span><i class="fas fa-star" style="color:#ffd200"></i> 5.0 Rated</span>
            </div>
            <div class="cta-buttons" style="margin-top:30px">
                <a href="tel:+917903629240" class="btn-call"><i class="fas fa-phone"></i> Call Now</a>
                <a href="https://wa.me/917903629240?text=Hi, I need a local cab in ${n}." class="btn-wa"><i class="fab fa-whatsapp"></i> WhatsApp</a>
            </div>
        </div>
    </section>
    <main>
    <section class="route-section"><div class="container"><div class="seo-content">
        <h2>Local Cab Service in ${n} – Complete Guide</h2>
        <p>Need a <strong>local cab in ${n}</strong>? Rohit Travels provides the most reliable and affordable local taxi service in ${n}, ${city.district} district. Whether you need a quick drop to the railway station, a full-day cab for shopping and errands, or a comfortable ride for hospital visits, our <strong>local cab service in ${n}</strong> has you covered.</p>
        <p>Our local taxi service in ${n} operates 24/7, 365 days a year. We have a fleet of clean, AC-equipped cars driven by experienced, verified local drivers who know every lane and shortcut in ${n}. With transparent pricing starting at just <strong>₹11/km</strong> and no hidden charges, Rohit Travels is the smartest choice for <strong>local taxi hire in ${n}</strong>.</p>
        <h3>Local Cab Packages in ${n}</h3>
        <p>We offer flexible hourly and kilometer-based packages designed for every need:</p>
    </div></div></section>
    <section class="route-section"><div class="container">
        <h2>💰 Local Taxi Rate Card – ${n}</h2>
        <table class="fare-table"><thead><tr><th>Package</th><th>Sedan</th><th>SUV</th><th>Crysta</th></tr></thead><tbody>
            <tr><td><strong>4 Hrs / 40 KM</strong></td><td class="price">₹1,200</td><td class="price">₹1,600</td><td class="price">₹2,000</td></tr>
            <tr><td><strong>8 Hrs / 80 KM</strong></td><td class="price">₹2,000</td><td class="price">₹2,800</td><td class="price">₹3,500</td></tr>
            <tr><td><strong>12 Hrs / 120 KM</strong></td><td class="price">₹3,000</td><td class="price">₹4,000</td><td class="price">₹5,000</td></tr>
            <tr><td>Extra KM Rate</td><td>₹11/km</td><td>₹11/km</td><td>₹13/km</td></tr>
            <tr><td>Extra Hour</td><td>₹100/hr</td><td>₹150/hr</td><td>₹200/hr</td></tr>
        </tbody></table>
        <p style="text-align:center;color:#888;margin-top:15px;font-size:13px">✅ Includes driver, fuel & AC. Night charges (10PM–6AM) ₹200 extra. Toll & parking extra.</p>
    </div></section>
    <section class="route-section"><div class="container"><div class="seo-content">
        <h3>When to Use Local Cab in ${n}</h3>
        <ul>
            <li><strong>Railway Station Transfers:</strong> Quick pickup/drop at ${city.railwayStation || n + ' station'}. We track train timings for your convenience.</li>
            <li><strong>Hospital & Medical Visits:</strong> Comfortable AC cab for hospital appointments. We wait and bring you back safely.</li>
            <li><strong>Shopping & Mall Trips:</strong> Multi-stop shopping excursions across ${n} markets and malls.</li>
            <li><strong>Office & Business Meetings:</strong> Professional chauffeur service for corporate clients in ${n}.</li>
            <li><strong>City Sightseeing:</strong> Visit ${city.landmarks.slice(0,4).join(', ')} in comfort with our guided local tours.</li>
            <li><strong>Temple & Pilgrimage:</strong> Visit all major temples and religious sites in and around ${n}.</li>
            <li><strong>School & College Pick/Drop:</strong> Safe and reliable daily commute for students.</li>
        </ul>
        <h3>Areas We Cover in ${n}</h3>
        <p>Our local cab service covers every corner of ${n} and ${city.district} district. ${city.localAttractions ? `Popular areas include ${city.localAttractions}.` : ''} We also provide local cabs to all nearby towns and suburbs within a 30-50 km radius of ${n}. No matter where you need to go within the city, our drivers will get you there safely and on time.</p>
        <h3>Why Choose Rohit Travels for Local Cab in ${n}?</h3>
        <p>With 10+ years of experience serving ${n}, we understand the city transportation needs better than anyone. Our drivers are local residents who know the fastest routes, avoid traffic congestion areas, and ensure you reach your destination on time. We offer: <strong>₹11/km transparent pricing</strong>, <strong>no surge or dynamic pricing</strong>, <strong>24/7 availability</strong>, <strong>clean sanitized AC cars</strong>, <strong>GPS-tracked rides</strong>, and <strong>payment via cash, UPI or card</strong>.</p>
        <p>Book your <strong>local cab in ${n}</strong> now! Call <a href="tel:+917903629240" style="color:#667eea;font-weight:600">+91 7903629240</a> or <a href="https://wa.me/917903629240" style="color:#25D366;font-weight:600">WhatsApp us</a>.</p>
    </div></div></section>
    <section class="route-section"><div class="container">
        <h2>🚗 Cars Available for Local Hire in ${n}</h2>
        ${getVehicleCards(n)}
    </div></section>
    <section class="route-section"><div class="container">${getCTABanner(`Local Cab in ${n}`)}</div></section>
    <section class="route-section"><div class="container">
        <h2>❓ FAQs – Local Cab Service in ${n}</h2>
        <div class="faq-section">
${getFAQItem(`What is the local cab rate in ${n}?`,`Sedan ₹11/km (4hr/40km ₹1,200), SUV ₹11/km (₹1,600), Crysta ₹13/km (₹2,000). Extra km & hour charges apply. No hidden fees.`,true)}
${getFAQItem(`How to book a local taxi in ${n}?`,`Call +91-7903629240 or WhatsApp. Share pickup point, destination & timing. Get instant confirmation with driver details.`)}
${getFAQItem(`Is hourly cab available in ${n}?`,`Yes! 4hr/40km, 8hr/80km, 12hr/120km packages. Multiple stops allowed. Perfect for all-day city travel.`)}
${getFAQItem(`Which areas do you cover in ${n}?`,`All areas of ${n} city and ${city.district} district. Railway stations, hospitals, markets, residential areas, industrial zones — everywhere.`)}
${getFAQItem(`Can I book a one-way local drop in ${n}?`,`Yes, one-way drops within ${n} at ₹11/km with minimum fare ₹300. Call for exact quote based on your pickup and drop locations.`)}
${getFAQItem(`Are night charges extra for local cab in ${n}?`,`Night charges (10PM–6AM) are ₹200 extra per trip. This covers the driver's night allowance. All other charges remain the same.`)}
        </div>
    </div></section>
    </main>
${getFooter(n)}`;
}

// ===== OUTSTATION CAB PAGE =====
function generateOutstationPage(city, allCities, cityRoutes) {
  const n = city.name, s = city.slug;
  const title = `Outstation Cab from ${n} | One-Way & Round Trip @₹11/km | Rohit Travels`;
  const metaDesc = `Book outstation cab from ${n} at ₹11/km. One-way & round-trip taxi to Ranchi, Jamshedpur, Patna, Kolkata & 50+ cities. Call +91-7903629240`;
  const keywords = `outstation cab from ${n.toLowerCase()}, outstation taxi ${n.toLowerCase()}, one way cab ${n.toLowerCase()}, round trip cab ${n.toLowerCase()}, ${n.toLowerCase()} to ranchi cab, ${n.toLowerCase()} outstation cab service`;
  const canonical = `https://rohittravels.com/cities/${s}/outstation-cab.html`;
  const bc = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://rohittravels.com/"},{"@type":"ListItem","position":2,"name":`Cab in ${n}`,"item":`https://rohittravels.com/cities/${s}/`},{"@type":"ListItem","position":3,"name":`Outstation Cab ${n}`,"item":canonical}]};
  const faq = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[
    {"@type":"Question","name":`What is the outstation cab rate from ${n}?`,"acceptedAnswer":{"@type":"Answer","text":`Outstation cab from ${n}: Sedan ₹11/km, SUV ₹11/km, Crysta ₹13/km. One-way & round-trip. Includes driver allowance & fuel. Toll extra.`}},
    {"@type":"Question","name":`Is one-way cab available from ${n}?`,"acceptedAnswer":{"@type":"Answer","text":`Yes! One-way drop service from ${n} to all cities. Pay only for one direction. No return fare. Starting ₹11/km.`}},
    {"@type":"Question","name":`Which cities can I travel to from ${n}?`,"acceptedAnswer":{"@type":"Answer","text":`Ranchi, Jamshedpur, Dhanbad, Bokaro, Patna, Kolkata, Varanasi, Gaya, Puri, Rourkela, Bhubaneswar and 50+ cities from ${n}.`}},
    {"@type":"Question","name":`How to book outstation cab from ${n}?`,"acceptedAnswer":{"@type":"Answer","text":`Call +91-7903629240 or WhatsApp with your destination, date, time & passengers. Get instant fare quote and booking confirmation.`}},
    {"@type":"Question","name":`Is driver stay included in round trip from ${n}?`,"acceptedAnswer":{"@type":"Answer","text":`Yes, driver stay & food allowance is included in round-trip fares. For multi-day trips, driver night halt charges of ₹300/night are included.`}},
    {"@type":"Question","name":`What is the cancellation policy for outstation cab?`,"acceptedAnswer":{"@type":"Answer","text":`Free cancellation up to 6 hours before pickup. For cancellations within 6 hours, a nominal charge may apply. We are flexible — call us.`}}
  ]};
  const topRoutes = cityRoutes.slice(0,10);

  return `${getHead({title,metaDesc,keywords,canonical,breadcrumbSchema:bc,extraSchema:faq})}
${getHeader()}
    <div class="container"><div class="breadcrumb"><a href="/">Home</a> <span>›</span> <a href="/cities/${s}/">Cab in ${n}</a> <span>›</span> <strong>Outstation Cab</strong></div></div>
    <section class="route-hero">
        <div class="container">
            <h1>Outstation Cab from ${n} – One-Way & Round Trip @₹11/km</h1>
            <p style="font-size:17px;opacity:.95;max-width:700px;margin:0 auto 20px">Book outstation taxi from ${n} to 50+ cities across Jharkhand, Bihar, Bengal & Odisha. One-way drop & round-trip at best rates.</p>
            <div class="route-meta">
                <span><i class="fas fa-road"></i> 50+ Cities</span>
                <span><i class="fas fa-tag"></i> ₹11/km</span>
                <span><i class="fas fa-exchange-alt"></i> One-Way & Return</span>
                <span><i class="fas fa-star" style="color:#ffd200"></i> 5.0 Rated</span>
            </div>
            <div class="cta-buttons" style="margin-top:30px">
                <a href="tel:+917903629240" class="btn-call"><i class="fas fa-phone"></i> Call Now</a>
                <a href="https://wa.me/917903629240?text=Hi, I need outstation cab from ${n}." class="btn-wa"><i class="fab fa-whatsapp"></i> WhatsApp</a>
            </div>
        </div>
    </section>
    <main>
    <section class="route-section"><div class="container"><div class="seo-content">
        <h2>Outstation Cab Service from ${n} – Complete Guide</h2>
        <p>Planning an outstation trip from <strong>${n}</strong>? Rohit Travels offers the most affordable and reliable <strong>outstation cab service from ${n}</strong> to all major cities in Jharkhand and neighboring states. Whether you need a one-way cab or a round-trip taxi, we have you covered with rates starting at just <strong>₹11/km</strong>.</p>
        <p>Our outstation cab fleet includes comfortable sedans (Dzire, Aura), spacious SUVs (Ertiga 7-seater), and premium vehicles (Innova Crysta). All vehicles are well-maintained, AC-equipped, and driven by experienced highway drivers who know the best routes from ${n}. With 10+ years of outstation travel experience, 5000+ happy customers, and a perfect 5.0★ Google rating, Rohit Travels is the most trusted name for <strong>outstation taxi from ${n}</strong>.</p>
        <h3>One-Way vs Round Trip from ${n}</h3>
        <ul>
            <li><strong>One-Way Drop:</strong> Pay only for one direction. No return fare. Ideal for permanent moves, airport connections, or one-time trips. Starting ₹11/km.</li>
            <li><strong>Round Trip:</strong> Both-way service with driver stay included. Best for family vacations, business trips, and pilgrimages from ${n}. Lower per-km rate.</li>
        </ul>
        <h3>Top Outstation Destinations from ${n}</h3>
        <p>Our most popular outstation routes from ${n} cover cities across multiple states. We provide doorstep pickup from any location in ${n} and drop at any address in the destination city. No shared cabs — your trip, your car, your schedule.</p>
    </div></div></section>
    ${topRoutes.length > 0 ? `<section class="route-section"><div class="container">
        <h2>🛣️ Popular Outstation Routes from ${n}</h2>
        <div class="other-routes">
${topRoutes.map(r => `            <a href="/routes/${r.slug}.html" class="route-link"><div><strong>${n} to ${r.toName} Cab</strong><br><small style="color:#888">${r.dist} • ${r.time}</small></div><div class="route-fare">₹${r.sedanOW} →</div></a>`).join('\n')}
        </div>
    </div></section>` : ''}
    <section class="route-section"><div class="container">
        <h2>💰 Outstation Cab Rates from ${n}</h2>
        <table class="fare-table"><thead><tr><th>Car Type</th><th>Per KM Rate</th><th>Min KM/Day</th><th>Driver Allowance</th></tr></thead><tbody>
            <tr><td><strong>Sedan</strong> (Dzire/Aura)</td><td class="price">₹11/km</td><td>250 km/day</td><td>Included</td></tr>
            <tr><td><strong>SUV</strong> (Ertiga 7-Seater)</td><td class="price">₹11/km</td><td>250 km/day</td><td>Included</td></tr>
            <tr><td><strong>Innova Crysta</strong> (Premium)</td><td class="price">₹13/km</td><td>250 km/day</td><td>Included</td></tr>
        </tbody></table>
    </div></section>
    <section class="route-section"><div class="container"><div class="seo-content">
        <h3>What's Included in Outstation Fare</h3>
        <ul><li>Driver allowance & food charges</li><li>Fuel charges for entire trip</li><li>GST (as applicable)</li><li>AC running during the journey</li><li>Multiple stops as per your itinerary</li></ul>
        <h3>What's NOT Included</h3>
        <ul><li>Toll taxes (paid at toll plazas)</li><li>State permits (if applicable)</li><li>Parking charges at destinations</li><li>Night charges (10PM-6AM): ₹200</li></ul>
        <h3>Book Outstation Cab from ${n}</h3>
        <p>Ready to start your outstation journey from ${n}? Call <a href="tel:+917903629240" style="color:#667eea;font-weight:600">+91 7903629240</a> or <a href="https://wa.me/917903629240" style="color:#25D366;font-weight:600">WhatsApp</a> now. Instant booking, no hassle, best rates guaranteed!</p>
    </div></div></section>
    <section class="route-section"><div class="container">${getCTABanner(`Outstation Cab from ${n}`)}</div></section>
    <section class="route-section"><div class="container">
        <h2>❓ FAQs – Outstation Cab from ${n}</h2>
        <div class="faq-section">
${getFAQItem(`What is the outstation rate from ${n}?`,`Sedan ₹11/km, SUV ₹11/km, Crysta ₹13/km. Min 250km/day for round trips. Driver allowance included. Toll extra.`,true)}
${getFAQItem(`Is one-way cab available from ${n}?`,`Yes! One-way drops to all cities. Pay only for distance traveled. No return fare charges.`)}
${getFAQItem(`Which cities can I go from ${n}?`,`50+ cities: Ranchi, Jamshedpur, Dhanbad, Bokaro, Patna, Kolkata, Varanasi, Gaya, Puri, and more across 5 states.`)}
${getFAQItem(`How much advance is needed?`,`20% advance for outstation bookings. Balance after journey via cash, UPI, or card.`)}
${getFAQItem(`Is night halting included?`,`Yes, driver night halt ₹300/night included. For round trips, driver stay is covered in the fare.`)}
${getFAQItem(`Can I change my itinerary during the trip?`,`Absolutely! You can add or change stops during the journey. Extra km/hr charges may apply.`)}
        </div>
    </div></section>
    </main>
${getFooter(n)}`;
}

// ===== AIRPORT TAXI PAGE =====
function generateAirportPage(city) {
  const n = city.name, s = city.slug;
  const airportName = city.airport || 'Birsa Munda Airport Ranchi';
  const hasAirport = !!city.airport;
  const title = `Airport Taxi ${n} | ${airportName} Cab @₹11/km | Rohit Travels`;
  const metaDesc = `${hasAirport ? `24/7 airport taxi to ${airportName}` : `Airport cab from ${n} to nearest airports`}. Flight tracking, no surge. Sedan ₹11/km. Call +91-7903629240`;
  const keywords = `airport taxi ${n.toLowerCase()}, airport cab ${n.toLowerCase()}, ${airportName.toLowerCase()} taxi, ${airportName.toLowerCase()} cab, ${n.toLowerCase()} airport transfer, flight pickup ${n.toLowerCase()}`;
  const canonical = `https://rohittravels.com/cities/${s}/airport-taxi.html`;
  const bc = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://rohittravels.com/"},{"@type":"ListItem","position":2,"name":`Cab in ${n}`,"item":`https://rohittravels.com/cities/${s}/`},{"@type":"ListItem","position":3,"name":`Airport Taxi`,"item":canonical}]};
  const faq = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[
    {"@type":"Question","name":`How much is airport cab from ${n}?`,"acceptedAnswer":{"@type":"Answer","text":`Airport cab from ${n}: Sedan from ₹11/km, SUV from ₹11/km. ${hasAirport ? `Flat rate packages available for ${airportName} transfers.` : `Rates to Birsa Munda Airport Ranchi based on distance.`} Call for exact quote.`}},
    {"@type":"Question","name":`How to book airport taxi in ${n}?`,"acceptedAnswer":{"@type":"Answer","text":`Call +91-7903629240 or WhatsApp with your flight details. We track your flight and adjust pickup time for delays. Pre-booking recommended.`}},
    {"@type":"Question","name":`Do you track flight timings?`,"acceptedAnswer":{"@type":"Answer","text":`Yes! We monitor your flight status in real-time. If your flight is delayed, our driver adjusts arrival accordingly. No extra charges for flight delays.`}},
    {"@type":"Question","name":`Is 24/7 airport service available?`,"acceptedAnswer":{"@type":"Answer","text":`Yes, our airport taxi service operates 24/7 including early morning and late night flights. Night charges of ₹200 apply for 10PM-6AM trips.`}},
    {"@type":"Question","name":`What cars are available for airport transfer?`,"acceptedAnswer":{"@type":"Answer","text":`Sedan (Dzire/Aura) for 1-3 passengers, SUV (Ertiga) for 4-6 passengers, Innova Crysta for 5-7 passengers with extra luggage space.`}},
    {"@type":"Question","name":`Can I pre-book airport cab in advance?`,"acceptedAnswer":{"@type":"Answer","text":`Yes, we recommend pre-booking 24 hours in advance for guaranteed availability. You can book up to 30 days in advance. Same-day bookings also accepted subject to availability.`}}
  ]};

  return `${getHead({title,metaDesc,keywords,canonical,breadcrumbSchema:bc,extraSchema:faq})}
${getHeader()}
    <div class="container"><div class="breadcrumb"><a href="/">Home</a> <span>›</span> <a href="/cities/${s}/">Cab in ${n}</a> <span>›</span> <strong>Airport Taxi</strong></div></div>
    <section class="route-hero">
        <div class="container">
            <h1>Airport Taxi Service in ${n} – ${airportName} Cab @₹11/km</h1>
            <p style="font-size:17px;opacity:.95;max-width:700px;margin:0 auto 20px">${hasAirport ? `24/7 airport pickup & drop to ${airportName}. Flight tracking, no surge, professional drivers.` : `Airport transfer from ${n} to Birsa Munda Airport Ranchi & other nearby airports. Pre-book for best rates.`}</p>
            <div class="route-meta">
                <span><i class="fas fa-plane"></i> ${airportName}</span>
                <span><i class="fas fa-tag"></i> ₹11/km</span>
                <span><i class="fas fa-clock"></i> 24/7 Service</span>
            </div>
            <div class="cta-buttons" style="margin-top:30px">
                <a href="tel:+917903629240" class="btn-call"><i class="fas fa-phone"></i> Call Now</a>
                <a href="https://wa.me/917903629240?text=Hi, I need airport taxi in ${n}." class="btn-wa"><i class="fab fa-whatsapp"></i> WhatsApp</a>
            </div>
        </div>
    </section>
    <main>
    <section class="route-section"><div class="container"><div class="seo-content">
        <h2>Airport Taxi Service in ${n} – Complete Guide</h2>
        <p>Need an <strong>airport taxi in ${n}</strong>? Rohit Travels provides the most reliable airport cab service ${hasAirport ? `to and from ${airportName}` : `from ${n} to all nearby airports`}. We understand that airport transfers require precision timing, which is why we track your flight in real-time and ensure our driver is waiting when you land.</p>
        <p>${hasAirport ? `${airportName} is served by multiple domestic airlines with daily flights to Delhi, Mumbai, Kolkata, Bangalore, Hyderabad, and other major cities. Our airport taxi service in ${n} operates 24/7, covering all flight schedules including early morning departures and late-night arrivals.` : `While ${n} doesn't have its own commercial airport, we provide seamless airport transfer service to Birsa Munda Airport Ranchi, ${city.airport ? city.airport + ', ' : ''}and other nearby airports. Our experienced drivers ensure you reach the airport well before your flight departure.`}</p>
        <h3>Our Airport Cab Services</h3>
        <ul>
            <li><strong>Airport Pickup:</strong> Driver waiting at arrivals with your name board. Flight tracking for delays. Door-to-door service.</li>
            <li><strong>Airport Drop:</strong> Timely pickup from your location. We ensure you arrive 2-3 hours before departure.</li>
            <li><strong>Round Trip Airport Transfer:</strong> Combined pickup and drop at special package rates.</li>
            <li><strong>Outstation Airport Transfer:</strong> ${n} to airports in other cities at competitive per-km rates.</li>
        </ul>
        <h3>Why Choose Rohit Travels for Airport Taxi?</h3>
        <p>Unlike app-based cabs that use surge pricing during peak hours, our airport taxi rates are fixed and transparent. <strong>₹11/km for sedan, ₹11/km for SUV</strong> — same rate whether you fly at 2 AM or 2 PM. Our drivers are trained for airport protocol, carry proper identification, and help with luggage handling. We've completed <strong>5000+ airport transfers</strong> with a perfect on-time record.</p>
        <h3>Book Airport Cab Now</h3>
        <p>Call <a href="tel:+917903629240" style="color:#667eea;font-weight:600">+91 7903629240</a> or <a href="https://wa.me/917903629240" style="color:#25D366;font-weight:600">WhatsApp</a> with your flight number, date, time, pickup/drop address. Pre-book 24 hours in advance for guaranteed availability.</p>
    </div></div></section>
    <section class="route-section"><div class="container">
        <h2>💰 Airport Taxi Rates – ${n}</h2>
        <table class="fare-table"><thead><tr><th>Car Type</th><th>Airport Drop</th><th>Airport Pickup</th><th>Round Trip</th></tr></thead><tbody>
            <tr><td><strong>Sedan</strong></td><td class="price">₹11/km</td><td class="price">₹11/km</td><td class="price">₹11/km (both ways)</td></tr>
            <tr><td><strong>SUV</strong></td><td class="price">₹11/km</td><td class="price">₹11/km</td><td class="price">₹11/km (both ways)</td></tr>
            <tr><td><strong>Crysta</strong></td><td class="price">₹13/km</td><td class="price">₹13/km</td><td class="price">₹13/km (both ways)</td></tr>
        </tbody></table>
    </div></section>
    <section class="route-section"><div class="container">${getCTABanner(`Airport Taxi in ${n}`)}</div></section>
    <section class="route-section"><div class="container">
        <h2>❓ FAQs – Airport Taxi ${n}</h2>
        <div class="faq-section">
${getFAQItem(`How much is airport cab from ${n}?`,`Starting ₹11/km sedan. ${hasAirport ? `Flat rate packages for ${airportName}.` : 'Based on distance to nearest airport.'} No surge pricing.`,true)}
${getFAQItem(`Do you track flight timings?`,`Yes! Real-time flight tracking. Driver adjusts for delays. No extra charges for flight delays.`)}
${getFAQItem(`Is 24/7 airport service available?`,`Yes, 24/7 including early morning & late night. Night charges ₹200 for 10PM-6AM.`)}
${getFAQItem(`How early should I book?`,`Pre-book 24 hours ahead for guaranteed availability. Same-day bookings also accepted.`)}
${getFAQItem(`Will driver help with luggage?`,`Yes, our drivers assist with luggage loading/unloading. All vehicles have ample boot space.`)}
${getFAQItem(`Can I book for someone else?`,`Absolutely! Share the passenger's name and phone number. Our driver will contact them directly.`)}
        </div>
    </div></section>
    </main>
${getFooter(n)}`;
}

// ===== WEDDING CAR PAGE =====
function generateWeddingPage(city) {
  const n = city.name, s = city.slug;
  const title = `Wedding Car Rental ${n} | Marriage Car Booking | Luxury Cars | Rohit Travels`;
  const metaDesc = `Luxury wedding car rental in ${n}. Audi, BMW, Innova Crysta for barat, reception & vidaai. Decorated cars from ₹5,000. Book: +91-7903629240`;
  const keywords = `wedding car ${n.toLowerCase()}, marriage car booking ${n.toLowerCase()}, wedding car rental ${n.toLowerCase()}, luxury car for wedding ${n.toLowerCase()}, barat car ${n.toLowerCase()}, audi for wedding ${n.toLowerCase()}, bmw for wedding ${n.toLowerCase()}, decorated car ${n.toLowerCase()}`;
  const canonical = `https://rohittravels.com/cities/${s}/wedding-car.html`;
  const bc = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://rohittravels.com/"},{"@type":"ListItem","position":2,"name":`Cab in ${n}`,"item":`https://rohittravels.com/cities/${s}/`},{"@type":"ListItem","position":3,"name":`Wedding Car`,"item":canonical}]};
  const faq = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[
    {"@type":"Question","name":`What is the wedding car rate in ${n}?`,"acceptedAnswer":{"@type":"Answer","text":`Wedding car rental in ${n}: Innova Crysta from ₹5,000/event, Audi from ₹15,000, BMW from ₹18,000. Decoration included. Guest transport cars from ₹11/km.`}},
    {"@type":"Question","name":`How to book wedding car in ${n}?`,"acceptedAnswer":{"@type":"Answer","text":`Call +91-7903629240 at least 7-15 days before your wedding. Share event date, car preferences, and decoration requirements. 30% advance to confirm booking.`}},
    {"@type":"Question","name":`Is car decoration included?`,"acceptedAnswer":{"@type":"Answer","text":`Yes! Basic flower decoration is included in our wedding car packages. Premium decoration with ribbons, flowers & LED available at extra cost.`}},
    {"@type":"Question","name":`Do you provide cars for barat?`,"acceptedAnswer":{"@type":"Answer","text":`Yes! We provide Audi, BMW, and Innova Crysta for the groom's barat. Cars can be equipped with DJ systems. Multiple cars available for the full barat procession.`}},
    {"@type":"Question","name":`Can you arrange guest transportation?`,"acceptedAnswer":{"@type":"Answer","text":`Absolutely! We provide Ertiga, Innova, and Tempo Traveller fleet for wedding guest transportation in ${n}. Airport/station pickups and hotel transfers included.`}},
    {"@type":"Question","name":`How far in advance should I book?`,"acceptedAnswer":{"@type":"Answer","text":`We recommend booking 15-30 days in advance, especially during wedding season (Nov-Feb, Apr-Jun). Popular cars like Audi & BMW get booked early.`}}
  ]};

  return `${getHead({title,metaDesc,keywords,canonical,breadcrumbSchema:bc,extraSchema:faq})}
${getHeader()}
    <div class="container"><div class="breadcrumb"><a href="/">Home</a> <span>›</span> <a href="/cities/${s}/">Cab in ${n}</a> <span>›</span> <strong>Wedding Car</strong></div></div>
    <section class="route-hero" style="background:linear-gradient(135deg,#e91e63 0%,#9c27b0 50%,#673ab7 100%)">
        <div class="container">
            <h1>Wedding Car Rental in ${n} – Luxury Cars for Marriage</h1>
            <p style="font-size:17px;opacity:.95;max-width:700px;margin:0 auto 20px">Make your special day unforgettable with premium wedding cars in ${n}. Audi, BMW, Crysta & decorated cars for barat, reception & vidaai.</p>
            <div class="route-meta">
                <span><i class="fas fa-gem"></i> Luxury Cars</span>
                <span><i class="fas fa-ring"></i> Wedding Special</span>
                <span><i class="fas fa-palette"></i> Decorated</span>
                <span><i class="fas fa-star" style="color:#ffd200"></i> 5.0 Rated</span>
            </div>
            <div class="cta-buttons" style="margin-top:30px">
                <a href="tel:+917903629240" class="btn-call"><i class="fas fa-phone"></i> Call Now</a>
                <a href="https://wa.me/917903629240?text=Hi, I need wedding car in ${n}. Wedding date: " class="btn-wa"><i class="fab fa-whatsapp"></i> WhatsApp</a>
            </div>
        </div>
    </section>
    <main>
    <section class="route-section"><div class="container"><div class="seo-content">
        <h2>Wedding Car Rental in ${n} – Make Your Big Day Special</h2>
        <p>Your wedding day deserves nothing but the best. Rohit Travels offers <strong>premium wedding car rental in ${n}</strong> with a stunning fleet of luxury vehicles that will make your entrance truly grand. From the groom's barat in a sleek Audi to the bride's vidaai in a decorated BMW, we make every moment picture-perfect.</p>
        <p>Serving ${n} and ${city.district} district, we have been part of 500+ weddings across Jharkhand. Our <strong>wedding car service in ${n}</strong> includes professional chauffeurs in formal attire, beautiful car decoration, and red carpet service. We understand that your wedding is a once-in-a-lifetime event, and we treat it with the highest level of care and professionalism.</p>
        <h3>Wedding Car Options in ${n}</h3>
        <ul>
            <li><strong>Audi A4/A6:</strong> The ultimate luxury sedan for the groom's entry. Sleek design, premium interiors. From ₹15,000/event.</li>
            <li><strong>BMW 3/5 Series:</strong> German precision engineering for a grand arrival. Stunning presence. From ₹18,000/event.</li>
            <li><strong>Toyota Innova Crysta:</strong> Premium 7-seater for the bride/groom family. Spacious & comfortable. From ₹5,000/event.</li>
            <li><strong>Maruti Ertiga:</strong> Perfect for guest pickups and family transport. 7-seater comfort. From ₹3,000/event.</li>
            <li><strong>Fleet Package:</strong> Multiple cars for your entire wedding — barat, reception, guest transfers. Custom packages available.</li>
        </ul>
        <h3>Wedding Services We Offer in ${n}</h3>
        <ul>
            <li><strong>Barat Car:</strong> Luxury car for groom's procession with decoration & DJ compatibility</li>
            <li><strong>Bride's Car:</strong> Beautifully decorated car for the bride's entry and vidaai</li>
            <li><strong>Guest Transportation:</strong> Fleet of cars for wedding guests — airport/station pickups and hotel transfers</li>
            <li><strong>Pre-Wedding Shoots:</strong> Luxury cars for pre-wedding photography locations</li>
            <li><strong>Reception Transfer:</strong> Premium cars for the couple's reception venue arrival</li>
            <li><strong>Honeymoon Departure:</strong> Airport/station drop for the couple's honeymoon journey</li>
        </ul>
        <h3>Book Wedding Car in ${n}</h3>
        <p>Planning your wedding? Call <a href="tel:+917903629240" style="color:#667eea;font-weight:600">+91 7903629240</a> or <a href="https://wa.me/917903629240" style="color:#25D366;font-weight:600">WhatsApp</a> to discuss your requirements. Book 15-30 days in advance for best availability. 30% advance required to confirm.</p>
    </div></div></section>
    <section class="route-section"><div class="container">
        <h2>💰 Wedding Car Rates – ${n}</h2>
        <table class="fare-table"><thead><tr><th>Car</th><th>Per Event</th><th>Decoration</th><th>Chauffeur</th></tr></thead><tbody>
            <tr><td><strong>Ertiga (Guest)</strong></td><td class="price">₹3,000</td><td>Basic</td><td>Included</td></tr>
            <tr><td><strong>Innova Crysta</strong></td><td class="price">₹5,000</td><td>Premium</td><td>Formal</td></tr>
            <tr><td><strong>Audi A4/A6</strong></td><td class="price">₹15,000</td><td>Luxury</td><td>Formal</td></tr>
            <tr><td><strong>BMW 3/5 Series</strong></td><td class="price">₹18,000</td><td>Luxury</td><td>Formal</td></tr>
        </tbody></table>
    </div></section>
    <section class="route-section"><div class="container">${getCTABanner(`Wedding Car in ${n}`)}</div></section>
    <section class="route-section"><div class="container">
        <h2>❓ FAQs – Wedding Car ${n}</h2>
        <div class="faq-section">
${getFAQItem(`What is the wedding car rate in ${n}?`,`Crysta from ₹5,000, Audi from ₹15,000, BMW from ₹18,000 per event. Guest transport from ₹11/km. Decoration included.`,true)}
${getFAQItem(`Is car decoration included?`,`Yes! Basic flower decoration included. Premium decoration (ribbons, flowers, LED) at extra cost.`)}
${getFAQItem(`How early should I book?`,`15-30 days advance. Peak season (Nov-Feb) book earlier. 30% advance to confirm.`)}
${getFAQItem(`Do you provide cars for barat procession?`,`Yes! Audi, BMW with DJ compatibility. Multiple cars for full barat with formal chauffeurs.`)}
${getFAQItem(`Can you handle guest transportation?`,`Yes! Fleet of Ertiga, Innova, Tempo Traveller for 50-500 guests. Airport, station & hotel transfers.`)}
${getFAQItem(`Do you serve areas outside ${n}?`,`Yes, we cover all of ${city.district} district and surrounding areas for wedding car service.`)}
        </div>
    </div></section>
    </main>
${getFooter(n)}`;
}

// ===== POPULAR ROUTES PAGE =====
function generatePopularRoutesPage(city, cityRoutes) {
  const n = city.name, s = city.slug;
  const title = `Popular Cab Routes from ${n} | Outstation Taxi Fares | Rohit Travels`;
  const metaDesc = `Compare all cab routes from ${n} with fares, distances & travel times. Book outstation taxi at ₹11/km. 50+ destinations. Call +91-7903629240`;
  const keywords = `cab routes from ${n.toLowerCase()}, ${n.toLowerCase()} outstation routes, taxi fare from ${n.toLowerCase()}, ${n.toLowerCase()} cab destinations, popular routes ${n.toLowerCase()}`;
  const canonical = `https://rohittravels.com/cities/${s}/popular-routes.html`;
  const bc = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://rohittravels.com/"},{"@type":"ListItem","position":2,"name":`Cab in ${n}`,"item":`https://rohittravels.com/cities/${s}/`},{"@type":"ListItem","position":3,"name":"Popular Routes","item":canonical}]};

  return `${getHead({title,metaDesc,keywords,canonical,breadcrumbSchema:bc})}
${getHeader()}
    <div class="container"><div class="breadcrumb"><a href="/">Home</a> <span>›</span> <a href="/cities/${s}/">Cab in ${n}</a> <span>›</span> <strong>Popular Routes</strong></div></div>
    <section class="route-hero">
        <div class="container">
            <h1>Popular Cab Routes from ${n} – Compare Fares & Book</h1>
            <p style="font-size:17px;opacity:.95;max-width:700px;margin:0 auto 20px">Explore all outstation cab routes from ${n} with transparent fares. One-way & round-trip at ₹11/km. Book instantly!</p>
        </div>
    </section>
    <main>
    <section class="route-section"><div class="container"><div class="seo-content">
        <h2>All Cab Routes from ${n} – Fares, Distance & Time</h2>
        <p>Rohit Travels provides outstation cab service from <strong>${n}</strong> to 50+ cities across Jharkhand, Bihar, West Bengal, Odisha, and Uttar Pradesh. Below is a comprehensive list of all popular <strong>cab routes from ${n}</strong> with one-way fares, distances, and estimated travel times. All fares start at <strong>₹11/km</strong> for sedan cars. Round-trip rates are approximately 1.8x one-way fares.</p>
    </div></div></section>
    <section class="route-section"><div class="container">
        <h2>🛣️ Outstation Routes from ${n}</h2>
        <table class="fare-table"><thead><tr><th>Destination</th><th>Distance</th><th>Time</th><th>Sedan (OW)</th><th>SUV (OW)</th><th>Book</th></tr></thead><tbody>
${cityRoutes.map(r => `            <tr><td><a href="/routes/${r.slug}.html" style="color:#667eea;font-weight:600;text-decoration:none">${n} to ${r.toName}</a></td><td>${r.dist}</td><td>${r.time}</td><td class="price">₹${r.sedanOW}</td><td class="price">₹${r.suvOW}</td><td><a href="https://wa.me/917903629240?text=Hi, I need ${n} to ${r.toName} cab" style="color:#25D366;font-size:18px"><i class="fab fa-whatsapp"></i></a></td></tr>`).join('\n')}
        </tbody></table>
    </div></section>
    <section class="route-section"><div class="container"><div class="seo-content">
        <h3>How to Read This Fare Chart</h3>
        <ul>
            <li><strong>Sedan (OW):</strong> One-way fare for Dzire/Aura (4-seater). Most affordable option.</li>
            <li><strong>SUV (OW):</strong> One-way fare for Ertiga (7-seater). Best for families.</li>
            <li><strong>Round Trip:</strong> Approximately 1.8x the one-way fare. Includes driver stay allowance.</li>
            <li><strong>Innova Crysta:</strong> Add ~30% to SUV fare for premium Crysta pricing.</li>
        </ul>
        <p>All fares include driver allowance and fuel. Toll, parking, and night charges (₹200 for 10PM-6AM) are extra. Call <a href="tel:+917903629240" style="color:#667eea;font-weight:600">+91 7903629240</a> for exact quotes.</p>
    </div></div></section>
    <section class="route-section"><div class="container">${getCTABanner(`Cab from ${n}`)}</div></section>
    </main>
${getFooter(n)}`;
}

// ===== TOUR PACKAGES PAGE =====
function generateTourPage(city) {
  const n = city.name, s = city.slug;
  const title = `Tour Packages ${n} | Sightseeing Cab | Places to Visit | Rohit Travels`;
  const metaDesc = `Explore ${n} with guided tour packages. Visit ${city.landmarks.slice(0,3).join(', ')} & more. AC cab with driver @₹11/km. Call +91-7903629240`;
  const keywords = `tour packages ${n.toLowerCase()}, sightseeing cab ${n.toLowerCase()}, places to visit ${n.toLowerCase()}, ${n.toLowerCase()} tourism, ${n.toLowerCase()} trip, ${n.toLowerCase()} darshan cab`;
  const canonical = `https://rohittravels.com/cities/${s}/tour-packages.html`;
  const bc = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://rohittravels.com/"},{"@type":"ListItem","position":2,"name":`Cab in ${n}`,"item":`https://rohittravels.com/cities/${s}/`},{"@type":"ListItem","position":3,"name":"Tour Packages","item":canonical}]};

  return `${getHead({title,metaDesc,keywords,canonical,breadcrumbSchema:bc})}
${getHeader()}
    <div class="container"><div class="breadcrumb"><a href="/">Home</a> <span>›</span> <a href="/cities/${s}/">Cab in ${n}</a> <span>›</span> <strong>Tour & Sightseeing</strong></div></div>
    <section class="route-hero" style="background:linear-gradient(135deg,#00b09b 0%,#96c93d 100%)">
        <div class="container">
            <h1>Tour Packages & Sightseeing Cab in ${n}</h1>
            <p style="font-size:17px;opacity:.95;max-width:700px;margin:0 auto 20px">Explore the best of ${n} with our guided sightseeing cab packages. Visit ${city.landmarks.slice(0,3).join(', ')} & more!</p>
            <div class="route-meta">
                <span><i class="fas fa-camera"></i> Sightseeing</span>
                <span><i class="fas fa-tag"></i> ₹11/km</span>
                <span><i class="fas fa-map-marked-alt"></i> ${city.landmarks.length}+ Spots</span>
            </div>
            <div class="cta-buttons" style="margin-top:30px">
                <a href="tel:+917903629240" class="btn-call"><i class="fas fa-phone"></i> Call Now</a>
                <a href="https://wa.me/917903629240?text=Hi, I need sightseeing cab in ${n}." class="btn-wa"><i class="fab fa-whatsapp"></i> WhatsApp</a>
            </div>
        </div>
    </section>
    <main>
    <section class="route-section"><div class="container"><div class="seo-content">
        <h2>Explore ${n} – Sightseeing & Tour Packages</h2>
        <p>${city.description} Whether you're visiting for tourism, pilgrimage, or a family outing, our <strong>sightseeing cab in ${n}</strong> lets you explore all the major attractions comfortably.</p>
        <p>Rohit Travels offers customized tour packages in and around ${n} with experienced local drivers who double as informal guides. They know the best time to visit each spot, where to eat, and hidden gems that tourist guides miss. Book a full-day or half-day <strong>tour package in ${n}</strong> starting at just ₹11/km.</p>
        <h3>Top Places to Visit in ${n}</h3>
    </div></div></section>
    <section class="route-section"><div class="container">
        <h2>🏞️ Must-Visit Attractions in ${n}</h2>
        <div class="highlights-grid">
${city.landmarks.map((l,i) => `            <div class="highlight-card">
                <h3>${['🏛️','🌊','⛰️','🏞️','🕌','🎭','🌿','🏰','🗿','🌺'][i%10]} ${l}</h3>
                <p>${l} is one of the top attractions in ${n}. Hire a comfortable AC cab from Rohit Travels to visit this beautiful destination. Our drivers know the best routes and timing for an enjoyable experience.</p>
            </div>`).join('\n')}
        </div>
    </div></section>
    <section class="route-section"><div class="container">
        <h2>💰 Tour Package Rates – ${n}</h2>
        <table class="fare-table"><thead><tr><th>Package</th><th>Sedan</th><th>SUV</th><th>Crysta</th></tr></thead><tbody>
            <tr><td><strong>Half Day (4hr/40km)</strong></td><td class="price">₹1,200</td><td class="price">₹1,600</td><td class="price">₹2,000</td></tr>
            <tr><td><strong>Full Day (8hr/80km)</strong></td><td class="price">₹2,000</td><td class="price">₹2,800</td><td class="price">₹3,500</td></tr>
            <tr><td><strong>Extended (12hr/120km)</strong></td><td class="price">₹3,000</td><td class="price">₹4,000</td><td class="price">₹5,000</td></tr>
            <tr><td><strong>2-Day Tour</strong></td><td class="price">₹5,500</td><td class="price">₹7,000</td><td class="price">₹9,000</td></tr>
        </tbody></table>
    </div></section>
    <section class="route-section"><div class="container"><div class="seo-content">
        ${city.localAttractions ? `<h3>More Attractions Near ${n}</h3><p>Beyond the main landmarks, ${n} and ${city.district} district offer hidden gems: ${city.localAttractions}. Our local drivers can take you to these off-the-beaten-path destinations for a truly memorable experience.</p>` : ''}
        <h3>Tips for Touring ${n}</h3>
        <ul>
            <li><strong>Best Season:</strong> October to March for pleasant weather. Avoid peak summer (May-June) for outdoor sightseeing.</li>
            <li><strong>Duration:</strong> Allocate at least 1-2 full days to cover the major attractions of ${n}.</li>
            <li><strong>What to Carry:</strong> Comfortable shoes, water bottle, camera, sunscreen. Light jacket for winters.</li>
            <li><strong>Local Food:</strong> Ask your driver for recommendations on authentic local cuisine and street food.</li>
            <li><strong>Photography:</strong> Most attractions allow photography. Our drivers know the best photo spots.</li>
        </ul>
        <h3>Book Your ${n} Tour Now</h3>
        <p>Ready to explore ${n}? Call <a href="tel:+917903629240" style="color:#667eea;font-weight:600">+91 7903629240</a> or <a href="https://wa.me/917903629240" style="color:#25D366;font-weight:600">WhatsApp</a>. Customized itineraries available for individuals, families, and groups.</p>
    </div></div></section>
    <section class="route-section"><div class="container">${getCTABanner(`Tour Package in ${n}`)}</div></section>
    </main>
${getFooter(n)}`;
}

module.exports = { generateLocalCabPage, generateOutstationPage, generateAirportPage, generateWeddingPage, generatePopularRoutesPage, generateTourPage };

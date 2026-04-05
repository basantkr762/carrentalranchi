// ============================================
// CITY PAGE TEMPLATES (7 types per city)
// Each generates 800+ words of unique content
// ============================================

const { getHead, getHeader, getFooter, getFAQItem, getVehicleCards, getCTABanner } = require('./components');

// ===== 1. CITY MAIN PAGE =====
function generateCityMainPage(city, allCities, cityRoutes) {
  const name = city.name;
  const slug = city.slug;
  const title = `Cab Service in ${name} | Taxi Service ${name} @₹9/km | Rohit Travels`;
  const metaDesc = `⭐ Best cab service in ${name} & taxi service at ₹9/km. Local taxi, outstation cab, airport transfer, wedding car. 24/7 booking. Call +91-7903629240`;
  const keywords = `cab service in ${name.toLowerCase()}, taxi service in ${name.toLowerCase()}, cabs in ${name.toLowerCase()}, ${name.toLowerCase()} cab, ${name.toLowerCase()} taxi, local cab ${name.toLowerCase()}, outstation cab ${name.toLowerCase()}, airport taxi ${name.toLowerCase()}, wedding car ${name.toLowerCase()}, car rental ${name.toLowerCase()}, rohit travels ${name.toLowerCase()}`;
  const canonical = `https://rohittravels.com/cities/${slug}/`;

  const breadcrumbSchema = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://rohittravels.com/"},{"@type":"ListItem","position":2,"name":"Cities","item":"https://rohittravels.com/cities/"},{"@type":"ListItem","position":3,"name":`Cab Service in ${name}`,"item":canonical}]};
  
  const taxiSchema = {"@context":"https://schema.org","@type":"TaxiService","name":`Rohit Travels - Cab Service in ${name}`,"description":`Best cab service and taxi service in ${name}, ${city.district}, Jharkhand. Book local taxi, outstation cabs, airport transfer, wedding cars at ₹9/km.`,"url":canonical,"telephone":"+91-7903629240","provider":{"@type":"LocalBusiness","name":"Rohit Travels Ranchi","telephone":"+91-7903629240","address":{"@type":"PostalAddress","streetAddress":"Birsa chowk, road no a2, Hawai Nagar, Gitilpiri","addressLocality":"Ranchi","addressRegion":"Jharkhand","postalCode":"834003","addressCountry":"IN"},"priceRange":"₹₹","image":"https://rohittravels.com/images/rohittravelslogo_desktop.webp"},"areaServed":{"@type":"City","name":name},"offers":{"@type":"AggregateOffer","priceCurrency":"INR","lowPrice":"9","highPrice":"50","offerCount":"10"}};
  
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[
    {"@type":"Question","name":`What is the cab fare in ${name}?`,"acceptedAnswer":{"@type":"Answer","text":`Cab fare in ${name} starts at ₹9/km for sedan cars. For SUV (Ertiga), rates start from ₹11/km, and for Innova Crysta from ₹13/km. Local packages: 4hr/40km from ₹1,200, 8hr/80km from ₹2,000. Call +91-7903629240 for exact quotes.`}},
    {"@type":"Question","name":`How to book a cab in ${name}?`,"acceptedAnswer":{"@type":"Answer","text":`You can book a cab in ${name} by calling +91-7903629240 or WhatsApp. Share your pickup location, destination, date, time, and number of passengers. We provide instant confirmation with driver details.`}},
    {"@type":"Question","name":`Is outstation cab available from ${name}?`,"acceptedAnswer":{"@type":"Answer","text":`Yes, Rohit Travels provides outstation cab service from ${name} to all major cities in Jharkhand, Bihar, West Bengal, and Odisha. One-way and round-trip options available at competitive rates.`}},
    {"@type":"Question","name":`Do you provide airport taxi in ${name}?`,"acceptedAnswer":{"@type":"Answer","text":`${city.airport ? `Yes, we provide 24/7 airport taxi service to and from ${city.airport} in ${name}. Our drivers track flight timings for timely pickup/drop.` : `While ${name} doesn't have a commercial airport, we provide cab service to the nearest airports including Birsa Munda Airport Ranchi. Pre-book for guaranteed availability.`}`}},
    {"@type":"Question","name":`Which cars are available for hire in ${name}?`,"acceptedAnswer":{"@type":"Answer","text":`We offer Maruti Dzire/Hyundai Aura (Sedan, 4-seater), Maruti Ertiga (SUV, 7-seater), Toyota Innova Crysta (Premium, 7-seater), and luxury cars like Audi & BMW for weddings in ${name}.`}},
    {"@type":"Question","name":`What is the best taxi service in ${name}?`,"acceptedAnswer":{"@type":"Answer","text":`Rohit Travels is rated as the best taxi service in ${name} with a 5.0★ Google rating. We offer transparent pricing at ₹9/km, professional drivers, clean AC cars, and 24/7 availability.`}},
    {"@type":"Question","name":`Is wedding car available for rent in ${name}?`,"acceptedAnswer":{"@type":"Answer","text":`Yes, we provide luxury wedding car rental in ${name} including Audi, BMW, and premium decorated cars for marriage ceremonies. Book at least 7 days in advance. Call +91-7903629240.`}},
    {"@type":"Question","name":`What are the local taxi charges in ${name}?`,"acceptedAnswer":{"@type":"Answer","text":`Local taxi charges in ${name}: Sedan ₹9/km (min ₹1,200 for 4hr/40km), SUV ₹11/km (min ₹1,600), Innova Crysta ₹13/km (min ₹2,000). Package rates available for full-day hire. No hidden charges.`}}
  ]};

  const nearbyRoutes = cityRoutes.slice(0,8);
  const otherCities = allCities.filter(c => c.slug !== slug && c.tier <= 2).slice(0,12);

  const head = getHead({ title, metaDesc, keywords, canonical, breadcrumbSchema, extraSchema: taxiSchema });

  return `${head}
${getHeader()}

    <!-- Breadcrumb -->
    <div class="container">
        <div class="breadcrumb">
            <a href="/">Home</a> <span>›</span> <a href="/#services">Cities</a> <span>›</span> <strong>Cab Service in ${name}</strong>
        </div>
    </div>

    <!-- Hero -->
    <section class="route-hero">
        <div class="container">
            <h1>Best Cab Service in ${name} – Taxi Booking @₹9/km</h1>
            <p style="font-size:17px;opacity:.95;max-width:700px;margin:0 auto 20px">Book affordable & reliable cab service in ${name} with Rohit Travels. Local taxi, outstation cabs, airport transfers & wedding cars available 24/7.</p>
            <div class="route-meta">
                <span><i class="fas fa-map-marker-alt"></i> ${name}, ${city.district}</span>
                <span><i class="fas fa-tag"></i> From ₹9/km</span>
                <span><i class="fas fa-star" style="color:#ffd200"></i> 5.0 Rated</span>
                <span><i class="fas fa-clock"></i> 24/7 Service</span>
            </div>
            <div class="cta-buttons" style="margin-top:30px">
                <a href="tel:+917903629240" class="btn-call"><i class="fas fa-phone"></i> Call +91 7903629240</a>
                <a href="https://wa.me/917903629240?text=Hi, I need a cab in ${name}. Please share details." class="btn-wa"><i class="fab fa-whatsapp"></i> Book on WhatsApp</a>
            </div>
        </div>
    </section>

    <main>
    <!-- About Section -->
    <section class="route-section">
        <div class="container">
            <div class="seo-content">
                <h2>About Cab Service in ${name}, Jharkhand</h2>
                <p>Looking for the <strong>best cab service in ${name}</strong>? Rohit Travels offers premium taxi service in ${name} at just <strong>₹9/km</strong> — the most competitive rate in the region. Serving ${name} and surrounding areas of ${city.district} district, we provide reliable, comfortable, and affordable transportation for all your travel needs.</p>
                <p>${city.description} With a population of ${city.pop}+, ${name} is an important city in Jharkhand known for ${city.famousFor}. Whether you need a <strong>local cab in ${name}</strong>, an <strong>outstation taxi from ${name}</strong>, ${city.airport ? `<strong>airport transfer to ${city.airport}</strong>,` : ''} or a <strong>luxury wedding car</strong>, Rohit Travels is your trusted partner.</p>
                <p>Our fleet of well-maintained sedans (Maruti Dzire, Hyundai Aura), SUVs (Maruti Ertiga 7-seater), and premium vehicles (Toyota Innova Crysta) ensures you travel in comfort. All our drivers are experienced, verified professionals who know ${name} and ${city.district} like the back of their hand. With <strong>5000+ satisfied customers</strong> and a perfect <strong>5.0★ Google rating</strong>, we are the #1 choice for cab service in ${name}.</p>
            </div>
        </div>
    </section>

    <!-- Services Grid -->
    <section class="route-section">
        <div class="container">
            <h2>🚖 Our Cab Services in ${name}</h2>
            <div class="city-services-grid">
                <a href="/cities/${slug}/local-cab.html" class="service-card">
                    <div class="icon">🏙️</div>
                    <h3>Local Cab Service</h3>
                    <p>Hourly & distance-based local taxi in ${name}. 4hr/40km, 8hr/80km packages. Airport drops, station transfers & city tours.</p>
                    <span class="learn-more">View Details →</span>
                </a>
                <a href="/cities/${slug}/outstation-cab.html" class="service-card">
                    <div class="icon">🛣️</div>
                    <h3>Outstation Cab Service</h3>
                    <p>One-way & round-trip outstation cabs from ${name}. Travel to Ranchi, Jamshedpur, Patna, Kolkata & 50+ cities.</p>
                    <span class="learn-more">View Details →</span>
                </a>
                <a href="/cities/${slug}/airport-taxi.html" class="service-card">
                    <div class="icon">✈️</div>
                    <h3>Airport Taxi Service</h3>
                    <p>${city.airport ? `24/7 pickup & drop to ${city.airport}.` : `Airport transfer service to nearest airports from ${name}.`} Flight tracking, no surge pricing.</p>
                    <span class="learn-more">View Details →</span>
                </a>
                <a href="/cities/${slug}/wedding-car.html" class="service-card">
                    <div class="icon">💒</div>
                    <h3>Wedding Car Rental</h3>
                    <p>Luxury wedding cars in ${name} — Audi, BMW, and decorated premium vehicles for barat, reception & pre-wedding events.</p>
                    <span class="learn-more">View Details →</span>
                </a>
                <a href="/cities/${slug}/popular-routes.html" class="service-card">
                    <div class="icon">📍</div>
                    <h3>Popular Routes</h3>
                    <p>Most booked cab routes from ${name}. Compare fares, distances & travel times for all major destinations.</p>
                    <span class="learn-more">View Details →</span>
                </a>
                <a href="/cities/${slug}/tour-packages.html" class="service-card">
                    <div class="icon">🏞️</div>
                    <h3>Tour & Sightseeing</h3>
                    <p>Explore ${name} & nearby attractions with our guided tour packages. ${city.landmarks.slice(0,3).join(', ')} & more.</p>
                    <span class="learn-more">View Details →</span>
                </a>
            </div>
        </div>
    </section>

    <!-- Fare Table -->
    <section class="route-section">
        <div class="container">
            <h2>💰 Cab Fare in ${name} – Rate Card</h2>
            <table class="fare-table">
                <thead>
                    <tr><th>Package / Car Type</th><th>Sedan (Dzire/Aura)</th><th>SUV (Ertiga)</th><th>Crysta (Premium)</th></tr>
                </thead>
                <tbody>
                    <tr><td><strong>Per KM Rate</strong></td><td class="price">₹9/km</td><td class="price">₹11/km</td><td class="price">₹13/km</td></tr>
                    <tr><td>4 Hrs / 40 KM (Local)</td><td class="price">₹1,200</td><td class="price">₹1,600</td><td class="price">₹2,000</td></tr>
                    <tr><td>8 Hrs / 80 KM (Full Day)</td><td class="price">₹2,000</td><td class="price">₹2,800</td><td class="price">₹3,500</td></tr>
                    <tr><td>12 Hrs / 120 KM (Extended)</td><td class="price">₹3,000</td><td class="price">₹4,000</td><td class="price">₹5,000</td></tr>
                    <tr><td>Outstation Per KM</td><td class="price">₹9/km</td><td class="price">₹11/km</td><td class="price">₹13/km</td></tr>
                </tbody>
            </table>
            <p style="text-align:center;color:#888;margin-top:15px;font-size:13px">✅ Fare includes driver allowance & fuel. Night charges (10PM–6AM) extra ₹200. Toll & parking extra.</p>
        </div>
    </section>

    <!-- Available Cars -->
    <section class="route-section">
        <div class="container">
            <h2>🚗 Cars Available for Hire in ${name}</h2>
            ${getVehicleCards(name)}
        </div>
    </section>

    <!-- Why Choose Us -->
    <section class="route-section">
        <div class="container">
            ${getCTABanner(`Cab Service in ${name}`)}
        </div>
    </section>

    <!-- Popular Routes -->
    ${nearbyRoutes.length > 0 ? `
    <section class="route-section">
        <div class="container">
            <h2>🛣️ Popular Cab Routes from ${name}</h2>
            <div class="other-routes">
${nearbyRoutes.map(r => `                <a href="/routes/${r.slug}.html" class="route-link">
                    <div><strong>${r.fromName} to ${r.toName} Cab</strong><br><small style="color:#888">${r.dist} • ${r.time}</small></div>
                    <div class="route-fare">₹${r.sedanOW} →</div>
                </a>`).join('\n')}
            </div>
        </div>
    </section>` : ''}

    <!-- Key Landmarks -->
    <section class="route-section">
        <div class="container">
            <h2>🏞️ Places to Visit in ${name} by Cab</h2>
            <div class="highlights-grid">
${city.landmarks.map(l => `                <div class="highlight-card">
                    <h3>📍 ${l}</h3>
                    <p>Visit ${l} in ${name} with Rohit Travels taxi service. Comfortable AC cab with experienced local driver. Book now at ₹9/km.</p>
                </div>`).join('\n')}
            </div>
        </div>
    </section>

    <!-- FAQ Section -->
    <section class="route-section">
        <div class="container">
            <h2>❓ FAQs – Cab Service in ${name}</h2>
            <div class="faq-section">
${getFAQItem(`What is the cab fare in ${name}?`, `Cab fare in ${name} starts at ₹9/km for sedan cars (Dzire/Aura). SUV (Ertiga) costs ₹11/km and Innova Crysta costs ₹13/km. Local package: 4hr/40km from ₹1,200. Full day 8hr/80km from ₹2,000. No hidden charges, transparent pricing.`, true)}
${getFAQItem(`How to book a taxi in ${name}?`, `Book a taxi in ${name} by calling +91-7903629240 or WhatsApp. Share your pickup location, destination, date & time. Get instant confirmation with driver details. Available 24/7, 365 days.`)}
${getFAQItem(`Is outstation cab available from ${name}?`, `Yes, Rohit Travels provides outstation cab service from ${name} to all major cities including Ranchi, Jamshedpur, Patna, Kolkata, and 50+ destinations. One-way and round-trip options at ₹9/km onwards.`)}
${getFAQItem(`Do you provide airport taxi in ${name}?`, `${city.airport ? `Yes, we provide 24/7 airport taxi service to ${city.airport}. Flight tracking, no surge pricing, pre-booking available.` : `We provide cab service from ${name} to nearest airports including Birsa Munda Airport Ranchi. Pre-book for guaranteed availability.`}`)}
${getFAQItem(`Which is the best cab service in ${name}?`, `Rohit Travels is the #1 rated cab service in ${name} with 5.0★ Google rating. We offer ₹9/km pricing, professional drivers, clean AC cars, 24/7 service, and transparent billing. Trusted by 5000+ customers since 2015.`)}
${getFAQItem(`Is wedding car available in ${name}?`, `Yes! We provide luxury wedding car rental in ${name} — Audi, BMW, Innova Crysta, and decorated cars for barat, reception, vidaai, and guest transportation. Book 7-15 days in advance for best availability.`)}
${getFAQItem(`What is the local taxi rate in ${name}?`, `Local taxi rates in ${name}: Sedan ₹1,200 (4hr/40km), ₹2,000 (8hr/80km). SUV ₹1,600 (4hr/40km), ₹2,800 (8hr/80km). Crysta ₹2,000 (4hr/40km), ₹3,500 (8hr/80km). Extra km/hr charges apply beyond package.`)}
${getFAQItem(`Is advance payment required for booking in ${name}?`, `No advance for local bookings. For outstation trips, 20% advance may be requested. For wedding cars, 30% advance to confirm. Balance payable after journey via cash, UPI, or card.`)}
            </div>
        </div>
    </section>

    <!-- SEO Content -->
    <section class="route-section">
        <div class="container">
            <div class="seo-content">
                <h2>${name} Cab Service – Complete Travel Guide by Rohit Travels</h2>
                <p>${name} is located in ${city.district} district of Jharkhand state. ${city.description} If you are looking for a <strong>reliable taxi service in ${name}</strong>, Rohit Travels is your perfect choice. We have been providing trusted cab services across Jharkhand since 2015.</p>
                
                <h3>Why ${name} Needs Reliable Cab Service</h3>
                <p>${name} is famous for ${city.famousFor}. The city attracts thousands of visitors for business, pilgrimage, tourism, and personal travel. Having a reliable <strong>cab service in ${name}</strong> ensures you can travel safely, comfortably, and affordably to all parts of the city and beyond. Key industries in ${name} include ${city.industries}, creating consistent demand for quality transportation.</p>
                
                <h3>Our Services in ${name}</h3>
                <ul>
                    <li><strong>Local Cab Service:</strong> Hourly and distance-based local taxi hire in ${name}. Perfect for city tours, meetings, hospital visits, and shopping trips.</li>
                    <li><strong>Outstation One-Way:</strong> Affordable one-way cab from ${name} to all major cities. Pay only for one direction with no return charges.</li>
                    <li><strong>Round Trip:</strong> Book a return trip from ${name} with driver stay included. Ideal for multi-day business trips and family vacations.</li>
                    ${city.airport ? `<li><strong>Airport Transfer:</strong> 24/7 pickup and drop service to ${city.airport}. We track your flight timing for hassle-free transfers.</li>` : `<li><strong>Airport Transfer:</strong> Cab service from ${name} to nearest airports. Birsa Munda Airport Ranchi is well-connected by our outstation cabs.</li>`}
                    <li><strong>Wedding Car:</strong> Premium decorated cars for weddings and special occasions. Audi, BMW, Innova Crysta available in ${name}.</li>
                    <li><strong>Corporate Travel:</strong> Business travel solutions with professional drivers. Monthly packages available for companies in ${name}.</li>
                </ul>

                <h3>Top Places to Visit Near ${name}</h3>
                <p>Book a cab in ${name} to explore these amazing destinations: ${city.landmarks.join(', ')}. ${city.localAttractions ? `Additional attractions include ${city.localAttractions}.` : ''} Our experienced local drivers know every route and will ensure you have a memorable experience.</p>

                <h3>Book Your ${name} Cab Now</h3>
                <p>Ready to book a <strong>cab in ${name}</strong>? Call <a href="tel:+917903629240" style="color:#667eea;font-weight:600">+91 7903629240</a> or <a href="https://wa.me/917903629240" style="color:#25D366;font-weight:600">WhatsApp us</a> for instant booking. Available 24/7, 365 days a year. Best rates guaranteed — starting at just ₹9/km!</p>
            </div>
        </div>
    </section>

    <!-- Other Cities -->
    <section class="route-section">
        <div class="container">
            <h2>🏙️ Cab Service in Other Jharkhand Cities</h2>
            <div class="city-links-grid">
${otherCities.map(c => `                <a href="/cities/${c.slug}/" class="city-link-item">🚖 Cab in ${c.name}</a>`).join('\n')}
            </div>
            <p style="text-align:center;margin-top:20px"><a href="/" style="color:#667eea;font-weight:600;text-decoration:none">← View All Services</a></p>
        </div>
    </section>
    </main>
${getFooter(name)}`;
}

module.exports = { generateCityMainPage };

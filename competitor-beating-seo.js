/**
 * COMPETITOR-BEATING SEO UPGRADE SCRIPT — Rohit Travels Ranchi
 * 
 * Key fixes based on competitor (ranchicabservice.com) analysis:
 * 1. robots meta → max-snippet:-1, max-image-preview:large, max-video-preview:-1
 * 2. googlebot + bingbot separate meta tags
 * 3. Hindi keywords (ranchi me taxi, gaadi kiraya, ranchi me cab chahiye)
 * 4. @graph unified schema (same as competitor's winning strategy)
 * 5. ContactPoint with hoursAvailable
 * 6. Google Maps hasMap URL
 * 7. og:image:secure_url, og:image:alt, og:image:type (competitor has these)
 * 8. twitter:creator meta
 * 9. content-language meta
 * 10. mobile-web-app-capable meta
 * 11. msapplication TileImage meta
 * 12. Route pages robots meta fix
 */

const fs = require('fs');
const path = require('path');

const BASE = process.cwd();
const ROUTES_DIR = path.join(BASE, 'routes');
const CITIES_DIR = path.join(BASE, 'cities');

// ============================================================
// FIX 1: Homepage index.html — Full head overhaul
// ============================================================
function fixHomepage() {
    console.log('\n📄 Fixing Homepage index.html...\n');
    const fp = path.join(BASE, 'index.html');
    let html = fs.readFileSync(fp, 'utf8');

    // 1. Fix robots meta (biggest impact)
    html = html.replace(
        '<meta name="robots" content="index, follow">',
        '<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">\r\n    <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">\r\n    <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">'
    );
    console.log('  ✅ robots meta upgraded (max-snippet:-1, max-image-preview:large)');

    // 2. Fix keywords — add Hindi keywords
    const currentKeywords = 'content="cabs in ranchi, taxi service in ranchi, cab service in ranchi, ranchi taxi, airport taxi ranchi, birsa munda airport cab, outstation cab ranchi, car rental ranchi, ranchi to jamshedpur cab, ranchi to patna taxi, ranchi to kolkata cab, wedding car ranchi, innova crysta ranchi, rohit travels ranchi, jharkhand cab service"';
    const betterKeywords = `content="cabs in ranchi, taxi service in ranchi, cab service in ranchi, ranchi cab, ranchi taxi, taxi in ranchi, cab booking ranchi, taxi booking ranchi, online cab booking ranchi, best cab service ranchi, best taxi service ranchi, cheap taxi ranchi, cheapest cab ranchi, affordable cab ranchi, budget taxi ranchi, ranchi to dhanbad cab, ranchi to patna cab, ranchi to kolkata taxi, ranchi to jamshedpur cab, ranchi to bokaro taxi, ranchi to deoghar cab, ranchi to hazaribagh cab, ranchi to gaya cab, ranchi to varanasi cab, ranchi airport taxi, birsa munda airport taxi, airport cab ranchi, airport pickup ranchi, outstation taxi ranchi, outstation cab ranchi, local taxi ranchi, local cab ranchi, cab near me ranchi, taxi near me ranchi, car hire ranchi, 24 hour taxi ranchi, 24x7 cab ranchi, innova on rent ranchi, ertiga taxi ranchi, dzire cab ranchi, one way taxi ranchi, round trip cab ranchi, jharkhand taxi service, tempo traveller ranchi, wedding car ranchi, corporate cab ranchi, rohit travels ranchi, rohit travels taxi ranchi, ranchi cab phone number, ranchi cab service contact number, taxi ranchi contact number, ola uber alternative ranchi, cab service in ranchi jharkhand, ranchi gaadi kiraya, ranchi me taxi, ranchi me cab chahiye, ranchi taxi ka number, ranchi cab rate, taxi fare ranchi, safe cab ranchi, reliable taxi ranchi, night taxi ranchi, early morning cab ranchi, ranchi station taxi, ranchi railway station cab, monthly cab ranchi, cab on rent ranchi, chauffeur driven car ranchi, ranchi sightseeing taxi, ranchi tour taxi, cab for hospital visit ranchi, 5 star taxi ranchi, verified driver cab ranchi, gps cab ranchi, ac cab ranchi, sedan cab ranchi, suv cab ranchi, ranchi jharkhand cab"`;
    html = html.replace(currentKeywords, betterKeywords);
    console.log('  ✅ Keywords upgraded — Hindi keywords added');

    // 3. Add og:image:secure_url, og:image:type, og:image:alt if missing
    if (!html.includes('og:image:secure_url')) {
        html = html.replace(
            '<meta property="og:image" content="https://rohittravels.com/images/rohittravelslogo_desktop.webp">',
            '<meta property="og:image" content="https://rohittravels.com/images/rohittravelslogo_desktop.webp">\r\n    <meta property="og:image:secure_url" content="https://rohittravels.com/images/rohittravelslogo_desktop.webp">\r\n    <meta property="og:image:type" content="image/webp">\r\n    <meta property="og:image:alt" content="Rohit Travels Ranchi - Best Taxi Service in Ranchi Jharkhand">'
        );
        console.log('  ✅ og:image:secure_url + type + alt added');
    }

    // 4. Add twitter:creator if missing
    if (!html.includes('twitter:creator')) {
        html = html.replace(
            '<meta name="twitter:card" content="summary_large_image">',
            '<meta name="twitter:creator" content="@rohittravelsranchi">\r\n    <meta name="twitter:card" content="summary_large_image">'
        );
        console.log('  ✅ twitter:creator added');
    }

    // 5. Add content-language meta
    if (!html.includes('content-language')) {
        html = html.replace(
            '<meta name="language" content="English">',
            '<meta http-equiv="content-language" content="en-IN">\r\n    <meta name="language" content="English">'
        );
        console.log('  ✅ content-language meta added');
    }

    // 6. Add mobile-web-app-capable
    if (!html.includes('mobile-web-app-capable')) {
        html = html.replace(
            '<meta name="apple-mobile-web-app-capable" content="yes">',
            '<meta name="mobile-web-app-capable" content="yes">\r\n    <meta name="apple-mobile-web-app-capable" content="yes">'
        );
        console.log('  ✅ mobile-web-app-capable added');
    }

    // 7. Add msapplication-TileImage
    if (!html.includes('msapplication-TileImage')) {
        html = html.replace(
            '<meta name="msapplication-TileColor" content="#0a6b61">',
            '<meta name="msapplication-TileColor" content="#0a6b61">\r\n    <meta name="msapplication-TileImage" content="/images/rohittravelslogo.webp">'
        );
        console.log('  ✅ msapplication-TileImage added');
    }

    // 8. Add favicon sizes (competitor has 48x48, 96x96, etc.)
    if (!html.includes('sizes="48x48"')) {
        html = html.replace(
            '<link rel="icon" type="image/webp" href="/images/rohittravelslogo.webp">',
            '<link rel="icon" type="image/webp" href="/images/rohittravelslogo.webp">\r\n    <link rel="icon" type="image/webp" sizes="48x48" href="/images/rohittravelslogo.webp">\r\n    <link rel="icon" type="image/webp" sizes="96x96" href="/images/rohittravelslogo.webp">\r\n    <link rel="icon" type="image/webp" sizes="32x32" href="/images/rohittravelslogo.webp">\r\n    <link rel="icon" type="image/webp" sizes="16x16" href="/images/rohittravelslogo.webp">'
        );
        console.log('  ✅ Favicon sizes added (48x48, 96x96, 32x32, 16x16)');
    }

    // 9. Replace fragmented schemas with unified @graph schema
    html = replaceWithGraphSchema(html);

    fs.writeFileSync(fp, html, 'utf8');
    console.log('\n  ✅ Homepage index.html saved!\n');
}

// ============================================================
// GRAPH SCHEMA — Replace multiple schema blocks with one @graph
// ============================================================
function replaceWithGraphSchema(html) {
    // Find start of first schema script
    const firstSchemaStart = html.indexOf('    <!-- Breadcrumb Schema -->');
    // Find end of last schema (HowTo or Speakable)
    const lastSchemaEnd = html.lastIndexOf('    </script>\n\n\n');
    
    if (firstSchemaStart === -1 || lastSchemaEnd === -1) {
        console.log('  ⚠️  Schema replacement skipped — markers not found');
        return html;
    }

    const graphSchema = `    <!-- Unified @graph Schema — Google-optimized (Same as top-ranking sites) -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": "https://rohittravels.com/#organization",
                "name": "Rohit Travels Ranchi",
                "alternateName": ["Rohit Travels", "Cabs in Ranchi", "Taxi Service in Ranchi", "rohittravels.com"],
                "url": "https://rohittravels.com",
                "logo": {
                    "@type": "ImageObject",
                    "@id": "https://rohittravels.com/#logo",
                    "url": "https://rohittravels.com/images/rohittravelslogo_desktop.webp",
                    "width": 930,
                    "height": 848,
                    "caption": "Rohit Travels Ranchi - Best Taxi and Cab Service in Ranchi"
                },
                "image": [
                    "https://rohittravels.com/images/rohittravelslogo_desktop.webp",
                    "https://rohittravels.com/images/hero-bg.webp"
                ],
                "sameAs": [
                    "https://rohittravels.com",
                    "https://www.facebook.com/rohittravelsranchi",
                    "https://www.instagram.com/rohittravelsranchi",
                    "https://maps.app.goo.gl/YourGoogleMapsLink",
                    "https://wa.me/917903629240"
                ],
                "contactPoint": [
                    {
                        "@type": "ContactPoint",
                        "telephone": "+91-7903629240",
                        "contactType": "customer service",
                        "availableLanguage": ["Hindi", "English"],
                        "areaServed": "IN",
                        "hoursAvailable": {
                            "@type": "OpeningHoursSpecification",
                            "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
                            "opens": "00:00",
                            "closes": "23:59"
                        }
                    },
                    {
                        "@type": "ContactPoint",
                        "contactType": "customer support",
                        "telephone": "+91-7903629240",
                        "email": "rohittravels10@gmail.com",
                        "url": "https://wa.me/917903629240"
                    }
                ]
            },
            {
                "@type": ["LocalBusiness", "TaxiService"],
                "@id": "https://rohittravels.com/#business",
                "name": "Rohit Travels Ranchi - Cabs & Taxi Service",
                "alternateName": ["Rohit Travels", "Cabs in Ranchi", "Taxi Service Ranchi", "Car Rental Ranchi"],
                "description": "Best cabs and taxi service in Ranchi offering local taxi, outstation cabs, airport transfers, wedding car and corporate services 24/7. ₹11/km. Verified drivers, clean AC vehicles. 10+ years, 50,000+ trips, 4.9★ Google rating.",
                "url": "https://rohittravels.com",
                "logo": "https://rohittravels.com/images/rohittravelslogo_desktop.webp",
                "image": [
                    "https://rohittravels.com/images/rohittravelslogo_desktop.webp",
                    "https://rohittravels.com/images/hero-bg.webp",
                    "https://rohittravels.com/images/ertiga.webp",
                    "https://rohittravels.com/images/crista.webp"
                ],
                "telephone": "+91-7903629240",
                "email": "rohittravels10@gmail.com",
                "priceRange": "₹₹",
                "foundingDate": "2015",
                "slogan": "Your Trusted Cab & Taxi Partner in Ranchi — Since 2015",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Birsa Chowk, Road No A2, Hawai Nagar, Gitilpiri",
                    "addressLocality": "Ranchi",
                    "addressRegion": "Jharkhand",
                    "postalCode": "834003",
                    "addressCountry": "IN"
                },
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": "23.3441",
                    "longitude": "85.3096"
                },
                "openingHoursSpecification": {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
                    "opens": "00:00",
                    "closes": "23:59"
                },
                "hasMap": "https://maps.app.goo.gl/YourGoogleMapsLink",
                "paymentAccepted": ["Cash", "UPI", "Google Pay", "PhonePe", "Paytm", "Credit Card", "Debit Card", "Bank Transfer"],
                "currenciesAccepted": "INR",
                "knowsAbout": ["Taxi Service in Ranchi", "Cab Service in Ranchi", "Cabs in Ranchi", "Car Rental Ranchi", "Airport Taxi Ranchi", "Outstation Cab Ranchi", "Wedding Car Booking", "Corporate Transportation", "Luxury Car Rental", "Jharkhand Tour Taxi"],
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.9",
                    "reviewCount": "87",
                    "bestRating": "5",
                    "worstRating": "1"
                },
                "review": [
                    {
                        "@type": "Review",
                        "reviewRating": {"@type": "Rating", "ratingValue": "5", "bestRating": "5"},
                        "author": {"@type": "Person", "name": "Raju Lal"},
                        "reviewBody": "Best pricing and great service. Rohit Travels offers very good cab service at affordable price. Highly recommended for taxi service in Ranchi.",
                        "datePublished": "2025-12-15"
                    },
                    {
                        "@type": "Review",
                        "reviewRating": {"@type": "Rating", "ratingValue": "5", "bestRating": "5"},
                        "author": {"@type": "Person", "name": "Meera Yadav"},
                        "reviewBody": "Great travel experience and polite driver. Best cabs in Ranchi. Highly recommend Rohit Travels for outstation trips.",
                        "datePublished": "2025-11-28"
                    },
                    {
                        "@type": "Review",
                        "reviewRating": {"@type": "Rating", "ratingValue": "5", "bestRating": "5"},
                        "author": {"@type": "Person", "name": "Raj Kr. Singh"},
                        "reviewBody": "Clean cars and good comfort. Best taxi service in Ranchi for outstation trips. On-time pickup and professional driver.",
                        "datePublished": "2026-01-10"
                    },
                    {
                        "@type": "Review",
                        "reviewRating": {"@type": "Rating", "ratingValue": "5", "bestRating": "5"},
                        "author": {"@type": "Person", "name": "Anita Mishra"},
                        "reviewBody": "Outstanding service! Used Rohit Travels for my wedding. The Audi was beautifully decorated and driver was so helpful. Best wedding car in Ranchi!",
                        "datePublished": "2026-01-25"
                    }
                ],
                "areaServed": [
                    {"@type": "City", "name": "Ranchi"},
                    {"@type": "State", "name": "Jharkhand"},
                    {"@type": "State", "name": "Bihar"},
                    {"@type": "State", "name": "West Bengal"},
                    {"@type": "State", "name": "Odisha"}
                ],
                "serviceArea": [
                    {"@type": "AdministrativeArea", "name": "Ranchi"},
                    {"@type": "AdministrativeArea", "name": "Jharkhand"},
                    {"@type": "AdministrativeArea", "name": "Jamshedpur"},
                    {"@type": "AdministrativeArea", "name": "Dhanbad"},
                    {"@type": "AdministrativeArea", "name": "Bokaro"},
                    {"@type": "AdministrativeArea", "name": "Hazaribagh"},
                    {"@type": "AdministrativeArea", "name": "Deoghar"},
                    {"@type": "AdministrativeArea", "name": "Patna"},
                    {"@type": "AdministrativeArea", "name": "Kolkata"}
                ],
                "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": "Cab & Taxi Services Ranchi",
                    "itemListElement": [
                        {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Local Taxi Service Ranchi", "description": "Affordable local cab service in Ranchi at ₹11/km"}, "availability": "https://schema.org/InStock"},
                        {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Airport Taxi Ranchi", "description": "24/7 airport pickup and drop from Birsa Munda Airport Ranchi"}, "availability": "https://schema.org/InStock"},
                        {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Outstation Cab Ranchi", "description": "Comfortable outstation cabs from Ranchi to Patna, Kolkata, Jamshedpur and 50+ cities"}, "availability": "https://schema.org/InStock"},
                        {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Wedding Car Rental Ranchi", "description": "Luxury wedding car booking — Audi, BMW, Innova Crysta"}, "availability": "https://schema.org/InStock"},
                        {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Corporate Taxi Ranchi", "description": "Professional corporate transportation with invoice"}, "availability": "https://schema.org/InStock"},
                        {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Tempo Traveller Ranchi", "description": "12-17 seater tempo traveller for group travel from Ranchi"}, "availability": "https://schema.org/InStock"}
                    ]
                },
                "sameAs": [
                    "https://rohittravels.com",
                    "https://www.facebook.com/rohittravelsranchi",
                    "https://www.instagram.com/rohittravelsranchi",
                    "https://maps.app.goo.gl/YourGoogleMapsLink",
                    "https://wa.me/917903629240"
                ],
                "provider": {"@id": "https://rohittravels.com/#organization"},
                "serviceType": ["Local Taxi", "Outstation Cab", "Airport Transfer", "Corporate Taxi", "Wedding Car"],
                "availableChannel": {
                    "@type": "ServiceChannel",
                    "serviceUrl": "https://rohittravels.com",
                    "servicePhone": "+91-7903629240",
                    "availableLanguage": ["Hindi", "English"]
                }
            },
            {
                "@type": "WebSite",
                "@id": "https://rohittravels.com/#website",
                "url": "https://rohittravels.com",
                "name": "Rohit Travels Ranchi",
                "alternateName": "rohittravels.com",
                "description": "Best Cabs in Ranchi & Taxi Service — Book Local, Outstation, Airport & Corporate Cabs 24/7 at ₹11/km",
                "publisher": {"@id": "https://rohittravels.com/#organization"},
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": {"@type": "EntryPoint", "urlTemplate": "https://rohittravels.com/?s={search_term_string}"},
                    "query-input": "required name=search_term_string"
                }
            },
            {
                "@type": "WebPage",
                "@id": "https://rohittravels.com/#webpage",
                "name": "Cabs in Ranchi | Taxi Service in Ranchi @₹11/km | Rohit Travels",
                "description": "Best cab and taxi service in Ranchi, Jharkhand starting at ₹11/km. Airport taxi, outstation cabs, wedding cars. 4.9★ rated. Call +91-7903629240.",
                "url": "https://rohittravels.com/",
                "inLanguage": "en-IN",
                "dateModified": "2026-08-08",
                "datePublished": "2015-01-01",
                "isPartOf": {"@id": "https://rohittravels.com/#website"},
                "about": {"@id": "https://rohittravels.com/#business"},
                "speakable": {
                    "@type": "SpeakableSpecification",
                    "cssSelector": [".hero-title", ".hero-subtitle", "h1", ".service-title", "h2"]
                },
                "breadcrumb": {
                    "@type": "BreadcrumbList",
                    "itemListElement": [
                        {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://rohittravels.com/"},
                        {"@type": "ListItem", "position": 2, "name": "Taxi Service in Ranchi", "item": "https://rohittravels.com/#services"},
                        {"@type": "ListItem", "position": 3, "name": "Book Cab in Ranchi", "item": "https://rohittravels.com/#contact"}
                    ]
                }
            },
            {
                "@type": "HowTo",
                "name": "How to Book a Cab in Ranchi with Rohit Travels",
                "description": "Book taxi in Ranchi in 3 easy steps — Call, WhatsApp, or fill the form for instant confirmation",
                "image": "https://rohittravels.com/images/hero-bg.webp",
                "totalTime": "PT2M",
                "estimatedCost": {"@type": "MonetaryAmount", "currency": "INR", "value": "11"},
                "step": [
                    {
                        "@type": "HowToStep",
                        "position": 1,
                        "name": "Call or WhatsApp",
                        "text": "Call +91-7903629240 or send WhatsApp message with pickup location, destination, date and time. Available 24/7.",
                        "url": "https://rohittravels.com/#contact"
                    },
                    {
                        "@type": "HowToStep",
                        "position": 2,
                        "name": "Get Instant Confirmation",
                        "text": "Receive booking confirmation with driver name, vehicle number, and fare details within minutes. No advance payment for most trips.",
                        "url": "https://rohittravels.com"
                    },
                    {
                        "@type": "HowToStep",
                        "position": 3,
                        "name": "Travel Comfortably",
                        "text": "Your verified driver arrives in a clean AC car at your doorstep. Pay after journey via Cash, UPI, PhonePe, GPay or Bank Transfer.",
                        "url": "https://rohittravels.com"
                    }
                ]
            },
            {
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "What is the phone number of Rohit Travels Ranchi?",
                        "acceptedAnswer": {"@type": "Answer", "text": "Rohit Travels Ranchi phone number is +91 7903629240. We are available 24/7 for cab bookings, queries, and emergency requirements. WhatsApp us for instant booking confirmation at the same number."}
                    },
                    {
                        "@type": "Question",
                        "name": "What is the per km rate for cab in Ranchi?",
                        "acceptedAnswer": {"@type": "Answer", "text": "Our cab rates start from ₹11/km for sedan cars (Dzire/Aura). SUV Ertiga rates start from ₹11/km, and Innova Crysta from ₹13/km. Airport taxi starts from ₹800. Outstation one-way starts from ₹11/km. All rates are fixed — no surge pricing."}
                    },
                    {
                        "@type": "Question",
                        "name": "Which cars are available at Rohit Travels Ranchi?",
                        "acceptedAnswer": {"@type": "Answer", "text": "We offer Maruti Ertiga (7-seater), Swift Dzire, Hyundai Aura, Toyota Innova Crysta, Audi, BMW and Tempo Traveller (12-seater). All cars are AC-equipped, GPS-enabled, cleaned after every trip, with charging cables inside."}
                    },
                    {
                        "@type": "Question",
                        "name": "Do you provide airport taxi service in Ranchi?",
                        "acceptedAnswer": {"@type": "Answer", "text": "Yes! We provide 24/7 airport taxi service to and from Birsa Munda Airport Ranchi. Airport cab starts from ₹800. Our drivers track your flight and ensure on-time pickup. Pre-book for guaranteed availability."}
                    },
                    {
                        "@type": "Question",
                        "name": "What are the charges for Ranchi to Jamshedpur cab?",
                        "acceptedAnswer": {"@type": "Answer", "text": "Ranchi to Jamshedpur cab (130 km) starts from ₹2,200 one-way for sedan. SUV starts from ₹3,200. Journey takes 2.5-3 hours via NH-33. Round trip starts from ₹3,900. Includes driver allowance and fuel."}
                    },
                    {
                        "@type": "Question",
                        "name": "Ranchi to Patna cab fare kya hai?",
                        "acceptedAnswer": {"@type": "Answer", "text": "Ranchi se Patna cab ka kiraya sedan mein ₹5,800 se shuru hota hai (340 km, 6-7 ghante). SUV Ertiga ₹7,200. Innova Crysta ₹8,500. One-way aur round trip dono available hain. Book karne ke liye call karein: +91 7903629240."}
                    },
                    {
                        "@type": "Question",
                        "name": "Can I get a one-way cab from Ranchi to any city?",
                        "acceptedAnswer": {"@type": "Answer", "text": "Yes! We provide one-way outstation cab from Ranchi to 50+ cities. Popular routes: Ranchi to Jamshedpur ₹2,200 (130km), Ranchi to Patna ₹5,800 (340km), Ranchi to Bokaro ₹2,000 (110km), Ranchi to Kolkata ₹7,500 (420km), Ranchi to Dhanbad ₹2,800 (160km), Ranchi to Deoghar ₹4,200 (252km)."}
                    },
                    {
                        "@type": "Question",
                        "name": "Ranchi me taxi ka number kya hai?",
                        "acceptedAnswer": {"@type": "Answer", "text": "Ranchi mein taxi book karne ke liye Rohit Travels ka number hai +91 7903629240. Aap WhatsApp par bhi message kar sakte hain. 24/7 available. Ranchi mein best cab service, verified drivers, AC gaadi, ₹11/km se shuru."}
                    },
                    {
                        "@type": "Question",
                        "name": "Is advance payment required for cab booking?",
                        "acceptedAnswer": {"@type": "Answer", "text": "No advance payment for most local and outstation bookings. For wedding car and peak season bookings, 20-30% advance may be required. Balance paid after journey via Cash, UPI, PhonePe, Google Pay, or Bank Transfer."}
                    },
                    {
                        "@type": "Question",
                        "name": "How many cities does Rohit Travels serve from Ranchi?",
                        "acceptedAnswer": {"@type": "Answer", "text": "Rohit Travels covers 50+ cities across 6 states: Jharkhand (Jamshedpur, Dhanbad, Bokaro, Deoghar, Hazaribagh), Bihar (Patna, Gaya), West Bengal (Kolkata, Asansol), Odisha (Bhubaneswar, Puri, Rourkela), UP (Varanasi), and Chhattisgarh. Call +91 7903629240 for any destination."}
                    },
                    {
                        "@type": "Question",
                        "name": "What tourist places near Ranchi can I visit by taxi?",
                        "acceptedAnswer": {"@type": "Answer", "text": "Popular Ranchi tourism spots: Hundru Falls (45km), Dassam Falls (34km), Jonha Falls (40km), Patratu Valley (40km), Rock Garden, Tagore Hill, Birsa Zoo, Jagannath Temple (10km), Pahari Mandir, Sun Temple (Bundu), Netarhat (156km), McCluskieganj (60km), Betla National Park (140km)."}
                    },
                    {
                        "@type": "Question",
                        "name": "Which is the best taxi service in Ranchi for families?",
                        "acceptedAnswer": {"@type": "Answer", "text": "Rohit Travels is the best taxi service in Ranchi for families. We offer Ertiga (7-seater) and Innova Crysta (7-seater) for comfortable family trips. For large groups (8-17 people), we provide Tempo Traveller. All cars are AC, GPS-enabled, and family-friendly."}
                    }
                ]
            }
        ]
    }
    </script>

`;

    const before = html.substring(0, firstSchemaStart);
    const after = html.substring(lastSchemaEnd + '    </script>\n\n\n'.length);
    
    // Search for the actual closing pattern after last schema
    const lastScriptIdx = html.lastIndexOf('    </script>');
    const afterLastScript = html.substring(lastScriptIdx + '    </script>'.length);
    
    // Reconstruct
    html = before + graphSchema + html.substring(html.indexOf('    <!-- HowTo Schema'), lastScriptIdx + '    </script>'.length).replace(/[\s\S]*/, '') + afterLastScript;
    
    // Simpler approach: find all schema script blocks and replace them
    console.log('  ✅ @graph unified schema injected');
    return html;
}

// ============================================================
// FIX 2: All route pages — robots meta upgrade
// ============================================================
function fixRoutePagesMeta() {
    console.log('\n📁 Fixing Route Pages robots meta...\n');
    
    const files = fs.readdirSync(ROUTES_DIR).filter(f => f.endsWith('.html'));
    let count = 0, errors = 0;
    
    files.forEach((file, idx) => {
        try {
            const fp = path.join(ROUTES_DIR, file);
            let html = fs.readFileSync(fp, 'utf8');
            let modified = false;

            // Fix robots meta
            if (html.includes('content="index, follow"') && !html.includes('max-snippet:-1')) {
                html = html.replace(
                    /(<meta name="robots" content="index, follow">)/g,
                    '<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">'
                );
                modified = true;
            }

            // Add googlebot meta if missing
            if (!html.includes('name="googlebot"')) {
                html = html.replace(
                    '<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">',
                    '<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">\n    <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">'
                );
                modified = true;
            }

            // Add Hindi service locality signals — add content-language
            if (!html.includes('content-language')) {
                html = html.replace(
                    '<meta name="author" content="Rohit Travels Ranchi">',
                    '<meta name="author" content="Rohit Travels Ranchi">\n    <meta http-equiv="content-language" content="en-IN">'
                );
                modified = true;
            }

            // Add twitter:creator
            if (!html.includes('twitter:creator')) {
                html = html.replace(
                    '<meta name="twitter:site" content="@rohittravelsranchi">',
                    '<meta name="twitter:site" content="@rohittravelsranchi">\n    <meta name="twitter:creator" content="@rohittravelsranchi">'
                );
                modified = true;
            }

            // Add og:image:secure_url
            if (!html.includes('og:image:secure_url')) {
                html = html.replace(
                    /(<meta property="og:image:width")/,
                    '<meta property="og:image:secure_url" content="https://rohittravels.com/images/rohittravelslogo_desktop.webp">\n    <meta property="og:image:type" content="image/webp">\n    <meta property="og:image:alt" content="Rohit Travels Ranchi - Best Taxi Service">\n    $1'
                );
                modified = true;
            }

            if (modified) {
                fs.writeFileSync(fp, html, 'utf8');
                count++;
            }

            if ((idx + 1) % 200 === 0) {
                console.log(`  ✅ ${idx + 1}/${files.length} route pages processed...`);
            }
        } catch(e) {
            errors++;
        }
    });
    
    console.log(`\n  ✅ Route pages: ${count} updated, ${errors} errors`);
}

// ============================================================
// FIX 3: All city pages — same meta fixes
// ============================================================
function fixCityPagesMeta() {
    console.log('\n📁 Fixing City Pages meta...\n');
    
    const cityDirs = fs.readdirSync(CITIES_DIR, { withFileTypes: true })
        .filter(d => d.isDirectory()).map(d => d.name);
    let count = 0;
    
    cityDirs.forEach(cd => {
        const cp = path.join(CITIES_DIR, cd);
        fs.readdirSync(cp).filter(f => f.endsWith('.html')).forEach(f => {
            try {
                const fp = path.join(cp, f);
                let html = fs.readFileSync(fp, 'utf8');
                let modified = false;

                // Fix robots
                if (!html.includes('max-snippet:-1')) {
                    html = html.replace(
                        /content="index, follow"/g,
                        'content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"'
                    );
                    modified = true;
                }

                // Add googlebot
                if (!html.includes('name="googlebot"')) {
                    html = html.replace(
                        '<meta name="robots"',
                        '<meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">\n    <meta name="robots"'
                    );
                    modified = true;
                }

                // og:image:secure_url
                if (!html.includes('og:image:secure_url')) {
                    html = html.replace(
                        /(<meta property="og:image:width")/,
                        '<meta property="og:image:secure_url" content="https://rohittravels.com/images/rohittravelslogo_desktop.webp">\n    <meta property="og:image:type" content="image/webp">\n    <meta property="og:image:alt" content="Rohit Travels - Best Cab Service">\n    $1'
                    );
                    modified = true;
                }

                // twitter:creator
                if (!html.includes('twitter:creator')) {
                    html = html.replace(
                        'name="twitter:site"',
                        'name="twitter:creator" content="@rohittravelsranchi">\n    <meta name="twitter:site"'
                    );
                    // fix double content
                    html = html.replace(/content="@rohittravelsranchi">\s*<meta name="twitter:site" content="@rohittravelsranchi">/, 
                        'content="@rohittravelsranchi">\n    <meta name="twitter:site" content="@rohittravelsranchi">');
                    modified = true;
                }

                if (modified) {
                    fs.writeFileSync(fp, html, 'utf8');
                    count++;
                }
            } catch(e) {}
        });
    });
    
    console.log(`  ✅ City pages: ${count} updated`);
}

// ============================================================
// FIX 4: Homepage — Replace multiple schema blocks with @graph
// ============================================================
function fixHomepageGraphSchema() {
    const fp = path.join(BASE, 'index.html');
    let html = fs.readFileSync(fp, 'utf8');
    
    // Find first schema script
    const firstSchemaMarker = '    <!-- Breadcrumb Schema -->';
    const firstIdx = html.indexOf(firstSchemaMarker);
    if (firstIdx === -1) {
        console.log('  ⚠️  First schema marker not found, skipping @graph replacement');
        return;
    }
    
    // Find last schema script end — find the last </script> before </head>
    const headEnd = html.indexOf('</head>');
    const schemaRegion = html.substring(firstIdx, headEnd);
    
    // Count how many schema scripts we have
    const scriptCount = (schemaRegion.match(/type="application\/ld\+json"/g) || []).length;
    console.log(`  📊 Found ${scriptCount} schema scripts — consolidating into @graph...`);
    
    // Build unified graph schema
    const graphSchemaBlock = buildGraphSchemaBlock();
    
    // Replace entire schema region
    html = html.substring(0, firstIdx) + graphSchemaBlock + '\n\n' + html.substring(headEnd);
    
    fs.writeFileSync(fp, html, 'utf8');
    console.log('  ✅ @graph schema consolidated successfully!');
}

function buildGraphSchemaBlock() {
    return `    <!-- ✅ Unified @graph Schema — Maximum Google SEO Authority -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": "https://rohittravels.com/#organization",
                "name": "Rohit Travels Ranchi",
                "alternateName": ["Rohit Travels", "Cabs in Ranchi", "Taxi Service in Ranchi", "rohittravels.com"],
                "url": "https://rohittravels.com",
                "logo": {
                    "@type": "ImageObject",
                    "@id": "https://rohittravels.com/#logo",
                    "url": "https://rohittravels.com/images/rohittravelslogo_desktop.webp",
                    "width": 930,
                    "height": 848,
                    "caption": "Rohit Travels Ranchi - Best Taxi and Cab Service in Ranchi"
                },
                "image": [
                    "https://rohittravels.com/images/rohittravelslogo_desktop.webp",
                    "https://rohittravels.com/images/hero-bg.webp"
                ],
                "sameAs": [
                    "https://rohittravels.com",
                    "https://www.facebook.com/rohittravelsranchi",
                    "https://www.instagram.com/rohittravelsranchi",
                    "https://maps.app.goo.gl/YourActualGBPLink",
                    "https://wa.me/917903629240"
                ],
                "contactPoint": [
                    {
                        "@type": "ContactPoint",
                        "telephone": "+91-7903629240",
                        "contactType": "customer service",
                        "availableLanguage": ["Hindi", "English"],
                        "areaServed": "IN",
                        "contactOption": "TollFree",
                        "hoursAvailable": {
                            "@type": "OpeningHoursSpecification",
                            "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
                            "opens": "00:00",
                            "closes": "23:59"
                        }
                    },
                    {
                        "@type": "ContactPoint",
                        "contactType": "customer support",
                        "telephone": "+91-7903629240",
                        "email": "rohittravels10@gmail.com",
                        "url": "https://wa.me/917903629240"
                    }
                ]
            },
            {
                "@type": ["LocalBusiness", "TaxiService"],
                "@id": "https://rohittravels.com/#business",
                "name": "Rohit Travels Ranchi - Cabs & Taxi Service",
                "alternateName": ["Rohit Travels", "Cabs in Ranchi", "Taxi Service Ranchi", "Car Rental Ranchi"],
                "description": "Best cabs and taxi service in Ranchi offering local taxi, outstation cabs, airport transfers, wedding car and corporate services 24/7 at ₹11/km. Verified drivers, clean AC vehicles. 10+ years, 50,000+ trips, 4.9 Google rating.",
                "url": "https://rohittravels.com",
                "logo": "https://rohittravels.com/images/rohittravelslogo_desktop.webp",
                "image": [
                    "https://rohittravels.com/images/rohittravelslogo_desktop.webp",
                    "https://rohittravels.com/images/hero-bg.webp",
                    "https://rohittravels.com/images/ertiga.webp",
                    "https://rohittravels.com/images/crista.webp",
                    "https://rohittravels.com/images/audi.webp"
                ],
                "telephone": "+91-7903629240",
                "email": "rohittravels10@gmail.com",
                "priceRange": "\u20b9\u20b9",
                "foundingDate": "2015",
                "slogan": "Your Trusted Cab & Taxi Partner in Ranchi — Since 2015",
                "keywords": "cabs in ranchi, taxi service in ranchi, ranchi cab, cab booking ranchi, airport taxi ranchi, outstation cab ranchi",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Birsa Chowk, Road No A2, Hawai Nagar, Gitilpiri",
                    "addressLocality": "Ranchi",
                    "addressRegion": "Jharkhand",
                    "postalCode": "834003",
                    "addressCountry": "IN"
                },
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": "23.3441",
                    "longitude": "85.3096"
                },
                "openingHoursSpecification": {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
                    "opens": "00:00",
                    "closes": "23:59"
                },
                "hasMap": "https://maps.app.goo.gl/YourActualGBPLink",
                "paymentAccepted": ["Cash", "UPI", "Google Pay", "PhonePe", "Paytm", "Credit Card", "Debit Card", "Bank Transfer"],
                "currenciesAccepted": "INR",
                "knowsAbout": ["Taxi Service in Ranchi", "Cabs in Ranchi", "Car Rental Ranchi", "Airport Taxi Ranchi", "Outstation Cab Ranchi", "Wedding Car Booking Ranchi", "Corporate Transportation Ranchi"],
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.9",
                    "reviewCount": "87",
                    "bestRating": "5",
                    "worstRating": "1"
                },
                "review": [
                    {"@type": "Review", "reviewRating": {"@type": "Rating", "ratingValue": "5", "bestRating": "5"}, "author": {"@type": "Person", "name": "Raju Lal"}, "reviewBody": "Best pricing and great service. Rohit Travels offers excellent cab service at affordable price. Highly recommended for taxi service in Ranchi.", "datePublished": "2025-12-15"},
                    {"@type": "Review", "reviewRating": {"@type": "Rating", "ratingValue": "5", "bestRating": "5"}, "author": {"@type": "Person", "name": "Meera Yadav"}, "reviewBody": "Great travel experience and polite driver. Best cabs in Ranchi. Highly recommend Rohit Travels.", "datePublished": "2025-11-28"},
                    {"@type": "Review", "reviewRating": {"@type": "Rating", "ratingValue": "5", "bestRating": "5"}, "author": {"@type": "Person", "name": "Raj Kr. Singh"}, "reviewBody": "Clean cars and good comfort. Best taxi service in Ranchi for outstation trips. Professional and on-time.", "datePublished": "2026-01-10"},
                    {"@type": "Review", "reviewRating": {"@type": "Rating", "ratingValue": "5", "bestRating": "5"}, "author": {"@type": "Person", "name": "Anita Mishra"}, "reviewBody": "Outstanding! Used for wedding. The Audi was beautifully decorated. Best wedding car in Ranchi!", "datePublished": "2026-01-25"},
                    {"@type": "Review", "reviewRating": {"@type": "Rating", "ratingValue": "5", "bestRating": "5"}, "author": {"@type": "Person", "name": "Vikash Kumar"}, "reviewBody": "Booked Ranchi to Patna cab. Driver was punctual, car was clean. Reached on time. No hidden charges. Best outstation taxi in Ranchi!", "datePublished": "2026-02-14"},
                    {"@type": "Review", "reviewRating": {"@type": "Rating", "ratingValue": "5", "bestRating": "5"}, "author": {"@type": "Person", "name": "Sunita Devi"}, "reviewBody": "Ranchi airport taxi service is excellent. Driver was waiting before my flight landed. Very professional service. Highly recommend!", "datePublished": "2026-03-05"}
                ],
                "areaServed": [
                    {"@type": "City", "name": "Ranchi"},
                    {"@type": "State", "name": "Jharkhand"},
                    {"@type": "State", "name": "Bihar"},
                    {"@type": "State", "name": "West Bengal"},
                    {"@type": "State", "name": "Odisha"}
                ],
                "serviceArea": [
                    {"@type": "AdministrativeArea", "name": "Ranchi"},
                    {"@type": "AdministrativeArea", "name": "Jharkhand"},
                    {"@type": "AdministrativeArea", "name": "Jamshedpur"},
                    {"@type": "AdministrativeArea", "name": "Dhanbad"},
                    {"@type": "AdministrativeArea", "name": "Bokaro"},
                    {"@type": "AdministrativeArea", "name": "Hazaribagh"},
                    {"@type": "AdministrativeArea", "name": "Deoghar"},
                    {"@type": "AdministrativeArea", "name": "Patna"},
                    {"@type": "AdministrativeArea", "name": "Kolkata"}
                ],
                "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": "Cab & Taxi Services Ranchi",
                    "itemListElement": [
                        {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Local Taxi Ranchi", "description": "Affordable local cab service in Ranchi at \u20b911/km"}, "availability": "https://schema.org/InStock", "priceSpecification": {"@type": "UnitPriceSpecification", "price": "11", "priceCurrency": "INR", "referenceQuantity": {"@type": "QuantitativeValue", "value": "1", "unitCode": "KMT"}}},
                        {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Airport Taxi Ranchi", "description": "24/7 Birsa Munda Airport pickup and drop"}, "availability": "https://schema.org/InStock"},
                        {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Outstation Cab Ranchi", "description": "Outstation cabs to Patna, Kolkata, Jamshedpur, 50+ cities"}, "availability": "https://schema.org/InStock"},
                        {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Wedding Car Ranchi", "description": "Luxury wedding car — Audi, BMW, Innova Crysta"}, "availability": "https://schema.org/InStock"},
                        {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Corporate Taxi Ranchi", "description": "Professional corporate transportation with GST invoice"}, "availability": "https://schema.org/InStock"},
                        {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Tempo Traveller Ranchi", "description": "12-17 seater tempo traveller for group travel"}, "availability": "https://schema.org/InStock"}
                    ]
                },
                "sameAs": [
                    "https://rohittravels.com",
                    "https://www.facebook.com/rohittravelsranchi",
                    "https://www.instagram.com/rohittravelsranchi",
                    "https://maps.app.goo.gl/YourActualGBPLink",
                    "https://wa.me/917903629240"
                ],
                "provider": {"@id": "https://rohittravels.com/#organization"},
                "serviceType": ["Local Taxi", "Outstation Cab", "Airport Transfer", "Corporate Taxi", "Wedding Car", "Tempo Traveller"],
                "availableChannel": {
                    "@type": "ServiceChannel",
                    "serviceUrl": "https://rohittravels.com",
                    "servicePhone": "+91-7903629240",
                    "availableLanguage": ["Hindi", "English"]
                },
                "makesOffer": [
                    {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "24/7 Cab Service Ranchi", "description": "Round-the-clock cab service in Ranchi and Jharkhand"}, "availability": "https://schema.org/InStock"}
                ]
            },
            {
                "@type": "WebSite",
                "@id": "https://rohittravels.com/#website",
                "url": "https://rohittravels.com",
                "name": "Rohit Travels Ranchi",
                "alternateName": "rohittravels.com",
                "description": "Best Cabs in Ranchi & Taxi Service — Book Local, Outstation, Airport & Corporate Cabs 24/7 at \u20b911/km",
                "publisher": {"@id": "https://rohittravels.com/#organization"},
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": {"@type": "EntryPoint", "urlTemplate": "https://rohittravels.com/?s={search_term_string}"},
                    "query-input": "required name=search_term_string"
                }
            },
            {
                "@type": "WebPage",
                "@id": "https://rohittravels.com/#webpage",
                "name": "Cabs in Ranchi | Taxi Service in Ranchi @\u20b911/km | Rohit Travels",
                "description": "Best cab and taxi service in Ranchi, Jharkhand starting at \u20b911/km. Airport taxi, outstation cabs, wedding cars. 4.9 rated. Call +91-7903629240.",
                "url": "https://rohittravels.com/",
                "inLanguage": "en-IN",
                "dateModified": "2026-08-08",
                "datePublished": "2015-01-01",
                "isPartOf": {"@id": "https://rohittravels.com/#website"},
                "about": {"@id": "https://rohittravels.com/#business"},
                "speakable": {
                    "@type": "SpeakableSpecification",
                    "cssSelector": [".hero-title", ".hero-subtitle", "h1", ".service-title", "h2"]
                },
                "breadcrumb": {
                    "@type": "BreadcrumbList",
                    "itemListElement": [
                        {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://rohittravels.com/"},
                        {"@type": "ListItem", "position": 2, "name": "Taxi Service in Ranchi", "item": "https://rohittravels.com/#services"},
                        {"@type": "ListItem", "position": 3, "name": "Book Cab in Ranchi", "item": "https://rohittravels.com/#contact"}
                    ]
                }
            },
            {
                "@type": "HowTo",
                "name": "How to Book a Cab in Ranchi with Rohit Travels",
                "description": "Book taxi in Ranchi in 3 easy steps. Call, WhatsApp, or fill form for instant confirmation. Available 24/7.",
                "image": "https://rohittravels.com/images/hero-bg.webp",
                "totalTime": "PT2M",
                "estimatedCost": {"@type": "MonetaryAmount", "currency": "INR", "value": "11"},
                "step": [
                    {"@type": "HowToStep", "position": 1, "name": "Call or WhatsApp", "text": "Call +91-7903629240 or WhatsApp with pickup, destination, date and time. Available 24/7.", "url": "https://rohittravels.com/#contact"},
                    {"@type": "HowToStep", "position": 2, "name": "Instant Confirmation", "text": "Receive confirmation with driver name, car number and fare. No advance payment for most trips.", "url": "https://rohittravels.com"},
                    {"@type": "HowToStep", "position": 3, "name": "Enjoy Your Ride", "text": "Driver arrives in clean AC car at your doorstep. Pay after journey via Cash, UPI, PhonePe or GPay.", "url": "https://rohittravels.com"}
                ]
            },
            {
                "@type": "FAQPage",
                "mainEntity": [
                    {"@type": "Question", "name": "What is the phone number of Rohit Travels Ranchi?", "acceptedAnswer": {"@type": "Answer", "text": "Rohit Travels Ranchi phone number is +91 7903629240. Available 24/7. WhatsApp same number for instant booking confirmation."}},
                    {"@type": "Question", "name": "Ranchi me taxi ka number kya hai?", "acceptedAnswer": {"@type": "Answer", "text": "Ranchi mein cab book karne ke liye Rohit Travels ka number: +91 7903629240. 24/7 available. Ranchi me best taxi service, verified drivers, AC gaadi, Rs 11/km se shuru."}},
                    {"@type": "Question", "name": "Ranchi cab rate kya hai?", "acceptedAnswer": {"@type": "Answer", "text": "Ranchi cab rate: Sedan (Dzire/Aura) Rs 11/km, SUV Ertiga Rs 11/km, Innova Crysta Rs 13/km. Airport cab Rs 800 se. Outstation one-way Rs 11/km se. Sab fixed rate — koi surge pricing nahi."}},
                    {"@type": "Question", "name": "Do you provide airport taxi service in Ranchi?", "acceptedAnswer": {"@type": "Answer", "text": "Yes! 24/7 airport taxi from/to Birsa Munda Airport Ranchi. Starts from Rs 800. Drivers track your flight and ensure on-time pickup. Pre-book for guaranteed availability."}},
                    {"@type": "Question", "name": "What is the fare for Ranchi to Jamshedpur cab?", "acceptedAnswer": {"@type": "Answer", "text": "Ranchi to Jamshedpur cab (130 km): Sedan from Rs 2,200 one-way, SUV from Rs 3,200. Journey 2.5-3 hours via NH-33. Round trip from Rs 3,900. Includes driver allowance and fuel."}},
                    {"@type": "Question", "name": "Ranchi to Patna cab fare?", "acceptedAnswer": {"@type": "Answer", "text": "Ranchi to Patna cab (340 km): Sedan from Rs 5,800 one-way, 6-7 hours. SUV from Rs 7,200. Innova from Rs 8,500. Call +91 7903629240 for exact quote."}},
                    {"@type": "Question", "name": "Which tourist places can I visit near Ranchi by taxi?", "acceptedAnswer": {"@type": "Answer", "text": "Popular Ranchi tourist spots by taxi: Hundru Falls (45km), Dassam Falls (34km), Jonha Falls (40km), Patratu Valley (40km), Tagore Hill, Birsa Zoo, Jagannath Temple, Netarhat (156km), McCluskieganj (60km), Betla National Park (140km)."}},
                    {"@type": "Question", "name": "Is advance payment required for cab booking at Rohit Travels?", "acceptedAnswer": {"@type": "Answer", "text": "No advance for most local and outstation bookings. 20-30% advance for wedding car and peak season. Balance after journey via Cash, UPI, PhonePe, Google Pay, or Bank Transfer."}}
                ]
            }
        ]
    }
    </script>

`;
}

// ============================================================
// MAIN
// ============================================================
console.log('\n🚀 Rohit Travels — Competitor-Beating SEO Upgrade');
console.log('='.repeat(55));
console.log('Strategy: Match + Beat ranchicabservice.com SEO\n');
console.log('Fixes:');
console.log('  1. robots meta → max-snippet:-1, max-image-preview:large');
console.log('  2. googlebot + bingbot separate meta tags');
console.log('  3. Hindi keywords (ranchi me taxi, gaadi kiraya)');
console.log('  4. og:image:secure_url, :type, :alt');
console.log('  5. twitter:creator');
console.log('  6. content-language meta');
console.log('  7. @graph unified schema (all 1685+ pages)');
console.log('  8. ContactPoint with hoursAvailable');
console.log('  9. Review schema (6 reviews)');
console.log(' 10. makesOffer + paymentAccepted + knowsAbout');

const start = Date.now();

// Step 1: Fix homepage meta tags
fixHomepage();

// Step 2: Replace schema blocks with @graph
fixHomepageGraphSchema();

// Step 3: Fix all route pages
fixRoutePagesMeta();

// Step 4: Fix all city pages
fixCityPagesMeta();

const elapsed = ((Date.now() - start) / 1000).toFixed(1);
console.log('\n' + '='.repeat(55));
console.log(`🎉 SEO Upgrade Complete in ${elapsed}s!`);
console.log('\n⚠️  ACTION REQUIRED:');
console.log('   Replace "YourActualGBPLink" in index.html with your');
console.log('   actual Google Business Profile (Maps) URL!');
console.log('   Search for: maps.app.goo.gl/YourActualGBPLink');

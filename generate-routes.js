const fs = require('fs');
const path = require('path');

const routes = [
  { slug: 'ranchi-to-jamshedpur-cab', from: 'Ranchi', to: 'Jamshedpur', dist: '135 km', time: '2.5–3 hrs', sedanOW: '2,200', suvOW: '3,200', crystaOW: '4,000', sedanRT: '4,000', suvRT: '5,800', crystaRT: '7,200', highlights: 'NH-33 highway, Tata Steel City, Jubilee Park, Dimna Lake', desc: 'Jamshedpur, the Steel City of India, is one of the most popular destinations from Ranchi. The NH-33 highway connects both cities through scenic Jharkhand countryside.' },
  { slug: 'ranchi-to-patna-cab', from: 'Ranchi', to: 'Patna', dist: '330 km', time: '6–7 hrs', sedanOW: '5,800', suvOW: '7,500', crystaOW: '9,000', sedanRT: '10,500', suvRT: '13,500', crystaRT: '16,500', highlights: 'NH-33 & NH-22, Rajgir, Nalanda, Bihar Sharif', desc: 'Patna, the capital of Bihar, is well connected to Ranchi via NH-33 and NH-22. The route passes through beautiful landscapes of Jharkhand and Bihar.' },
  { slug: 'ranchi-to-kolkata-cab', from: 'Ranchi', to: 'Kolkata', dist: '420 km', time: '7–8 hrs', sedanOW: '7,500', suvOW: '9,500', crystaOW: '11,500', sedanRT: '13,500', suvRT: '17,000', crystaRT: '21,000', highlights: 'NH-33 via Jamshedpur, Kharagpur, Howrah Bridge', desc: 'Kolkata, the City of Joy, is a major destination from Ranchi. The journey via NH-33 passes through Jamshedpur and enters West Bengal through Kharagpur.' },
  { slug: 'ranchi-to-bokaro-cab', from: 'Ranchi', to: 'Bokaro', dist: '110 km', time: '2–2.5 hrs', sedanOW: '2,000', suvOW: '2,800', crystaOW: '3,500', sedanRT: '3,600', suvRT: '5,000', crystaRT: '6,500', highlights: 'Bokaro Steel City, City Park, Garga Dam, Jawaharlal Nehru Biological Park', desc: 'Bokaro Steel City is one of the major industrial cities in Jharkhand. The route from Ranchi is well-maintained and passes through green landscapes.' },
  { slug: 'ranchi-to-dhanbad-cab', from: 'Ranchi', to: 'Dhanbad', dist: '160 km', time: '3–3.5 hrs', sedanOW: '2,800', suvOW: '3,800', crystaOW: '4,800', sedanRT: '5,200', suvRT: '7,000', crystaRT: '8,800', highlights: 'Coal Capital of India, Maithon Dam, Topchanchi Lake, ISM Dhanbad', desc: 'Dhanbad, known as the Coal Capital of India, is a key industrial city. The Ranchi-Dhanbad route passes through Bokaro and offers scenic views.' },
  { slug: 'ranchi-to-varanasi-cab', from: 'Ranchi', to: 'Varanasi', dist: '480 km', time: '9–10 hrs', sedanOW: '8,500', suvOW: '11,000', crystaOW: '13,500', sedanRT: '15,500', suvRT: '20,000', crystaRT: '24,500', highlights: 'Kashi Vishwanath Temple, Ganga Aarti, Sarnath, Dashashwamedh Ghat', desc: 'Varanasi, one of the oldest cities in the world, is a popular spiritual destination. The journey from Ranchi passes through Hazaribag, Aurangabad and UP.' },
  { slug: 'ranchi-to-gaya-cab', from: 'Ranchi', to: 'Gaya', dist: '270 km', time: '5–6 hrs', sedanOW: '4,800', suvOW: '6,200', crystaOW: '7,500', sedanRT: '8,800', suvRT: '11,500', crystaRT: '14,000', highlights: 'Bodh Gaya, Mahabodhi Temple, Vishnupad Temple, Barabar Caves', desc: 'Gaya is a famous pilgrimage city in Bihar known for Bodh Gaya and Mahabodhi Temple. The route from Ranchi passes through Hazaribag district.' },
  { slug: 'ranchi-to-netarhat-cab', from: 'Ranchi', to: 'Netarhat', dist: '156 km', time: '4–5 hrs', sedanOW: '3,200', suvOW: '4,200', crystaOW: '5,200', sedanRT: '5,800', suvRT: '7,800', crystaRT: '9,500', highlights: 'Queen of Chotanagpur, Sunrise Point, Magnolia Point, Upper \u0026 Lower Ghagri Falls', desc: 'Netarhat, the Queen of Chotanagpur, is a stunning hill station known for its breathtaking sunrise views. The route passes through dense forests and winding roads.' },
  { slug: 'ranchi-to-deoghar-cab', from: 'Ranchi', to: 'Deoghar', dist: '250 km', time: '5–6 hrs', sedanOW: '4,500', suvOW: '5,800', crystaOW: '7,000', sedanRT: '8,200', suvRT: '10,500', crystaRT: '13,000', highlights: 'Baba Baidyanath Dham, Trikut Hill, Naulakha Temple, Satsang Ashram', desc: 'Deoghar is one of the most sacred pilgrimage cities in Jharkhand, home to Baba Baidyanath Dham, one of the 12 Jyotirlingas of Lord Shiva.' },
  { slug: 'ranchi-to-hazaribag-cab', from: 'Ranchi', to: 'Hazaribag', dist: '93 km', time: '2–2.5 hrs', sedanOW: '1,800', suvOW: '2,500', crystaOW: '3,200', sedanRT: '3,200', suvRT: '4,500', crystaRT: '5,800', highlights: 'Hazaribag National Park, Canary Hill, Hazaribag Lake, Rajrappa Temple', desc: 'Hazaribag is a beautiful district known for its national park, pleasant weather and natural beauty. It is one of the closest getaways from Ranchi.' },
  { slug: 'ranchi-to-giridih-cab', from: 'Ranchi', to: 'Giridih', dist: '190 km', time: '4–5 hrs', sedanOW: '3,400', suvOW: '4,500', crystaOW: '5,500', sedanRT: '6,200', suvRT: '8,200', crystaRT: '10,000', highlights: 'Parasnath Hill (Shikharji), Usri Falls, Khandoli Dam, Jain Pilgrimage', desc: 'Giridih is known for Parasnath Hill (Shikharji), the highest peak in Jharkhand and one of the most important Jain pilgrimage sites.' },
  { slug: 'ranchi-to-daltonganj-cab', from: 'Ranchi', to: 'Daltonganj', dist: '180 km', time: '4–5 hrs', sedanOW: '3,200', suvOW: '4,200', crystaOW: '5,200', sedanRT: '5,800', suvRT: '7,800', crystaRT: '9,500', highlights: 'Betla National Park, Palamau Fort, Lodh Falls, Tiger Reserve', desc: 'Daltonganj (Medininagar) is the gateway to Betla National Park and Palamau Tiger Reserve. The route from Ranchi passes through Latehar with scenic forest views.' },
  { slug: 'ranchi-to-puri-cab', from: 'Ranchi', to: 'Puri', dist: '500 km', time: '9–10 hrs', sedanOW: '9,000', suvOW: '11,500', crystaOW: '14,000', sedanRT: '16,500', suvRT: '21,000', crystaRT: '25,500', highlights: 'Jagannath Temple, Puri Beach, Konark Sun Temple, Chilika Lake', desc: 'Puri is one of the four sacred Char Dham pilgrimage sites, home to the famous Jagannath Temple. The journey from Ranchi passes through Jamshedpur and Odisha.' },
  { slug: 'ranchi-to-rourkela-cab', from: 'Ranchi', to: 'Rourkela', dist: '210 km', time: '4–5 hrs', sedanOW: '3,800', suvOW: '5,000', crystaOW: '6,200', sedanRT: '7,000', suvRT: '9,200', crystaRT: '11,500', highlights: 'Rourkela Steel Plant, Hanuman Vatika, Vedvyas Temple, Mandira Dam', desc: 'Rourkela is a major steel city in Odisha, well connected to Ranchi. The route passes through Jharkhand-Odisha border with scenic views.' }
];

function generatePage(r) {
  const title = `${r.from} to ${r.to} Cab @₹9/km | Taxi Fare, Booking | Rohit Travels`;
  const metaDesc = `Book ${r.from} to ${r.to} cab at ₹9/km. Distance ${r.dist}, Time ${r.time}. Sedan ₹${r.sedanOW}, SUV ₹${r.suvOW}. One-way & round trip. Call +91-7903629240`;
  const keywords = `${r.from.toLowerCase()} to ${r.to.toLowerCase()} cab, ${r.from.toLowerCase()} to ${r.to.toLowerCase()} taxi, ${r.from.toLowerCase()} to ${r.to.toLowerCase()} taxi fare, ${r.from.toLowerCase()} to ${r.to.toLowerCase()} car rental, cab from ${r.from.toLowerCase()} to ${r.to.toLowerCase()}, one way taxi ${r.from.toLowerCase()} ${r.to.toLowerCase()}, outstation cab ${r.from.toLowerCase()}`;
  const otherRoutes = routes.filter(x => x.slug !== r.slug).slice(0, 6);

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="icon" type="image/webp" href="/images/rohittravelslogo.webp">
    <link rel="apple-touch-icon" sizes="180x180" href="/images/rohittravelslogo.webp">
    <link rel="manifest" href="/manifest.json">
    <meta name="theme-color" content="#0a6b61">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preload" href="/css/style.min.css" as="style">
    <title>${title}</title>
    <meta name="description" content="${metaDesc}">
    <meta name="keywords" content="${keywords}">
    <meta name="author" content="Rohit Travels Ranchi">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="https://rohittravels.com/routes/${r.slug}.html">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://rohittravels.com/routes/${r.slug}.html">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${metaDesc}">
    <meta property="og:image" content="https://rohittravels.com/images/rohittravelslogo_desktop.webp">
    <meta property="og:locale" content="en_IN">
    <meta property="og:site_name" content="Rohit Travels Ranchi">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${metaDesc}">
    <meta name="twitter:image" content="https://rohittravels.com/images/rohittravelslogo_desktop.webp">
    <meta name="geo.region" content="IN-JH">
    <meta name="geo.placename" content="Ranchi">
    <meta name="geo.position" content="23.3441;85.3096">

    <!-- BreadcrumbList Schema -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://rohittravels.com/"},
            {"@type": "ListItem", "position": 2, "name": "Routes", "item": "https://rohittravels.com/#routes"},
            {"@type": "ListItem", "position": 3, "name": "${r.from} to ${r.to} Cab", "item": "https://rohittravels.com/routes/${r.slug}.html"}
        ]
    }
    </script>

    <!-- TaxiService Schema -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "TaxiService",
        "name": "Rohit Travels - ${r.from} to ${r.to} Cab Service",
        "description": "${r.from} to ${r.to} taxi service at ₹9/km. Distance: ${r.dist}. Book sedan, SUV or Innova Crysta for one-way or round trip.",
        "url": "https://rohittravels.com/routes/${r.slug}.html",
        "telephone": "+91-7903629240",
        "provider": {
            "@type": "LocalBusiness",
            "name": "Rohit Travels Ranchi",
            "telephone": "+91-7903629240",
            "address": {"@type": "PostalAddress", "streetAddress": "Birsa chowk, road no a2, Hawai Nagar, Gitilpiri", "addressLocality": "Ranchi", "addressRegion": "Jharkhand", "postalCode": "834003", "addressCountry": "IN"},
            "priceRange": "₹₹",
            "image": "https://rohittravels.com/images/rohittravelslogo_desktop.webp"
        },
        "areaServed": [{"@type": "City", "name": "${r.from}"}, {"@type": "City", "name": "${r.to}"}],
        "offers": {
            "@type": "AggregateOffer",
            "priceCurrency": "INR",
            "lowPrice": "${r.sedanOW.replace(',','')}",
            "highPrice": "${r.crystaRT.replace(',','')}",
            "offerCount": "6"
        }
    }
    </script>

    <!-- FAQ Schema -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {"@type": "Question", "name": "What is the taxi fare from ${r.from} to ${r.to}?", "acceptedAnswer": {"@type": "Answer", "text": "The taxi fare from ${r.from} to ${r.to} starts at ₹${r.sedanOW} for a sedan (one-way). SUV costs ₹${r.suvOW} and Innova Crysta costs ₹${r.crystaOW}. Round trip fares: Sedan ₹${r.sedanRT}, SUV ₹${r.suvRT}, Crysta ₹${r.crystaRT}."}},
            {"@type": "Question", "name": "What is the distance from ${r.from} to ${r.to} by cab?", "acceptedAnswer": {"@type": "Answer", "text": "The distance from ${r.from} to ${r.to} by road is approximately ${r.dist}. The journey takes about ${r.time} depending on traffic and road conditions."}},
            {"@type": "Question", "name": "How to book a cab from ${r.from} to ${r.to}?", "acceptedAnswer": {"@type": "Answer", "text": "You can book a ${r.from} to ${r.to} cab by calling +91-7903629240 or WhatsApp. We offer sedan, SUV, and luxury cars with experienced drivers. No advance payment needed for most bookings."}},
            {"@type": "Question", "name": "Is one-way cab available from ${r.from} to ${r.to}?", "acceptedAnswer": {"@type": "Answer", "text": "Yes! Rohit Travels provides one-way cab service from ${r.from} to ${r.to}. One-way sedan fare starts at ₹${r.sedanOW}. No return fare charges for one-way trips."}},
            {"@type": "Question", "name": "Which cars are available for ${r.from} to ${r.to} trip?", "acceptedAnswer": {"@type": "Answer", "text": "We offer Maruti Dzire, Hyundai Aura (Sedan), Maruti Ertiga (SUV/7-seater), Toyota Innova Crysta (Premium), and luxury cars like Audi and BMW for ${r.from} to ${r.to} trip."}}
        ]
    }
    </script>

    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="stylesheet" href="/css/style.min.css">
    <style>
        .route-hero{background:linear-gradient(135deg,#667eea 0%,#764ba2 50%,#f5576c 100%);color:#fff;padding:100px 0 60px;text-align:center;position:relative;overflow:hidden}
        .route-hero::before{content:'';position:absolute;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.15)}
        .route-hero .container{position:relative;z-index:2}
        .route-hero h1{font-size:clamp(28px,5vw,48px);font-weight:800;margin-bottom:15px;line-height:1.2}
        .route-hero .route-meta{display:flex;gap:30px;justify-content:center;flex-wrap:wrap;margin:25px 0;font-size:18px}
        .route-hero .route-meta span{display:flex;align-items:center;gap:8px;background:rgba(255,255,255,0.15);padding:10px 20px;border-radius:50px;backdrop-filter:blur(10px)}
        .breadcrumb{padding:15px 0;font-size:14px;color:#666}.breadcrumb a{color:#667eea;text-decoration:none}.breadcrumb a:hover{text-decoration:underline}.breadcrumb span{margin:0 8px;color:#999}
        .route-section{padding:60px 0}.route-section:nth-child(even){background:#f8f9ff}
        .route-section h2{font-size:clamp(24px,3.5vw,36px);font-weight:700;margin-bottom:30px;text-align:center;color:#1a1a2e}
        .fare-table{width:100%;border-collapse:collapse;border-radius:15px;overflow:hidden;box-shadow:0 10px 40px rgba(0,0,0,0.1)}
        .fare-table th{background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;padding:18px 20px;font-weight:600;font-size:15px;text-align:left}
        .fare-table td{padding:16px 20px;border-bottom:1px solid #eee;font-size:15px}
        .fare-table tr:hover td{background:#f0f0ff}
        .fare-table .price{font-weight:700;color:#667eea;font-size:17px}
        .highlights-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:20px;margin-top:30px}
        .highlight-card{background:#fff;padding:25px;border-radius:15px;box-shadow:0 5px 20px rgba(0,0,0,0.08);border-left:4px solid #667eea;transition:transform 0.3s}
        .highlight-card:hover{transform:translateY(-5px)}
        .highlight-card h3{font-size:18px;color:#1a1a2e;margin-bottom:8px}
        .highlight-card p{color:#636e72;font-size:14px;line-height:1.6}
        .vehicle-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:25px}
        .vehicle-card{background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.1);transition:transform 0.3s}
        .vehicle-card:hover{transform:translateY(-8px)}
        .vehicle-card img{width:100%;height:200px;object-fit:cover}
        .vehicle-card .vehicle-info{padding:20px}
        .vehicle-card h3{font-size:18px;margin-bottom:8px;color:#1a1a2e}
        .vehicle-card .vehicle-price{font-size:22px;font-weight:700;color:#667eea}
        .vehicle-card .vehicle-features{display:flex;gap:10px;flex-wrap:wrap;margin-top:10px}
        .vehicle-card .vehicle-features span{background:#f0f0ff;padding:4px 12px;border-radius:20px;font-size:12px;color:#667eea}
        .cta-banner{background:linear-gradient(135deg,#0a6b61 0%,#38ef7d 100%);padding:50px;border-radius:20px;text-align:center;color:#fff;margin:40px 0}
        .cta-banner h2{font-size:clamp(22px,3vw,32px);margin-bottom:15px}
        .cta-banner p{font-size:18px;margin-bottom:25px;opacity:.95}
        .cta-buttons{display:flex;gap:15px;justify-content:center;flex-wrap:wrap}
        .cta-buttons a{padding:16px 40px;border-radius:50px;font-weight:700;font-size:16px;text-decoration:none;display:inline-flex;align-items:center;gap:10px;box-shadow:0 5px 20px rgba(0,0,0,0.2);transition:transform 0.3s}
        .cta-buttons a:hover{transform:translateY(-3px)}
        .cta-buttons .btn-call{background:#fff;color:#0a6b61}
        .cta-buttons .btn-wa{background:#25D366;color:#fff}
        .faq-section{max-width:800px;margin:0 auto}
        .faq-item{background:#fff;border-radius:15px;margin-bottom:15px;box-shadow:0 3px 15px rgba(0,0,0,0.06);overflow:hidden}
        .faq-q{padding:20px 25px;font-weight:600;font-size:16px;cursor:pointer;display:flex;justify-content:space-between;align-items:center;color:#1a1a2e;transition:background 0.3s}
        .faq-q:hover{background:#f8f9ff}
        .faq-a{padding:0 25px 20px;color:#636e72;line-height:1.7;font-size:15px;display:none}
        .faq-item.active .faq-a{display:block}
        .faq-item.active .faq-q{color:#667eea;background:#f0f0ff}
        .other-routes{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px}
        .route-link{background:#fff;padding:20px 25px;border-radius:15px;box-shadow:0 5px 20px rgba(0,0,0,0.08);text-decoration:none;color:#1a1a2e;display:flex;justify-content:space-between;align-items:center;transition:transform 0.3s,box-shadow 0.3s}
        .route-link:hover{transform:translateY(-5px);box-shadow:0 10px 30px rgba(102,126,234,0.2);color:#667eea}
        .route-link .route-fare{font-weight:700;color:#667eea}
        .seo-content{max-width:900px;margin:0 auto;line-height:1.9;color:#444}
        .seo-content h2{text-align:left;margin-top:35px}
        .seo-content h3{font-size:20px;color:#1a1a2e;margin:25px 0 10px}
        .seo-content p{margin-bottom:15px}
        .seo-content ul{margin:10px 0 20px 20px;list-style:disc}
        .seo-content ul li{margin-bottom:8px;color:#555}
        .route-page-footer{background:var(--gradient-dark,linear-gradient(135deg,#0c0c0c,#1a1a2e,#16213e));color:#fff;padding:40px 0 20px}
        .route-page-footer .container{text-align:center}
        .route-page-footer a{color:#667eea;text-decoration:none}
        .route-page-footer a:hover{text-decoration:underline}
        @media(max-width:768px){.route-hero{padding:80px 0 40px}.fare-table{font-size:13px}.fare-table th,.fare-table td{padding:12px 10px}.cta-banner{padding:30px 20px}}
    </style>
</head>
<body>
    <!-- Top Bar -->
    <div class="top-bar">
        <div class="container">
            <div class="top-bar-content">
                <div class="contact-info">
                    <span><i class="fas fa-phone"></i> <a href="tel:+917903629240" style="color:inherit">+91 7903629240</a></span>
                    <span><i class="fas fa-envelope"></i> rohittravels10@gmail.com</span>
                </div>
                <div class="social-links">
                    <a href="https://wa.me/917903629240" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>
                    <a href="tel:+917903629240" aria-label="Call"><i class="fas fa-phone"></i></a>
                </div>
            </div>
        </div>
    </div>

    <!-- Header -->
    <header class="header">
        <div class="container">
            <nav class="navbar">
                <div class="logo">
                    <a href="/" aria-label="Rohit Travels Home">
                        <img src="/images/rohittravelslogo_desktop.webp" alt="Rohit Travels Ranchi - Best Cab Service" class="logo-img" width="150" height="42">
                        <div class="logo-text-wrapper">
                            <span class="logo-text">Rohit Travels</span>
                            <span class="logo-tagline">Best Cab &amp; Taxi Service in Ranchi</span>
                        </div>
                    </a>
                </div>
                <div class="nav-menu">
                    <a href="/">Home</a>
                    <a href="/#services">Services</a>
                    <a href="/#cars">Cars</a>
                    <a href="/#reviews">Reviews</a>
                    <a href="/#contact">Contact</a>
                </div>
                <div class="nav-toggle" onclick="document.querySelector('.nav-menu').classList.toggle('active')">
                    <span></span><span></span><span></span>
                </div>
            </nav>
        </div>
    </header>

    <!-- Breadcrumb -->
    <div class="container">
        <div class="breadcrumb">
            <a href="/">Home</a> <span>›</span> <a href="/#routes">Routes</a> <span>›</span> <strong>${r.from} to ${r.to} Cab</strong>
        </div>
    </div>

    <!-- Route Hero -->
    <section class="route-hero">
        <div class="container">
            <h1>${r.from} to ${r.to} Cab Booking – Taxi Service @₹9/km</h1>
            <p style="font-size:18px;opacity:.95;max-width:700px;margin:0 auto 20px">Book affordable & reliable ${r.from} to ${r.to} cab service with Rohit Travels. Professional drivers, clean cars, 24/7 booking.</p>
            <div class="route-meta">
                <span><i class="fas fa-road"></i> ${r.dist}</span>
                <span><i class="fas fa-clock"></i> ${r.time}</span>
                <span><i class="fas fa-tag"></i> From ₹${r.sedanOW}</span>
                <span><i class="fas fa-star" style="color:#ffd200"></i> 5.0 Rated</span>
            </div>
            <div class="cta-buttons" style="margin-top:30px">
                <a href="tel:+917903629240" class="btn-call"><i class="fas fa-phone"></i> Call +91 7903629240</a>
                <a href="https://wa.me/917903629240?text=Hi, I need a cab from ${r.from} to ${r.to}" class="btn-wa"><i class="fab fa-whatsapp"></i> Book on WhatsApp</a>
            </div>
        </div>
    </section>

    <main>
    <!-- Fare Table Section -->
    <section class="route-section">
        <div class="container">
            <h2>🚖 ${r.from} to ${r.to} Taxi Fare – Price List</h2>
            <table class="fare-table">
                <thead>
                    <tr><th>Car Type</th><th>Capacity</th><th>One-Way Fare</th><th>Round Trip Fare</th><th>Per KM Rate</th></tr>
                </thead>
                <tbody>
                    <tr><td><strong>Sedan</strong> (Dzire / Aura)</td><td>4 Passengers</td><td class="price">₹${r.sedanOW}</td><td class="price">₹${r.sedanRT}</td><td>₹9/km</td></tr>
                    <tr><td><strong>SUV</strong> (Ertiga 7-Seater)</td><td>6 Passengers</td><td class="price">₹${r.suvOW}</td><td class="price">₹${r.suvRT}</td><td>₹11/km</td></tr>
                    <tr><td><strong>Innova Crysta</strong> (Premium)</td><td>7 Passengers</td><td class="price">₹${r.crystaOW}</td><td class="price">₹${r.crystaRT}</td><td>₹13/km</td></tr>
                </tbody>
            </table>
            <p style="text-align:center;color:#888;margin-top:15px;font-size:14px">✅ Fare includes driver allowance, fuel & basic toll. Night charges (10PM–6AM) extra ₹200.</p>
        </div>
    </section>

    <!-- Route Highlights -->
    <section class="route-section">
        <div class="container">
            <h2>🗺️ ${r.from} to ${r.to} Route Highlights</h2>
            <p style="text-align:center;color:#555;max-width:700px;margin:0 auto 20px">${r.desc}</p>
            <div class="highlights-grid">
                <div class="highlight-card"><h3>📍 Distance</h3><p>${r.dist} via national highway. Well-maintained road with good connectivity.</p></div>
                <div class="highlight-card"><h3>⏱️ Travel Time</h3><p>Approximately ${r.time}. Our experienced drivers ensure safe & timely arrival.</p></div>
                <div class="highlight-card"><h3>🏞️ Key Stops</h3><p>${r.highlights}</p></div>
                <div class="highlight-card"><h3>💰 Best Price</h3><p>Starting from just ₹${r.sedanOW} one-way. No hidden charges, transparent pricing.</p></div>
            </div>
        </div>
    </section>

    <!-- Vehicle Options -->
    <section class="route-section">
        <div class="container">
            <h2>🚗 Available Cars for ${r.from} to ${r.to}</h2>
            <div class="vehicle-grid">
                <div class="vehicle-card">
                    <img src="/images/dezire.webp" alt="Dzire Sedan ${r.from} to ${r.to}" loading="lazy" width="400" height="200">
                    <div class="vehicle-info">
                        <h3>Maruti Dzire / Hyundai Aura</h3>
                        <div class="vehicle-price">₹${r.sedanOW} <small style="font-size:13px;color:#888;font-weight:400">one-way</small></div>
                        <div class="vehicle-features"><span>4 Seater</span><span>AC</span><span>Sedan</span><span>₹9/km</span></div>
                    </div>
                </div>
                <div class="vehicle-card">
                    <img src="/images/ertiga.webp" alt="Ertiga SUV ${r.from} to ${r.to}" loading="lazy" width="400" height="200">
                    <div class="vehicle-info">
                        <h3>Maruti Ertiga (7-Seater)</h3>
                        <div class="vehicle-price">₹${r.suvOW} <small style="font-size:13px;color:#888;font-weight:400">one-way</small></div>
                        <div class="vehicle-features"><span>6 Seater</span><span>AC</span><span>SUV</span><span>₹11/km</span></div>
                    </div>
                </div>
                <div class="vehicle-card">
                    <img src="/images/crista.webp" alt="Innova Crysta ${r.from} to ${r.to}" loading="lazy" width="400" height="200">
                    <div class="vehicle-info">
                        <h3>Toyota Innova Crysta</h3>
                        <div class="vehicle-price">₹${r.crystaOW} <small style="font-size:13px;color:#888;font-weight:400">one-way</small></div>
                        <div class="vehicle-features"><span>7 Seater</span><span>AC</span><span>Premium</span><span>₹13/km</span></div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Why Choose Us -->
    <section class="route-section">
        <div class="container">
            <div class="cta-banner">
                <h2>Why Book ${r.from} to ${r.to} Cab with Rohit Travels?</h2>
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:20px;text-align:left;margin:30px 0">
                    <div><strong>✅ ₹9/km Starting</strong><br><small>Lowest price guaranteed</small></div>
                    <div><strong>✅ No Hidden Charges</strong><br><small>Transparent billing always</small></div>
                    <div><strong>✅ Experienced Drivers</strong><br><small>10+ years on this route</small></div>
                    <div><strong>✅ 24/7 Availability</strong><br><small>Book anytime, travel anytime</small></div>
                    <div><strong>✅ Clean & AC Cars</strong><br><small>Well-maintained fleet</small></div>
                    <div><strong>✅ 5000+ Happy Customers</strong><br><small>5.0★ Google rated</small></div>
                </div>
                <div class="cta-buttons">
                    <a href="tel:+917903629240" class="btn-call"><i class="fas fa-phone"></i> Call Now</a>
                    <a href="https://wa.me/917903629240?text=Hi, I want to book a cab from ${r.from} to ${r.to}. Please share details." class="btn-wa"><i class="fab fa-whatsapp"></i> WhatsApp Booking</a>
                </div>
            </div>
        </div>
    </section>

    <!-- FAQ Section -->
    <section class="route-section">
        <div class="container">
            <h2>❓ Frequently Asked Questions – ${r.from} to ${r.to} Cab</h2>
            <div class="faq-section">
                <div class="faq-item active">
                    <div class="faq-q" onclick="this.parentElement.classList.toggle('active')">What is the taxi fare from ${r.from} to ${r.to}? <i class="fas fa-chevron-down"></i></div>
                    <div class="faq-a">The taxi fare from ${r.from} to ${r.to} starts at ₹${r.sedanOW} for sedan (one-way). SUV costs ₹${r.suvOW} and Innova Crysta ₹${r.crystaOW}. Round trip: Sedan ₹${r.sedanRT}, SUV ₹${r.suvRT}, Crysta ₹${r.crystaRT}. Fare includes driver allowance and fuel.</div>
                </div>
                <div class="faq-item">
                    <div class="faq-q" onclick="this.parentElement.classList.toggle('active')">What is the distance & time from ${r.from} to ${r.to}? <i class="fas fa-chevron-down"></i></div>
                    <div class="faq-a">The distance from ${r.from} to ${r.to} is approximately ${r.dist}. Travel time is ${r.time} depending on traffic and road conditions. Our experienced drivers ensure a safe and comfortable journey.</div>
                </div>
                <div class="faq-item">
                    <div class="faq-q" onclick="this.parentElement.classList.toggle('active')">How to book a ${r.from} to ${r.to} cab? <i class="fas fa-chevron-down"></i></div>
                    <div class="faq-a">You can book by calling +91-7903629240 or WhatsApp. Share your travel date, pickup time, and number of passengers. We'll confirm your booking instantly with driver details.</div>
                </div>
                <div class="faq-item">
                    <div class="faq-q" onclick="this.parentElement.classList.toggle('active')">Is one-way cab available from ${r.from} to ${r.to}? <i class="fas fa-chevron-down"></i></div>
                    <div class="faq-a">Yes! We offer one-way drop service from ${r.from} to ${r.to}. One-way sedan starts at ₹${r.sedanOW}. No return charges — you only pay for one way.</div>
                </div>
                <div class="faq-item">
                    <div class="faq-q" onclick="this.parentElement.classList.toggle('active')">Which cars are available? <i class="fas fa-chevron-down"></i></div>
                    <div class="faq-a">We offer Maruti Dzire & Hyundai Aura (Sedan), Maruti Ertiga (SUV/7-seater), Toyota Innova Crysta (Premium 7-seater), and luxury cars like Audi & BMW for special occasions.</div>
                </div>
                <div class="faq-item">
                    <div class="faq-q" onclick="this.parentElement.classList.toggle('active')">Is advance payment required? <i class="fas fa-chevron-down"></i></div>
                    <div class="faq-a">No advance payment for most bookings. For long-distance or peak-season trips, we may request 20% advance. Balance payable after journey via cash, UPI, or card.</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Other Popular Routes -->
    <section class="route-section">
        <div class="container">
            <h2>🚗 Other Popular Cab Routes from Ranchi</h2>
            <div class="other-routes">
${otherRoutes.map(or => `                <a href="/routes/${or.slug}.html" class="route-link">
                    <div><strong>${or.from} to ${or.to} Cab</strong><br><small style="color:#888">${or.dist} • ${or.time}</small></div>
                    <div class="route-fare">₹${or.sedanOW} →</div>
                </a>`).join('\n')}
            </div>
            <p style="text-align:center;margin-top:25px"><a href="/" style="color:#667eea;font-weight:600;text-decoration:none">← View All Routes & Services</a></p>
        </div>
    </section>

    <!-- SEO Content -->
    <section class="route-section">
        <div class="container">
            <div class="seo-content">
                <h2>${r.from} to ${r.to} Cab Service – Complete Travel Guide</h2>
                <p>Looking for the <strong>best ${r.from} to ${r.to} cab service</strong>? Rohit Travels offers affordable, reliable taxi service from ${r.from} to ${r.to} starting at just <strong>₹9/km</strong>. With over 10 years of experience, 5000+ happy customers, and a 5.0★ Google rating, we are the most trusted <strong>${r.from} to ${r.to} taxi</strong> provider.</p>

                <h3>About the ${r.from} to ${r.to} Route</h3>
                <p>${r.desc} Key attractions along the way include ${r.highlights}. Whether you're traveling for business, pilgrimage, family trip, or medical purposes, our <strong>${r.from} to ${r.to} car rental</strong> service ensures a comfortable journey.</p>

                <h3>Types of ${r.from} to ${r.to} Cab Services We Offer</h3>
                <ul>
                    <li><strong>One-Way Cab ${r.from} to ${r.to}</strong> – Starting ₹${r.sedanOW} for sedan. Pay only for one side.</li>
                    <li><strong>Round Trip ${r.from} to ${r.to}</strong> – Starting ₹${r.sedanRT}. Includes driver stay allowance.</li>
                    <li><strong>Airport Transfer</strong> – Birsa Munda Airport to ${r.to} direct service.</li>
                    <li><strong>Corporate Travel</strong> – Business trips with professional drivers.</li>
                </ul>

                <h3>Why Rohit Travels for ${r.from} to ${r.to}?</h3>
                <p>We are not an aggregator — we own our fleet. This means better maintained cars, trained local drivers who know every route, and consistent pricing without surge. Our <strong>${r.from} to ${r.to} taxi fare</strong> is the most competitive in the market with no hidden charges.</p>

                <h3>Book Your ${r.from} to ${r.to} Cab Now</h3>
                <p>Call <a href="tel:+917903629240" style="color:#667eea;font-weight:600">+91 7903629240</a> or <a href="https://wa.me/917903629240" style="color:#25D366;font-weight:600">WhatsApp us</a> for instant booking. Available 24/7, 365 days a year.</p>
            </div>
        </div>
    </section>
    </main>

    <!-- Footer -->
    <footer class="route-page-footer">
        <div class="container">
            <p style="margin-bottom:10px"><a href="/"><img src="/images/rohittravelslogo_desktop.webp" alt="Rohit Travels" style="height:40px;display:inline-block;margin-bottom:10px" loading="lazy"></a></p>
            <p><strong>Rohit Travels Ranchi</strong> – Best Cab & Taxi Service in Ranchi</p>
            <p style="margin:10px 0"><a href="tel:+917903629240">📞 +91 7903629240</a> | <a href="mailto:rohittravels10@gmail.com">✉️ rohittravels10@gmail.com</a></p>
            <p style="font-size:12px;margin-top:15px;opacity:.7">© 2026 Rohit Travels Ranchi. All Rights Reserved. | <a href="/">Home</a> | <a href="/#services">Services</a> | <a href="/#contact">Contact</a></p>
        </div>
    </footer>

    <!-- Float Buttons -->
    <a href="https://wa.me/917903629240" class="whatsapp-float" target="_blank" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>
    <a href="tel:+917903629240" class="call-float" aria-label="Call Now"><i class="fas fa-phone"></i></a>

    <!-- Scripts -->
    <script src="/js/script.js" defer></script>
</body>
</html>`;
}

// Generate all pages
const routesDir = path.join(__dirname, 'routes');
if (!fs.existsSync(routesDir)) fs.mkdirSync(routesDir);

routes.forEach(r => {
  const filePath = path.join(routesDir, `${r.slug}.html`);
  fs.writeFileSync(filePath, generatePage(r), 'utf8');
  console.log(`✅ Created: routes/${r.slug}.html`);
});

console.log(`\n🎉 Generated ${routes.length} route pages successfully!`);

// ============================================
// SHARED HTML COMPONENTS
// Header, Footer, Styles for all pages
// ============================================

function getHead({ title, metaDesc, keywords, canonical, ogTitle, ogDesc, breadcrumbSchema, extraSchema, pageType }) {
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
    <link rel="canonical" href="${canonical}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="${canonical}">
    <meta property="og:title" content="${ogTitle || title}">
    <meta property="og:description" content="${ogDesc || metaDesc}">
    <meta property="og:image" content="https://rohittravels.com/images/rohittravelslogo_desktop.webp">
    <meta property="og:locale" content="en_IN">
    <meta property="og:site_name" content="Rohit Travels Ranchi">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${ogTitle || title}">
    <meta name="twitter:description" content="${ogDesc || metaDesc}">
    <meta name="twitter:image" content="https://rohittravels.com/images/rohittravelslogo_desktop.webp">
    <meta name="geo.region" content="IN-JH">
    <meta name="geo.placename" content="Ranchi">
    <meta name="geo.position" content="23.3441;85.3096">

    <!-- BreadcrumbList Schema -->
    <script type="application/ld+json">
    ${JSON.stringify(breadcrumbSchema, null, 2)}
    </script>

    ${(Array.isArray(extraSchema) ? extraSchema : (extraSchema ? [extraSchema] : [])).map(s => `<!-- Page-Specific Schema -->
    <script type="application/ld+json">
    ${JSON.stringify(s, null, 2)}
    </script>`).join('\n')}

    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="stylesheet" href="/css/style.min.css">
    <link rel="stylesheet" href="/css/page.min.css">
</head>`;
}

function getHeader() {
  return `
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
                            <span class="logo-tagline">Best Cab & Taxi Service in Ranchi</span>
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
    </header>`;
}

function getFooter(cityName) {
  return `
    <!-- Footer -->
    <footer class="route-page-footer">
        <div class="container">
            <p style="margin-bottom:10px"><a href="/"><img src="/images/rohittravelslogo_desktop.webp" alt="Rohit Travels" style="height:40px;display:inline-block;margin-bottom:10px" loading="lazy"></a></p>
            <p><strong>Rohit Travels Ranchi</strong> – Best Cab & Taxi Service${cityName ? ' in ' + cityName : ''}</p>
            <p style="margin:10px 0"><a href="tel:+917903629240">📞 +91 7903629240</a> | <a href="mailto:rohittravels10@gmail.com">✉️ rohittravels10@gmail.com</a></p>
            <p style="font-size:13px;margin-top:15px;opacity:.8">📍 Birsa chowk, road no a2, Hawai Nagar, Gitilpiri, Ranchi, Jharkhand 834003</p>
            <p style="font-size:12px;margin-top:10px;opacity:.7">© 2026 Rohit Travels Ranchi. All Rights Reserved. | <a href="/">Home</a> | <a href="/#services">Services</a> | <a href="/#contact">Contact</a></p>
        </div>
    </footer>

    <!-- Float Buttons -->
    <a href="https://wa.me/917903629240" class="whatsapp-float" target="_blank" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>
    <a href="tel:+917903629240" class="call-float" aria-label="Call Now"><i class="fas fa-phone"></i></a>

    <!-- Scripts -->
    <script src="/js/script.js" defer></script>
    <script>document.querySelectorAll('.faq-q').forEach(q=>q.addEventListener('click',function(){this.parentElement.classList.toggle('active')}))</script>
</body>
</html>`;
}

function getFAQItem(question, answer, isActive) {
  return `
                <div class="faq-item${isActive ? ' active' : ''}">
                    <div class="faq-q">${question} <i class="fas fa-chevron-down"></i></div>
                    <div class="faq-a">${answer}</div>
                </div>`;
}

function getVehicleCards(cityName) {
  return `
            <div class="vehicle-grid">
                <div class="vehicle-card">
                    <img src="/images/dezire.webp" alt="Dzire Sedan Cab ${cityName}" loading="lazy" width="400" height="180">
                    <div class="vehicle-info">
                        <h3>Maruti Dzire / Hyundai Aura</h3>
                        <div class="vehicle-price">₹11/km</div>
                        <div class="vehicle-features"><span>4 Seater</span><span>AC</span><span>Sedan</span><span>Best Value</span></div>
                    </div>
                </div>
                <div class="vehicle-card">
                    <img src="/images/ertiga.webp" alt="Ertiga SUV Cab ${cityName}" loading="lazy" width="400" height="180">
                    <div class="vehicle-info">
                        <h3>Maruti Ertiga (7-Seater)</h3>
                        <div class="vehicle-price">₹11/km</div>
                        <div class="vehicle-features"><span>6 Seater</span><span>AC</span><span>SUV</span><span>Family</span></div>
                    </div>
                </div>
                <div class="vehicle-card">
                    <img src="/images/crista.webp" alt="Innova Crysta ${cityName}" loading="lazy" width="400" height="180">
                    <div class="vehicle-info">
                        <h3>Toyota Innova Crysta</h3>
                        <div class="vehicle-price">₹13/km</div>
                        <div class="vehicle-features"><span>7 Seater</span><span>AC</span><span>Premium</span><span>Luxury</span></div>
                    </div>
                </div>
            </div>`;
}

function getCTABanner(contextText) {
  return `
        <div class="cta-banner">
            <h2>Book Your ${contextText} Now – Call for Best Rates!</h2>
            <p>24/7 availability | No hidden charges | Professional drivers | Clean & AC cars</p>
            <div class="cta-buttons">
                <a href="tel:+917903629240" class="btn-call"><i class="fas fa-phone"></i> Call +91 7903629240</a>
                <a href="https://wa.me/917903629240?text=Hi, I need ${contextText}. Please share details and rates." class="btn-wa"><i class="fab fa-whatsapp"></i> WhatsApp Booking</a>
            </div>
        </div>`;
}

function getBookingForm(contextTitle = "Book Your Ride") {
  return `
    <section class="booking-section-container" style="padding:40px 15px;background:linear-gradient(135deg, #0a6b61 0%, #06453e 100%);color:#fff;">
        <div class="container" style="max-width:600px;margin:0 auto;">
            <div style="background:#ffffff;padding:30px 25px;border-radius:18px;box-shadow:0 15px 35px rgba(0,0,0,0.25);color:#2d3436;">
                <h3 style="margin-top:0;margin-bottom:8px;color:#0a6b61;text-align:center;font-size:22px;font-weight:700;">${contextTitle}</h3>
                <p style="text-align:center;color:#636e72;font-size:14px;margin-bottom:20px;">Instant Online Cab Booking – 24/7 Service</p>
                <form class="customBookingForm" method="POST" action="https://docs.google.com/forms/d/e/1FAIpQLSdPrjsDtouGldWc3OcUciV7Gavjs4CkjZyVyEPKaGrUblanmg/formResponse" target="hidden_iframe_booking" onsubmit="return handleBookingFormSubmit(this);">
                    <div style="margin-bottom:14px;">
                        <input type="text" name="entry.1071487397" placeholder="Your Name *" required style="width:100%;padding:12px 14px;border:1px solid #cbd5e1;border-radius:8px;font-size:15px;box-sizing:border-box;">
                    </div>
                    <div style="margin-bottom:14px;">
                        <input type="tel" name="entry.429615587" placeholder="Phone Number *" required style="width:100%;padding:12px 14px;border:1px solid #cbd5e1;border-radius:8px;font-size:15px;box-sizing:border-box;">
                    </div>
                    <div style="margin-bottom:14px;">
                        <input type="text" name="entry.713662380" placeholder="Pickup Location *" required style="width:100%;padding:12px 14px;border:1px solid #cbd5e1;border-radius:8px;font-size:15px;box-sizing:border-box;">
                    </div>
                    <div style="margin-bottom:14px;">
                        <input type="text" name="entry.929679028" placeholder="Drop Location *" required style="width:100%;padding:12px 14px;border:1px solid #cbd5e1;border-radius:8px;font-size:15px;box-sizing:border-box;">
                    </div>
                    <div style="margin-bottom:14px;">
                        <input type="date" name="entry.1937996992" required style="width:100%;padding:12px 14px;border:1px solid #cbd5e1;border-radius:8px;font-size:15px;color:#334155;box-sizing:border-box;">
                    </div>
                    <div style="margin-bottom:14px;">
                        <textarea name="entry.488826511" placeholder="Special Requests / Message" rows="2" style="width:100%;padding:12px 14px;border:1px solid #cbd5e1;border-radius:8px;font-size:15px;resize:vertical;box-sizing:border-box;"></textarea>
                    </div>
                    <button type="submit" class="btn-submit-booking" style="width:100%;background:linear-gradient(135deg, #0a6b61 0%, #38ef7d 100%);color:#fff;border:none;padding:14px;border-radius:8px;font-weight:700;font-size:16px;cursor:pointer;transition:transform 0.2s, box-shadow 0.2s;box-shadow:0 4px 15px rgba(10,107,97,0.3);">Submit Booking Request</button>
                    <div class="bookingSuccessMsg" style="display:none;color:#0a6b61;margin-top:14px;font-weight:600;background:#e6fff2;padding:14px;border-radius:8px;text-align:center;border:1px solid #a3e635;">Thank you! Your booking has been submitted successfully. We will contact you soon.</div>
                </form>
                <iframe name="hidden_iframe_booking" style="display:none;"></iframe>
            </div>
        </div>
    </section>
    <script>
    if (typeof handleBookingFormSubmit === 'undefined') {
        function handleBookingFormSubmit(form) {
            var btn = form.querySelector('.btn-submit-booking');
            var msg = form.querySelector('.bookingSuccessMsg');
            if (btn) { btn.disabled = true; btn.textContent = 'Sending...'; }
            setTimeout(function() {
                form.reset();
                if (btn) { btn.disabled = false; btn.textContent = 'Submit Booking Request'; }
                if (msg) {
                    msg.style.display = 'block';
                    setTimeout(function() { msg.style.display = 'none'; }, 6000);
                }
            }, 1200);
            return true;
        }
    }
    </script>`;
}

module.exports = { getHead, getHeader, getFooter, getFAQItem, getVehicleCards, getCTABanner, getBookingForm };


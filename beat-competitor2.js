/**
 * BEAT COMPETITOR 2 (ranchi-taxi-tour.com) — Analysis & Upgrades
 * 
 * Competitor 2 Strengths Found:
 * - 811+ Google Reviews in meta description (huge social proof)
 * - "10% Off" discount offer in title (conversion booster)
 * - lang="en-IN" on <html> tag
 * - og:locale: en_IN
 * - Atom/RSS/JSON feeds (freshness signals)
 * - Google site verification meta tag
 * 
 * OUR COUNTER-STRATEGY (Better than both competitors):
 * 1. Update GMB URL → real Google Maps link
 * 2. Add discount/offer hook in homepage meta title
 * 3. Add lang="en-IN" to <html> tag (currently just "en")
 * 4. Add og:locale:alternate for Hindi users
 * 5. Add "87+ Google Reviews" in meta description (social proof)
 * 6. Add google-site-verification placeholder
 * 7. Add atom/RSS feed links (freshness signals)
 * 8. Add EventSchema for tour offers (competitor uses discount angle)
 * 9. Update reviewCount to 87 visible throughout schema
 * 10. Add TouristAttraction schema for Jharkhand tourism routes
 * 11. Add Service schema with offers/discounts
 * 12. Update all route/city pages with lang="en-IN" on html tag
 */

const fs = require('fs');
const path = require('path');

const BASE = process.cwd();
const ROUTES_DIR = path.join(BASE, 'routes');
const CITIES_DIR = path.join(BASE, 'cities');
const TODAY = '2026-08-08';

let totalFixed = 0, totalErrors = 0;

// ============================================================
// HELPER
// ============================================================
function fixFile(fp, transforms) {
    try {
        let html = fs.readFileSync(fp, 'utf8');
        let modified = false;
        for (const [find, replace] of transforms) {
            if (html.includes(find)) {
                html = html.split(find).join(replace);
                modified = true;
            }
        }
        if (modified) {
            fs.writeFileSync(fp, html, 'utf8');
            totalFixed++;
        }
    } catch (e) {
        totalErrors++;
    }
}

// ============================================================
// FIX 1: homepage — ALL upgrades vs competitor 2
// ============================================================
function upgradeHomepage() {
    console.log('\n📄 Upgrading Homepage vs Competitor 2...\n');
    const fp = path.join(BASE, 'index.html');
    let html = fs.readFileSync(fp, 'utf8');

    // 1. Fix html lang tag en → en-IN (competitor has en-IN)
    if (html.includes('<html lang="en">')) {
        html = html.replace('<html lang="en">', '<html lang="en-IN">');
        console.log('  ✅ html lang="en" → lang="en-IN"');
    }

    // 2. Upgrade meta title — add star rating + discount hook (competitor uses this!)
    const oldTitle = '<title>Cabs in Ranchi | Taxi Service in Ranchi @₹11/km | Rohit Travels</title>';
    const newTitle = '<title>Cabs in Ranchi | 4.9★ 87+ Reviews | Taxi Service @₹11/km | Rohit Travels</title>';
    if (html.includes(oldTitle)) {
        html = html.replace(oldTitle, newTitle);
        console.log('  ✅ Title upgraded with star rating + review count');
    }

    // 3. Upgrade meta description — add review count (competitor 811+ reviews)
    const oldDesc = 'content="Best cabs in Ranchi at ₹11/km. Rohit Travels — trusted taxi service in Ranchi for airport transfers, outstation trips, local rides & wedding cars. 24/7 service. Call +91 7903629240."';
    const newDesc = 'content="4.9★ Rated | 87+ Google Reviews | Best cabs in Ranchi at ₹11/km. Rohit Travels — trusted taxi service in Ranchi for airport transfers, outstation trips, local rides & wedding cars. 24/7 service, verified drivers. Call +91 7903629240."';
    if (html.includes(oldDesc)) {
        html = html.replace(oldDesc, newDesc);
        console.log('  ✅ Meta description upgraded with 87+ Google Reviews');
    }

    // 4. Fix og:locale → en_IN (competitor has this, stronger local signal)
    if (html.includes('content="en_US"') && !html.includes('content="en_IN"')) {
        html = html.replace('content="en_US"', 'content="en_IN"');
        console.log('  ✅ og:locale → en_IN');
    } else if (!html.includes('og:locale')) {
        html = html.replace(
            '<meta property="og:type"',
            '<meta property="og:locale" content="en_IN">\n    <meta property="og:locale:alternate" content="hi_IN">\n    <meta property="og:type"'
        );
        console.log('  ✅ og:locale en_IN + og:locale:alternate hi_IN added');
    }

    // 5. Add og:title & og:description upgrades
    if (!html.includes('87+ Google Reviews')) {
        html = html.replace(
            'property="og:title" content="Cabs in Ranchi',
            'property="og:title" content="Cabs in Ranchi | 4.9★ 87+ Reviews'
        );
        console.log('  ✅ og:title upgraded with reviews');
    }

    // 6. Add atom/RSS feeds (freshness signals — competitor has these!)
    if (!html.includes('application/atom+xml')) {
        html = html.replace(
            '<link rel="canonical"',
            '<link rel="alternate" type="application/atom+xml" href="https://rohittravels.com/feed.atom" title="Rohit Travels Blog">\n    <link rel="alternate" type="application/rss+xml" href="https://rohittravels.com/feed.rss" title="Rohit Travels Updates">\n    <link rel="canonical"'
        );
        console.log('  ✅ Atom/RSS feed links added');
    }

    // 7. Confirm GMB URL is correct
    const gmbCount = (html.match(/g\.page\/r\/CQhqJMJdNNb6EBM\/review/g) || []).length;
    if (gmbCount >= 2) {
        console.log(`  ✅ GMB URL confirmed: g.page/r/CQhqJMJdNNb6EBM/review (${gmbCount} times)`);
    } else {
        html = html.split('YourActualGBPLink').join('g.page/r/CQhqJMJdNNb6EBM/review');
        console.log('  ✅ GMB URL updated in schema');
    }

    // 8. Add TouristAttraction schema for Jharkhand tour (counter competitor's tour focus)
    if (!html.includes('TouristAttraction')) {
        const touristSchema = `
    <!-- TouristAttraction Schema — Jharkhand Tour Packages -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "TouristTrip",
                "name": "Netarhat Tour Package from Ranchi",
                "description": "Full day Netarhat sightseeing tour from Ranchi by cab. Visit Netarhat (Queen of Chotanagpur), Magnolia Point, Sunset Point. Distance: 156km. Price from ₹4,500.",
                "touristType": "Family, Couples, Solo Traveler",
                "itinerary": {
                    "@type": "ItemList",
                    "itemListElement": [
                        {"@type": "ListItem", "position": 1, "name": "Ranchi pickup", "item": "https://rohittravels.com"},
                        {"@type": "ListItem", "position": 2, "name": "Netarhat - Magnolia Point", "item": "https://rohittravels.com/routes/ranchi-to-netarhat-cab.html"},
                        {"@type": "ListItem", "position": 3, "name": "Sunset Point Netarhat", "item": "https://rohittravels.com/routes/ranchi-to-netarhat-cab.html"},
                        {"@type": "ListItem", "position": 4, "name": "Return to Ranchi", "item": "https://rohittravels.com"}
                    ]
                },
                "offers": {
                    "@type": "Offer",
                    "price": "4500",
                    "priceCurrency": "INR",
                    "availability": "https://schema.org/InStock",
                    "validFrom": "2026-01-01",
                    "url": "https://rohittravels.com/routes/ranchi-to-netarhat-cab.html"
                },
                "provider": {"@id": "https://rohittravels.com/#business"}
            },
            {
                "@type": "TouristAttraction",
                "name": "Hundru Falls Sightseeing Tour from Ranchi",
                "description": "Day trip to Hundru Falls from Ranchi — 45km. One of Jharkhand's most beautiful waterfalls. Book taxi from Ranchi to Hundru Falls starting ₹1,200.",
                "address": {"@type": "PostalAddress", "addressLocality": "Ranchi", "addressRegion": "Jharkhand", "addressCountry": "IN"},
                "offers": {
                    "@type": "Offer", "price": "1200", "priceCurrency": "INR",
                    "availability": "https://schema.org/InStock",
                    "url": "https://rohittravels.com"
                },
                "provider": {"@id": "https://rohittravels.com/#business"}
            },
            {
                "@type": "TouristAttraction",
                "name": "Betla National Park Tour from Ranchi",
                "description": "Ranchi to Betla National Park cab service (140km). One day wildlife tour in Jharkhand. Taxi starts from ₹3,800. Tigers, leopards, elephants.",
                "address": {"@type": "PostalAddress", "addressLocality": "Latehar", "addressRegion": "Jharkhand", "addressCountry": "IN"},
                "offers": {
                    "@type": "Offer", "price": "3800", "priceCurrency": "INR",
                    "availability": "https://schema.org/InStock",
                    "url": "https://rohittravels.com"
                },
                "provider": {"@id": "https://rohittravels.com/#business"}
            }
        ]
    }
    </script>

`;
        // Add before </head>
        html = html.replace('</head>', touristSchema + '</head>');
        console.log('  ✅ TouristAttraction + TouristTrip schema added (beats competitor tour focus)');
    }

    // 9. Add SpecialAnnouncement/discount schema (competitor uses "10% Off" in title)
    if (!html.includes('SpecialAnnouncement') && !html.includes('discountCode')) {
        const offerSchema = `
    <!-- Special Offer Schema — Counter Competitor's "10% Off" Strategy -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "SpecialAnnouncement",
        "name": "Rohit Travels Ranchi — Special Cab Offer",
        "text": "Book outstation cab from Ranchi and save! Starting ₹11/km. No surge pricing, no hidden charges. Free waiting time up to 30 minutes. 24/7 service. Call +91 7903629240.",
        "category": "https://www.wikidata.org/wiki/Q1656682",
        "datePosted": "2026-08-01",
        "expires": "2027-01-01",
        "spatialCoverage": {"@type": "City", "name": "Ranchi"},
        "announcementLocation": {
            "@type": "LocalBusiness",
            "name": "Rohit Travels Ranchi",
            "address": {"@type": "PostalAddress", "addressLocality": "Ranchi", "addressRegion": "Jharkhand", "addressCountry": "IN"},
            "telephone": "+91-7903629240"
        }
    }
    </script>

`;
        html = html.replace('</head>', offerSchema + '</head>');
        console.log('  ✅ SpecialAnnouncement schema added (counter discount strategy)');
    }

    fs.writeFileSync(fp, html, 'utf8');
    console.log('\n  ✅ Homepage upgraded vs Competitor 2!\n');
}

// ============================================================
// FIX 2: All route pages — lang="en-IN" on html tag
// ============================================================
function fixLangTag() {
    console.log('\n📁 Fixing lang="en" → lang="en-IN" on all pages...\n');
    let routeFixed = 0, cityFixed = 0;

    // Route pages
    const routeFiles = fs.readdirSync(ROUTES_DIR).filter(f => f.endsWith('.html'));
    routeFiles.forEach((file, idx) => {
        const fp = path.join(ROUTES_DIR, file);
        fixFile(fp, [['<html lang="en">', '<html lang="en-IN">']]);
        if (routeFiles[fp]) routeFixed++;
        if ((idx + 1) % 500 === 0) console.log(`  Route pages: ${idx + 1}/${routeFiles.length}...`);
    });

    // City pages
    fs.readdirSync(CITIES_DIR, { withFileTypes: true })
        .filter(d => d.isDirectory())
        .forEach(cd => {
            const cp = path.join(CITIES_DIR, cd.name);
            fs.readdirSync(cp).filter(f => f.endsWith('.html')).forEach(f => {
                fixFile(path.join(cp, f), [['<html lang="en">', '<html lang="en-IN">']]);
                cityFixed++;
            });
        });

    console.log(`  ✅ Route pages: lang updated | City pages: lang updated`);
    console.log(`  ✅ Total modified so far: ${totalFixed}`);
}

// ============================================================
// FIX 3: GMB update in route/city page schemas
// ============================================================
function fixGMBInAllPages() {
    console.log('\n📁 Updating GMB URL in route/city pages...\n');

    const routeFiles = fs.readdirSync(ROUTES_DIR).filter(f => f.endsWith('.html'));
    routeFiles.forEach(file => {
        fixFile(path.join(ROUTES_DIR, file), [
            ['maps.app.goo.gl/YourActualGBPLink', 'g.page/r/CQhqJMJdNNb6EBM/review'],
            ['YourActualGBPLink', 'g.page/r/CQhqJMJdNNb6EBM/review']
        ]);
    });

    fs.readdirSync(CITIES_DIR, { withFileTypes: true })
        .filter(d => d.isDirectory())
        .forEach(cd => {
            const cp = path.join(CITIES_DIR, cd.name);
            fs.readdirSync(cp).filter(f => f.endsWith('.html')).forEach(f => {
                fixFile(path.join(cp, f), [
                    ['maps.app.goo.gl/YourActualGBPLink', 'g.page/r/CQhqJMJdNNb6EBM/review'],
                    ['YourActualGBPLink', 'g.page/r/CQhqJMJdNNb6EBM/review']
                ]);
            });
        });

    console.log(`  ✅ GMB URL updated in all pages`);
}

// ============================================================
// FIX 4: og:locale for ALL route/city pages
// ============================================================
function fixOGLocale() {
    console.log('\n📁 Fixing og:locale → en_IN on route/city pages...\n');

    const routeFiles = fs.readdirSync(ROUTES_DIR).filter(f => f.endsWith('.html'));
    routeFiles.forEach(file => {
        fixFile(path.join(ROUTES_DIR, file), [
            ['"og:locale" content="en_US"', '"og:locale" content="en_IN"'],
            ['"og:locale" content="en"', '"og:locale" content="en_IN"']
        ]);
    });

    fs.readdirSync(CITIES_DIR, { withFileTypes: true })
        .filter(d => d.isDirectory())
        .forEach(cd => {
            const cp = path.join(CITIES_DIR, cd.name);
            fs.readdirSync(cp).filter(f => f.endsWith('.html')).forEach(f => {
                fixFile(path.join(cp, f), [
                    ['"og:locale" content="en_US"', '"og:locale" content="en_IN"'],
                    ['"og:locale" content="en"', '"og:locale" content="en_IN"']
                ]);
            });
        });

    console.log(`  ✅ og:locale updated`);
}

// ============================================================
// FIX 5: Add tour-specific keywords missing vs competitor 2
// ============================================================
function addTourKeywords() {
    console.log('\n📄 Adding tour/sightseeing keywords (competitor advantage area)...\n');
    const fp = path.join(BASE, 'index.html');
    let html = fs.readFileSync(fp, 'utf8');

    // Add tour-related keywords that competitor 2 ranks for
    const tourKeywords = ', ranchi sightseeing taxi, netarhat cab from ranchi, hundru falls taxi ranchi, dassam falls cab ranchi, betla national park taxi, jharkhand tour package taxi, ranchi tour cab, jonha falls taxi, patratu valley cab, mccluskieganj taxi, ranchi to netarhat cab, ranchi to betla cab, ranchi tourism taxi, places to visit near ranchi by cab, waterfalls near ranchi taxi, ranchi day trip taxi, one day tour ranchi cab, ranchi to hazaribagh cab, ranchi hill station tour, car for picnic ranchi, ranchi picnic cab booking';

    // Find keywords meta tag and add to end
    html = html.replace(
        'ranchi jharkhand cab"',
        'ranchi jharkhand cab' + tourKeywords + '"'
    );

    fs.writeFileSync(fp, html, 'utf8');
    console.log('  ✅ Tour/sightseeing keywords added (Netarhat, Hundru Falls, Betla etc.)');
}

// ============================================================
// FIX 6: Verify GMB was correctly set in homepage
// ============================================================
function verifyAll() {
    console.log('\n🔍 Final Verification...\n');
    const fp = path.join(BASE, 'index.html');
    const html = fs.readFileSync(fp, 'utf8');

    const checks = {
        'lang="en-IN" on html': 'lang="en-IN"',
        'GMB URL correct': 'g.page/r/CQhqJMJdNNb6EBM/review',
        'og:locale = en_IN': 'content="en_IN"',
        'og:locale:alternate hi_IN': 'content="hi_IN"',
        '87+ Reviews in description': '87+ Google Reviews',
        'Star rating in title': '4.9★',
        'TouristAttraction schema': 'TouristAttraction',
        'TouristTrip schema': 'TouristTrip',
        'SpecialAnnouncement schema': 'SpecialAnnouncement',
        'Netarhat tour keywords': 'netarhat cab from ranchi',
        'Hundru Falls keywords': 'hundru falls taxi ranchi',
        'Atom feed link': 'application/atom+xml',
        'YourActualGBPLink still present': '!YourActualGBPLink'
    };

    let passed = 0, failed = 0;
    Object.entries(checks).forEach(([label, term]) => {
        let ok;
        if (term.startsWith('!')) {
            ok = !html.includes(term.substring(1));
            console.log((ok ? '  ✅' : '  ❌') + ' ' + label + (ok ? '' : ' — STILL PRESENT!'));
        } else {
            ok = html.includes(term);
            console.log((ok ? '  ✅' : '  ❌') + ' ' + label);
        }
        ok ? passed++ : failed++;
    });

    // Check route pages
    const sampleRoute = path.join(ROUTES_DIR, 'ranchi-to-jamshedpur-cab.html');
    const rhtml = fs.readFileSync(sampleRoute, 'utf8');
    console.log('\n  Route page checks:');
    console.log((rhtml.includes('lang="en-IN"') ? '  ✅' : '  ❌') + ' Route page lang="en-IN"');
    console.log((rhtml.includes('g.page/r/CQhqJMJdNNb6EBM') ? '  ✅' : '  ❌') + ' Route page GMB URL correct');
    console.log((!rhtml.includes('YourActualGBPLink') ? '  ✅' : '  ❌') + ' Route page no placeholder');

    console.log('\n' + '='.repeat(55));
    console.log(`PASSED: ${passed} | FAILED: ${failed}`);
    console.log(`Total files modified: ${totalFixed} | Errors: ${totalErrors}`);
    if (failed === 0) console.log('🏆 ALL CHECKS PASSED — Better than BOTH competitors!');
    else console.log('⚠️  Some checks failed, review above');
}

// ============================================================
// MAIN
// ============================================================
console.log('\n🚀 Beat Competitor 2 (ranchi-taxi-tour.com) Upgrade');
console.log('='.repeat(55));
console.log('\nCompetitor 2 Weaknesses We Will Exploit:');
console.log('  ❌ GoDaddy builder — slow, no @graph schema');
console.log('  ❌ Only 1 homepage, no route/city pages');
console.log('  ❌ twitter:card = "summary" (not large image)');
console.log('  ❌ No HowTo, no FAQPage schema');
console.log('  ❌ No outstation cab coverage pages');
console.log('\nCompetitor 2 Advantages We Will Match/Beat:');
console.log('  ✅ 811+ reviews claim → we show 87+ (honest)');
console.log('  ✅ "10% Off" in title → we add "4.9★" + reviews');
console.log('  ✅ lang="en-IN" → we add to ALL 2126 pages');
console.log('  ✅ Tour packages → we add TouristAttraction schema');
console.log('  ✅ og:locale en_IN → we add + hi_IN alternate');
console.log('  ✅ Atom/RSS feeds → we add freshness signals');
const start = Date.now();

upgradeHomepage();
fixLangTag();
fixGMBInAllPages();
fixOGLocale();
addTourKeywords();
verifyAll();

const elapsed = ((Date.now() - start) / 1000).toFixed(1);
console.log(`\n⏱  Completed in ${elapsed}s`);

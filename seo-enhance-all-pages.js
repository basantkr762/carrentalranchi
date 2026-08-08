/**
 * SEO Enhancement Script for All Route Pages
 * Rohit Travels Ranchi - rohittravels.com
 * 
 * This script adds missing SEO elements to all route HTML pages:
 * 1. ICBM geo meta tag
 * 2. hreflang tags
 * 3. Speakable schema
 * 4. WebPage schema with dateModified
 * 5. Expanded FAQ schema (adds more FAQs if less than 6)
 * 6. OG image alt text
 * 7. preload for fonts
 */

const fs = require('fs');
const path = require('path');

const ROUTES_DIR = path.join(__dirname, 'routes');
const CITIES_DIR = path.join(__dirname, 'cities');

let processedRoutes = 0;
let processedCities = 0;
let errors = 0;

// ============================================================
// HELPER: Add missing meta tags to <head>
// ============================================================
function addMissingMetaTags(html, pageUrl) {
    let modified = false;

    // 1. Add ICBM geo tag if missing
    if (!html.includes('name="ICBM"')) {
        html = html.replace(
            '<meta name="geo.position"',
            '<meta name="ICBM" content="23.3441, 85.3096">\r\n    <meta name="geo.position"'
        );
        modified = true;
    }

    // 2. Add hreflang if missing
    if (!html.includes('hreflang="en-IN"')) {
        const hreflangTags = `    <link rel="alternate" href="${pageUrl}" hreflang="en-IN">\r\n    <link rel="alternate" href="${pageUrl}" hreflang="en">\r\n    <link rel="alternate" href="${pageUrl}" hreflang="x-default">\r\n`;
        html = html.replace(
            '<link rel="canonical"',
            hreflangTags + '    <link rel="canonical"'
        );
        modified = true;
    }

    // 3. Add font preload if missing
    if (!html.includes('rel="preload"') || !html.includes('fonts.googleapis.com')) {
        const fontPreload = `    <link rel="preload" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">\r\n`;
        html = html.replace(
            '<link href="https://fonts.googleapis.com',
            fontPreload + '    <link href="https://fonts.googleapis.com'
        );
        modified = true;
    }

    // 4. Add og:image:width and og:image:height if missing
    if (!html.includes('og:image:width')) {
        html = html.replace(
            '<meta property="og:image"',
            '<meta property="og:image:width" content="1200">\r\n    <meta property="og:image:height" content="630">\r\n    <meta property="og:image"'
        );
        modified = true;
    }

    // 5. Add twitter:site if missing
    if (!html.includes('twitter:site')) {
        html = html.replace(
            '<meta name="twitter:card"',
            '<meta name="twitter:site" content="@rohittravelsranchi">\r\n    <meta name="twitter:card"'
        );
        modified = true;
    }

    return { html, modified };
}

// ============================================================
// HELPER: Add Speakable + WebPage schema before </head>
// ============================================================
function addSpeakableSchema(html, pageUrl, pageTitle, pageDesc) {
    if (html.includes('"speakable"') || html.includes('SpeakableSpecification')) {
        return html;
    }

    const speakableSchema = `
    <!-- WebPage + Speakable Schema for AI/Voice Search -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "${pageTitle}",
        "description": "${pageDesc}",
        "url": "${pageUrl}",
        "inLanguage": "en-IN",
        "dateModified": "2026-08-08",
        "isPartOf": {
            "@type": "WebSite",
            "name": "Rohit Travels Ranchi",
            "url": "https://rohittravels.com"
        },
        "speakable": {
            "@type": "SpeakableSpecification",
            "cssSelector": ["h1", ".route-meta", ".cta-banner h2", ".fare-table"]
        },
        "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
                {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://rohittravels.com/"},
                {"@type": "ListItem", "position": 2, "name": "Routes", "item": "https://rohittravels.com/#routes"}
            ]
        }
    }
    </script>
`;
    html = html.replace('</head>', speakableSchema + '</head>');
    return html;
}

// ============================================================
// HELPER: Extract page title and description
// ============================================================
function extractMeta(html) {
    const titleMatch = html.match(/<title>(.*?)<\/title>/i);
    const descMatch = html.match(/<meta name="description" content="(.*?)"/i);
    const urlMatch = html.match(/<link rel="canonical" href="(.*?)"/i);
    return {
        title: titleMatch ? titleMatch[1].replace(/"/g, '\\"') : 'Cab Service | Rohit Travels',
        desc: descMatch ? descMatch[1].replace(/"/g, '\\"') : 'Best cab service. Call +91-7903629240',
        url: urlMatch ? urlMatch[1] : 'https://rohittravels.com/'
    };
}

// ============================================================
// PROCESS: Route Pages
// ============================================================
function processRouteFiles() {
    console.log('\n📁 Processing Route Pages...\n');
    
    if (!fs.existsSync(ROUTES_DIR)) {
        console.log('❌ Routes directory not found!');
        return;
    }

    const files = fs.readdirSync(ROUTES_DIR).filter(f => f.endsWith('.html'));
    console.log(`Found ${files.length} route pages to process.\n`);

    files.forEach((file, index) => {
        const filePath = path.join(ROUTES_DIR, file);
        try {
            let html = fs.readFileSync(filePath, 'utf8');
            const { title, desc, url } = extractMeta(html);

            // Add missing meta tags
            const metaResult = addMissingMetaTags(html, url);
            html = metaResult.html;

            // Add speakable schema
            html = addSpeakableSchema(html, url, title, desc);

            fs.writeFileSync(filePath, html, 'utf8');
            processedRoutes++;

            if ((index + 1) % 50 === 0) {
                console.log(`  ✅ Processed ${index + 1}/${files.length} route pages...`);
            }
        } catch (err) {
            console.error(`  ❌ Error processing ${file}: ${err.message}`);
            errors++;
        }
    });

    console.log(`\n✅ Route pages done: ${processedRoutes} processed, ${errors} errors`);
}

// ============================================================
// PROCESS: City Pages
// ============================================================
function processCityFiles() {
    console.log('\n📁 Processing City Pages...\n');

    if (!fs.existsSync(CITIES_DIR)) {
        console.log('❌ Cities directory not found!');
        return;
    }

    // Walk all city subdirectories
    const cityDirs = fs.readdirSync(CITIES_DIR, { withFileTypes: true })
        .filter(d => d.isDirectory())
        .map(d => d.name);

    cityDirs.forEach(cityDir => {
        const cityPath = path.join(CITIES_DIR, cityDir);
        const htmlFiles = fs.readdirSync(cityPath).filter(f => f.endsWith('.html'));

        htmlFiles.forEach(file => {
            const filePath = path.join(cityPath, file);
            try {
                let html = fs.readFileSync(filePath, 'utf8');
                const { title, desc, url } = extractMeta(html);

                // Add missing meta tags
                const metaResult = addMissingMetaTags(html, url);
                html = metaResult.html;

                // Add LocalBusiness schema if not present
                if (!html.includes('"LocalBusiness"') && html.includes('"TaxiService"')) {
                    const localBizSchema = `
    <!-- LocalBusiness Schema for Local SEO -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": "https://rohittravels.com/#localbusiness",
        "name": "Rohit Travels Ranchi",
        "description": "Best cab and taxi service in Ranchi, Jharkhand. Airport taxi, outstation cabs, wedding cars starting at Rs 11/km.",
        "url": "https://rohittravels.com",
        "telephone": "+91-7903629240",
        "email": "rohittravels10@gmail.com",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Birsa chowk, road no a2, Hawai Nagar, Gitilpiri",
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
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "opens": "00:00",
            "closes": "23:59"
        },
        "priceRange": "Rs Rs",
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "87",
            "bestRating": "5"
        },
        "serviceArea": [
            {"@type": "AdministrativeArea", "name": "Ranchi"},
            {"@type": "AdministrativeArea", "name": "Jharkhand"},
            {"@type": "AdministrativeArea", "name": "Jamshedpur"},
            {"@type": "AdministrativeArea", "name": "Dhanbad"}
        ],
        "sameAs": [
            "https://rohittravels.com",
            "https://www.facebook.com/rohittravelsranchi",
            "https://www.instagram.com/rohittravelsranchi"
        ]
    }
    </script>
`;
                    html = html.replace('</head>', localBizSchema + '</head>');
                }

                // Add speakable schema
                html = addSpeakableSchema(html, url, title, desc);

                fs.writeFileSync(filePath, html, 'utf8');
                processedCities++;
            } catch (err) {
                console.error(`  ❌ Error processing ${cityDir}/${file}: ${err.message}`);
                errors++;
            }
        });
    });

    console.log(`\n✅ City pages done: ${processedCities} processed, ${errors} errors`);
}

// ============================================================
// MAIN
// ============================================================
console.log('🚀 Rohit Travels - SEO Enhancement Script');
console.log('==========================================');
console.log('Adding: ICBM tags, hreflang, speakable schema,');
console.log('        LocalBusiness schema, WebPage schema\n');

const startTime = Date.now();

processRouteFiles();
processCityFiles();

const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
console.log('\n==========================================');
console.log(`🎉 Complete! Total time: ${elapsed}s`);
console.log(`📊 Route pages: ${processedRoutes}`);
console.log(`📊 City pages:  ${processedCities}`);
console.log(`❌ Errors:      ${errors}`);
console.log('\nNext: Run "node update-sitemap-dates.js" to update all sitemap lastmod dates');

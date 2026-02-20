// Service Worker for Rohit Travels - Cache Strategy
// Version: bump this string to force cache refresh
const CACHE_NAME = 'rohit-travels-v1';

const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/css/style.min.css',
    '/js/script.js',
    '/manifest.json',
    '/images/rohittravelslogo.webp',
    '/images/rohittravelslogo_desktop.webp',
    '/images/rohittravelslogo_mobile.webp',
    '/images/hero-bg.webp',
    '/images/hero-bg1.webp',
    '/images/hero-bg2.webp',
    '/images/airport.avif',
    '/images/ertiga.webp',
    '/images/aura.webp',
    '/images/dezire.webp',
    '/images/crista.webp',
    '/images/audi.webp',
    '/images/bmw.webp',
    '/images/luxury-car.webp',
];

// Install: pre-cache all static assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(STATIC_ASSETS);
        }).then(() => self.skipWaiting())
    );
});

// Activate: delete old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => caches.delete(name))
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch: Cache-First for images/css/js, Network-First for HTML
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET and cross-origin requests (e.g. fonts, analytics)
    if (request.method !== 'GET' || url.origin !== location.origin) return;

    // HTML pages: Network-First (always fresh content)
    if (request.headers.get('accept')?.includes('text/html')) {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
                    return response;
                })
                .catch(() => caches.match(request))
        );
        return;
    }

    // Images, CSS, JS: Cache-First (fastest repeat loads)
    event.respondWith(
        caches.match(request).then((cached) => {
            if (cached) return cached;
            return fetch(request).then((response) => {
                if (!response || response.status !== 200) return response;
                const clone = response.clone();
                caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
                return response;
            });
        })
    );
});

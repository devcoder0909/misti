const CACHE_NAME = 'misti-divine-companion-v6';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './bg%20image.png',
  './bg2%20image.png',
  './misti.jpg',
  './manifest.json',
  './js/app.js',
  './js/engines/app-engine.js',
  './js/engines/theme-engine.js',
  './js/engines/content-engine.js',
  './js/engines/greeting-engine.js',
  './js/engines/festival-engine.js',
  './js/engines/illustration-engine.js',
  './js/engines/particle-engine.js',
  './js/engines/animation-engine.js',
  './js/engines/render-engine.js',
  './js/engines/pwa-engine.js',
  './data/design-tokens.json',
  './data/greetings.json',
  './data/thoughts.json',
  './data/guidance.json',
  './data/festivals.json',
  './data/themes.json',
  './data/illustrations.json'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Precaching offline assets');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Bypass range requests (essential for audio/video streaming)
  if (event.request.headers.get('range')) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // Cache the fresh response for offline use
        const responseClone = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });
        return networkResponse;
      })
      .catch(() => {
        // Fallback to cache if completely offline
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          if (event.request.headers.get('accept').includes('text/html')) {
            return caches.match('./index.html');
          }
        });
      })
  );
});

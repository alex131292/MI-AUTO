// Mi Auto PWA - Service Worker
const CACHE_NAME = 'miauto-v1';
const OFFLINE_URLS = [
  '/MI-AUTO/index.html',
  '/MI-AUTO/manifest.json',
  '/MI-AUTO/icons/icon-192.png',
  '/MI-AUTO/icons/icon-512.png',
  'https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Nunito:wght@300;400;500;600;700&display=swap',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
];

// INSTALL — pre-cache core assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(OFFLINE_URLS).catch(err => {
        console.warn('[SW] Some resources failed to cache:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// ACTIVATE — clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// FETCH — cache-first for local assets, network-first for APIs
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  // Skip non-GET and chrome-extension
  if (event.request.method !== 'GET' || url.protocol === 'chrome-extension:') return;
  
  // API calls (weather, maps, Anthropic) — network only
  const networkOnly = [
    'api.anthropic.com',
    'api.open-meteo.com',
    'nominatim.openstreetmap.org',
    'overpass-api.de',
    'basemaps.cartocdn.com'
  ];
  if (networkOnly.some(domain => url.hostname.includes(domain))) {
    event.respondWith(fetch(event.request).catch(() =>
      new Response('{}', { headers: { 'Content-Type': 'application/json' } })
    ));
    return;
  }

  // Everything else — cache first, then network
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (!response || response.status !== 200 || response.type === 'opaque') return response;
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      }).catch(() => {
        // Offline fallback
        if (event.request.destination === 'document') {
          return caches.match('/index.html');
        }
      });
    })
  );
});

// PUSH NOTIFICATION support (future use)
self.addEventListener('push', event => {
  if (!event.data) return;
  const data = event.data.json();
  self.registration.showNotification(data.title || 'Mi Auto', {
    body: data.body || '',
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-192.png',
    vibrate: [200, 100, 200]
  });
});

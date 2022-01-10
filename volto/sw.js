const originalCacheName = 'v1';
const resourcesToPrecache = ['/','./index.html','./css/home.css','./manifest.json','./192x192.png','./512x512.png','./cloud.png','./Java.png','./internet.png'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName)
    .then(cache => (cache.addAll(resourcesToPrecache))),
    )
});
// Clear cache on activate
this.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => (cacheName.startsWith('v1')))
          .filter(cacheName => (cacheName !== staticCacheName))
          .map(cacheName => caches.delete(cacheName))
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(caches.match(event.request)).then(cacheResponse => (cacheResponse || fetch(event.request)))
});
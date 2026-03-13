// HGC BizBook Service Worker
var CACHE = 'hgc-v1';

self.addEventListener('install', function(e) {
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  clients.claim();
});

self.addEventListener('fetch', function(e) {
  // Only cache same-origin requests
  if(e.request.url.startsWith(self.location.origin)) {
    e.respondWith(
      caches.open(CACHE).then(function(cache) {
        return fetch(e.request).then(function(response) {
          cache.put(e.request, response.clone());
          return response;
        }).catch(function() {
          return caches.match(e.request);
        });
      })
    );
  }
});

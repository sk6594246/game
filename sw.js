// Define a cache name
const CACHE_NAME = 'my-site-cache-v1';

// Define the files to cache
const urlsToCache = [
  '/',
  '/index.html', 
  '/style.css', 
  '/script.js'
];

// Install the service worker and cache the files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache opened');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch the cached files when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Check if the response is in cache
        if (response) {
          return response; // Return the cached response
        }
        return fetch(event.request); // Fetch from the network
      })
  );
});

// Activate event to clear older caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName); // Delete old caches
          }
        })
      );
    })
  );
});

// sw.js

// pushengage build+1
importScripts("https://clientcdn.pushengage.com/sdks/service-worker.js");

const BASE_CACHE_NAME = 'theradiofm-v3';
let CURRENT_VERSION = "14";

// Fetch the version from version.json and set it to the CACHE_NAME
fetch('/version.json')
  .then(response => response.json())
  .then(data => {
    CURRENT_VERSION = data.version;
  });

// List of assets to cache
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/favicon.png',
  '/img/',
  '/img/46603.png',
  '/offline.html',  // For offline fallback
  '/css/',
  '/css/classes.css',
  '/css/framework7-bundle.min.css',
  '/css/framework7-keypad.min.css',
  '/css/thorium.min.css',
  '/css/pages/index.css',
  '/css/pages/cover.css',
  '/css/plugins/',
  '/css/plugins/thorium.core.min.css',
  '/css/plugins/thorium.core.min.css.map',
  '/fonts/',
  '/fonts/icomoon/',
  '/fonts/icomoon/icomoon.ttf',
  '/fonts/icomoon/icomoon.woff',
  '/fonts/icomoon/icomoon.woff2',
  '/fonts/icomoon/icomoon.svg',
  '/fonts/icomoon/icomoon.eot',
  '/js/',
  '/js/classes.js',
  '/js/framework7-keypad.min.js',
  '/js/framework7-bundle.min.js',
  '/js/thorium.min.js',
  '/js/thorium.config.js.map',
  '/js/thorium.config.js',
  '/js/framework/',
  '/js/framework/framework7-bundle.min.js',
  '/js/framework/framework7-keypad.min.js.map',
  '/js/plugins/',
  '/js/plugins/thorium.core.min.js.map',
  '/js/plugins/thorium.core.min.js',
  '/pages/',
  '/pages/404.html',
  '/pages/cover/',
  '/pages/cover/index.html',
  '/pages/cover/assets/',
  '/pages/cover/assets/icons.all',
  '/pages/cover/assets/icons.svg',
  '/pages/cover/assets/main.css',
  '/pages/cover/assets/main.js',
  '/pages/cover/assets/images/',
  '/pages/cover/assets/images/favicon.png',
  '/pages/cover/assets/images/image01.jpg',
  '/pages/cover/assets/images/share.jpg',
  '/pages/cover/assets/images/apple-touch-icon.png'
];

// Installing the service worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(BASE_CACHE_NAME + CURRENT_VERSION)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

// Fetching from the cache or network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit, return the cached response
        if (response) {
          return response;
        }
        // Try fetching from the network
        return fetch(event.request)
          .then(response => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            // Cache the fetched resource
            var responseToCache = response.clone();
            caches.open(BASE_CACHE_NAME + CURRENT_VERSION)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            return response;
          })
          .catch(error => {
            // If the fetch fails (e.g., no network), return the offline.html page
            return caches.match('/offline.html')
              .then(response => response || new Response('<h1>Offline</h1><p>You are currently offline.</p>', {
                headers: { 'Content-Type': 'text/html' }
              }));
          });
      })
  );
});

// Cleaning up old caches based on the version
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName.startsWith(BASE_CACHE_NAME) && cacheName !== BASE_CACHE_NAME + CURRENT_VERSION) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// This is the "Offline page" service worker
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // If the request is in the cache, return the cached response
      if (response) {
        return response;
      }

      // Otherwise, return the offline fallback page
      return caches.match('offline.html');
    })
  );
});

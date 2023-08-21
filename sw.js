  const CACHE_NAME = 'cool-cache';

  // Add whichever assets you want to pre-cache here:
  const PRECACHE_ASSETS = [
      '/pages/cover/',
      '/pages/css/',
      '/pages/js/',
      '/pages/nav/',
      '/pages/privacy/',
      '/pages/response/',
      '/pages/road/',
      '/pages/av.html',
      '/pages/blank.html',
      '/pages/blog.html',
      '/pages/dash.html',
      '/pages/dopemusic.html',
      '/pages/ko-fi.html',
      '/pages/loading.html',
      '/pages/loficafe.html',
      '/pages/lofifm.html',
      '/pages/lofigen.html',
      '/pages/nav.html',
      '/pages/player.html',
      '/pages/privacy.html',
      '/pages/radio.html',
      '/pages/radios.html',
      '/pages/social.html',
      '/pages/story.html',
      '/pages/visual.html',
      '/pages/wall.html',
      '/pages/youtube.html',
      '/pages/zapgpt.html',
      '/css/classes.css',
      '/css/custom.css',
      '/css/framework7-bundle.min.css',
      '/css/framework7-keypad.min.css',
      '/css/pages/index.css',
      '/css/thorium.min.css',
      '/index.html',
      '/js/custom.js',
      '/js/framework/framework7-bundle.min.js',
      '/js/plugins/thorium.core.min.js',
      '/js/service-worker-register.js',
      '/js/thorium.config.js',
      '/offline.html',
      '/pages/cover/assets/main.css',
      '/pages/cover/assets/main.js',
      '/pages/cover/index.html',
      '/pages/css/flashblock.css',
      '/pages/css/gear.css',
      '/pages/css/gear.min.css',
      '/pages/css/icons.css',
      '/pages/css/styles.css',
      '/pages/css/styles.min.css'    
  ]
  
  // Listener for the install event - pre-caches our assets list on service worker install.
  self.addEventListener('install', event => {
      event.waitUntil((async () => {
          const cache = await caches.open(CACHE_NAME);
          cache.addAll(PRECACHE_ASSETS);
      })());
  });
  
  self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
  });

  self.addEventListener('fetch', event => {
    event.respondWith(async () => {
        const cache = await caches.open(CACHE_NAME);
  
        // match the request to our cache
        const cachedResponse = await cache.match(event.request);
  
        // check if we got a valid response
        if (cachedResponse !== undefined) {
            // Cache hit, return the resource
            return cachedResponse;
        } else {
          // Otherwise, go to the network
            return fetch(event.request)
        };
    });
  });
  
  
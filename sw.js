// pushengage build+1
importScripts("https://clientcdn.pushengage.com/sdks/service-worker.js");

/*!
 * Refactored Thorium Initialization for framework7 projects
 * Version 3.4 january, 2022 / 2024
 * framework7 v6.x (https://framework7.io) MIT Licensed
 * Copyright 2018-2022 Nymphide Lab.
 * https://github.com/nymphide/thorium
 * https://nymphide.com
*/

const origin=self.location.origin;
const skipAllExternalUrl=true;
const blacklist=["https://firestore.googleapis.com","version.json",".php","%7B%7Binstimage%7D%7D"];
const preloadList=['./','./offline.html', './index.html', './manifest.json', './css/', './js/', './img/'];

function isRejectable(url) {
  return skipAllExternalUrl && !url.includes(origin) ? true : blacklist.some(v => url.includes(v));
}

self.addEventListener('install', function(event) {
  event.waitUntil(preLoad());
  console.log('[com.thorium.serviceworker] Service Worker Initialized');
});

const preLoad = async () => {
  console.log('Service Worker Installation');
  const cache = await caches.open('thorium-cache');
  await Promise.all(preloadList.map(url => cache.add(url)));
};

self.addEventListener('activate', function(event) {
  console.log('[com.thorium.serviceworker] service worker activated');
});

/* -- SW Fetch during use --*/
self.addEventListener('fetch', function(event) {
  if ( isRejectable(event.request.url)==true) {
    console.log('[com.thorium.serviceworker] request rejected '+event.request.url);
    return;
  }
  event.respondWith(
    checkResponse(event.request)
    .catch(function() {
      console.log('[com.thorium.serviceworker] file returned from cache: '+event.request.url);
      return returnFromCache(event.request);
    }
  ));
  event.waitUntil(
    addToCache(event.request)
  );
});

const checkResponse = async (request) => {
  try {
    const response = await fetch(request);
    if (response.status !== 404) {
      return response;
    } else {
      throw new Error();
    }
  } catch (error) {
    throw error;
  }
};

const addToCache = async (request) => {
  try {
    const cache = await caches.open('thorium-cache');
    const response = await fetch(request);
    console.log('com.thorium.serviceworker] file added to cache ' + request.url);
    await cache.put(request, response);
    } catch(err) {
      console.log('com.thorium.serviceworker] error ' + err.message);
    }
  }

  async function returnFromCache(request) {
    const cache = await caches.open("thorium-cache");
    const matching = await cache.match(request);
    
    if (!matching || matching.status === 404) {
      return cache.match("offline.html");
    }
    
    return matching;
  }

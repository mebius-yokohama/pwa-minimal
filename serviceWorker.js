/** Service Worker */
const CACHE_NAME = "pwa-sample-cache";

const urlsForCache = [
  "/",
  "/manifest.webmanifest",
  "/serviceWorker.js",
  "/js/todo.js"
];

self.addEventListener("install", function (e) {
  console.log("install event called");
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsForCache);
    })
  );
});

self.addEventListener("fetch", function (event) {
  console.log("fetch event called");
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response ? response : fetch(event.request);
    })
  );
});

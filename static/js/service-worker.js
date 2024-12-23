// service worker entrypoint handler

function onInstall(event) {
  console.log("[Service Worker] Installing Service Worker ...", event);
  self.skipWaiting();
}

function onActivate(event) {
  console.log("[Service Worker] Activating Service Worker ....", event);
  return self.clients.claim();
}

function onFetch(event) {
  console.log("[Service Worker] Fetching something ....", event);
  event.respondWith(fetch(event.request));
}

self.addEventListener("install", onInstall);

self.addEventListener("activate", onActivate);

self.addEventListener("fetch", onFetch);

const channel = new BroadcastChannel("sw-messages");

setInterval(() => {
  channel.postMessage({
    body: `Hello from Service Worker at ${new Date().toISOString()}`,
    timestamp: new Date().toISOString(),
  });
}, 5000);

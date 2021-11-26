const CACHE = "version-1";

importScripts(
    "https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js"
);

self.addEventListener("message", (ev) => {
    if(ev.data && ev.data.type === "SKIP_WAITING") {
        self.skipWaiting();
    }
});

workbox.routing.registerRoute(
    new RegExp('/*'),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: CACHE
    })
)
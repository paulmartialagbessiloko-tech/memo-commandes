// Service worker : permet d'utiliser l'application sans connexion internet.
// Change VERSION à chaque mise à jour du site pour forcer le rafraîchissement.
const VERSION = "v2";
const CACHE = "memo-commandes-" + VERSION;
const FICHIERS = [
  "./",
  "index.html",
  "style.css",
  "app.js",
  "manifest.webmanifest",
  "icons/icon.svg",
  "icons/icon-192.png",
  "icons/icon-512.png",
];

self.addEventListener("install", (ev) => {
  ev.waitUntil(caches.open(CACHE).then((c) => c.addAll(FICHIERS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (ev) => {
  ev.waitUntil(
    caches.keys()
      .then((cles) => Promise.all(cles.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Réseau d'abord (pour avoir les mises à jour), cache si pas de connexion.
self.addEventListener("fetch", (ev) => {
  if (ev.request.method !== "GET") return;
  ev.respondWith(
    fetch(ev.request)
      .then((rep) => {
        const copie = rep.clone();
        caches.open(CACHE).then((c) => c.put(ev.request, copie));
        return rep;
      })
      .catch(() => caches.match(ev.request, { ignoreSearch: true }).then((r) => r || caches.match("index.html")))
  );
});

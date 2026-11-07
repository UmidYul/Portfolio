/* Service worker визитки.
   Стратегия намеренно смешанная:
   - страница (navigate) берётся из СЕТИ, кэш только запасной вариант.
     Иначе после деплоя люди неделями видели бы старую версию — самая
     частая беда кэширующих воркеров;
   - статика (css, js, картинки, шрифты) берётся из кэша и обновляется
     в фоне, поэтому визитка открывается и без сети.
   При смене VERSION старые кэши удаляются. */

var VERSION = 'uy-2026-11-08-1';
var CORE = [
  './',
  './index.html',
  './styles.css',
  './qr.js',
  './avatar.jpg',
  './favicon.svg',
  './icon-192.png',
  './manifest.webmanifest'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(VERSION)
      .then(function (c) { return c.addAll(CORE); })
      .then(function () { return self.skipWaiting(); })
      .catch(function () { /* один недоступный файл не должен ронять установку */ })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys()
      .then(function (keys) {
        return Promise.all(keys.map(function (k) {
          return k === VERSION ? null : caches.delete(k);
        }));
      })
      .then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;

  var url;
  try { url = new URL(req.url); } catch (err) { return; }
  if (url.origin !== self.location.origin) return;   // чужие домены не трогаем

  /* страница — сначала сеть */
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then(function (res) {
          var copy = res.clone();
          caches.open(VERSION).then(function (c) { c.put('./index.html', copy); });
          return res;
        })
        .catch(function () {
          return caches.match('./index.html').then(function (hit) {
            return hit || caches.match('./');
          });
        })
    );
    return;
  }

  /* статика — сначала кэш, обновление в фоне */
  e.respondWith(
    caches.match(req).then(function (hit) {
      var net = fetch(req).then(function (res) {
        if (res && res.status === 200 && res.type === 'basic') {
          var copy = res.clone();
          caches.open(VERSION).then(function (c) { c.put(req, copy); });
        }
        return res;
      }).catch(function () { return hit; });
      return hit || net;
    })
  );
});

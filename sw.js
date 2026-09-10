/* NeoCalc — Service Worker (arquivo real)
 *
 * Suba CACHE_VERSION sempre que alterar index.html, app.js ou sw.js para
 * forçar atualização nos PWAs já instalados ('neocalc-v3' -> 'neocalc-v4' ...).
 *
 * Estratégia:
 *  - install : pré-cacheia o app shell (index.html + app.js) + React/ReactDOM
 *              do CDN + a folha de estilo da fonte Nunito.
 *  - navigate: network-first, com fallback para o index.html em cache (offline).
 *  - demais GET (mesma origem + CDNs conhecidos): cache-first com revalidação
 *              em background.
 */
const CACHE_VERSION = 'neocalc-v4';

const PRECACHE_URLS = [
  './',
  './index.html',
  './app.js?v=4',   // mesma query do <script> em index.html
  'https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js',
  'https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&display=swap',
];

const CDN_RE = /(cdnjs\.cloudflare\.com|fonts\.googleapis\.com|fonts\.gstatic\.com)/;

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_VERSION)
      // cache:'reload' evita gravar uma resposta já obsoleta do cache HTTP do browser.
      .then((c) => Promise.allSettled(
        PRECACHE_URLS.map((u) => c.add(new Request(u, { cache: 'reload' })))
      ))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

function cachePut(req, res) {
  caches.open(CACHE_VERSION).then((c) => c.put(req, res)).catch(() => {});
}

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  if (!sameOrigin && !CDN_RE.test(url.href)) return; // deixa passar sem interceptar

  // Navegação (HTML): network-first -> cache -> index.html offline
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then((res) => { cachePut(req, res.clone()); return res; })
        .catch(() => caches.match(req).then((c) => c || caches.match('./index.html')))
    );
    return;
  }

  // Demais GET: cache-first + revalidação em background
  e.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req)
        .then((res) => {
          if (res && (res.ok || res.type === 'opaque')) cachePut(req, res.clone());
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});

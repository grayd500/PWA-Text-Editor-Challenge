// client/src-sw.js:
const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

// Filter out HMR files
const manifest = self.__WB_MANIFEST.filter(entry => !entry.url.includes('hot-update'));
precacheAndRoute(manifest);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// ✅: Implement asset caching
// Cache assets like JS, CSS, and images
registerRoute(
  // 🆕Define the callback function that will filter the requests we want to cache
  // Filter out HMR updates for JS and CSS files
  ({ request, url }) => {
    if (url.pathname.endsWith('hot-update.js') || url.pathname.endsWith('hot-update.json')) {
      return false;
    }
    return ['style', 'script', 'worker', 'image'].includes(request.destination);
  },
  new CacheFirst({
    cacheName: 'asset-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 24 * 60 * 60, // 1 Day
      }),
    ],
  })
);


importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const { CacheableResponse } = workbox.cacheableResponse;
const { ExpirationPlugin } = workbox.expiration;

workbox.routing.registerRoute(
  '/',
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'landing-page',
  })
);

workbox.routing.registerRoute(
  ({ request, url }) => {
    const isImageDestination = request.destination === 'image';
    const isFirebaseStorage = url.host == 'firebasestorage.googleapis.com';
    const isImage = isImageDestination || isFirebaseStorage;

    return isImage;
  },
  new workbox.strategies.CacheFirst({
    cacheName: 'images',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  })
);

const EXCLUDED_HOSTS = new Set(['api.imgur.com']);
const EXCLUDED_PATHS = new Set(['_next']);
workbox.routing.registerRoute(
  ({ url }) => {
    const isAsset = !!url.pathname.match(/\./);
    const isExcludedHost = EXCLUDED_HOSTS.has(url.host);
    const isExcludedPath = EXCLUDED_PATHS.has(url.pathname.split('/')[1]);
    const isPage = !isAsset && !isExcludedHost && !isExcludedPath;

    return isPage;
  },
  new workbox.strategies.CacheFirst({
    cacheName: 'pages',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  })
);

const STATIC_PATHS = new Set(['manifest.json', '_next', 'workbox-cdn']);
workbox.routing.registerRoute(
  ({ request, url }) => {
    const isStaticRequest = request.destination === 'script' || request.destination === 'style';
    const isStaticPath = STATIC_PATHS.has(url.pathname.split('/')[1]);

    return isStaticRequest || isStaticPath;
  },
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'static-resources',
  })
);

const CACHE_VERSION = 'v1.0.0';
const STATIC_CACHE = `static-cache-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `dynamic-cache-${CACHE_VERSION}`;
const ASSETS_TO_CACHE = [
  // Core HTML/CSS/JS
  '/',
  '/index.html',
  '/offline.html',
  '/css/styles.css',
  '/css/animations.css',
  '/css/responsive.css',
  '/css/ar-vr.css',
  '/css/ecommerce.css',
  '/css/pod.css',
  '/css/gamification.css',
  
  // Fonts
  '/fonts/Roboto.woff2',
  '/fonts/Montserrat.woff2',
  '/fonts/PlayfairDisplay.woff2',
  
  // Icons
  '/assets/icons/favicon.ico',
  '/assets/icons/android-chrome-192x192.png',
  '/assets/icons/android-chrome-512x512.png',
  '/assets/icons/apple-touch-icon.png',
  
  // Screenshots
  '/assets/images/screenshots/home.png',
  '/assets/images/screenshots/ai.png',
  '/assets/images/screenshots/ar-vr.png',
  '/assets/images/screenshots/ecommerce.png',
  '/assets/images/screenshots/3dpod.png',
  
  // JS Modules
  '/js/scripts.js',
  '/js/ar-vr-init.js',
  '/js/ai.js',
  '/js/gamification.js',
  '/js/ecommerce.js',
  '/js/pod.js',
  '/js/scroll-animations.js'
];

// Precache static assets during installation
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
      .then(self.skipWaiting())
  );
});

// Activate new service worker and remove old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== STATIC_CACHE && key !== DYNAMIC_CACHE) {
            return caches.delete(key);
          }
        })
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch handler with smart caching strategies
self.addEventListener('fetch', event => {
  const request = event.request;

  // API / dynamic content (AI responses, E-commerce data, 3DPoD previews)
  if (request.url.includes('/api/') || request.url.includes('/modules/')) {
    event.respondWith(
      fetch(request)
        .then(response => {
          return caches.open(DYNAMIC_CACHE).then(cache => {
            cache.put(request.url, response.clone());
            return response;
          });
        })
        .catch(() => caches.match(request).then(res => res || caches.match('/offline.html')))
    );
    return;
  }

  // Static assets (HTML/CSS/JS/images/fonts)
  event.respondWith(
    caches.match(request).then(cachedResponse => {
      if (cachedResponse) return cachedResponse;
      return fetch(request)
        .then(networkResponse => {
          return caches.open(DYNAMIC_CACHE).then(cache => {
            cache.put(request.url, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => {
          if (request.destination === 'document') {
            return caches.match('/offline.html');
          }
        });
    })
  );
});

// Push notifications
self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Notification';
  const options = {
    body: data.body || 'You have a new notification.',
    icon: '/assets/icons/android-chrome-192x192.png',
    badge: '/assets/icons/android-chrome-192x192.png',
    data: data.url || '/'
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

// Notification click handler
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then(clientList => {
        for (let client of clientList) {
          if (client.url === event.notification.data && 'focus' in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(event.notification.data);
        }
      })
  );
});

// Background sync for deferred tasks
self.addEventListener('sync', event => {
  if (event.tag === 'sync-ai-requests') {
    event.waitUntil(syncAIRequests());
  }
  if (event.tag === 'sync-ecommerce-orders') {
    event.waitUntil(syncEcommerceOrders());
  }
  if (event.tag === 'sync-3dpod-assets') {
    event.waitUntil(sync3DPoDAssets());
  }
});

// Example sync functions
async function syncAIRequests() {
  const queue = await getLocalQueue('ai-requests');
  for (let req of queue) {
    try {
      await fetch('/api/ai', { method: 'POST', body: JSON.stringify(req) });
      await removeFromQueue('ai-requests', req.id);
    } catch (err) {
      console.error('AI sync failed', err);
    }
  }
}

async function syncEcommerceOrders() {
  const orders = await getLocalQueue('ecommerce-orders');
  for (let order of orders) {
    try {
      await fetch('/api/orders', { method: 'POST', body: JSON.stringify(order) });
      await removeFromQueue('ecommerce-orders', order.id);
    } catch (err) {
      console.error('Order sync failed', err);
    }
  }
}

async function sync3DPoDAssets() {
  const assets = await getLocalQueue('3dpod-assets');
  for (let asset of assets) {
    try {
      await fetch('/api/3dpod/upload', { method: 'POST', body: JSON.stringify(asset) });
      await removeFromQueue('3dpod-assets', asset.id);
    } catch (err) {
      console.error('3DPoD sync failed', err);
    }
  }
}

// Utilities for local queue management (IndexedDB / localStorage)
async function getLocalQueue(queueName) {
  // Replace with IndexedDB or LocalForage implementation
  return JSON.parse(localStorage.getItem(queueName) || '[]');
}

async function removeFromQueue(queueName, id) {
  const queue = await getLocalQueue(queueName);
  const filtered = queue.filter(item => item.id !== id);
  localStorage.setItem(queueName, JSON.stringify(filtered));
}
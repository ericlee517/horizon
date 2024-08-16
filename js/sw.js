// 监听安装事件
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('my-cache').then(cache => {
      return cache.addAll([
        '/',
        'https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css',
        'https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.colors.min.css',
        'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css',
        '..//css/style.css',
        '..//js/script.js',
        '../image/pen.jpg',
        '../image/flower.jpg',
        '../favicon.svg'
      ]);
    })
  );
});

// 监听激活事件
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => cacheName!=='my-cache').map(cacheName => caches.delete(cacheName))
      );
    })
  );
});

// 监听 fetch 事件
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response;
      }

      return fetch(event.request).then(networkResponse => {
        const responseClone = networkResponse.clone();
        caches.open('my-cache').then(cache => {
          cache.put(event.request, responseClone);
        });
        return networkResponse;
      });
    })
  );
});
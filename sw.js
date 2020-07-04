var cacheName = 'test-pwa-v1';
console.log('Service Worker: Hello there!');
self.addEventListener('install', (e) => {
    if (navigator.onLine) {
        console.log('Online, skip wait');
        self.skipWaiting();
    };
    console.log('Service Worker: Installing...');
    e.waitUntil(caches.open(cacheName).then((cache) = > {
        console.log('Service Worker: Caching caches...');
        return cache.addAll(['/pwa-test/', '/pwa-test/maskable_icon.png', '/pwa-test/sw.js', '/pwa-test/manifest.json']);
    }));
    e.waitUntil(caches.keys().then((keyList) = > {
        return Promise.all(keyList.map((key) = > {
            if (key !== cacheName) {
                console.log('Service Worker: Bye-Bye', key);
                return caches.delete(key);
            }
        }));
    }));
    console.log('Service Worker: Done installing!');
});
self.addEventListener('fetch', function(event) {
    console.log('Service Worker: We got a (no, not fish) fetch!', event.request);
    return caches.match(event.request.url);
});

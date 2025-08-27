const CACHE_NAME = "my-app-cache-v1";
const urlsToCache = ["/", "/offline.html"];

// نصب Service Worker و کش کردن فایل‌های ضروری
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// فعال‌سازی و حذف کش‌های قدیمی
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      )
    )
  );
});

// مدیریت درخواست‌ها (آفلاین/آنلاین)
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request).then((res) => {
      return res || caches.match("/offline.html");
    }))
  );
});

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Этот обработчик обязателен для Android Chrome.
  // Мы просто передаём запрос дальше, не кэшируя, чтобы не ломать существующее поведение.
  event.respondWith(
    fetch(event.request).catch(() => {
      // Если нет сети, показываем заглушку (но это почти не случается)
      return new Response("Offline mode is not yet implemented.");
    })
  );
});
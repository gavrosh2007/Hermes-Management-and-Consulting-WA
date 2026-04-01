// sw.js - Полный и правильный код для PWA на Android
// Устанавливается сразу, активируется мгновенно, отвечает на fetch

self.addEventListener('install', (event) => {
  console.log('[SW] Installing...');
  // Принудительно пропускаем ожидание и активируем сразу
  self.skipWaiting();
});

self.addEventListener('activate', (event) {
  console.log('[SW] Activating...');
  // Захватываем управление всеми открытыми вкладками
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Android требует обязательный обработчик fetch
  // Просто пробрасываем запрос на сервер
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        // Если офлайн — возвращаем заглушку
        return new Response(
          '<h1>Нет соединения</h1><p>Проверьте интернет и откройте приложение снова.</p>',
          { headers: { 'Content-Type': 'text/html' } }
        );
      })
  );
});
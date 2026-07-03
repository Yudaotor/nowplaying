// 缓存页面壳，让重复访问秒开（首屏仍需一次网络）。
// 策略：same-origin GET 用 stale-while-revalidate —— 命中缓存立刻返回，
// 后台顺便拉最新更新缓存。跨域的数据/图片请求(LB、EdgeOne、iTunes、mzstatic)不拦，走网络。
const CACHE = 'np-shell-v1';

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

self.addEventListener('fetch', (e) => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== self.location.origin) return; // 只管本站静态壳
  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const cached = await cache.match(req);
    const network = fetch(req)
      .then((r) => { if (r && r.ok) cache.put(req, r.clone()); return r; })
      .catch(() => null);
    return cached || (await network) || new Response('offline', { status: 503 });
  })());
});

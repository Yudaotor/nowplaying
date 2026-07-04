// 缓存页面壳 + 封面图，让重复访问秒开、封面瞬显。
// - 壳(same-origin GET)：stale-while-revalidate —— 命中缓存立刻返回，后台拉新更新缓存。
// - 封面(p*.music.126/127.net)：cache-first —— 命中直接返回(秒显)，未命中拉网并入缓存
//   (opaque no-cors 响应也能存)，容量上限 ~40 张、FIFO 淘汰，避免无限增长。
// - 其它跨域(LB、iTunes 等数据请求)不拦，直接走网络。
const SHELL = 'np-shell-v3';
const COVERS = 'np-covers-v1';
const COVER_MAX = 40;

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil((async () => {
  // 删除旧壳缓存(升级后立即拿到新页面壳)；封面缓存保留。
  const names = await caches.keys();
  await Promise.all(names.filter((n) => n !== SHELL && n !== COVERS).map((n) => caches.delete(n)));
  await self.clients.claim();
})()));

function isCover(url) {
  return url.hostname.endsWith('.music.126.net') || url.hostname.endsWith('.music.127.net');
}

async function trimCache(cache, max) {
  const keys = await cache.keys();
  if (keys.length <= max) return;
  await Promise.all(keys.slice(0, keys.length - max).map((k) => cache.delete(k)));
}

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // 封面图：cache-first，命中秒显；未命中拉网并缓存。
  if (isCover(url)) {
    e.respondWith((async () => {
      const cache = await caches.open(COVERS);
      const cached = await cache.match(req);
      if (cached) return cached;
      try {
        const resp = await fetch(req);
        if (resp && (resp.ok || resp.type === 'opaque')) {
          cache.put(req, resp.clone()).then(() => trimCache(cache, COVER_MAX)).catch(() => {});
        }
        return resp;
      } catch (err) {
        return cached || Response.error();
      }
    })());
    return;
  }

  if (url.origin !== self.location.origin) return; // 其它跨域数据请求不拦
  e.respondWith((async () => {
    const cache = await caches.open(SHELL);
    const cached = await cache.match(req);
    const network = fetch(req)
      .then((r) => { if (r && r.ok) cache.put(req, r.clone()); return r; })
      .catch(() => null);
    return cached || (await network) || new Response('offline', { status: 503 });
  })());
});

// 항상 서버에서 먼저 받고, 오프라인일 때만 저장본을 씁니다.
const K='salgm-v14';
self.addEventListener('install',e=>{self.skipWaiting();});
self.addEventListener('activate',e=>e.waitUntil(
  caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==K).map(k=>caches.delete(k)))).then(()=>self.clients.claim())
));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  e.respondWith(
    fetch(e.request).then(r=>{ if(r.ok){const c=r.clone(); caches.open(K).then(x=>x.put(e.request,c));} return r; })
    .catch(()=>caches.match(e.request))
  );
});

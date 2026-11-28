const V='nabdah-v10',SHELL=['./','index.html','style.css','core.js','app.js','logo.svg','favicon.svg','manifest.webmanifest','icon-192.png','icon-512.png','https://unpkg.com/leaflet@1.9.4/dist/leaflet.css','https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(V).then(c=>Promise.all(SHELL.map(u=>c.add(u).catch(()=>{})))))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V&&k!=='nabdah-tiles').map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.pathname.startsWith('/api/'))return;
  if(u.host.endsWith('tile.openstreetmap.org')){e.respondWith(caches.open('nabdah-tiles').then(async c=>{const hit=await c.match(e.request);if(hit)return hit;try{const r=await fetch(e.request);if(r.ok){c.put(e.request,r.clone());trim(c)}return r}catch(x){return hit||Response.error()}}));return}
  e.respondWith(fetch(e.request).then(r=>{if(r.ok&&(u.origin===location.origin||u.host==='unpkg.com')){const c=r.clone();caches.open(V).then(x=>x.put(e.request,c))}return r}).catch(()=>caches.match(e.request).then(m=>m||caches.match('index.html'))))});
async function trim(c){const ks=await c.keys();if(ks.length>600)for(const k of ks.slice(0,ks.length-600))await c.delete(k)}

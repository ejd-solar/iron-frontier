const C='iron-frontier-a977165d0a',F=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener('message',e=>{if(e.data=='skip')self.skipWaiting();});
self.addEventListener('fetch',e=>{if(e.request.method!='GET')return;
 if(e.request.mode=='navigate'||/\.html($|\?)|\/$/.test(new URL(e.request.url).pathname)){e.respondWith(fetch(e.request,{cache:'no-store'}).then(n=>{const cp=n.clone();caches.open(C).then(c=>c.put(e.request,cp));return n;}).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match('./index.html'))));return;}
 if(/\/(version\.json|diag\.html|game\.js)$/.test(new URL(e.request.url).pathname)){e.respondWith(fetch(e.request,{cache:'no-store'}));return;}
 e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request).then(n=>{const cp=n.clone();caches.open(C).then(c=>c.put(e.request,cp));return n;}).catch(()=>caches.match('./index.html'))));});

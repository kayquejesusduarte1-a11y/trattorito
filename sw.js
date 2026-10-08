/* Cache somente de arquivos públicos e estáticos. Não armazenar dados do cliente, carrinho, perfis ou respostas da API. */
const CACHE="trattoria-static-v1";
const ASSETS=["./index.html","./style.css","./recursos48.css","./recursos48.js","./trattoria-logo.webp"];
self.addEventListener("install",event=>{event.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith("trattoria-static-")&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",event=>{const req=event.request;if(req.method!=="GET"||new URL(req.url).origin!==self.location.origin)return;const path=new URL(req.url).pathname;if(/\/api\/|\/(pedido|pagamento|perfil|login|cadastro|carrinho)\.html$/.test(path))return;event.respondWith(fetch(req).then(response=>{if(response.ok&&response.type==="basic"&&["script","style","image"].includes(req.destination)){const cloned=response.clone();caches.open(CACHE).then(cache=>cache.put(req,cloned)).catch(()=>{})}return response}).catch(()=>caches.match(req).then(r=>r||Response.error())))});

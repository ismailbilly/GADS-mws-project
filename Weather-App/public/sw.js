const cacheName = 'v1';
const staticAssets = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './fallback.json',
    './snowy.jpg'
];

self.addEventListener('install', async event => {
    const cache = await caches.open('all-weather')
    cache.addAll(staticAssets);
    //e.waitUntil(
        //caches.open(cacheName).then(function(cache){
        //console.log("[serviceWorker] caching files");
        //return cache.addAll(staticAssets);
       // })
   // )

    
})

self.addEventListener('fetch', event =>{
   const req = event.request;
   const url = new URL(req.url);

   if (url.origin === location.origin){
    event.respondWith(cacheFirst(req));
   } else {
    event.respondWith(networkFirst(req));
   }
   
});

async function cacheFirst(req){
    const cachedResponse = await caches.match(req);
    return cachedResponse || fetch(req);
}

async function networkFirst(req){
    const cache = await caches.open('save-weather');
    try {
        const res = await fetch(req);
        cache.put(req, res.clone());
        return res;
    } catch (error) {
        const cachedResponse = await cache.match(req);
        return cachedResponse || await caches.match('./fallback.json');
        
    }
}

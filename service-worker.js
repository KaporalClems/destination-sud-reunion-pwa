const CACHE_NAME = 'dsr-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    'https://cdn.tailwindcss.com',
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap',
    'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200',
    'https://srias.re/wp-content/uploads/2020/12/Destination-Sud-Reunion-png-1-min.png',
    'https://www.sudreuniontourisme.fr/fileadmin/_processed_/9/9/csm_BrasEtangs-VueGdBenare-1_cbb4280c3f.jpg',
    'https://www.sudreuniontourisme.fr/fileadmin/_processed_/d/0/csm_redim_volcan_2015_FRT-Gaby_Barathieu_8_fev_2019_1bf394bc18.jpg',
    'https://www.sudreuniontourisme.fr/fileadmin/_processed_/c/c/csm_randonnee_redim_4ffbef2eae.jpg',
    'https://images.unsplash.com/photo-1582610285924-f03d7d95620f?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1590425495221-34539a265436?q=80&w=1964&auto=format&fit=crop'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

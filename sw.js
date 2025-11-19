const CACHE_NAME = 'doubleb-restaurant-v1';
const urlsToCache = [
    '/',
    '/index_Version2.html',
    '/styles_Version2_new.css',
    '/script_Version2.js',
    '/menu_double_b.pdf',
    '/images double b/logo_1.png',
    '/images double b/logo_2.png',
    '/images double b/supp_menu.png',
    // Ajouter les images les plus importantes
    '/images double b/tacos/le_classique.png',
    '/images double b/burgers/cheese.png',
    '/images double b/pizzas/margherita.png'
];

// Installation du Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache ouvert');
                return cache.addAll(urlsToCache);
            })
    );
});

// Activation et nettoyage des anciens caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Suppression de l\'ancien cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Interception des requêtes - Stratégie Cache First pour les assets statiques
self.addEventListener('fetch', event => {
    // Stratégie Cache First pour les images et assets statiques
    if (event.request.destination === 'image' || 
        event.request.url.includes('.css') || 
        event.request.url.includes('.js') ||
        event.request.url.includes('.pdf')) {
        
        event.respondWith(
            caches.match(event.request)
                .then(response => {
                    // Cache hit - retourner la réponse du cache
                    if (response) {
                        return response;
                    }
                    
                    // Cloner la requête car elle ne peut être utilisée qu'une fois
                    const fetchRequest = event.request.clone();
                    
                    return fetch(fetchRequest).then(response => {
                        // Vérifier si la réponse est valide
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        
                        // Cloner la réponse car elle ne peut être utilisée qu'une fois
                        const responseToCache = response.clone();
                        
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });
                        
                        return response;
                    });
                })
        );
    } else {
        // Stratégie Network First pour le HTML
        event.respondWith(
            fetch(event.request)
                .then(response => {
                    // Si la requête réussit, mettre à jour le cache
                    if (response.status === 200) {
                        const responseClone = response.clone();
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseClone);
                            });
                    }
                    return response;
                })
                .catch(() => {
                    // Si le réseau échoue, essayer le cache
                    return caches.match(event.request);
                })
        );
    }
});

// Gestion des mises à jour en arrière-plan
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

// Background Sync pour les actions utilisateur (optionnel)
self.addEventListener('sync', event => {
    if (event.tag === 'contact-form') {
        event.waitUntil(
            // Traiter les formulaires de contact en attente
            syncContactForms()
        );
    }
});

async function syncContactForms() {
    // Logique pour synchroniser les formulaires de contact
    // quand la connexion est rétablie
    console.log('Synchronisation des formulaires de contact');
}

// Notifications Push (optionnel pour les promotions)
self.addEventListener('push', event => {
    if (event.data) {
        const data = event.data.json();
        const options = {
            body: data.body,
            icon: '/images double b/logo_1.png',
            badge: '/images double b/logo_1.png',
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: data.primaryKey
            },
            actions: [
                {
                    action: 'explore',
                    title: 'Voir le menu',
                    icon: '/images double b/supp_menu.png'
                },
                {
                    action: 'close',
                    title: 'Fermer',
                    icon: '/images double b/logo_1.png'
                }
            ]
        };
        
        event.waitUntil(
            self.registration.showNotification(data.title, options)
        );
    }
});

// Gestion des clics sur les notifications
self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('https://doubleb-restaurant.fr/')
        );
    }
});
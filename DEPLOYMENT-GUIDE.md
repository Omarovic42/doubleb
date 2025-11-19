# 🚀 GUIDE DE DÉPLOIEMENT - Double B Restaurant

## 📋 PRÉPARATION AU DÉPLOIEMENT

### 1. Fichiers obligatoires à transférer :
```
/
├── index_Version2.html          ← Page principale (OBLIGATOIRE)
├── styles_Version2_new.css      ← CSS principal (OBLIGATOIRE)
├── script_Version2.js           ← JavaScript (OBLIGATOIRE)
├── menu_double_b.pdf           ← Menu PDF (OBLIGATOIRE)
├── manifest.json               ← PWA (OBLIGATOIRE)
├── sw.js                       ← Service Worker (OBLIGATOIRE)
├── sitemap.xml                 ← SEO (OBLIGATOIRE)
├── robots.txt                  ← SEO (OBLIGATOIRE)
├── .htaccess                   ← Apache config (SI APACHE)
├── nginx.conf                  ← Nginx config (SI NGINX)
└── images double b/            ← Dossier images (OBLIGATOIRE)
    ├── logo_1.png
    ├── logo_2.png
    ├── supp_menu.png
    ├── legumes.png
    ├── assiette.png
    └── [tous les sous-dossiers]
```

### 2. Configuration avant mise en ligne :

#### A. Remplacer les placeholders dans `index_Version2.html` :
```html
<!-- Ligne 96 et 101 : Remplacer par votre ID Google Analytics -->
GA_MEASUREMENT_ID → G-XXXXXXXXXX

<!-- Ligne 16 : Remplacer par votre code de vérification -->
123456789abcdef → votre_code_google_verification

<!-- Ligne 108 : Remplacer par votre ID Microsoft Clarity (optionnel) -->
CLARITY_PROJECT_ID → votre_id_clarity
```

#### B. Modifier les URLs dans les fichiers (remplacer doubleb-restaurant.fr) :
- `index_Version2.html` (lignes 32, 44, etc.)
- `sitemap.xml` (ligne 4)
- `manifest.json` (ligne 8)
- `.htaccess` (ligne 4)

## 🌐 DÉPLOIEMENT SERVEUR

### Option 1: Serveur Apache
1. Transférer tous les fichiers via FTP/SFTP
2. Le fichier `.htaccess` sera automatiquement utilisé
3. Vérifier que mod_rewrite et mod_deflate sont activés
4. Configurer le certificat SSL

### Option 2: Serveur Nginx
1. Transférer les fichiers (sauf .htaccess)
2. Intégrer le contenu de `nginx.conf` dans votre configuration
3. Redémarrer Nginx : `sudo systemctl reload nginx`
4. Configurer le certificat SSL

### Option 3: Hébergement partagé (OVH, 1&1, etc.)
1. Utiliser le gestionnaire de fichiers ou FTP
2. Transférer dans le dossier public_html/www
3. Le .htaccess sera pris en compte automatiquement
4. Activer SSL dans le panneau de contrôle

## ✅ VÉRIFICATIONS POST-DÉPLOIEMENT

### Tests immédiats à effectuer :
1. **Accès au site** : https://votre-domaine.com
2. **HTTPS forcé** : http://votre-domaine.com (doit rediriger)
3. **Menu PDF** : Test du lien de téléchargement
4. **Téléphone** : Test du lien `tel:0983924771`
5. **Responsive** : Test sur mobile/tablette
6. **PWA** : Test d'installation sur mobile

### Tests SEO à effectuer :
1. **Sitemap** : https://votre-domaine.com/sitemap.xml
2. **Robots** : https://votre-domaine.com/robots.txt
3. **Manifest** : https://votre-domaine.com/manifest.json
4. **Service Worker** : F12 → Application → Service Workers

## 📊 CONFIGURATION GOOGLE

### Google Search Console :
1. Aller sur https://search.google.com/search-console
2. Ajouter votre propriété (domaine)
3. Vérifier avec la meta tag
4. Soumettre le sitemap : https://votre-domaine.com/sitemap.xml

### Google Analytics 4 :
1. Créer un compte GA4
2. Récupérer l'ID de mesure (G-XXXXXXXXXX)
3. Remplacer dans le code HTML
4. Vérifier le tracking en temps réel

### Google My Business :
1. Créer/revendiquer la fiche
2. Ajouter photos du restaurant
3. Configurer horaires : 7j/7 - 18h30 à 00h30
4. Ajouter le lien vers le site web

## 🔧 OPTIMISATIONS SERVEUR

### SSL/HTTPS (OBLIGATOIRE) :
```bash
# Let's Encrypt (gratuit)
sudo certbot --apache -d votre-domaine.com -d www.votre-domaine.com
```

### Compression (recommandé) :
- Apache : Activé via .htaccess
- Nginx : Activé via nginx.conf
- Vérifier : https://giftofspeed.com/gzip-test/

### Cache navigateur :
- Configuré automatiquement via .htaccess/nginx.conf
- Vérifier avec F12 → Network → Rechargement

## 📈 MONITORING POST-LANCEMENT

### Semaine 1 :
- [ ] Vérifier indexation Google (site:votre-domaine.com)
- [ ] Surveiller Google Search Console
- [ ] Tester vitesse : PageSpeed Insights
- [ ] Vérifier données structurées : Schema Markup Validator

### Semaine 2-4 :
- [ ] Analyser trafic Google Analytics
- [ ] Surveiller Core Web Vitals
- [ ] Obtenir premiers avis Google My Business
- [ ] Partager sur réseaux sociaux

## 🆘 DÉPANNAGE RAPIDE

### Problème : Site non accessible
- Vérifier DNS (ping votre-domaine.com)
- Vérifier certificat SSL
- Vérifier logs serveur

### Problème : Images ne chargent pas
- Vérifier permissions dossier (755)
- Vérifier chemin relatif "./images double b/"
- Vérifier taille des fichiers

### Problème : PWA non installable
- Vérifier HTTPS
- Vérifier manifest.json accessible
- Vérifier service worker dans F12

### Problème : Analytics ne fonctionne pas
- Vérifier l'ID Google Analytics
- Tester en mode incognito
- Vérifier bloqueurs de pub

## 🎯 RÉSULTAT ATTENDU

Après déploiement, vous devriez avoir :
- ✅ Site web professionnel 100% fonctionnel
- ✅ PWA installable sur mobile
- ✅ Référencement Google optimal
- ✅ Performance A+ (90+ sur PageSpeed)
- ✅ Sécurité maximale (A+ sur SSL Labs)

---

**🚀 PRÊT POUR LE LANCEMENT !**

*Support technique : Conservez ce guide pour référence*
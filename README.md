# Double B Restaurant - Site Web

Site web officiel du restaurant Double B à Saint-Étienne.

## 🍔 À propos

Double B est un restaurant fast-food spécialisé dans :
- Tacos artisanaux
- Burgers gourmets  
- Pizzas traditionnelles
- Bowls healthy
- Sandwichs généreux
- Assiettes complètes

**Adresse :** 1 Rue Tiblier Verne, 42000 Saint-Étienne  
**Téléphone :** 09 83 92 47 71  
**Horaires :** 7j/7 - 18h30 à 00h30

## 🚀 Fonctionnalités

- ✅ Design responsive (mobile-first)
- ✅ Menu interactif avec 6 sections collapsibles
- ✅ Progressive Web App (PWA)
- ✅ Service Worker pour performances offline
- ✅ SEO optimisé pour le référencement local
- ✅ Données structurées Schema.org
- ✅ Integration réseaux sociaux (Snapchat, TikTok)

## 📁 Structure du projet

```
doubleb/
├── index_Version2.html      # Page principale
├── styles_Version2_new.css  # Feuilles de style
├── script_Version2.js       # JavaScript interactif
├── sw.js                    # Service Worker
├── manifest.json            # Manifest PWA
├── sitemap.xml             # Plan du site
├── robots.txt              # Directives robots
├── .htaccess              # Configuration Apache
├── nginx.conf             # Configuration Nginx
├── menu_double_b.pdf      # Menu PDF
└── images double b/       # Assets images
    ├── logo_1.png
    ├── logo_2.png
    ├── tacos/
    ├── burgers/
    ├── pizzas/
    └── ...
```

## 🔧 Installation & Déploiement

### 1. Serveur Web
```bash
# Apache/Nginx recommandé
# Pointer le document root vers le dossier du projet
```

### 2. Configuration HTTPS
```bash
# SSL/TLS obligatoire pour PWA et référencement
# Utiliser Let's Encrypt ou certificat commercial
```

### 3. Configuration DNS
```bash
# Pointer doubleb-restaurant.fr vers votre serveur
# Redirection www → non-www configurée
```

## 📊 SEO & Analytics

### Google Search Console
1. Vérifier la propriété avec `google-site-verification`
2. Soumettre le sitemap : `https://doubleb-restaurant.fr/sitemap.xml`
3. Surveiller les erreurs d'indexation

### Google Analytics 4
```javascript
// Remplacer GA_MEASUREMENT_ID dans index_Version2.html
gtag('config', 'VOTRE_GA_ID');
```

### Google My Business
1. Créer/revendiquer la fiche entreprise
2. Ajouter photos, horaires, menu
3. Encourager les avis clients

### Référencement Local
- ✅ Schema.org Restaurant implémenté
- ✅ Données structurées avec adresse/téléphone
- ✅ Mots-clés géographiques optimisés
- ✅ Horaires d'ouverture structurés

## 🎯 Optimisations Techniques

### Performance
- Compression Gzip/Brotli activée
- Images optimisées et lazy loading
- Cache navigateur configuré
- Service Worker pour cache offline

### Sécurité
- Headers de sécurité configurés
- CSP (Content Security Policy)
- HSTS activé
- Protection XSS

### Accessibilité
- Attributs alt optimisés
- Navigation clavier
- Contraste couleurs respecté
- Structure sémantique HTML5

## 📱 Progressive Web App

Le site peut être installé comme application mobile :
- Icônes adaptatives 192x192 et 512x512
- Splash screen personnalisé
- Mode standalone
- Shortcuts vers menu PDF et téléphone

## 🔍 Checklist de lancement

### Avant mise en ligne :
- [ ] Modifier les URL canoniques (`doubleb-restaurant.fr`)
- [ ] Configurer Google Analytics ID
- [ ] Ajouter Google Site Verification
- [ ] Tester sur tous devices
- [ ] Vérifier vitesse de chargement
- [ ] Valider HTML/CSS
- [ ] Tester le Service Worker
- [ ] Vérifier les données structurées

### Après mise en ligne :
- [ ] Soumettre à Google Search Console
- [ ] Créer Google My Business
- [ ] Inscriptions annuaires locaux
- [ ] Partage réseaux sociaux
- [ ] Surveillance performances SEO

## 📞 Support

Pour toute question technique :
- Email : contact@doubleb-restaurant.fr
- Téléphone : 09 83 92 47 71

---

© 2025 Double B Restaurant - Saint-Étienne

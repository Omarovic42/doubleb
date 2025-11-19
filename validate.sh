#!/bin/bash

# 🧪 SCRIPT DE VALIDATION AUTOMATIQUE - Double B Restaurant
# Vérifie que tous les fichiers et configurations sont correctes

echo "🔍 DÉBUT DE LA VALIDATION AUTOMATIQUE"
echo "======================================"

# Compteurs
TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0

# Fonction de test
test_file() {
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
    if [ -f "$1" ]; then
        echo "✅ $1 - FOUND"
        PASSED_TESTS=$((PASSED_TESTS + 1))
    else
        echo "❌ $1 - MISSING"
        FAILED_TESTS=$((FAILED_TESTS + 1))
    fi
}

# Fonction de test contenu
test_content() {
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
    if grep -q "$2" "$1" 2>/dev/null; then
        echo "✅ $1 contains '$2' - FOUND"
        PASSED_TESTS=$((PASSED_TESTS + 1))
    else
        echo "❌ $1 missing '$2' - MISSING"
        FAILED_TESTS=$((FAILED_TESTS + 1))
    fi
}

echo ""
echo "📁 VÉRIFICATION DES FICHIERS ESSENTIELS"
echo "----------------------------------------"

# Fichiers principaux
test_file "index_Version2.html"
test_file "styles_Version2_new.css"
test_file "script_Version2.js"
test_file "menu_double_b.pdf"

# Fichiers SEO
test_file "sitemap.xml"
test_file "robots.txt"
test_file "manifest.json"
test_file "sw.js"

# Configuration serveur
test_file ".htaccess"

# Images essentielles
test_file "images double b/logo_1.png"
test_file "images double b/logo_2.png"
test_file "images double b/supp_menu.png"

echo ""
echo "🔍 VÉRIFICATION DU CONTENU HTML"
echo "--------------------------------"

# Vérifications SEO
test_content "index_Version2.html" "Double B - Restaurant Fast-Food Saint-Étienne"
test_content "index_Version2.html" "meta name=\"description\""
test_content "index_Version2.html" "meta property=\"og:type\" content=\"restaurant\""
test_content "index_Version2.html" "application/ld+json"

echo ""
echo "🎯 VÉRIFICATION PWA"
echo "--------------------"

test_content "index_Version2.html" "link rel=\"manifest\""
test_content "manifest.json" "Double B"
test_content "sw.js" "CACHE_NAME"

echo ""
echo "📊 VÉRIFICATION ANALYTICS"
echo "--------------------------"

test_content "index_Version2.html" "gtag"
test_content "index_Version2.html" "GA_MEASUREMENT_ID"

echo ""
echo "🛡️ VÉRIFICATION SÉCURITÉ"
echo "-------------------------"

test_content ".htaccess" "X-Content-Type-Options"
test_content ".htaccess" "HTTPS"

echo ""
echo "📱 VÉRIFICATION RESPONSIVE"
echo "---------------------------"

test_content "styles_Version2_new.css" "@media"
test_content "styles_Version2_new.css" "max-width: 768px"

echo ""
echo "🎉 RÉSULTATS FINAUX"
echo "==================="
echo "Tests total : $TOTAL_TESTS"
echo "Tests réussis : $PASSED_TESTS"
echo "Tests échoués : $FAILED_TESTS"

if [ $FAILED_TESTS -eq 0 ]; then
    echo ""
    echo "🚀 PARFAIT ! PROJET VALIDÉ POUR LE LANCEMENT"
    echo "✅ Tous les tests sont passés avec succès"
    echo "✅ Le projet est prêt pour la mise en production"
    exit 0
else
    echo ""
    echo "⚠️  ATTENTION ! Des éléments manquent"
    echo "❌ $FAILED_TESTS test(s) ont échoué"
    echo "🔧 Corrigez les problèmes avant le lancement"
    exit 1
fi
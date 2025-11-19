# SCRIPT DE VALIDATION AUTOMATIQUE - Double B Restaurant (PowerShell)
# Verifie que tous les fichiers et configurations sont correctes

Write-Host "DEBUT DE LA VALIDATION AUTOMATIQUE" -ForegroundColor Cyan
Write-Host "===================================" -ForegroundColor Cyan

# Compteurs
$TotalTests = 0
$PassedTests = 0
$FailedTests = 0

# Fonction de test de fichier
function Test-ProjectFile {
    param([string]$FilePath)
    
    $script:TotalTests++
    if (Test-Path $FilePath) {
        Write-Host "✅ $FilePath - FOUND" -ForegroundColor Green
        $script:PassedTests++
    } else {
        Write-Host "❌ $FilePath - MISSING" -ForegroundColor Red
        $script:FailedTests++
    }
}

# Fonction de test de contenu
function Test-FileContent {
    param([string]$FilePath, [string]$Content)
    
    $script:TotalTests++
    if ((Test-Path $FilePath) -and (Select-String -Path $FilePath -Pattern $Content -Quiet)) {
        Write-Host "✅ $FilePath contains '$Content' - FOUND" -ForegroundColor Green
        $script:PassedTests++
    } else {
        Write-Host "❌ $FilePath missing '$Content' - MISSING" -ForegroundColor Red
        $script:FailedTests++
    }
}

Write-Host ""
Write-Host "📁 VÉRIFICATION DES FICHIERS ESSENTIELS" -ForegroundColor Yellow
Write-Host "----------------------------------------" -ForegroundColor Yellow

# Fichiers principaux
Test-ProjectFile "index_Version2.html"
Test-ProjectFile "styles_Version2_new.css"
Test-ProjectFile "script_Version2.js"
Test-ProjectFile "menu_double_b.pdf"

# Fichiers SEO
Test-ProjectFile "sitemap.xml"
Test-ProjectFile "robots.txt"
Test-ProjectFile "manifest.json"
Test-ProjectFile "sw.js"

# Configuration serveur
Test-ProjectFile ".htaccess"

# Images essentielles
Test-ProjectFile "images double b/logo_1.png"
Test-ProjectFile "images double b/logo_2.png"
Test-ProjectFile "images double b/supp_menu.png"

Write-Host ""
Write-Host "🔍 VÉRIFICATION DU CONTENU HTML" -ForegroundColor Yellow
Write-Host "--------------------------------" -ForegroundColor Yellow

# Vérifications SEO
Test-FileContent "index_Version2.html" "Double B - Restaurant Fast-Food Saint-Étienne"
Test-FileContent "index_Version2.html" 'meta name="description"'
Test-FileContent "index_Version2.html" 'meta property="og:type" content="restaurant"'
Test-FileContent "index_Version2.html" "application/ld\+json"

Write-Host ""
Write-Host "🎯 VÉRIFICATION PWA" -ForegroundColor Yellow
Write-Host "--------------------" -ForegroundColor Yellow

Test-FileContent "index_Version2.html" 'link rel="manifest"'
Test-FileContent "manifest.json" "Double B"
Test-FileContent "sw.js" "CACHE_NAME"

Write-Host ""
Write-Host "📊 VÉRIFICATION ANALYTICS" -ForegroundColor Yellow
Write-Host "--------------------------" -ForegroundColor Yellow

Test-FileContent "index_Version2.html" "gtag"
Test-FileContent "index_Version2.html" "GA_MEASUREMENT_ID"

Write-Host ""
Write-Host "🛡️ VÉRIFICATION SÉCURITÉ" -ForegroundColor Yellow
Write-Host "-------------------------" -ForegroundColor Yellow

Test-FileContent ".htaccess" "X-Content-Type-Options"
Test-FileContent ".htaccess" "HTTPS"

Write-Host ""
Write-Host "📱 VÉRIFICATION RESPONSIVE" -ForegroundColor Yellow
Write-Host "---------------------------" -ForegroundColor Yellow

Test-FileContent "styles_Version2_new.css" "@media"
Test-FileContent "styles_Version2_new.css" "max-width: 768px"

Write-Host ""
Write-Host "🎉 RÉSULTATS FINAUX" -ForegroundColor Cyan
Write-Host "===================" -ForegroundColor Cyan
Write-Host "Tests total : $TotalTests"
Write-Host "Tests réussis : $PassedTests" -ForegroundColor Green
Write-Host "Tests échoués : $FailedTests" -ForegroundColor Red

if ($FailedTests -eq 0) {
    Write-Host ""
    Write-Host "🚀 PARFAIT ! PROJET VALIDÉ POUR LE LANCEMENT" -ForegroundColor Green
    Write-Host "✅ Tous les tests sont passés avec succès" -ForegroundColor Green
    Write-Host "✅ Le projet est prêt pour la mise en production" -ForegroundColor Green
    exit 0
} else {
    Write-Host ""
    Write-Host "⚠️  ATTENTION ! Des éléments manquent" -ForegroundColor Yellow
    Write-Host "❌ $FailedTests test(s) ont échoué" -ForegroundColor Red
    Write-Host "🔧 Corrigez les problèmes avant le lancement" -ForegroundColor Yellow
    exit 1
}

# Pour exécuter ce script :
# PowerShell -ExecutionPolicy Bypass -File validate.ps1
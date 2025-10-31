// DOM Elements - Déclarées de manière plus sécurisée
let hamburger, navMobile, navLinks, slides, indicators;

// Variables
let currentSlideIndex = 0;
let slideInterval;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Obtenir les éléments DOM après que le DOM soit chargé
    hamburger = document.getElementById('hamburger');
    navMobile = document.getElementById('nav-mobile');
    navLinks = document.querySelectorAll('.nav__link');
    slides = document.querySelectorAll('.slide');
    indicators = document.querySelectorAll('.indicator');
    
    console.log('Hamburger element:', hamburger);
    console.log('NavMobile element:', navMobile);
    
    initCarousel();
    initNavigation();
    initScrollAnimations();
    initLazyLoading();
});

// Navigation - désactivée pour éviter les conflits avec le nouveau gestionnaire hamburger
function initNavigation() {
    // Navigation gérée par le nouveau système hamburger
    console.log('Navigation déléguée au nouveau système hamburger');
}

function toggleMobileMenu() {
    // Fonction désactivée - gérée par le nouveau système
}

function closeMobileMenu() {
    // Fonction désactivée - gérée par le nouveau système
}

// Carousel functionality
function initCarousel() {
    // Defensive carousel initialization: only run if carousel + slides exist
    const carousel = document.querySelector('.carousel');
    if (!carousel) return; // no carousel on the page

    // Ensure slides/indicators exist
    slides = document.querySelectorAll('.slide') || [];
    indicators = document.querySelectorAll('.indicator') || [];

    if (!slides.length || !indicators.length) return;

    showSlide(currentSlideIndex);
    startAutoSlide();

    // Pause on hover (safe-guard)
    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);
}

function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Show current slide
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
}

function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    showSlide(currentSlideIndex);
}

function currentSlide(index) {
    currentSlideIndex = index - 1;
    showSlide(currentSlideIndex);
    stopAutoSlide();
    startAutoSlide();
}

function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 5000);
}

function stopAutoSlide() {
    clearInterval(slideInterval);
}

// Smooth scrolling
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const sectionTop = section.offsetTop - headerHeight;
        
        window.scrollTo({
            top: sectionTop,
            behavior: 'smooth'
        });
    }
    closeMobileMenu();
}

// Phone call functionality
function makeCall() {
    window.location.href = 'tel:0983924771';
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.menu-item, .review-item, .info-item');
    animatedElements.forEach(el => {
        el.classList.add('loading');
        observer.observe(el);
    });
}

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src;
                    img.classList.remove('loading');
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            img.classList.add('loading');
            imageObserver.observe(img);
        });
    }
}

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.9)';
    }
});

// Performance optimization - Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.9)';
    }
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Error handling for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vbiBkaXNwb25pYmxlPC90ZXh0Pjwvc3ZnPg==';
        this.alt = 'Image non disponible';
    });
});

// Service Worker registration (optional, for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Accessibility improvements
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
});

// Add keyboard navigation for carousel
document.addEventListener('keydown', (e) => {
    if (e.target.classList.contains('indicator')) {
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                const prevIndex = currentSlideIndex > 0 ? currentSlideIndex - 1 : slides.length - 1;
                currentSlide(prevIndex + 1);
                break;
            case 'ArrowRight':
                e.preventDefault();
                const nextIndex = currentSlideIndex < slides.length - 1 ? currentSlideIndex + 1 : 0;
                currentSlide(nextIndex + 1);
                break;
        }
    }
});

// Analytics tracking (placeholder)
function trackEvent(action, category, label) {
    // Google Analytics or other tracking service
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
}

// Track important interactions
document.querySelectorAll('.footer-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const platform = e.target.closest('.footer-btn').classList[1];
        trackEvent('click', 'delivery_platform', platform);
    });
});

document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', () => {
        trackEvent('click', 'contact', 'phone_call');
    });
});

// Fonction pour le bouton Commander
document.addEventListener('DOMContentLoaded', function() {
    const commanderBtn = document.querySelector('.commander-btn');
    const commanderSection = document.querySelector('.commander-section');
    
    if (commanderBtn && commanderSection) {
        commanderBtn.addEventListener('click', function(e) {
            e.preventDefault();
            commanderSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
});

// Fonction pour gérer les catégories pliables/dépliables
function toggleCategory(categoryId) {
    const content = document.getElementById(categoryId + '-content');
    const icon = document.getElementById(categoryId + '-icon');
    const header = icon.parentElement;
    
    // Toggle le contenu principal
    content.classList.toggle('collapsed');
    
    // Toggle l'icône
    icon.classList.toggle('rotated');
    
    // Toggle le header actif
    header.classList.toggle('active');
    
    // Pour la section crudité, gérer aussi l'image
    if (categoryId === 'crudite') {
        const imageContainer = content.nextElementSibling;
        if (imageContainer && imageContainer.classList.contains('category-image-container')) {
            imageContainer.classList.toggle('collapsed');
        }
    }
    
    // Sauvegarder l'état dans localStorage
    const isCollapsed = content.classList.contains('collapsed');
    localStorage.setItem('category-' + categoryId, isCollapsed ? 'collapsed' : 'expanded');
}

// Restaurer l'état des catégories au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    const categories = ['viande', 'sauce', 'crudite', 'fromage', 'gratine', 'tacos-section', 'sandwichs-section', 'burgers-section', 'bowls-section', 'pizzas-section', 'assiettes-section'];
    
    categories.forEach(categoryId => {
        const savedState = localStorage.getItem('category-' + categoryId);
        if (savedState === 'collapsed') {
            const content = document.getElementById(categoryId + '-content');
            const icon = document.getElementById(categoryId + '-icon');
            const header = icon.parentElement;
            
            // Appliquer l'état replié
            content.classList.add('collapsed');
            icon.classList.add('rotated');
            header.classList.remove('active');
            
            // Pour la section crudité, gérer aussi l'image
            if (categoryId === 'crudite') {
                const imageContainer = content.nextElementSibling;
                if (imageContainer && imageContainer.classList.contains('category-image-container')) {
                    imageContainer.classList.add('collapsed');
                }
            }
        }
    });
});

// Fonction de sauvegarde pour le menu hamburger
// Backup handler removed - replaced by a single, robust initializer (to avoid duplicate listeners/conflicts)

// Debug : Vérifier les éléments après chargement complet
window.addEventListener('load', function() {
    console.log('=== DEBUG MENU HAMBURGER ===');
    console.log('Hamburger element exists:', !!document.getElementById('hamburger'));
    console.log('NavMobile element exists:', !!document.getElementById('nav-mobile'));
    console.log('Hamburger classes:', document.getElementById('hamburger')?.className);
    console.log('NavMobile classes:', document.getElementById('nav-mobile')?.className);
});

// Menu hamburger - Version corrigée et simplifiée
(function() {
    'use strict';
    
    let isInitialized = false;
    
    function initHamburgerMenu() {
        if (isInitialized) return;
        
        const hamburger = document.querySelector('#hamburger');
        const navMobile = document.querySelector('#nav-mobile');
        
        if (!hamburger || !navMobile) {
            setTimeout(initHamburgerMenu, 100);
            return;
        }
        
        // Supprimer tous les event listeners existants
        const newHamburger = hamburger.cloneNode(true);
        hamburger.parentNode.replaceChild(newHamburger, hamburger);
        
        // Fonction toggle propre
        function toggleMenu(e) {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            
            console.log('Toggle menu called'); // Debug
            newHamburger.classList.toggle('active');
            navMobile.classList.toggle('active');
            
            // Forcer le repaint sur mobile
            if (window.innerWidth <= 768) {
                setTimeout(() => {
                    navMobile.style.transform = navMobile.classList.contains('active') 
                        ? 'translateX(0)' : 'translateX(-100%)';
                }, 10);
            }
        }
        
        // Fonction fermeture propre
        function closeMenu() {
            newHamburger.classList.remove('active');
            navMobile.classList.remove('active');
        }
        
        // Event listeners pour le hamburger (click et touch)
        newHamburger.addEventListener('click', toggleMenu);
        newHamburger.addEventListener('touchstart', function(e) {
            e.preventDefault();
            toggleMenu(e);
        }, { passive: false });
        
        // Fermer en cliquant à l'extérieur
        document.addEventListener('click', function(e) {
            if (!navMobile.contains(e.target) && !newHamburger.contains(e.target)) {
                closeMenu();
            }
        });
        
        // Navigation liens
        const navLinks = navMobile.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const href = this.getAttribute('href');
                closeMenu();
                
                if (href?.startsWith('#')) {
                    const target = document.querySelector(href);
                    if (target) {
                        const headerHeight = 80;
                        const targetPosition = target.offsetTop - headerHeight;
                        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                    }
                }
            });
        });
        
        isInitialized = true;
        console.log('Menu hamburger correctement initialisé');
    }
    
    // Initialiser dès que possible
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHamburgerMenu);
    } else {
        initHamburgerMenu();
    }
    
    // Fallback pour mobile - forcer l'initialisation après un délai
    setTimeout(() => {
        if (!isInitialized) {
            console.log('Fallback: Force initialisation du menu hamburger');
            initHamburgerMenu();
        }
    }, 1000);
    
})();

// Fonction pour toggle des sous-catégories
function toggleSubcategory(contentId) {
    const content = document.getElementById(contentId);
    const iconId = contentId.replace('-content', '-icon');
    const icon = document.getElementById(iconId);
    
    if (!content || !icon) return;
    
    const isCollapsed = content.classList.contains('collapsed');
    
    if (isCollapsed) {
        // Ouvrir la sous-catégorie
        content.classList.remove('collapsed');
        icon.style.transform = 'rotate(180deg)';
    } else {
        // Fermer la sous-catégorie
        content.classList.add('collapsed');
        icon.style.transform = 'rotate(0deg)';
    }
}
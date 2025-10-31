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

// Navigation
function initNavigation() {
    // Vérifier que les éléments existent
    if (hamburger && navMobile) {
        hamburger.addEventListener('click', toggleMobileMenu);
        
        // Close mobile menu when clicking on a link and handle smooth scrolling
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                
                // Fermer le menu mobile
                closeMobileMenu();
                
                // Navigation fluide vers la section
                if (targetId && targetId.startsWith('#')) {
                    const targetSection = document.querySelector(targetId);
                    if (targetSection) {
                        const headerHeight = document.querySelector('.header').offsetHeight;
                        const sectionTop = targetSection.offsetTop - headerHeight;
                        
                        window.scrollTo({
                            top: sectionTop,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMobile.contains(e.target) && !hamburger.contains(e.target)) {
                closeMobileMenu();
            }
        });
    } else {
        console.error('Elements hamburger ou navMobile non trouvés');
    }
}

function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMobile.classList.toggle('active');
}

function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMobile.classList.remove('active');
}

// Carousel functionality
function initCarousel() {
    showSlide(currentSlideIndex);
    startAutoSlide();
    
    // Pause on hover
    const carousel = document.querySelector('.carousel');
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
    const categories = ['viande', 'sauce', 'crudite', 'fromage', 'gratine', 'tacos-section'];
    
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
window.addEventListener('load', function() {
    const hamburgerBackup = document.getElementById('hamburger');
    const navMobileBackup = document.getElementById('nav-mobile');
    
    if (hamburgerBackup && navMobileBackup) {
        hamburgerBackup.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Hamburger clicked!');
            
            // Toggle des classes
            hamburgerBackup.classList.toggle('active');
            navMobileBackup.classList.toggle('active');
            
            console.log('Hamburger active:', hamburgerBackup.classList.contains('active'));
            console.log('NavMobile active:', navMobileBackup.classList.contains('active'));
        });
        
        console.log('Backup hamburger menu initialized successfully');
    } else {
        console.error('Backup: Hamburger ou NavMobile non trouvés');
    }
});

// Debug : Vérifier les éléments après chargement complet
window.addEventListener('load', function() {
    console.log('=== DEBUG MENU HAMBURGER ===');
    console.log('Hamburger element exists:', !!document.getElementById('hamburger'));
    console.log('NavMobile element exists:', !!document.getElementById('nav-mobile'));
    console.log('Hamburger classes:', document.getElementById('hamburger')?.className);
    console.log('NavMobile classes:', document.getElementById('nav-mobile')?.className);
});

// Gestionnaire simplifié et indépendant du menu hamburger
(function() {
    'use strict';
    
    function initSimpleHamburgerMenu() {
        const hamburger = document.querySelector('#hamburger');
        const navMobile = document.querySelector('#nav-mobile');
        
        if (!hamburger || !navMobile) {
            console.error('Éléments du menu hamburger non trouvés');
            return;
        }
        
        // Fonction pour ouvrir/fermer le menu
        function toggleMenu() {
            const isActive = hamburger.classList.contains('active');
            
            if (isActive) {
                hamburger.classList.remove('active');
                navMobile.classList.remove('active');
                console.log('Menu fermé');
            } else {
                hamburger.classList.add('active');
                navMobile.classList.add('active');
                console.log('Menu ouvert');
            }
        }
        
        // Fonction pour fermer le menu
        function closeMenu() {
            hamburger.classList.remove('active');
            navMobile.classList.remove('active');
            console.log('Menu fermé (fonction close)');
        }
        
        // Event listener pour le clic sur hamburger
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
        });
        
        // Event listener pour fermer en cliquant à l'extérieur
        document.addEventListener('click', function(e) {
            if (!navMobile.contains(e.target) && !hamburger.contains(e.target)) {
                if (hamburger.classList.contains('active')) {
                    closeMenu();
                }
            }
        });
        
        // Event listeners pour les liens de navigation
        const navLinks = navMobile.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const href = this.getAttribute('href');
                
                // Fermer le menu
                closeMenu();
                
                // Navigation fluide
                if (href && href.startsWith('#')) {
                    const target = document.querySelector(href);
                    if (target) {
                        const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
                        const targetPosition = target.offsetTop - headerHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
        
        console.log('Menu hamburger simplifié initialisé avec succès');
    }
    
    // Initialiser quand le DOM est prêt
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSimpleHamburgerMenu);
    } else {
        initSimpleHamburgerMenu();
    }
    
})();
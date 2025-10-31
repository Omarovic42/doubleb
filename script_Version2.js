// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMobile = document.getElementById('nav-mobile');
const navLinks = document.querySelectorAll('.nav__link');
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');

// Variables
let currentSlideIndex = 0;
let slideInterval;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initCarousel();
    initNavigation();
    initScrollAnimations();
    initLazyLoading();
});

// Navigation
function initNavigation() {
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMobile.contains(e.target) && !hamburger.contains(e.target)) {
            closeMobileMenu();
        }
    });
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
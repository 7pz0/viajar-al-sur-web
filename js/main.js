// Main JavaScript file - App initialization and coordination
class App {
    constructor() {
        this.isLoaded = false;
        this.components = {};
        
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.onDOMLoaded();
            });
        } else {
            this.onDOMLoaded();
        }
    }

    onDOMLoaded() {
        this.initializeComponents();
        this.bindGlobalEvents();
        this.setupAnimations();
        this.handlePageLoad();
        
        this.isLoaded = true;
        
        // Dispatch custom event for other scripts
        document.dispatchEvent(new CustomEvent('appLoaded', {
            detail: { app: this }
        }));
    }

    initializeComponents() {
        // Initialize scroll animations
        this.initScrollAnimations();
        
        // Initialize smooth scrolling for all internal links
        this.initSmoothScrolling();
        
        // Initialize theme handler
        this.initThemeHandler();
        
        // Initialize performance monitoring
        this.initPerformanceMonitoring();
    }

    bindGlobalEvents() {
        // Handle page visibility changes
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.onPageHidden();
            } else {
                this.onPageVisible();
            }
        });

        // Handle online/offline status
        window.addEventListener('online', () => {
            this.onOnline();
        });

        window.addEventListener('offline', () => {
            this.onOffline();
        });

        // Handle keyboard navigation
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardNavigation(e);
        });

        // Handle print
        window.addEventListener('beforeprint', () => {
            this.onBeforePrint();
        });

        window.addEventListener('afterprint', () => {
            this.onAfterPrint();
        });
    }

    initScrollAnimations() {
        // Observe elements for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements that should animate on scroll
        const animateElements = document.querySelectorAll('.about__item, .service-card, .hero__content');
        animateElements.forEach(el => {
            observer.observe(el);
        });
    }

    initSmoothScrolling() {
        // Handle smooth scrolling for all internal links
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (link) {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                    utils.scrollToElement(targetId, headerHeight);
                }
            }
        });
    }

    initThemeHandler() {
        // Handle system theme changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        const handleThemeChange = (e) => {
            document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        };

        mediaQuery.addListener(handleThemeChange);
        handleThemeChange(mediaQuery);
    }

    initPerformanceMonitoring() {
        // Monitor Core Web Vitals
        if ('web-vital' in window) {
            // This would typically use a library like web-vitals
            // For now, just log page load performance
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    if (perfData) {
                        console.log('Page Load Performance:', {
                            loadTime: perfData.loadEventEnd - perfData.loadEventStart,
                            domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
                            firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime
                        });
                    }
                }, 0);
            });
        }
    }

    setupAnimations() {
        // Add CSS animations dynamically
        const style = document.createElement('style');
        style.textContent = `
            .fade-in-up {
                animation: fadeInUp 0.8s ease-out forwards;
            }
            
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }

    handlePageLoad() {
        // Remove loading states
        document.body.classList.remove('loading');
        
        // Trigger initial animations
        const heroContent = document.querySelector('.hero__content');
        if (heroContent) {
            heroContent.classList.add('fade-in-up');
        }
    }

    handleKeyboardNavigation(e) {
        // Handle escape key to close mobile menu
        if (e.key === 'Escape') {
            if (window.navigation) {
                window.navigation.closeMobileMenu();
            }
        }

        // Handle tab navigation
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    }

    onPageHidden() {
        // Pause any running animations or processes
        console.log('Page hidden - pausing non-essential processes');
    }

    onPageVisible() {
        // Resume animations or processes
        console.log('Page visible - resuming processes');
    }

    onOnline() {
        // Handle online status
        this.showNotification('Conexión restaurada', 'success');
    }

    onOffline() {
        // Handle offline status
        this.showNotification('Sin conexión a internet', 'warning');
    }

    onBeforePrint() {
        // Optimize for printing
        document.body.classList.add('printing');
    }

    onAfterPrint() {
        // Restore after printing
        document.body.classList.remove('printing');
    }

    showNotification(message, type = 'info') {
        // Create notification system
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 1rem;
            right: 1rem;
            padding: 1rem;
            border-radius: 0.5rem;
            color: white;
            font-weight: 500;
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            ${type === 'success' ? 'background-color: #10b981;' : ''}
            ${type === 'error' ? 'background-color: #ef4444;' : ''}
            ${type === 'warning' ? 'background-color: #f59e0b;' : ''}
            ${type === 'info' ? 'background-color: #3b82f6;' : ''}
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 4000);
    }

    // Public API methods
    scrollTo(selector) {
        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
        utils.scrollToElement(selector, headerHeight);
    }

    // Get app status
    getStatus() {
        return {
            isLoaded: this.isLoaded,
            components: Object.keys(this.components),
            performance: {
                loadTime: performance.now()
            }
        };
    }
}

// Initialize the app
window.app = new App();

// Global error handler
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    
    // In production, you might want to send this to an error tracking service
    if (window.app) {
        window.app.showNotification('Se produjo un error inesperado', 'error');
    }
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    
    if (window.app) {
        window.app.showNotification('Error en la aplicación', 'error');
    }
});

// Service Worker registration (if available)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => {
        //         console.log('SW registered: ', registration);
        //     })
        //     .catch(registrationError => {
        //         console.log('SW registration failed: ', registrationError);
        //     });
    });
}

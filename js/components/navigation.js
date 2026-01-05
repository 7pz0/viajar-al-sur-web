// Navigation Component
class Navigation {
    constructor() {
        this.nav = document.querySelector('.nav');
        this.navToggle = document.querySelector('.nav__toggle');
        this.navMenu = document.querySelector('.nav__menu');
        this.navLinks = document.querySelectorAll('.nav__link');
        this.header = document.querySelector('.header');

        // Regions overlay elements
        this.regionsOverlay = document.querySelector('.nav__overlay');
        this.regionsPanel = document.querySelector('.regions-panel');
        this.regionsClose = document.querySelector('.regions-close');
        this.regionLinks = this.regionsOverlay ? this.regionsOverlay.querySelectorAll('.link-button[data-region]') : [];
        
        this.init();
    }

    init() {
        if (!this.nav) return;
        
        this.bindEvents();
        this.updateActiveLink();
        this.handleScroll();
    }

    bindEvents() {
        // Mobile menu toggle or regions overlay on small screens
        if (this.navToggle) {
            this.navToggle.addEventListener('click', () => {
                if (this.regionsOverlay && window.innerWidth <= 768) {
                    this.toggleRegionsOverlay();
                } else {
                    this.toggleMobileMenu();
                }
            });
        }

        // Close mobile menu when clicking on links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                
                if (targetId.startsWith('#')) {
                    this.scrollToSection(targetId);
                    this.closeMobileMenu();
                    this.closeRegionsOverlay();
                }
            });
        });

        // Handle scroll for header styling and active links
        window.addEventListener('scroll', utils.throttle(() => {
            this.handleScroll();
            this.updateActiveLink();
        }, 100));

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.nav.contains(e.target) && this.navMenu.classList.contains('active')) {
                this.closeMobileMenu();
            }
        });

        // Regions overlay close handlers
        if (this.regionsClose) {
            this.regionsClose.addEventListener('click', () => this.closeRegionsOverlay());
        }

        if (this.regionsOverlay) {
            // Click outside to close overlay
            this.regionsOverlay.addEventListener('click', (e) => {
                if (e.target === this.regionsOverlay) this.closeRegionsOverlay();
            });

            // Close on Esc
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.regionsOverlay.classList.contains('open')) {
                    this.closeRegionsOverlay();
                }
            });
        }

        // Handle resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                this.closeMobileMenu();
                if (this.regionsOverlay) this.closeRegionsOverlay();
            }
        });
    }

    toggleMobileMenu() {
        this.navMenu.classList.toggle('active');
        this.navToggle.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (this.navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    closeMobileMenu() {
        this.navMenu.classList.remove('active');
        this.navToggle.classList.remove('active');
        document.body.style.overflow = '';
    }

    scrollToSection(targetId) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = this.header.offsetHeight;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }

    handleScroll() {
        const scrollY = window.scrollY;
        
        // Add/remove scrolled class for header styling
        if (scrollY > 100) {
            this.header.classList.add('scrolled');
        } else {
            this.header.classList.remove('scrolled');
        }
    }

    updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.scrollY;
        const headerHeight = this.header.offsetHeight;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.getBoundingClientRect().top + window.pageYOffset - headerHeight - 100;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);

            if (correspondingLink) {
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    // Remove active class from all links
                    this.navLinks.forEach(link => link.classList.remove('active'));
                    // Add active class to current link
                    correspondingLink.classList.add('active');
                }
            }
        });
    }

    /* Regions overlay helpers */
    toggleRegionsOverlay() {
        if (!this.regionsOverlay) return;
        if (this.regionsOverlay.classList.contains('open')) this.closeRegionsOverlay();
        else this.openRegionsOverlay();
    }

    openRegionsOverlay() {
        if (!this.regionsOverlay) return;
        this.regionsOverlay.classList.add('open');
        this.navToggle.setAttribute('aria-expanded', 'true');
        this.regionsOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        const first = this.regionsOverlay.querySelector('.link-button');
        if (first) first.focus();
    }

    closeRegionsOverlay() {
        if (!this.regionsOverlay) return;
        this.regionsOverlay.classList.remove('open');
        this.navToggle.setAttribute('aria-expanded', 'false');
        this.regionsOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        this.navToggle.focus();
    }

    // Public method to programmatically navigate
    navigateTo(sectionId) {
        this.scrollToSection(`#${sectionId}`);
    }
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.navigation = new Navigation();
});

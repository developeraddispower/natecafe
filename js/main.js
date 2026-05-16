// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const closeSideNav = document.getElementById('closeSideNav');
    const mobileSideNav = document.getElementById('mobileSideNav');
    const overlay = document.getElementById('sideNavOverlay');
    const body = document.body;
    
    function openMenu() {
        mobileSideNav.classList.add('open');
        overlay.classList.add('active');
        body.classList.add('menu-open');
        menuToggle.setAttribute('aria-expanded', 'true');
        mobileSideNav.setAttribute('aria-hidden', 'false');
    }
    
    function closeMenu() {
        mobileSideNav.classList.remove('open');
        overlay.classList.remove('active');
        body.classList.remove('menu-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileSideNav.setAttribute('aria-hidden', 'true');
    }
    
    if (menuToggle) menuToggle.addEventListener('click', openMenu);
    if (closeSideNav) closeSideNav.addEventListener('click', closeMenu);
    if (overlay) overlay.addEventListener('click', closeMenu);
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileSideNav.classList.contains('open')) {
            closeMenu();
        }
    });
    
    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.reveal');
    
    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const revealTop = element.getBoundingClientRect().top;
            if (revealTop < windowHeight - revealPoint) {
                element.classList.add('visible');
            }
        });
    }
    
    window.addEventListener('scroll', checkReveal);
    checkReveal();
    
    // Lightbox functionality for gallery
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');
    
    if (galleryItems.length && lightbox) {
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const img = this.querySelector('img');
                if (img) {
                    lightboxImg.src = img.src;
                    lightboxImg.alt = img.alt;
                    lightbox.classList.add('active');
                    body.style.overflow = 'hidden';
                }
            });
            
            // Keyboard accessibility
            item.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const img = this.querySelector('img');
                    if (img) {
                        lightboxImg.src = img.src;
                        lightboxImg.alt = img.alt;
                        lightbox.classList.add('active');
                        body.style.overflow = 'hidden';
                    }
                }
            });
        });
        
        function closeLightbox() {
            lightbox.classList.remove('active');
            body.style.overflow = '';
        }
        
        if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) closeLightbox();
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }
    
    // Contact Form Handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const fname = document.getElementById('fname')?.value.trim();
            const lname = document.getElementById('lname')?.value.trim();
            const email = document.getElementById('email')?.value.trim();
            
            if (!fname || !lname || !email) {
                alert('Please fill in all required fields (First Name, Last Name, Email).');
                return;
            }
            
            if (!email.includes('@') || !email.includes('.')) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Show success message (in a real site, this would send to server)
            alert('Thank you! Your reservation request has been sent. We will contact you shortly.\n\nNote: This is a demo. In production, this would send to your email.');
            contactForm.reset();
        });
    }
    
    // Current year in footer copyright
    const yearSpan = document.querySelector('.footer-bottom p');
    if (yearSpan) {
        const currentYear = new Date().getFullYear();
        yearSpan.innerHTML = yearSpan.innerHTML.replace('2026', currentYear);
    }
});

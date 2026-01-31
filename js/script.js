// ===== DOM Elements =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const header = document.querySelector('.header');
const testimonialTrack = document.getElementById('testimonialTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Hero Slider Elements
const heroSlides = document.querySelectorAll('.hero-slide');
const sliderDots = document.querySelectorAll('.slider-dots .dot');
const sliderPrev = document.querySelector('.slider-prev');
const sliderNext = document.querySelector('.slider-next');
let currentHeroSlide = 0;
let heroSlideInterval;

// ===== Loading Animation =====
window.addEventListener('load', () => {
    const loading = document.querySelector('.loading');
    if (loading) {
        setTimeout(() => {
            loading.classList.add('hidden');
        }, 500);
    }
    
    // Trigger reveal animations
    revealElements();
    
    // Initialize Hero Slider
    initHeroSlider();
});

// ===== Hero Slider Functions =====
function initHeroSlider() {
    if (heroSlides.length === 0) return;
    
    // Set first slide as active
    showHeroSlide(0);
    
    // Start auto-slide
    startHeroAutoSlide();
    
    // Dot navigation events
    sliderDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showHeroSlide(index);
            resetHeroAutoSlide();
        });
    });
    
    // Touch/Swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    const heroSlider = document.querySelector('.hero-slider');
    
    if (heroSlider) {
        heroSlider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        heroSlider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleHeroSwipe();
        }, { passive: true });
    }
    
    function handleHeroSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextHeroSlide();
            } else {
                prevHeroSlide();
            }
            resetHeroAutoSlide();
        }
    }
    
    // Pause on hover (desktop)
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', () => {
            clearInterval(heroSlideInterval);
        });
        
        heroSection.addEventListener('mouseleave', () => {
            startHeroAutoSlide();
        });
    }
}

function showHeroSlide(index) {
    // Ensure index is within bounds
    if (index >= heroSlides.length) index = 0;
    if (index < 0) index = heroSlides.length - 1;
    
    currentHeroSlide = index;
    
    // Update slides
    heroSlides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
    
    // Update dots
    sliderDots.forEach((dot, i) => {
        dot.classList.remove('active');
        if (i === index) {
            dot.classList.add('active');
        }
    });
}

function nextHeroSlide() {
    showHeroSlide(currentHeroSlide + 1);
}

function prevHeroSlide() {
    showHeroSlide(currentHeroSlide - 1);
}

function startHeroAutoSlide() {
    heroSlideInterval = setInterval(() => {
        nextHeroSlide();
    }, 2000); // Change slide every 2 seconds
}

function resetHeroAutoSlide() {
    clearInterval(heroSlideInterval);
    startHeroAutoSlide();
}

// ===== Mobile Navigation Toggle =====
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        // Animate hamburger
        const spans = navToggle.querySelectorAll('span');
        if (navToggle.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans.forEach(span => {
            span.style.transform = 'none';
            span.style.opacity = '1';
        });
    });
});

// ===== Sticky Header with Scroll Effect =====
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('scrolled');
        header.style.transform = 'translateY(0)';
    } else {
        header.classList.remove('scrolled');
    }
    
    // Hide/Show header on scroll
    if (currentScroll > lastScroll && currentScroll > 500) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// ===== Active Navigation Link =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

function setActiveNav() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', setActiveNav);

// ===== Testimonial Slider =====
let currentSlide = 0;
const slides = document.querySelectorAll('.testimonial-card');
const totalSlides = slides.length;
const indicatorsContainer = document.getElementById('testimonialIndicators');

// Create indicators
function createIndicators() {
    if (!indicatorsContainer) return;
    
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.classList.add('testimonial-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            currentSlide = i;
            updateSlider();
            resetAutoSlide();
        });
        indicatorsContainer.appendChild(dot);
    }
}

function updateSlider() {
    if (testimonialTrack) {
        testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    
    // Update indicators
    if (indicatorsContainer) {
        const dots = indicatorsContainer.querySelectorAll('.testimonial-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
}

if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });
}

// Auto slide every 3 seconds (3000ms) for better readability
let autoSlide = setInterval(nextSlide, 3000);

function resetAutoSlide() {
    clearInterval(autoSlide);
    autoSlide = setInterval(nextSlide, 3000);
}

// Pause auto slide on hover
if (testimonialTrack) {
    testimonialTrack.addEventListener('mouseenter', () => {
        clearInterval(autoSlide);
    });
    
    testimonialTrack.addEventListener('mouseleave', () => {
        resetAutoSlide();
    });
}

// Initialize indicators
if (slides.length > 0) {
    createIndicators();
}

// ===== Form Submission with Formspree =====
const bookingForm = document.getElementById('bookingForm');
const contactForm = document.getElementById('contactForm');

async function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    const formData = new FormData(form);
    
    // Animate button
    btn.textContent = 'Sending...';
    btn.style.pointerEvents = 'none';
    btn.disabled = true;
    
    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            btn.textContent = '✓ Sent!';
            btn.style.background = 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)';
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                btn.style.pointerEvents = 'auto';
                btn.disabled = false;
                form.reset();
                
                // Show success notification
                showNotification('Message sent successfully! We will contact you soon.');
            }, 1500);
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        btn.textContent = '✗ Error';
        btn.style.background = 'linear-gradient(135deg, #f5576c 0%, #764ba2 100%)';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.style.pointerEvents = 'auto';
            btn.disabled = false;
            
            // Show error notification
            showNotification('Something went wrong. Please try again or call us directly.', 'error');
        }, 1500);
    }
}

if (bookingForm) {
    bookingForm.addEventListener('submit', handleFormSubmit);
}

if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
}

// ===== Show Notification =====
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = 'notification';
    
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    const bgColor = type === 'success' 
        ? 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' 
        : 'linear-gradient(135deg, #f5576c 0%, #764ba2 100%)';
    const shadowColor = type === 'success' 
        ? 'rgba(17, 153, 142, 0.4)' 
        : 'rgba(245, 87, 108, 0.4)';
    
    notification.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: ${bgColor};
        color: white;
        padding: 20px 30px;
        border-radius: 15px;
        display: flex;
        align-items: center;
        gap: 15px;
        font-weight: 500;
        box-shadow: 0 10px 40px ${shadowColor};
        z-index: 9999;
        animation: slideInNotification 0.5s ease;
        max-width: 90vw;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutNotification 0.5s ease forwards';
        setTimeout(() => notification.remove(), 500);
    }, 4000);
}

// Add notification animations to document
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInNotification {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutNotification {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(notificationStyles);

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Reveal Animation on Scroll =====
function revealElements() {
    const reveals = document.querySelectorAll('.service-card, .car-card, .feature-card, .function-content, .airport-content, .contact-info-box, .contact-form-box, .testimonial-content');
    
    reveals.forEach((element, index) => {
        element.classList.add('reveal');
        element.style.transitionDelay = `${index * 0.1}s`;
    });
    
    checkReveal();
}

function checkReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;
    
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 150;
        
        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', checkReveal);

// ===== Counter Animation =====
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// ===== Parallax Effect =====
function parallaxEffect() {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    }
}

window.addEventListener('scroll', parallaxEffect);

// ===== Mouse Trail Effect on Hero =====
const hero = document.querySelector('.hero');
if (hero) {
    hero.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        hero.style.backgroundPosition = `${x * 20}% ${y * 20}%`;
    });
}

// ===== Tilt Effect on Cards =====
const cards = document.querySelectorAll('.service-card, .car-card');
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===== Create Floating Particles =====
function createParticles() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    heroSection.appendChild(particlesContainer);
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            left: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 15}s;
            animation-duration: ${15 + Math.random() * 10}s;
            width: ${5 + Math.random() * 10}px;
            height: ${5 + Math.random() * 10}px;
        `;
        particlesContainer.appendChild(particle);
    }
}

createParticles();

// ===== Back to Top Button =====
const createBackToTop = () => {
    const btn = document.createElement('button');
    btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    btn.className = 'back-to-top';
    btn.setAttribute('aria-label', 'Back to top');
    
    document.body.appendChild(btn);
    
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Check scroll position on load
    const checkScroll = () => {
        if (window.pageYOffset > 300) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    };
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Initial check
};

createBackToTop();

// ===== Lazy Load Images =====
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, { rootMargin: '50px' });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===== Touch Support for Testimonial Slider =====
let touchStartX = 0;
let touchEndX = 0;

if (testimonialTrack) {
    testimonialTrack.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    testimonialTrack.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
    }
}

// ===== Morphing Button Effect =====
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        btn.style.setProperty('--x', `${x}px`);
        btn.style.setProperty('--y', `${y}px`);
    });
});

// ===== Typing Effect for Hero Title =====
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ===== Smooth Reveal for Section Headers =====
const sectionHeaders = document.querySelectorAll('.section-header');
const headerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.5 });

sectionHeaders.forEach(header => {
    header.style.opacity = '0';
    header.style.transform = 'translateY(30px)';
    header.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
    headerObserver.observe(header);
});

// ===== Ripple Effect on Buttons =====
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const ripple = document.createElement('span');
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, 0.4);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            left: ${e.clientX - rect.left - size/2}px;
            top: ${e.clientY - rect.top - size/2}px;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to { transform: scale(4); opacity: 0; }
    }
`;
document.head.appendChild(rippleStyle);

// ===== Phone Number Click Tracking =====
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', () => {
        console.log('Phone call initiated');
    });
});

// ===== WhatsApp Click Tracking =====
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', () => {
        console.log('WhatsApp chat initiated');
    });
});

// ===== Magnetic Effect on Floating Buttons =====
const floatingButtons = document.querySelectorAll('.whatsapp-float, .call-float');
floatingButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.15)`;
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
    });
});

// ===== Initialize on DOM Load =====
document.addEventListener('DOMContentLoaded', () => {
    lazyLoadImages();
    
    // Add loading screen
    const loading = document.createElement('div');
    loading.className = 'loading';
    loading.innerHTML = '<div class="loading-spinner"></div>';
    document.body.prepend(loading);
    
    // Remove loading after page load
    window.addEventListener('load', () => {
        setTimeout(() => loading.classList.add('hidden'), 300);
    });
});

// ===== Cursor Glow Effect =====
const cursorGlow = document.createElement('div');
cursorGlow.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    z-index: -1;
    transition: transform 0.1s ease;
    transform: translate(-50%, -50%);
`;
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

console.log('%c🚗 Rohit travels', 'font-size: 24px; font-weight: bold; color: #667eea; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);');
console.log('%cWebsite Loaded Successfully!', 'font-size: 14px; color: #38ef7d;');

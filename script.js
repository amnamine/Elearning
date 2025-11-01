// Smooth scroll behavior for the entire page
document.documentElement.style.scrollBehavior = 'smooth';

// Scroll Progress Indicator
const scrollProgress = document.querySelector('.scroll-progress');
window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    if (scrollProgress) {
        scrollProgress.style.width = `${scrolled}%`;
    }
});

// Course Search Functionality
const courseSearch = document.getElementById('courseSearch');
const fieldLinks = document.querySelectorAll('.field-link');

if (courseSearch) {
    courseSearch.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        fieldLinks.forEach(link => {
            const text = link.textContent.toLowerCase();
            const parent = link.parentElement;
            if (text.includes(searchTerm) || searchTerm === '') {
                parent.style.display = '';
                link.style.transform = 'scale(1)';
            } else {
                parent.style.display = 'none';
            }
        });
    });
}

// Category Filter Functionality - FIXED
const categoryFilters = document.querySelectorAll('.category-filter');
const allFieldLinks = document.querySelectorAll('.field-link');
const resourceLinksContainer = document.querySelector('.resource-links');

if (categoryFilters.length > 0 && allFieldLinks.length > 0) {
    categoryFilters.forEach(filter => {
        filter.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all filters
            categoryFilters.forEach(f => {
                f.classList.remove('active');
                f.style.transform = 'scale(1)';
            });
            
            // Add active class to clicked filter with animation
            filter.classList.add('active');
            filter.style.transform = 'scale(1.05)';
            
            const category = filter.getAttribute('data-category');
            
            // Animate and filter links
            const resourceLinksContainer = document.querySelector('.resource-links');
            
            allFieldLinks.forEach((link, index) => {
                const linkCategory = link.getAttribute('data-category');
                
                if (category === 'all' || linkCategory === category) {
                    // Show with animation
                    link.style.display = 'inline-flex';
                    link.style.opacity = '0';
                    link.style.transform = 'translateX(-30px) scale(0.9)';
                    link.style.pointerEvents = 'none';
                    
                    setTimeout(() => {
                        link.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                        link.style.opacity = '1';
                        link.style.transform = 'translateX(0) scale(1)';
                        link.style.pointerEvents = 'auto';
                    }, index * 80);
                } else {
                    // Hide with animation
                    link.style.opacity = '0';
                    link.style.transform = 'translateX(30px) scale(0.9)';
                    link.style.transition = 'all 0.3s ease';
                    link.style.pointerEvents = 'none';
                    setTimeout(() => {
                        link.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// FAB Button Functionality
const fabButton = document.getElementById('fabButton');
if (fabButton) {
    fabButton.addEventListener('click', () => {
        const menu = document.createElement('div');
        menu.className = 'fab-menu';
        menu.innerHTML = `
            <a href="#home"><i class="fas fa-home"></i> Home</a>
            <a href="#courses"><i class="fas fa-book"></i> Courses</a>
            <a href="#testimonials"><i class="fas fa-comments"></i> Reviews</a>
            <a href="#blog"><i class="fas fa-blog"></i> Blog</a>
        `;
        menu.style.cssText = `
            position: fixed;
            bottom: 80px;
            right: 20px;
            background: white;
            border-radius: 20px;
            padding: 1rem;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            z-index: 1000;
            animation: slideUp 0.3s ease;
        `;
        
        document.body.appendChild(menu);
        
        // Close menu when clicking outside
        setTimeout(() => {
            document.addEventListener('click', function closeMenu(e) {
                if (!menu.contains(e.target) && e.target !== fabButton) {
                    menu.remove();
                    document.removeEventListener('click', closeMenu);
                }
            });
        }, 100);
    });
}

// Navbar scroll effect with enhanced transition
const navbar = document.querySelector('.navbar');
let lastScrollY = window.scrollY;
let scrollTimeout;

const handleScroll = () => {
    const currentScrollY = window.scrollY;
    
    // Add glass effect based on scroll position
    const blur = Math.min(currentScrollY / 500, 0.8);
    navbar.style.background = `rgba(255, 255, 255, ${0.8 + blur * 0.2})`;
    navbar.style.backdropFilter = `blur(${10 + blur * 10}px) saturate(${180 - blur * 30}%)`;
    
    // Hide/show navbar based on scroll direction
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollY = currentScrollY;
};

window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(handleScroll, 10);
});

// Enhanced smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollBy({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// CTA Navigation Button - Smooth scroll to courses
document.querySelectorAll('.cta-nav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector('#courses');
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Enhanced course cards hover effect with perspective
const courseCards = document.querySelectorAll('.course-card');
courseCards.forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        
        card.style.transform = `
            perspective(1000px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg) 
            translateZ(10px)
            scale3d(1.02, 1.02, 1.02)
        `;
        
        // Add highlight effect
        const shine = card.querySelector('.shine') || document.createElement('div');
        if (!card.querySelector('.shine')) {
            shine.className = 'shine';
            card.appendChild(shine);
        }
        
        shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 80%)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0) scale3d(1, 1, 1)';
        const shine = card.querySelector('.shine');
        if (shine) shine.remove();
    });
});

// Enhanced scroll animations with stagger
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            
            animateOnScroll.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .course-card, .resource-card, .testimonial-card, .achievement-card, .blog-card').forEach(el => {
    el.style.opacity = '0';
    animateOnScroll.observe(el);
});

// Enhanced CTA button effect
const ctaBtn = document.querySelector('.cta-btn');
if (ctaBtn) {
    ctaBtn.addEventListener('mouseenter', () => {
        ctaBtn.style.transform = 'translateY(-5px)';
        ctaBtn.style.boxShadow = '0 8px 25px rgba(255, 255, 255, 0.4)';
    });
    
    ctaBtn.addEventListener('mouseleave', () => {
        ctaBtn.style.transform = 'translateY(0)';
        ctaBtn.style.boxShadow = '0 4px 15px rgba(255, 255, 255, 0.3)';
    });
    
    ctaBtn.addEventListener('click', () => {
        ctaBtn.classList.add('pulse');
        setTimeout(() => ctaBtn.classList.remove('pulse'), 1000);
    });
}

// Enhanced mobile menu
const createMobileMenu = () => {
    const navbar = document.querySelector('.navbar');
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.classList.add('mobile-menu-btn');
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    
    let isOpen = false;
    
    mobileMenuBtn.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        isOpen = !isOpen;
        
        mobileMenuBtn.innerHTML = isOpen ? 
            '<i class="fas fa-times"></i>' : 
            '<i class="fas fa-bars"></i>';
            
        if (isOpen) {
            navLinks.classList.add('show');
            navLinks.style.transform = 'translateY(0)';
            navLinks.style.opacity = '1';
        } else {
            navLinks.style.transform = 'translateY(-20px)';
            navLinks.style.opacity = '0';
            setTimeout(() => navLinks.classList.remove('show'), 300);
        }
    });
    
    navbar.insertBefore(mobileMenuBtn, navbar.firstChild);
};

// Initialize mobile menu on small screens
if (window.innerWidth <= 768) {
    createMobileMenu();
}

// Enhanced scroll to top button with progress indicator
const createScrollTopButton = () => {
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.classList.add('scroll-top-btn');
    scrollTopBtn.innerHTML = `
        <svg class="progress-ring" width="40" height="40">
            <circle class="progress-ring-circle" stroke="white" stroke-width="2" fill="transparent" r="16" cx="20" cy="20"/>
        </svg>
        <i class="fas fa-arrow-up"></i>
    `;
    
    document.body.appendChild(scrollTopBtn);
    
    const circle = scrollTopBtn.querySelector('.progress-ring-circle');
    const radius = circle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;
    
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference;
    
    const setProgress = percent => {
        const offset = circumference - (percent / 100 * circumference);
        circle.style.strokeDashoffset = offset;
    };
    
    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        setProgress(scrollPercent);
        
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
};

createScrollTopButton();

// Add loading animation
document.addEventListener('DOMContentLoaded', () => {
    const loadingAnimation = document.createElement('div');
    loadingAnimation.className = 'loading-animation';
    loadingAnimation.innerHTML = '<div class="loader"></div>';
    document.body.appendChild(loadingAnimation);

    // Remove loading animation after content loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingAnimation.style.opacity = '0';
            setTimeout(() => loadingAnimation.remove(), 500);
            initializeAnimations();
        }, 500);
    });
});

// Initialize all animations
function initializeAnimations() {
    // Animate hero section
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'all 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 200);
    }

    // Animate feature cards with stagger
    document.querySelectorAll('.feature-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 300 + index * 100);
    });

    // Initialize scroll reveal animation
    const scrollReveal = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                scrollReveal.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '-50px'
    });

    document.querySelectorAll('.scroll-reveal').forEach(el => {
        scrollReveal.observe(el);
    });
}

// Add some CSS for the new elements
const style = document.createElement('style');
style.textContent = `
    .nav-hidden {
        transform: translateY(-100%);
    }
    
    .animate {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    .mobile-menu-btn {
        display: none;
        background: none;
        border: none;
        color: var(--primary-color);
        font-size: 1.5rem;
        cursor: pointer;
    }
    
    .scroll-top-btn {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        cursor: pointer;
        opacity: 0;
        transition: var(--transition);
        z-index: 1000;
    }
    
    .scroll-top-btn.show {
        opacity: 1;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @media (max-width: 768px) {
        .mobile-menu-btn {
            display: block;
        }
        
        .nav-links.show {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--white);
            padding: 1rem;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
    }
`;

document.head.appendChild(style);

// Enhanced filter button animations
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('mouseenter', () => {
        const icon = button.querySelector('i');
        if (icon) {
            icon.style.transform = 'scale(1.2) rotate(5deg)';
        }
        button.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    button.addEventListener('mouseleave', () => {
        const icon = button.querySelector('i');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0)';
        }
        button.style.transform = 'translateY(0) scale(1)';
    });
});

// Animate statistics numbers
const animateNumbers = () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent.replace(/[^0-9]/g, ''));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateNumber = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current) + stat.textContent.replace(/[0-9]/g, '').replace(/\+/, '');
                requestAnimationFrame(updateNumber);
            } else {
                stat.textContent = stat.textContent.replace(/[0-9]+/, target);
            }
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateNumber();
                    observer.unobserve(stat);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(stat);
    });
};

// Initialize number animations when page loads
window.addEventListener('load', animateNumbers);

// Add click tracking for filter buttons
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
        
        // Log click for analytics (you can add your analytics code here)
        console.log(`Clicked learning resource: ${button.textContent.trim()}`);
    });
});

// Add particle background to hero section
const createParticleBackground = () => {
    const hero = document.querySelector('.hero');
    const canvas = document.createElement('canvas');
    canvas.className = 'particle-background';
    hero.insertBefore(canvas, hero.firstChild);

    const ctx = canvas.getContext('2d');
    let particles = [];

    const resizeCanvas = () => {
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.fill();
        }
    }

    const createParticles = () => {
        for (let i = 0; i < 50; i++) {
            particles.push(new Particle());
        }
    };

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        requestAnimationFrame(animate);
    };

    createParticles();
    animate();
};

createParticleBackground();

// Add floating animation to feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.style.animation = 'float 6s ease-in-out infinite';
});

// Enhanced button hover effects
document.querySelectorAll('.cta-btn, .enroll-btn, .start-path-btn').forEach(button => {
    button.addEventListener('mousemove', e => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        button.style.setProperty('--x', `${x}px`);
        button.style.setProperty('--y', `${y}px`);
    });
});

// Add dynamic color transition to gradient backgrounds
document.querySelectorAll('[class*="gradient"]').forEach(element => {
    let hue = 0;
    
    const updateGradient = () => {
        hue = (hue + 1) % 360;
        const color1 = `hsl(${hue}, 70%, 60%)`;
        const color2 = `hsl(${(hue + 60) % 360}, 70%, 60%)`;
        element.style.background = `linear-gradient(135deg, ${color1}, ${color2})`;
        requestAnimationFrame(updateGradient);
    };
    
    updateGradient();
});

// Add ripple effect to all buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', e => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add smooth parallax scrolling
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    document.querySelectorAll('.parallax').forEach(element => {
        const speed = element.dataset.speed || 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Field card hover animations
document.querySelectorAll('.field-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        const link = card.querySelector('.field-link');
        if (link) {
            link.style.gap = '1rem';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        const link = card.querySelector('.field-link');
        if (link) {
            link.style.gap = '0.5rem';
        }
    });
});

// Load more courses functionality
const loadMoreBtn = document.querySelector('.load-more-btn');
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
        loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        
        // Simulate loading new courses
        setTimeout(() => {
            // Add new courses here
            loadMoreBtn.innerHTML = 'Load More Courses';
            
            // Show notification
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.innerHTML = 'New courses loaded successfully!';
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
            }, 3000);
        }, 1500);
    });
}

// Add notification styles
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--success-color);
        color: white;
        padding: 1rem 2rem;
        border-radius: var(--border-radius);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        animation: slideUp 0.3s ease forwards;
        z-index: 1000;
    }
    
    @keyframes slideUp {
        from {
            transform: translate(-50%, 100%);
            opacity: 0;
        }
        to {
            transform: translate(-50%, 0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(notificationStyle);

// Path progress animation
document.querySelectorAll('.path-step').forEach((step, index) => {
    setTimeout(() => {
        if (step.classList.contains('completed')) {
            step.style.opacity = '1';
            step.querySelector('.step-number').style.transform = 'scale(1.2)';
            setTimeout(() => {
                step.querySelector('.step-number').style.transform = 'scale(1)';
            }, 200);
        }
    }, index * 300);
});

// Enroll button effect
document.querySelectorAll('.enroll-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const x = e.clientX - e.target.offsetLeft;
        const y = e.clientY - e.target.offsetTop;
        
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        btn.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
        
        // Show enrollment modal
        showEnrollmentModal(btn.closest('.course-card').querySelector('h3').textContent);
    });
});

// Enrollment modal
function showEnrollmentModal(courseName) {
    const modal = document.createElement('div');
    modal.className = 'enrollment-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>Enroll in Course</h2>
            <h3>${courseName}</h3>
            <form class="enrollment-form">
                <div class="form-group">
                    <label>Select Plan</label>
                    <div class="plan-options">
                        <label class="plan">
                            <input type="radio" name="plan" value="basic">
                            <div class="plan-content">
                                <h4>Basic</h4>
                                <p>Course access for 3 months</p>
                                <span class="price">$49</span>
                            </div>
                        </label>
                        <label class="plan">
                            <input type="radio" name="plan" value="pro">
                            <div class="plan-content">
                                <h4>Pro</h4>
                                <p>Lifetime access + Certification</p>
                                <span class="price">$99</span>
                            </div>
                        </label>
                    </div>
                </div>
                <button type="submit" class="enroll-submit-btn">Complete Enrollment</button>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add modal styles
    const modalStyle = document.createElement('style');
    modalStyle.textContent = `
        .enrollment-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .enrollment-modal .modal-content {
            background: white;
            padding: 2rem;
            border-radius: var(--border-radius);
            max-width: 500px;
            width: 90%;
            transform: translateY(20px);
            transition: transform 0.3s ease;
        }
        
        .plan-options {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            margin: 1rem 0;
        }
        
        .plan {
            cursor: pointer;
            position: relative;
        }
        
        .plan input {
            position: absolute;
            opacity: 0;
        }
        
        .plan-content {
            border: 2px solid #ddd;
            border-radius: var(--border-radius);
            padding: 1.5rem;
            transition: var(--transition);
        }
        
        .plan input:checked + .plan-content {
            border-color: var(--primary-color);
            background: rgba(114, 9, 183, 0.05);
        }
        
        .price {
            display: block;
            font-size: 1.5rem;
            font-weight: 600;
            color: var(--primary-color);
            margin-top: 1rem;
        }
        
        .enroll-submit-btn {
            width: 100%;
            padding: 1rem;
            background: linear-gradient(135deg, var(--gradient-1), var(--gradient-2));
            color: white;
            border: none;
            border-radius: var(--border-radius);
            cursor: pointer;
            font-weight: 500;
            margin-top: 1rem;
        }
        
        .ripple {
            position: absolute;
            background: rgba(255, 255, 255, 0.7);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    
    document.head.appendChild(modalStyle);
    
    // Animate modal entrance
    requestAnimationFrame(() => {
        modal.style.opacity = '1';
        modal.querySelector('.modal-content').style.transform = 'translateY(0)';
    });
    
    // Close modal functionality
    const closeModal = () => {
        modal.style.opacity = '0';
        modal.querySelector('.modal-content').style.transform = 'translateY(20px)';
        setTimeout(() => modal.remove(), 300);
    };
    
    modal.querySelector('.close-modal').addEventListener('click', closeModal);
    modal.addEventListener('click', e => {
        if (e.target === modal) closeModal();
    });
    
    // Handle form submission
    modal.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        const plan = modal.querySelector('input[name="plan"]:checked');
        if (!plan) {
            alert('Please select a plan');
            return;
        }
        
        // Show success message
        modal.querySelector('.modal-content').innerHTML = `
            <div style="text-align: center;">
                <i class="fas fa-check-circle" style="font-size: 3rem; color: var(--success-color);"></i>
                <h2>Enrollment Successful!</h2>
                <p>Thank you for enrolling in ${courseName}</p>
                <p>You will receive an email with further instructions.</p>
            </div>
        `;
        
        setTimeout(closeModal, 3000);
    });
}

// Resource card hover effects
const resourceCards = document.querySelectorAll('.resource-card');
resourceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Field link hover effects
const fieldLinks = document.querySelectorAll('.field-link');
fieldLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        const arrow = link.querySelector('.fa-arrow-right');
        arrow.style.transform = 'translateX(5px)';
    });
    
    link.addEventListener('mouseleave', () => {
        const arrow = link.querySelector('.fa-arrow-right');
        arrow.style.transform = 'translateX(0)';
    });
});

// External link click tracking
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', (e) => {
        // You can add analytics tracking here
        console.log(`Clicked external link: ${link.href}`);
    });
});

// Intersection Observer for resource cards animation
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const resourceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.resource-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease-out';
    resourceObserver.observe(card);
});

// Add loading animation for resource images
document.querySelectorAll('.resource-card img').forEach(img => {
    img.addEventListener('load', () => {
        img.style.opacity = '1';
    });
    
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease-in';
});

// Enhanced CTA button effects with ripple
document.querySelectorAll('.cta-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255,255,255,0.5);
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add CSS for ripple animation
if (!document.querySelector('#ripple-style')) {
    const style = document.createElement('style');
    style.id = 'ripple-style';
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Smooth reveal animations for sections
const revealOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.8s ease-out';
    revealOnScroll.observe(section);
});

// Enhanced testimonials carousel effect (optional autoplay)
let testimonialIndex = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');
if (testimonialCards.length > 0) {
    setInterval(() => {
        testimonialCards.forEach((card, index) => {
            if (index === testimonialIndex) {
                card.style.transform = 'translateY(-10px) scale(1.02)';
                card.style.transition = 'all 0.4s ease';
            } else {
                card.style.transform = 'translateY(0) scale(1)';
            }
        });
        testimonialIndex = (testimonialIndex + 1) % testimonialCards.length;
    }, 3000);
}

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// FAQ Toggle Functionality
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.closest('.faq-item');
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Enhanced animations for pricing cards
document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        if (!card.classList.contains('featured')) {
            card.style.transform = 'translateY(0) scale(1)';
        } else {
            card.style.transform = 'scale(1.05)';
        }
    });
});

// Floating animation for instructor badges
const instructorBadges = document.querySelectorAll('.instructor-badge');
instructorBadges.forEach((badge, index) => {
    badge.style.animationDelay = `${index * 0.2}s`;
});

// Remove the animated gradient override for course thumbnails - use CSS gradients instead
// This ensures the category-specific colors are maintained

// Enhanced hover effects for featured course cards
document.querySelectorAll('.featured-course-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Parallax scroll for sections
const parallaxSections = document.querySelectorAll('.pricing, .instructors, .featured-courses');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    parallaxSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const speed = 0.3;
            const yPos = -(rect.top * speed);
            section.style.transform = `translateY(${yPos}px)`;
        }
    });
});

// Stagger animation for instructor cards
const instructorCards = document.querySelectorAll('.instructor-card');
instructorCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        card.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, index * 150);
});

// Enhanced ripple effect for all buttons
document.querySelectorAll('.enroll-btn-featured, .pricing-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255,255,255,0.6);
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Create floating particles in hero section
const createParticles = () => {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 15}s`;
        particle.style.animationDuration = `${10 + Math.random() * 10}s`;
        particle.style.width = `${3 + Math.random() * 3}px`;
        particle.style.height = particle.style.width;
        hero.appendChild(particle);
    }
};

// Initialize particles when page loads
window.addEventListener('load', createParticles);

// Smooth scroll for pricing buttons
document.querySelectorAll('.pricing-btn, .enroll-btn-featured').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const coursesSection = document.querySelector('#courses');
        if (coursesSection) {
            coursesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Add entrance animation for pricing cards
const pricingCards = document.querySelectorAll('.pricing-card');
const pricingObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            pricingObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

pricingCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    pricingObserver.observe(card);
}); 
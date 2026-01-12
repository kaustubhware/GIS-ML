// Loader
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 800);
});

// Navigation
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Scroll progress bar
window.addEventListener('scroll', () => {
    const scrollProgress = document.querySelector('.scroll-progress');
    const scrollPercent = (window.pageYOffset / (document.body.offsetHeight - window.innerHeight)) * 100;
    scrollProgress.style.width = scrollPercent + '%';
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Duplicate content for infinite scroll
const certContainer = document.querySelector('.cert-container');

if (certContainer) {
    const originalCerts = certContainer.innerHTML;
    certContainer.innerHTML = originalCerts + originalCerts;
}

// Toggle projects
function toggleProjects() {
    const hiddenProjects = document.querySelectorAll('.project-card.hidden');
    const expandText = document.querySelector('.expand-text');
    const expandBtn = document.querySelector('.expand-btn');
    
    if (hiddenProjects[0].style.display === 'block') {
        hiddenProjects.forEach(project => project.style.display = 'none');
        expandText.textContent = 'View More Projects';
        expandBtn.classList.remove('expanded');
    } else {
        hiddenProjects.forEach(project => project.style.display = 'block');
        expandText.textContent = 'View Less Projects';
        expandBtn.classList.add('expanded');
    }
}

// Counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }
        };
        updateCounter();
    });
}

// Contact Form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Track form submission
        trackEvent('form_submission', {
            project_type: formObject['project-type'],
            form_type: 'contact'
        });
        
        // Simulate form submission (replace with actual endpoint)
        const submitBtn = this.querySelector('.form-submit');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitBtn.style.background = '#27ae60';
            
            // Reset form after 2 seconds
            setTimeout(() => {
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 2000);
        }, 1500);
    });
}

// Enhanced Analytics Tracking
function trackEvent(eventName, parameters = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, {
            ...parameters,
            timestamp: new Date().toISOString()
        });
    }
}

// Track blog article clicks
document.querySelectorAll('.read-more').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const articleTitle = link.closest('.blog-card').querySelector('h3').textContent;
        trackEvent('blog_click', {
            article_title: articleTitle
        });
    });
});

// Track tool interactions
document.querySelectorAll('.tool-item').forEach(tool => {
    tool.addEventListener('click', () => {
        const toolName = tool.querySelector('span').textContent;
        trackEvent('tool_click', {
            tool_name: toolName
        });
    });
});

// Track case study views
document.querySelectorAll('.case-study-card').forEach(card => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const caseStudyTitle = entry.target.querySelector('h3').textContent;
                trackEvent('case_study_view', {
                    case_study: caseStudyTitle
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(card);
});

// Track section visibility
const sections = ['about', 'projects', 'services', 'blog', 'tools', 'contact'];
sections.forEach(sectionId => {
    const section = document.getElementById(sectionId);
    if (section) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    trackEvent('section_view', {
                        section: sectionId
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(section);
    }
});

// Performance monitoring
window.addEventListener('load', () => {
    if ('performance' in window) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        trackEvent('page_performance', {
            load_time: loadTime,
            page_type: 'portfolio'
        });
    }
});

// Google Analytics tracking
function trackEvent(eventName, parameters = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, parameters);
    }
}

// Track navigation clicks
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        trackEvent('navigation_click', {
            section: link.textContent.trim()
        });
    });
});

// Track social media clicks
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', () => {
        const platform = link.className.includes('linkedin') ? 'LinkedIn' : 
                        link.className.includes('github') ? 'GitHub' : 
                        link.className.includes('whatsapp') ? 'WhatsApp' : 'Social';
        trackEvent('social_click', { platform });
    });
});

// Back to top button
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});






// Cal.com Modal
function openCalendar() {
    document.getElementById('calModal').style.display = 'block';
}

function closeCalendar() {
    document.getElementById('calModal').style.display = 'none';
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    window.scrollTo(0, 0);
    setTimeout(animateCounters, 2000);
});

// Global variables
let contentData = {};
let portfolioItems = [];
let currentLightboxIndex = 0;

// Load content on page load
document.addEventListener('DOMContentLoaded', () => {
    loadContent();
    initializeNavigation();
    initializeScrollEffects();
    initializeContactForm();
    setCurrentYear();
});

// Load content from API
async function loadContent() {
    try {
        const response = await fetch('/api/content');
        contentData = await response.json();
        populateContent();
    } catch (error) {
        console.error('Error loading content:', error);
    }
}

// Populate all content
function populateContent() {
    const { personal, hero, services, skills, portfolio } = contentData;

    // Hero section
    document.getElementById('heroGreeting').textContent = hero.greeting;
    document.getElementById('heroName').textContent = personal.name;
    document.getElementById('heroTitle').textContent = personal.title;
    document.getElementById('heroTagline').textContent = personal.tagline;
    document.getElementById('ctaPrimary').textContent = hero.cta_primary;
    document.getElementById('ctaSecondary').textContent = hero.cta_secondary;

    // Navigation brand
    document.getElementById('navBrand').textContent = personal.name.split(' ')[0];

    // About section
    document.getElementById('aboutBio').textContent = personal.bio;
    document.getElementById('aboutEmail').textContent = personal.email;
    document.getElementById('aboutPhone').textContent = personal.phone;
    document.getElementById('aboutLocation').textContent = personal.location;
    document.getElementById('resumeBtn').href = personal.resume_url;

    // Skills
    populateSkills(skills);

    // Services
    populateServices(services);

    // Portfolio
    portfolioItems = portfolio;
    populatePortfolio(portfolio);
    initializePortfolioFilters();

    // Contact section
    document.getElementById('contactEmail').textContent = personal.email;
    document.getElementById('contactPhone').textContent = personal.phone;
    document.getElementById('contactLocation').textContent = personal.location;

    // Social links
    populateSocialLinks(personal.social);

    // Footer
    document.getElementById('footerName').textContent = personal.name;
}

// Populate skills
function populateSkills(skills) {
    const skillsList = document.getElementById('skillsList');
    skillsList.innerHTML = '';

    skills.forEach(skill => {
        const skillItem = document.createElement('div');
        skillItem.className = 'skill-item';
        skillItem.innerHTML = `
            <div class="skill-header">
                <span class="skill-name">${skill.name}</span>
                <span class="skill-percentage">${skill.level}%</span>
            </div>
            <div class="skill-bar">
                <div class="skill-progress" style="width: 0%" data-width="${skill.level}%"></div>
            </div>
        `;
        skillsList.appendChild(skillItem);
    });

    // Animate skill bars when in view
    animateSkillBars();
}

// Animate skill bars
function animateSkillBars() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.skill-progress');
                progressBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const skillsList = document.getElementById('skillsList');
    if (skillsList) {
        observer.observe(skillsList);
    }
}

// Populate services
function populateServices(services) {
    const servicesGrid = document.getElementById('servicesGrid');
    servicesGrid.innerHTML = '';

    services.forEach(service => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'service-card';
        serviceCard.innerHTML = `
            <div class="service-icon">${service.icon}</div>
            <h3>${service.title}</h3>
            <p>${service.description}</p>
        `;
        servicesGrid.appendChild(serviceCard);
    });
}

// Populate portfolio
function populatePortfolio(items) {
    const portfolioGrid = document.getElementById('portfolioGrid');
    portfolioGrid.innerHTML = '';

    items.forEach((item, index) => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item';
        portfolioItem.setAttribute('data-category', item.category);
        portfolioItem.setAttribute('data-index', index);
        portfolioItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="portfolio-image">
            <div class="portfolio-overlay">
                <h3>${item.title}</h3>
                <p class="portfolio-category">${item.category}</p>
            </div>
        `;
        portfolioItem.addEventListener('click', () => openLightbox(index));
        portfolioGrid.appendChild(portfolioItem);
    });
}

// Initialize portfolio filters
function initializePortfolioFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter portfolio items
            const filter = btn.getAttribute('data-filter');
            const items = document.querySelectorAll('.portfolio-item');

            items.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Populate social links
function populateSocialLinks(social) {
    const socialLinks = document.getElementById('socialLinks');
    socialLinks.innerHTML = '';

    const socialIcons = {
        behance: 'B',
        dribbble: 'D',
        instagram: 'I',
        linkedin: 'L'
    };

    Object.entries(social).forEach(([platform, url]) => {
        const link = document.createElement('a');
        link.href = url;
        link.className = 'social-link';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = socialIcons[platform] || platform[0].toUpperCase();
        socialLinks.appendChild(link);
    });
}

// Initialize navigation
function initializeNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Update active link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('.section, .hero');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Initialize scroll effects
function initializeScrollEffects() {
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Initialize contact form
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                formMessage.textContent = 'Message sent successfully! I\'ll get back to you soon.';
                formMessage.className = 'form-message success';
                form.reset();
            } else {
                formMessage.textContent = result.error || 'Failed to send message. Please try again.';
                formMessage.className = 'form-message error';
            }
        } catch (error) {
            formMessage.textContent = 'An error occurred. Please try again later.';
            formMessage.className = 'form-message error';
        }

        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    });
}

// Lightbox functionality
function openLightbox(index) {
    currentLightboxIndex = index;
    const item = portfolioItems[index];
    const lightbox = document.getElementById('lightbox');

    document.getElementById('lightboxImage').src = item.image;
    document.getElementById('lightboxTitle').textContent = item.title;
    document.getElementById('lightboxCategory').textContent = item.category;
    document.getElementById('lightboxDescription').textContent = item.description;

    const tagsContainer = document.getElementById('lightboxTags');
    tagsContainer.innerHTML = '';
    item.tags.forEach(tag => {
        const tagSpan = document.createElement('span');
        tagSpan.className = 'lightbox-tag';
        tagSpan.textContent = tag;
        tagsContainer.appendChild(tagSpan);
    });

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function navigateLightbox(direction) {
    currentLightboxIndex += direction;
    if (currentLightboxIndex < 0) {
        currentLightboxIndex = portfolioItems.length - 1;
    } else if (currentLightboxIndex >= portfolioItems.length) {
        currentLightboxIndex = 0;
    }
    openLightbox(currentLightboxIndex);
}

// Lightbox event listeners
document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
document.querySelector('.lightbox-prev').addEventListener('click', () => navigateLightbox(-1));
document.querySelector('.lightbox-next').addEventListener('click', () => navigateLightbox(1));

document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target.id === 'lightbox') {
        closeLightbox();
    }
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            navigateLightbox(-1);
        } else if (e.key === 'ArrowRight') {
            navigateLightbox(1);
        }
    }
});

// Set current year in footer
function setCurrentYear() {
    document.getElementById('currentYear').textContent = new Date().getFullYear();
}

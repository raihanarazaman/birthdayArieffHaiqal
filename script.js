document.addEventListener('DOMContentLoaded', function () {
    createParticles();
    initializeAnimations();
    setupScrollAnimations();
});

function createParticles() {
    const particles = document.getElementById('particles');
    const particleEmojis = ['❤️', '✨', '🌸']; // Added emojis here

    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.innerHTML = particleEmojis[Math.floor(Math.random() * particleEmojis.length)];
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 3 + 4) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        particles.appendChild(particle);
    }
}

function initializeAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((element, index) => {
        element.style.animationDelay = (index * 0.2) + 's';
    });
}

function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // Corrected "0" to "O" in IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                if (entry.target.classList.contains('message-card')) {
                    animateMessageText();
                }
            }
        });
    }, observerOptions);

    // Corrected "Al1" to "All"
    const elementsToObserve = document.querySelectorAll('[data-aos], .section-title, .message-card');
    elementsToObserve.forEach(element => {
        observer.observe(element);
        const delay = element.getAttribute('data-delay');
        if (delay) {
            element.style.transitionDelay = delay + 'ms';
        }
    });
}

function animateMessageText() {
    const messageTexts = document.querySelectorAll('.message-text'); // Corrected "Al1"
    messageTexts.forEach((text, index) => {
        setTimeout(() => {
            text.classList.add('fade-in-animate');
        }, index * 500);
    });
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function toggleLike(button) {
    button.classList.toggle('liked');
    if (button.classList.contains('liked')) {
        createFloatingHeart(button);
    }
}

function createFloatingHeart(button) {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.position = 'absolute';
    heart.style.pointerEvents = 'none';
    const rect = button.getBoundingClientRect();
    heart.style.left = rect.left + 'px';
    heart.style.top = rect.top + 'px';
    document.body.appendChild(heart);

    heart.animate([
        { transform: 'translateY(0px) scale(1)', opacity: 1 },
        { transform: 'translateY(-60px) scale(1.5)', opacity: 0 }
    ], { duration: 1500, easing: 'ease-out' }).onfinish = () => heart.remove();
}

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    // Corrected quotes to backticks for ${}
    if (hero) hero.style.transform = `translateY(${scrolled * 0.5}px)`;
});

// Photo Observer corrected typo
const photoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target.querySelector('img');
            if (img) img.style.animation = 'photoEnter 0.8s ease-out forwards';
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.photo-card').forEach(card => {
    photoObserver.observe(card);
});
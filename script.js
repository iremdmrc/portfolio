/* =============================================================
   IREM DEMIRCI · PORTFOLIO ISSUE 01
   Editorial interactions — cursor, reveal, mobile nav, scroll
============================================================= */

/* ----------- MASTHEAD / MOBILE NAV ----------- */
const masthead    = document.getElementById('nav');
const navToggle   = document.querySelector('.nav-toggle');
const mobileMenu  = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

let menuOpen = false;
function toggleMenu(state) {
    menuOpen = state;
    mobileMenu.classList.toggle('open', menuOpen);
    navToggle.classList.toggle('open', menuOpen);
    document.body.style.overflow = menuOpen ? 'hidden' : '';
}
navToggle.addEventListener('click', () => toggleMenu(!menuOpen));
mobileLinks.forEach(l => l.addEventListener('click', () => toggleMenu(false)));
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menuOpen) toggleMenu(false);
});

/* ----------- ACTIVE NAV LINK ----------- */
const navLinks = document.querySelectorAll('.primary-nav__link');
const sections = document.querySelectorAll('section[id]');
const sectionObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach(link => {
            const active = link.getAttribute('href') === `#${id}`;
            if (!link.classList.contains('primary-nav__link--cta')) {
                link.style.color = active ? 'var(--text-1)' : '';
            }
        });
    });
}, { threshold: 0.4 });
sections.forEach(s => sectionObs.observe(s));

/* ----------- SCROLL REVEAL ----------- */
const reveals = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const parent   = entry.target.parentElement;
        const siblings = [...parent.querySelectorAll(':scope > .reveal')];
        const idx      = siblings.indexOf(entry.target);
        setTimeout(() => entry.target.classList.add('visible'), Math.min(idx * 80, 400));
        revealObs.unobserve(entry.target);
    });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
reveals.forEach(el => revealObs.observe(el));

/* ----------- SMOOTH SCROLL ----------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const offset = 110;
        const top    = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
    });
});

/* ----------- CUSTOM CURSOR ----------- */
const cursor    = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');

if (cursor && cursorDot && window.matchMedia('(min-width: 1025px)').matches) {
    let mouseX = -100, mouseY = -100;
    let curX   = -100, curY   = -100;
    let dotX   = -100, dotY   = -100;

    document.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }, { passive: true });

    (function animate() {
        curX += (mouseX - curX) * 0.16;
        curY += (mouseY - curY) * 0.16;
        dotX += (mouseX - dotX) * 0.55;
        dotY += (mouseY - dotY) * 0.55;
        cursor.style.transform    = `translate(${curX}px, ${curY}px) translate(-50%, -50%)`;
        cursorDot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
        requestAnimationFrame(animate);
    })();

    const hoverables = document.querySelectorAll(
        'a, button, .b-card, .role-tag, .stat, .tools__list li, .story__item, .contact__line'
    );
    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });

    document.addEventListener('mouseleave', () => {
        cursor.style.opacity    = '0';
        cursorDot.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity    = '1';
        cursorDot.style.opacity = '1';
    });
}

/* ----------- BG GLOW PARALLAX ----------- */
const bgGlow = document.querySelector('.bg-glow');
if (bgGlow && window.matchMedia('(min-width: 1025px)').matches) {
    document.addEventListener('mousemove', e => {
        const x = (e.clientX / window.innerWidth  - 0.5) * 70;
        const y = (e.clientY / window.innerHeight - 0.5) * 50;
        bgGlow.style.transform = `translateX(calc(-50% + ${x}px)) translateY(${y}px)`;
    }, { passive: true });
}

/* ----------- HUGE NUMERAL TILT ----------- */
const numeral = document.querySelector('.numeral-text');
if (numeral && window.matchMedia('(min-width: 1025px)').matches) {
    document.addEventListener('mousemove', e => {
        const x = (e.clientX / window.innerWidth  - 0.5) * 8;
        const y = (e.clientY / window.innerHeight - 0.5) * 6;
        numeral.style.transform = `translate(${x}px, ${y}px) rotate(${x * 0.3}deg)`;
    }, { passive: true });
}

/* ----------- BENTO CARD TILT ----------- */
const bentoCards = document.querySelectorAll('.b-card');
if (window.matchMedia('(min-width: 1025px)').matches) {
    bentoCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top)  / rect.height;
            const rx = (y - 0.5) * -4;
            const ry = (x - 0.5) *  4;
            card.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

/* ----------- CONSOLE ----------- */
console.log(
    '%c✺  Portfolio Issue 01\n' +
    '%c   Set in Fraunces, Space Grotesk, Space Mono.\n' +
    '   Hand-written by Irem Demirci · 2026.\n' +
    '   github.com/iremdmrc · iremdemircii61@gmail.com',
    'font-family: serif; color: #d4a5c5; font-size: 18px; font-style: italic;',
    'font-family: monospace; color: #b8d4f0; font-size: 11px; line-height: 1.7;'
);

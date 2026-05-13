/* ═══════════════════════════════════════════════════════════════
   ERN 2026 – EFFUSION · script.js
   Vanilla JavaScript – Animations, Sliders, Interactions
═══════════════════════════════════════════════════════════════ */

/* ─── 1. LOADER ─────────────────────────────────────────────── */
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (!loader) return;
    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.transition = 'opacity 0.6s ease';
        setTimeout(() => { loader.style.display = 'none'; }, 650);
    }, 1800);
});

/* ─── 2. CUSTOM CURSOR ──────────────────────────────────────── */
(function initCursor() {
    const dot  = document.getElementById('cursor');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
    dot.style.opacity = '1';
    ring.style.opacity = '1';

    document.addEventListener('mousemove', e => {
        mouseX = e.clientX; mouseY = e.clientY;
        dot.style.left = mouseX + 'px';
        dot.style.top  = mouseY + 'px';
    });

    function animateRing() {
        ringX += (mouseX - ringX) * 0.12;
        ringY += (mouseY - ringY) * 0.12;
        ring.style.left = ringX + 'px';
        ring.style.top  = ringY + 'px';
        requestAnimationFrame(animateRing);
    }
    animateRing();

    document.querySelectorAll('a, button, [role="button"]').forEach(el => {
        el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
        el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
    });

    document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; ring.style.opacity = '0'; });
    document.addEventListener('mouseenter', () => { dot.style.opacity = '1'; ring.style.opacity = '1'; });
})();

/* ─── 3. PARTICLES ───────────────────────────────────────────── */
(function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const COLORS = ['rgba(124,58,237,0.7)', 'rgba(249,115,22,0.6)', 'rgba(251,191,36,0.5)', 'rgba(168,85,247,0.6)', 'rgba(255,255,255,0.4)'];
    const NUM = window.innerWidth < 600 ? 35 : 70;

    const particles = Array.from({ length: NUM }, () => ({
        x:     Math.random() * canvas.width,
        y:     Math.random() * canvas.height,
        r:     Math.random() * 2.5 + 0.5,
        dx:    (Math.random() - 0.5) * 0.4,
        dy:    -(Math.random() * 0.6 + 0.2),
        alpha: Math.random() * 0.6 + 0.2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        pulse: Math.random() * Math.PI * 2,
    }));

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.x  += p.dx;
            p.y  += p.dy;
            p.pulse += 0.02;
            const alpha = p.alpha * (0.6 + 0.4 * Math.sin(p.pulse));

            if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
            if (p.x < -10) p.x = canvas.width + 10;
            if (p.x > canvas.width + 10) p.x = -10;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.color.replace(/[\d.]+\)$/, alpha + ')');
            ctx.fill();

            // glow
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r * 2.5, 0, Math.PI * 2);
            ctx.fillStyle = p.color.replace(/[\d.]+\)$/, (alpha * 0.2) + ')');
            ctx.fill();
        });
        requestAnimationFrame(draw);
    }
    draw();
})();

/* ─── 4. NAVBAR ─────────────────────────────────────────────── */
(function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    let lastY = 0;

    window.addEventListener('scroll', () => {
        const y = window.scrollY;
        if (y > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastY = y;
    }, { passive: true });
})();

/* ─── 5. MOBILE MENU ────────────────────────────────────────── */
(function initMobileMenu() {
    const toggle = document.getElementById('menu-toggle');
    const menu   = document.getElementById('mobile-menu');
    if (!toggle || !menu) return;

    let open = false;

    toggle.addEventListener('click', () => {
        open = !open;
        menu.classList.toggle('hidden', !open);
        const bars = toggle.querySelectorAll('.menu-bar');
        if (open) {
            bars[0].style.transform = 'rotate(45deg) translateY(8px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(-45deg) translateY(-8px)';
        } else {
            bars[0].style.transform = '';
            bars[1].style.opacity = '';
            bars[2].style.transform = '';
        }
    });

    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            open = false;
            menu.classList.add('hidden');
            const bars = toggle.querySelectorAll('.menu-bar');
            bars.forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
        });
    });
})();

/* ─── 6. SMOOTH SCROLL ──────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        const id = link.getAttribute('href').slice(1);
        const target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
    });
});

/* ─── 7. SCROLL REVEAL ──────────────────────────────────────── */
(function initReveal() {
    const els = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    if (!('IntersectionObserver' in window)) {
        els.forEach(el => el.classList.add('revealed'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const delay = parseFloat(el.style.animationDelay || el.style.transitionDelay || '0') * 1000;
            setTimeout(() => el.classList.add('revealed'), delay);
            observer.unobserve(el);
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    els.forEach(el => observer.observe(el));
})();

/* ─── 8. COUNTDOWN ──────────────────────────────────────────── */
(function initCountdown() {
    const target = new Date('2026-05-20T19:00:00');
    const daysEl = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minsEl  = document.getElementById('cd-minutes');
    const secsEl  = document.getElementById('cd-seconds');
    if (!daysEl) return;

    function pad(n) { return String(n).padStart(2, '0'); }

    function update() {
        const now  = new Date();
        const diff = target - now;
        if (diff <= 0) {
            daysEl.textContent = hoursEl.textContent = minsEl.textContent = secsEl.textContent = '00';
            return;
        }
        daysEl.textContent  = pad(Math.floor(diff / 86400000));
        hoursEl.textContent = pad(Math.floor((diff % 86400000) / 3600000));
        minsEl.textContent  = pad(Math.floor((diff % 3600000)  / 60000));
        secsEl.textContent  = pad(Math.floor((diff % 60000)    / 1000));
    }

    update();
    setInterval(update, 1000);
})();

/* ─── 9. PARALLAX (hero bg) ─────────────────────────────────── */
(function initParallax() {
    const heroBg = document.getElementById('hero-bg');
    if (!heroBg) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    window.addEventListener('scroll', () => {
        const y = window.scrollY;
        heroBg.style.transform = `scale(1.05) translateY(${y * 0.25}px)`;
    }, { passive: true });
})();

/* ─── 10. SLIDERS ────────────────────────────────────────────── */
const SLIDERS = {};

function initSlider(id, trackId, dotsId, slidesPerView) {
    const track = document.getElementById(trackId);
    const dotsContainer = document.getElementById(dotsId);
    if (!track) return;

    const slides = track.querySelectorAll('.slide');
    const total  = slides.length;
    if (total === 0) return;

    // Responsive: recalculate per view on resize
    function getPerView() {
        if (window.innerWidth >= 1024) return Math.min(slidesPerView, total);
        if (window.innerWidth >= 640)  return Math.min(2, total);
        return 1;
    }

    let current = 0;
    let perView  = getPerView();
    let autoplay = null;

    function setSlideWidths() {
        perView = getPerView();
        const pct = (100 / perView) + '%';
        slides.forEach(s => { s.style.width = pct; });
    }

    function updateDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        const numDots = Math.ceil(total / perView);
        for (let i = 0; i < numDots; i++) {
            const btn = document.createElement('button');
            btn.className = 'slider-dot' + (i === Math.floor(current / perView) ? ' active' : '');
            btn.addEventListener('click', () => goTo(i * perView));
            dotsContainer.appendChild(btn);
        }
    }

    function goTo(index) {
        perView = getPerView();
        const maxIndex = Math.max(0, total - perView);
        current = Math.max(0, Math.min(index, maxIndex));
        const pct = (100 / perView) * current;
        track.style.transform = `translateX(-${pct}%)`;
        updateDots();
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    function startAutoplay() {
        stopAutoplay();
        autoplay = setInterval(next, 4000);
    }

    function stopAutoplay() {
        if (autoplay) { clearInterval(autoplay); autoplay = null; }
    }

    // Touch swipe
    let touchStartX = 0;
    track.parentElement.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; stopAutoplay(); }, { passive: true });
    track.parentElement.addEventListener('touchend',   e => {
        const dx = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(dx) > 50) { dx > 0 ? next() : prev(); }
        startAutoplay();
    });
    track.parentElement.addEventListener('mouseenter', stopAutoplay);
    track.parentElement.addEventListener('mouseleave', startAutoplay);

    window.addEventListener('resize', () => {
        setSlideWidths();
        goTo(0);
    });

    setSlideWidths();
    goTo(0);
    startAutoplay();

    SLIDERS[id] = { next, prev, goTo };
}

function sliderNext(id) { SLIDERS[id] && SLIDERS[id].next(); }
function sliderPrev(id) { SLIDERS[id] && SLIDERS[id].prev(); }

// Initialize all three sliders
document.addEventListener('DOMContentLoaded', () => {
    initSlider('tribus',  'track-tribus',  'dots-tribus',  3);
    initSlider('opening', 'track-opening', 'dots-opening', 3);
    initSlider('beach-s', 'track-beach',   'dots-beach-s', 4);
});

/* ─── 11. BACK TO TOP ────────────────────────────────────────── */
(function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    }, { passive: true });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();

/* ─── 12. ACTIVE NAV LINK ────────────────────────────────────── */
(function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const id = entry.target.id;
            navLinks.forEach(link => {
                const isActive = link.getAttribute('href') === '#' + id;
                link.style.color = isActive ? '#f97316' : '';
                link.style.fontWeight = isActive ? '700' : '';
            });
        });
    }, { threshold: 0.4 });

    sections.forEach(s => observer.observe(s));
})();

/* ─── 13. HERO PARALLAX GLOW ─────────────────────────────────── */
(function initGlowFollow() {
    const hero = document.getElementById('hero');
    if (!hero) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    hero.addEventListener('mousemove', e => {
        const rect = hero.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width)  * 100;
        const y = ((e.clientY - rect.top)  / rect.height) * 100;
        hero.style.setProperty('--glow-x', x + '%');
        hero.style.setProperty('--glow-y', y + '%');
    });
})();

/* ─── 14. IMAGE LAZY LOADING ─────────────────────────────────── */
(function initLazyLoad() {
    if (!('IntersectionObserver' in window)) return;
    const imgs = document.querySelectorAll('img[data-src]');
    if (!imgs.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
        });
    }, { rootMargin: '200px' });

    imgs.forEach(img => observer.observe(img));
})();

/* ─── 15. SPEAKER PHOTO SHOW/HIDE ────────────────────────────── */
(function fixSpeakerPlaceholders() {
    document.querySelectorAll('.speaker-card img').forEach(img => {
        function showPhoto() {
            img.style.display = 'block';
            const ph = img.closest('.relative') && img.closest('.relative').querySelector('[id^="ph-"]');
            if (ph) { ph.style.display = 'none'; }
        }
        function showPlaceholder() {
            img.style.display = 'none';
            const ph = img.closest('.relative') && img.closest('.relative').querySelector('[id^="ph-"]');
            if (ph) { ph.style.display = 'flex'; }
        }
        img.addEventListener('load',  showPhoto);
        img.addEventListener('error', showPlaceholder);
        if (img.complete) { img.naturalWidth > 0 ? showPhoto() : showPlaceholder(); }
    });
})();

/* ─── 16. GLOW EFFECTS ON HOVER ──────────────────────────────── */
(function initCardGlow() {
    document.querySelectorAll('.glass-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(124,58,237,0.12), rgba(255,255,255,0.05) 60%)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.background = '';
        });
    });
})();

/* ─── 17. ANIMATED TEXT ENTRANCE ─────────────────────────────── */
(function heroTextAnimation() {
    // Stagger on load: already handled by CSS reveal-up + animation-delay in HTML
    // Extra: add typing effect to effusion title after loader hides
    setTimeout(() => {
        const effusionEl = document.querySelector('.effusion-text');
        if (!effusionEl) return;
        effusionEl.style.letterSpacing = '0.25em';
        effusionEl.style.transition = 'letter-spacing 1.5s ease';
        setTimeout(() => {
            effusionEl.style.letterSpacing = '0.08em';
        }, 200);
    }, 2000);
})();

/* ─── 18. PROGRAM CARD HOVER ─────────────────────────────────── */
(function initProgramHover() {
    document.querySelectorAll('.prog-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-4px) scale(1.01)';
            card.style.transition = 'transform 0.3s ease';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
})();

/* ─── 19. FOOTER SOCIAL GLOW ─────────────────────────────────── */
(function initSocialGlow() {
    const socialColors = {
        'fa-facebook-f': '#1877f2',
        'fa-instagram':  '#e1306c',
        'fa-tiktok':     '#ff0050',
        'fa-youtube':    '#ff0000',
    };

    document.querySelectorAll('.footer-social').forEach(btn => {
        const icon = btn.querySelector('i');
        if (!icon) return;
        const cls = Array.from(icon.classList).find(c => c.startsWith('fa-'));
        const color = socialColors[cls] || '#7c3aed';
        btn.addEventListener('mouseenter', () => {
            btn.style.boxShadow = `0 0 20px ${color}66`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.boxShadow = '';
        });
    });
})();

/* ─── 20. SECTION BADGE GLOW ─────────────────────────────────── */
(function animateBadges() {
    document.querySelectorAll('.section-badge, .beach-badge-section').forEach((badge, i) => {
        setTimeout(() => {
            badge.style.boxShadow = '0 0 20px rgba(124,58,237,0.4)';
            badge.style.transition = 'box-shadow 0.5s';
        }, i * 200);
    });
})();

console.log('%c ERN 2026 – EFFUSION %c L\'Esprit Pour le Réveil des Nations ',
    'background:#7c3aed;color:white;font-weight:bold;padding:4px 8px;border-radius:4px 0 0 4px;',
    'background:#f97316;color:white;font-weight:bold;padding:4px 8px;border-radius:0 4px 4px 0;'
);

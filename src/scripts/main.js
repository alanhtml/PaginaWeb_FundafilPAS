/* ════════════════════════════════════════════════════════
   FUNDACIÓN COMPASYON — MAIN JS
   - Navbar scroll effect & active link
   - Mobile menu toggle
   - Projects carousel with dots
   - Scroll-to-top button
   - Scroll reveal animations
════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── NAVBAR: scroll effect ─────────────────────────── */
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 20
      ? '0 5px 30px rgba(0,0,0,.35)'
      : '0 5px 20px rgba(0,0,0,.25)';
  }, { passive: true });

  /* ─── NAVBAR: active link on scroll ─────────────────── */
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.navbar__nav .nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const active = document.querySelector(`.navbar__nav .nav-link[href="#${entry.target.id}"]`);
        if (active) {
          navLinks.forEach(l => l.classList.remove('active'));
          active.classList.add('active');
        }
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));

  /* ─── MOBILE MENU ────────────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open);
    mobileMenu.classList.toggle('open', open);
    mobileMenu.setAttribute('aria-hidden', !open);
  });

  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
      mobileMenu.classList.remove('open');
      mobileMenu.setAttribute('aria-hidden', true);
    });
  });

  /* ─── PROJECTS CAROUSEL ──────────────────────────────── */
  const track      = document.getElementById('projects-track');
  const dotsWrap   = document.getElementById('carousel-dots');
  const btnPrev    = document.getElementById('carousel-prev');
  const btnNext    = document.getElementById('carousel-next');

  if (track) {
    const cards      = Array.from(track.children);
    const total      = cards.length;
    let current      = 0;

    // Calculate how many cards visible at once based on viewport
    function getVisible() {
      if (window.innerWidth <= 640) return 1;
      if (window.innerWidth <= 900) return 2;
      return 3;
    }

    function maxIndex() {
      return Math.max(0, total - getVisible());
    }

    // Build dots
    function buildDots() {
      dotsWrap.innerHTML = '';
      const count = maxIndex() + 1;
      for (let i = 0; i < count; i++) {
        const btn = document.createElement('button');
        btn.className = 'carousel-dot' + (i === current ? ' active' : '');
        btn.setAttribute('aria-label', `Ir al proyecto ${i + 1}`);
        btn.addEventListener('click', () => goTo(i));
        dotsWrap.appendChild(btn);
      }
    }

    function updateDots() {
      dotsWrap.querySelectorAll('.carousel-dot').forEach((d, i) => {
        d.classList.toggle('active', i === current);
      });
    }

    function goTo(index) {
      current = Math.max(0, Math.min(index, maxIndex()));
      const cardWidth = cards[0].offsetWidth;
      const gap = 32;
      track.style.transform = `translateX(-${current * (cardWidth + gap)}px)`;
      updateDots();
    }

    btnPrev.addEventListener('click', () => goTo(current - 1));
    btnNext.addEventListener('click', () => goTo(current + 1));

    // Keyboard navigation
    track.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') goTo(current - 1);
      if (e.key === 'ArrowRight') goTo(current + 1);
    });

    // Touch / swipe
    let startX = 0;
    track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
    });

    // Auto-play every 5s
    let autoplay = setInterval(() => {
      goTo(current >= maxIndex() ? 0 : current + 1);
    }, 5000);

    // Pause on hover/focus
    const wrapper = document.querySelector('.projects__carousel-wrapper');
    wrapper.addEventListener('mouseenter', () => clearInterval(autoplay));
    wrapper.addEventListener('mouseleave', () => {
      autoplay = setInterval(() => {
        goTo(current >= maxIndex() ? 0 : current + 1);
      }, 5000);
    });

    buildDots();
    goTo(0);

    // Rebuild on resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        buildDots();
        goTo(Math.min(current, maxIndex()));
      }, 200);
    });
  }

  /* ─── SCROLL-TO-TOP ──────────────────────────────────── */
  const scrollTopBtn = document.getElementById('scroll-top');

  window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ─── SCROLL REVEAL ANIMATIONS ───────────────────────── */
  // Add data-reveal attributes dynamically to key elements
  const revealTargets = [
    { sel: '.stats__item',        delay: true },
    { sel: '.programs__item',     delay: true },
    { sel: '.allies__item',       delay: true },
    { sel: '.section-title',      delay: false },
    { sel: '.about__text-col',    delay: false },
    { sel: '.about__image-col',   delay: false },
    { sel: '.support__card',      delay: true },
    { sel: '.project-card',       delay: true },
    { sel: '.impact-stories__text', delay: false },
  ];

  revealTargets.forEach(({ sel, delay }) => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.setAttribute('data-reveal', '');
      if (delay) el.setAttribute('data-reveal-delay', Math.min(i + 1, 4));
    });
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

});

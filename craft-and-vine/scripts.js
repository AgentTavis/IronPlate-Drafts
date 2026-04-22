/* Oak Ridge Craft & Vine — Shared JS */
(function () {
  'use strict';

  // ---------- Scroll progress bar ----------
  const progressBar = document.querySelector('.scroll-progress');
  const updateProgress = () => {
    if (!progressBar) return;
    const h = document.documentElement;
    const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
    progressBar.style.width = (scrolled * 100) + '%';
  };

  // ---------- Nav scroll state + back-to-top + hero parallax ----------
  const nav = document.querySelector('.nav');
  const toTop = document.querySelector('.to-top');
  const heroBg = document.querySelector('.hero-bg');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const onScroll = () => {
    const y = window.scrollY;
    if (nav) nav.classList.toggle('scrolled', y > 12);
    if (toTop) toTop.classList.toggle('show', y > 480);
    if (heroBg && !prefersReducedMotion && y < window.innerHeight) {
      heroBg.style.transform = `translate3d(0, ${y * 0.35}px, 0)`;
    }
    updateProgress();
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---------- Hero intro fade-up (stagger) ----------
  const heroInner = document.querySelector('.hero-inner');
  if (heroInner) {
    requestAnimationFrame(() => {
      // double-RAF so initial styles commit before the class triggers transition
      requestAnimationFrame(() => heroInner.classList.add('in'));
    });
  }

  if (toTop) {
    toTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---------- Mobile menu ----------
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // ---------- Scroll reveal (IntersectionObserver) ----------
  const revealables = document.querySelectorAll('.reveal, .reveal-stagger');
  if ('IntersectionObserver' in window && revealables.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealables.forEach(el => io.observe(el));
  } else {
    revealables.forEach(el => el.classList.add('in'));
  }

  // ---------- Counter animation ----------
  const counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && counters.length) {
    const countIo = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-count'));
        const suffix = el.getAttribute('data-suffix') || '';
        const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
        const duration = 1400;
        const start = performance.now();
        const tick = (now) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          const v = target * eased;
          el.textContent = v.toFixed(decimals) + suffix;
          if (t < 1) requestAnimationFrame(tick);
          else el.textContent = target.toFixed(decimals) + suffix;
        };
        requestAnimationFrame(tick);
        countIo.unobserve(el);
      });
    }, { threshold: 0.4 });
    counters.forEach(c => countIo.observe(c));
  }

  // ---------- Tabs (drinks) ----------
  document.querySelectorAll('[data-tabs]').forEach(tabRoot => {
    const buttons = tabRoot.querySelectorAll('[data-tab]');
    const panelRoot = document.querySelector(tabRoot.getAttribute('data-tabs-target'));
    if (!panelRoot) return;
    const panels = panelRoot.querySelectorAll('[data-panel]');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-tab');
        buttons.forEach(b => b.classList.toggle('active', b === btn));
        panels.forEach(p => p.classList.toggle('active', p.getAttribute('data-panel') === target));
      });
    });
  });

  // ---------- Today's hours highlight ----------
  const hoursList = document.querySelector('.hours-list');
  if (hoursList) {
    const dayIdx = new Date().getDay(); // 0 = Sunday
    const rows = hoursList.querySelectorAll('.hours-row');
    rows.forEach(r => {
      if (parseInt(r.getAttribute('data-day'), 10) === dayIdx) {
        r.classList.add('today');
      }
    });
  }

  // ---------- Smooth anchor scroll (accounting for sticky nav) ----------
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length <= 1) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const navH = document.querySelector('.nav')?.offsetHeight || 0;
      const top = target.getBoundingClientRect().top + window.scrollY - navH - 12;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ---------- Contact form (no backend — friendly UX) ----------
  const form = document.querySelector('.js-contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = form.querySelector('.form-status');
      if (status) {
        status.textContent = 'Thanks — we got your message. We\'ll get back within a day or two.';
        status.style.color = 'var(--wine)';
      }
      form.reset();
    });
  }
})();

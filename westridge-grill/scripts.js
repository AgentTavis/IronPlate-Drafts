/* ==========================================================================
   Westridge Grill — Shared Scripts
   ========================================================================== */

(function () {
  'use strict';

  // ---------- Nav: scroll + toggle ----------
  const nav = document.querySelector('.nav');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 24) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');

    // Scroll progress
    const bar = document.querySelector('.scroll-progress');
    if (bar) {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      const pct = total > 0 ? (h.scrollTop / total) * 100 : 0;
      bar.style.width = pct + '%';
    }

    // Back-to-top
    const topBtn = document.querySelector('.back-top');
    if (topBtn) {
      if (window.scrollY > 480) topBtn.classList.add('visible');
      else topBtn.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    // Close mobile nav on link click
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        if (navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      });
    });
  }

  // ---------- Reveal on scroll ----------
  const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  // ---------- Count-up counters ----------
  const counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && counters.length) {
    const animate = (el) => {
      const target = parseFloat(el.dataset.count);
      const duration = parseInt(el.dataset.duration || '1600', 10);
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';
      const decimals = parseInt(el.dataset.decimals || '0', 10);
      const start = performance.now();

      function tick(now) {
        const t = Math.min(1, (now - start) / duration);
        // ease-out cubic
        const eased = 1 - Math.pow(1 - t, 3);
        const val = target * eased;
        el.textContent = prefix + val.toFixed(decimals) + suffix;
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = prefix + target.toFixed(decimals) + suffix;
      }
      requestAnimationFrame(tick);
    };
    const cio = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animate(entry.target);
          cio.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(el => cio.observe(el));
  }

  // ---------- Menu tabs ----------
  const tabs = document.querySelectorAll('.menu-tab');
  const sections = document.querySelectorAll('.menu-section');

  function showSection(id) {
    sections.forEach(s => s.classList.toggle('visible', s.id === id));
    tabs.forEach(t => {
      const isActive = t.dataset.target === id;
      t.classList.toggle('active', isActive);
      if (isActive) t.setAttribute('aria-selected', 'true');
      else t.setAttribute('aria-selected', 'false');
    });
  }

  if (tabs.length && sections.length) {
    tabs.forEach(t => {
      t.addEventListener('click', () => {
        showSection(t.dataset.target);
      });
    });
    // On load: show the one matching hash, or first
    const fromHash = window.location.hash ? window.location.hash.slice(1) : null;
    const first = tabs[0].dataset.target;
    showSection(fromHash && document.getElementById(fromHash) ? fromHash : first);
  }

  // ---------- Smooth-scroll hash links ----------
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    const href = a.getAttribute('href');
    if (!href || href === '#' || href.length < 2) return;
    a.addEventListener('click', (e) => {
      const target = document.getElementById(href.slice(1));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (history.pushState) history.pushState(null, '', href);
      }
    });
  });

  // ---------- Form prevent default (non-functional, visual only) ----------
  const contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      if (btn) {
        const original = btn.innerHTML;
        btn.innerHTML = 'Thanks! We\'ll be in touch.';
        btn.style.background = 'var(--teal)';
        contactForm.reset();
        setTimeout(() => {
          btn.innerHTML = original;
          btn.style.background = '';
        }, 3200);
      }
    });
  }

  // ---------- Year in footer ----------
  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });
})();

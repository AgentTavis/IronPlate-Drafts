// ONETHIRTEEN — shared interactions

(function () {
  'use strict';

  // ---------- Nav: scroll state + mobile toggle ----------
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav__toggle');
  const links = document.querySelector('.nav__links');

  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 12);
      const progress = document.querySelector('.scroll-progress');
      if (progress) {
        const h = document.documentElement;
        const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
        progress.style.transform = 'scaleX(' + Math.max(0, Math.min(1, scrolled)) + ')';
      }
      const back = document.querySelector('.back-top');
      if (back) back.classList.toggle('show', window.scrollY > 500);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    links.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => {
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      })
    );
  }

  // ---------- Reveal animations ----------
  const revealTargets = document.querySelectorAll('.reveal, [data-stagger], [data-hero-reveal]');
  if ('IntersectionObserver' in window && revealTargets.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealTargets.forEach((el) => io.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add('is-visible'));
  }

  // ---------- Hero parallax (image scrolls slower than foreground) ----------
  const heroImg = document.querySelector('.hero__img');
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (heroImg && !prefersReducedMotion) {
    let ticking = false;
    const updateParallax = () => {
      const y = window.scrollY;
      // Cap parallax to hero section only — no work once scrolled past
      if (y > window.innerHeight * 1.2) { ticking = false; return; }
      // Move image down at 30% of scroll speed; image has ~12% headroom
      const shift = Math.min(y * 0.3, window.innerHeight * 0.1);
      heroImg.style.transform = 'translate3d(0,' + shift.toFixed(1) + 'px,0)';
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });
    updateParallax();
  }

  // ---------- Stat counters ----------
  const counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && counters.length) {
    const countIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = parseFloat(el.dataset.count);
          const decimals = parseInt(el.dataset.decimals || '0', 10);
          const suffix = el.dataset.suffix || '';
          const duration = 1600;
          const start = performance.now();
          const tick = (now) => {
            const p = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            const val = target * eased;
            el.textContent = val.toFixed(decimals) + suffix;
            if (p < 1) requestAnimationFrame(tick);
            else el.textContent = target.toFixed(decimals) + suffix;
          };
          requestAnimationFrame(tick);
          countIO.unobserve(el);
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach((el) => countIO.observe(el));
  }

  // ---------- Tabs (drinks page) ----------
  const tabButtons = document.querySelectorAll('[data-tab]');
  if (tabButtons.length) {
    tabButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        tabButtons.forEach((b) => b.classList.toggle('is-active', b === btn));
        document.querySelectorAll('[data-panel]').forEach((panel) => {
          panel.classList.toggle('is-active', panel.dataset.panel === target);
        });
      });
    });
  }

  // ---------- Today's hours highlight ----------
  const todayIdx = new Date().getDay(); // 0 Sun .. 6 Sat
  const hoursRows = document.querySelectorAll('.hours-row[data-day]');
  hoursRows.forEach((row) => {
    if (parseInt(row.dataset.day, 10) === todayIdx) row.classList.add('hours-row--today');
  });

  // ---------- Smooth back-to-top ----------
  const backTop = document.querySelector('.back-top');
  if (backTop) {
    backTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---------- Form (visit page) ----------
  const form = document.querySelector('[data-contact-form]');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = form.querySelector('[data-form-status]');
      if (status) {
        status.textContent = 'Thanks — we\'ll be in touch shortly.';
        status.style.color = 'var(--color-amber)';
      }
      form.reset();
    });
  }
})();

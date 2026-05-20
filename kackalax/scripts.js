// Kackalax — shared interactions
(function () {
  'use strict';

  // Scroll progress bar
  const progress = document.querySelector('.scroll-progress');
  if (progress) {
    const update = () => {
      const h = document.documentElement;
      const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight);
      progress.style.width = Math.max(0, Math.min(1, scrolled)) * 100 + '%';
    };
    document.addEventListener('scroll', update, { passive: true });
    update();
  }

  // Mobile nav
  const hamburger = document.querySelector('.hamburger');
  const navMobile = document.querySelector('.nav-mobile');
  if (hamburger && navMobile) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      navMobile.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    navMobile.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navMobile.classList.remove('open');
      document.body.style.overflow = '';
    }));
  }

  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal, .reveal-stagger');
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('in'));
  }

  // Counter animation
  document.querySelectorAll('[data-counter]').forEach(el => {
    const target = parseFloat(el.getAttribute('data-counter'));
    const decimals = (el.getAttribute('data-decimals') || '0') | 0;
    const dur = 1400;
    let started = false;
    const start = () => {
      if (started) return; started = true;
      const t0 = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - t0) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (target * eased).toFixed(decimals);
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = target.toFixed(decimals);
      };
      requestAnimationFrame(tick);
    };
    if ('IntersectionObserver' in window) {
      const io2 = new IntersectionObserver((es) => es.forEach(e => { if (e.isIntersecting) { start(); io2.disconnect(); }}), { threshold: 0.5 });
      io2.observe(el);
    } else { start(); }
  });

  // Back to top
  const back = document.querySelector('.back-top');
  if (back) {
    const t = () => back.classList.toggle('show', window.scrollY > 600);
    document.addEventListener('scroll', t, { passive: true });
    back.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // Highlight today's hours
  const hoursGrid = document.querySelector('.hours-grid');
  if (hoursGrid) {
    const day = new Date().getDay(); // 0 Sun .. 6 Sat
    const rows = hoursGrid.querySelectorAll('[data-day]');
    rows.forEach(r => {
      if (parseInt(r.getAttribute('data-day'), 10) === day) r.classList.add('today');
    });
  }

  // Form submit (no backend) — fake success message
  document.querySelectorAll('form[data-fake-submit]').forEach(f => {
    f.addEventListener('submit', (e) => {
      e.preventDefault();
      const msg = f.querySelector('.form-msg');
      if (msg) {
        msg.textContent = "Thanks! We'll be in touch soon. For anything urgent, give us a ring at (336) 285-7371.";
        msg.style.display = 'block';
      }
      f.reset();
    });
  });
})();

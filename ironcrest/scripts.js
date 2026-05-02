(function () {
  'use strict';

  // Scroll progress bar
  const progress = document.querySelector('.scroll-progress');
  // Nav scrolled state
  const nav = document.querySelector('.nav');
  // Back to top
  const totop = document.querySelector('.totop');

  function onScroll() {
    const h = document.documentElement;
    const scrolled = h.scrollTop;
    const max = h.scrollHeight - h.clientHeight;
    const pct = max > 0 ? (scrolled / max) * 100 : 0;
    if (progress) progress.style.width = pct + '%';
    if (nav) nav.classList.toggle('scrolled', scrolled > 24);
    if (totop) totop.classList.toggle('show', scrolled > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile nav
  const ham = document.querySelector('.hamburger');
  if (ham && nav) {
    ham.addEventListener('click', () => nav.classList.toggle('open'));
    nav.querySelectorAll('.nav-links a').forEach((a) =>
      a.addEventListener('click', () => nav.classList.remove('open'))
    );
  }

  // Back to top
  if (totop) {
    totop.addEventListener('click', () =>
      window.scrollTo({ top: 0, behavior: 'smooth' })
    );
  }

  // Hero load
  const hero = document.querySelector('.hero');
  if (hero) requestAnimationFrame(() => hero.classList.add('loaded'));

  // Reveal on scroll
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  // Counter animations
  const counters = document.querySelectorAll('[data-count]');
  const cio = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseFloat(el.dataset.count);
        const dur = 1600;
        const start = performance.now();
        const suffix = el.dataset.suffix || '';
        const decimals = (target % 1 !== 0) ? 1 : 0;
        function tick(now) {
          const t = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          el.textContent = (target * eased).toFixed(decimals) + suffix;
          if (t < 1) requestAnimationFrame(tick);
          else el.textContent = target.toFixed(decimals) + suffix;
        }
        requestAnimationFrame(tick);
        cio.unobserve(el);
      });
    },
    { threshold: 0.4 }
  );
  counters.forEach((c) => cio.observe(c));

  // Form fake submit
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      if (!btn) return;
      const orig = btn.innerHTML;
      btn.innerHTML = 'Sent — We Will Be In Touch';
      btn.disabled = true;
      setTimeout(() => {
        form.reset();
        btn.innerHTML = orig;
        btn.disabled = false;
      }, 3500);
    });
  }
})();

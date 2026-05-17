(() => {
  // Scroll progress bar
  const progress = document.querySelector('.scroll-progress');
  const toTop = document.querySelector('.to-top');
  const onScroll = () => {
    const h = document.documentElement;
    const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    if (progress) progress.style.width = pct + '%';
    if (toTop) toTop.classList.toggle('show', h.scrollTop > 480);
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Back to top
  if (toTop) toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Nav drawer
  const toggle = document.querySelector('.nav-toggle');
  const drawer = document.querySelector('.nav-drawer');
  if (toggle && drawer) {
    toggle.addEventListener('click', () => {
      const open = drawer.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open);
    });
    drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      drawer.classList.remove('open'); toggle.classList.remove('open');
    }));
  }

  // Hero word reveal
  const hero = document.querySelector('.hero h1');
  if (hero) {
    const words = hero.querySelectorAll('.reveal');
    words.forEach((w, i) => {
      setTimeout(() => w.classList.add('in'), 220 + i * 130);
    });
  }

  // Scroll reveals
  const targets = document.querySelectorAll('.reveal-up');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          const delay = e.target.dataset.delay ? Number(e.target.dataset.delay) : (i * 80);
          setTimeout(() => e.target.classList.add('in'), Math.min(delay, 600));
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });
    targets.forEach(t => io.observe(t));
  } else {
    targets.forEach(t => t.classList.add('in'));
  }

  // Counter animations
  const counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && counters.length) {
    const co = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseFloat(el.dataset.count);
        const dur = 1200;
        const start = performance.now();
        const suffix = el.dataset.suffix || '';
        const isInt = Number.isInteger(target);
        const tick = (now) => {
          const t = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - t, 3);
          const v = target * eased;
          el.textContent = (isInt ? Math.round(v) : v.toFixed(1)) + suffix;
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        co.unobserve(el);
      });
    }, { threshold: 0.4 });
    counters.forEach(c => co.observe(c));
  }

  // Project filter
  const filterBtns = document.querySelectorAll('[data-filter]');
  const projects = document.querySelectorAll('[data-sector]');
  if (filterBtns.length && projects.length) {
    filterBtns.forEach(btn => btn.addEventListener('click', () => {
      const f = btn.dataset.filter;
      filterBtns.forEach(b => b.classList.toggle('active', b === btn));
      projects.forEach(p => {
        const show = f === 'all' || p.dataset.sector === f;
        p.style.display = show ? '' : 'none';
      });
    }));
  }

  // Year stamp
  const yr = document.querySelector('[data-year]');
  if (yr) yr.textContent = new Date().getFullYear();

  // Form
  const form = document.querySelector('form[data-form]');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const out = form.querySelector('.form-msg');
      if (out) out.textContent = 'Thanks. We will be in touch within one business day.';
      form.reset();
    });
  }
})();

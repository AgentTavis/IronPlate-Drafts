// Duke's Pub — shared scripts
(function(){
  'use strict';

  // Nav scrolled state
  const nav = document.querySelector('.nav');
  const onScroll = () => {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 12);
    const sp = document.querySelector('.scroll-progress');
    if (sp) {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      sp.style.width = pct + '%';
    }
    const bt = document.querySelector('.back-top');
    if (bt) bt.classList.toggle('visible', window.scrollY > 600);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Hamburger
  const burger = document.querySelector('.hamburger');
  const menu = document.querySelector('.mobile-menu');
  if (burger && menu) {
    burger.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      menu.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    }));
  }

  // IntersectionObserver reveals
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal, .reveal-stagger, .filigree, .word-reveal').forEach(el => io.observe(el));

  // Word-by-word headline reveal: split text into spans
  document.querySelectorAll('.word-reveal').forEach(el => {
    if (el.dataset.split) return;
    el.dataset.split = '1';
    const html = el.innerHTML;
    // tokenize but keep <em>...</em> and <span class="script">...</span> intact
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    const out = [];
    tmp.childNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        node.textContent.split(/(\s+)/).forEach(part => {
          if (part.trim() === '' && part.length) out.push(part);
          else if (part) out.push(`<span class="word">${part}</span>`);
        });
      } else {
        out.push(`<span class="word">${node.outerHTML}</span>`);
      }
    });
    el.innerHTML = out.join('');
  });

  // Stat counters
  const counters = document.querySelectorAll('[data-count]');
  const counterIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const dur = 1400;
      const start = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - start) / dur);
        const ease = 1 - Math.pow(1 - p, 3);
        const val = target * ease;
        el.textContent = (target % 1 === 0 ? Math.round(val) : val.toFixed(1)) + suffix;
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = (target % 1 === 0 ? Math.round(target) : target) + suffix;
      };
      requestAnimationFrame(tick);
      counterIO.unobserve(el);
    });
  }, { threshold: 0.4 });
  counters.forEach(c => counterIO.observe(c));

  // Highlight today's hours row
  const today = new Date().getDay(); // 0 = Sun
  const map = { 0:'sun', 1:'mon', 2:'tue', 3:'wed', 4:'thu', 5:'fri', 6:'sat' };
  document.querySelectorAll('.hours-row').forEach(row => {
    if (row.dataset.day === map[today]) row.classList.add('today');
  });

  // Back to top
  const bt = document.querySelector('.back-top');
  if (bt) bt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Year
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
})();

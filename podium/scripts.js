// The Podium — interactions
(() => {
  // Mobile nav
  const burger = document.querySelector('.hamburger');
  const links  = document.querySelector('.nav-links');
  if (burger && links) {
    burger.addEventListener('click', () => {
      const open = links.classList.toggle('is-open');
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', open);
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      links.classList.remove('is-open');
      burger.classList.remove('is-open');
    }));
  }

  // Scroll progress
  const bar = document.querySelector('.scroll-progress');
  if (bar) {
    const update = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      bar.style.width = max ? (h.scrollTop / max * 100) + '%' : '0';
    };
    document.addEventListener('scroll', update, { passive:true });
    update();
  }

  // Reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Counter animation
  const cIo = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const dur = 1400;
      const start = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = target >= 100 ? Math.round(target * eased) : (target * eased).toFixed(0);
        el.textContent = val + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      cIo.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(el => cIo.observe(el));

  // Back to top
  const top = document.querySelector('.to-top');
  if (top) {
    top.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));
    document.addEventListener('scroll', () => {
      top.classList.toggle('is-visible', window.scrollY > 600);
    }, { passive:true });
  }

  // Tonight banner — live day + special
  const dayEl     = document.querySelector('[data-today-day]');
  const specialEl = document.querySelector('[data-today-special]');
  const metaEl    = document.querySelector('[data-today-meta]');
  if (dayEl) {
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const now = new Date();
    const dayIdx = now.getDay();
    dayEl.textContent = days[dayIdx];
    const specials = {
      0: { t: 'Sunday Game Day', m: 'Every game on 40+ TVs. Pull up.' },
      1: { t: 'Open from kickoff', m: 'Pool tables, pinball, full kitchen.' },
      2: { t: '<em>Tuesday</em> Tacos $2', m: 'Two bucks. All night.' },
      3: { t: 'Pool & Pinball', m: 'Two tables, racing sims, Skee-Ball lanes.' },
      4: { t: 'Live Music Lineup', m: 'Check the stage. Acts roll most weekends.' },
      5: { t: '<em>Friday</em> Fish Fry', m: '12 add-ons. Dial in your plate.' },
      6: { t: 'Saturday Night Encore', m: 'Live band. Full bar. Late close.' },
    };
    const s = specials[dayIdx];
    if (specialEl) specialEl.innerHTML = s.t;
    if (metaEl) metaEl.innerHTML = '<span class="dot-live"></span>' + s.m;
  }

  // Menu page anchor highlight
  const jumps = document.querySelectorAll('.menu-jumps a');
  if (jumps.length) {
    const sections = Array.from(jumps).map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
    const setActive = () => {
      const y = window.scrollY + 180;
      let active = sections[0];
      sections.forEach(s => { if (s.offsetTop <= y) active = s; });
      jumps.forEach(j => j.classList.toggle('active', j.getAttribute('href') === '#' + active.id));
    };
    document.addEventListener('scroll', setActive, { passive:true });
    setActive();
  }

  // Word-by-word hero stagger
  document.querySelectorAll('h1 .word').forEach((w, i) => {
    w.style.animationDelay = (0.08 * i) + 's';
  });
})();

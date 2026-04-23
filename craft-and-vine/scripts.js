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
    // Use setTimeout (RAF can be throttled in background/preview contexts)
    setTimeout(() => heroInner.classList.add('in'), 30);
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

  // ---------- Contact form (no backend, friendly UX) ----------
  const form = document.querySelector('.js-contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = form.querySelector('.form-status');
      if (status) {
        status.textContent = 'Thanks, we got your message. We\'ll get back within a day or two.';
        status.style.color = 'var(--wine)';
      }
      form.reset();
    });
  }

  // =========================================================
  // ENHANCED MOTION PASS — candlelit ambient animations
  // Every effect respects prefers-reduced-motion
  // =========================================================

  const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;

  // ---------- Word-by-word h1 reveal (hero + all page banners) ----------
  // Wraps each word in the main h1 in a span with a staggered fade-up.
  const primaryH1 = document.querySelector('.hero-headline, .page-banner h1');
  const heroHeadline = primaryH1;
  if (heroHeadline && !prefersReducedMotion) {
    const wrapWords = (node) => {
      // Walk child nodes, replacing text with word-spans (preserves inline tags like <em>)
      const children = Array.from(node.childNodes);
      children.forEach(child => {
        if (child.nodeType === 3) { // text
          const frag = document.createDocumentFragment();
          const parts = child.textContent.split(/(\s+)/);
          parts.forEach(part => {
            if (/^\s+$/.test(part)) {
              frag.appendChild(document.createTextNode(part));
            } else if (part.length) {
              const span = document.createElement('span');
              span.className = 'word';
              span.textContent = part;
              frag.appendChild(span);
            }
          });
          node.replaceChild(frag, child);
        } else if (child.nodeType === 1) { // element
          // Preserve element but wrap its inner text words too
          wrapWords(child);
          child.classList.add('word-group');
        }
      });
    };
    wrapWords(heroHeadline);
    const words = heroHeadline.querySelectorAll('.word');
    words.forEach((w, i) => {
      w.style.transitionDelay = (80 + i * 110) + 'ms';
      // Italic script word gets extra beat of delay + a touch of scale-in
      if (w.closest('.script-em, em, .script')) {
        w.classList.add('word--script');
        w.style.transitionDelay = (80 + i * 110 + 220) + 'ms';
      }
    });
    // setTimeout is more reliable than RAF in background/preview contexts
    setTimeout(() => heroHeadline.classList.add('words-in'), 30);
  }

  // ---------- Headline hairline draw-in on scroll ----------
  // Any h2 inside .section--cream, .section--dark, .page-hero, .home-section
  // gets a brass hairline under it that animates in when visible.
  const headlineTargets = document.querySelectorAll(
    '.home-section h2, .what-we-are h2, .drinks-preview h2, .live-music-wine h2, .visit-us h2, ' +
    '.page-hero h1, .page-header h1, section h2.display-huge, section h2.display-serif, section h2.display-candle'
  );
  if ('IntersectionObserver' in window) {
    const headlineIo = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('hairline-drawn');
          headlineIo.unobserve(entry.target);
        }
      });
    }, { threshold: 0.35, rootMargin: '0px 0px -80px 0px' });
    headlineTargets.forEach(h => {
      h.classList.add('js-hairline');
      headlineIo.observe(h);
    });
  }

  // ---------- Cursor candlelight spotlight on dark sections ----------
  // A soft amber radial follows the cursor on .section--dark / .live-music-wine.
  // Desktop pointers only; respects reduced-motion.
  const darkSections = document.querySelectorAll(
    '.section--dark, .live-music-wine, body:not(.home) .page-hero, ' +
    '.drinks-page .page-hero, .events-page .page-hero, .visit-page .page-hero'
  );
  if (darkSections.length && !prefersReducedMotion && !isCoarsePointer) {
    darkSections.forEach(sec => {
      sec.classList.add('candle-spotlight');
      let raf = 0, tx = 0.5, ty = 0.5;
      const move = (e) => {
        const rect = sec.getBoundingClientRect();
        tx = (e.clientX - rect.left) / rect.width;
        ty = (e.clientY - rect.top) / rect.height;
        if (!raf) raf = requestAnimationFrame(() => {
          sec.style.setProperty('--spot-x', (tx * 100) + '%');
          sec.style.setProperty('--spot-y', (ty * 100) + '%');
          raf = 0;
        });
      };
      const enter = () => sec.classList.add('spot-active');
      const leave = () => sec.classList.remove('spot-active');
      sec.addEventListener('mousemove', move);
      sec.addEventListener('mouseenter', enter);
      sec.addEventListener('mouseleave', leave);
    });
  }

  // ---------- Magnetic primary CTA on hover ----------
  // Button translates slightly toward cursor (max 4px each axis).
  const magneticBtns = document.querySelectorAll(
    '.hero-cta, .btn-elegant--primary, .btn-candle-primary, .btn.btn-primary'
  );
  if (magneticBtns.length && !prefersReducedMotion && !isCoarsePointer) {
    magneticBtns.forEach(btn => {
      let raf = 0;
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        const dx = ((e.clientX - r.left) / r.width - 0.5) * 8;
        const dy = ((e.clientY - r.top) / r.height - 0.5) * 6;
        if (!raf) raf = requestAnimationFrame(() => {
          btn.style.setProperty('--mag-x', dx.toFixed(2) + 'px');
          btn.style.setProperty('--mag-y', dy.toFixed(2) + 'px');
          raf = 0;
        });
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.setProperty('--mag-x', '0px');
        btn.style.setProperty('--mag-y', '0px');
      });
    });
  }

  // ---------- Image blur-up reveal ----------
  // Applies to figures/images in hero, image-pair, poster, page-hero-visual, story images.
  const blurables = document.querySelectorAll(
    '.image-pair__main, .image-pair__inset, .poster, .page-hero-visual, ' +
    '.story-img, .about-hero-img, .hero-bg, .image-brass'
  );
  if (blurables.length && 'IntersectionObserver' in window) {
    const blurIo = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('img-in');
          blurIo.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
    blurables.forEach(el => {
      el.classList.add('img-blur-up');
      blurIo.observe(el);
    });
  }

  // ---------- Auto-count numeric stats (banner-stats, hero-stats-line) ----------
  // Finds leading numeric patterns in stat spans and transforms them
  // into animated counters without modifying source HTML.
  const autoCountContainers = document.querySelectorAll('.banner-stats, .hero-stats-line, .review-footer');
  autoCountContainers.forEach(container => {
    const spans = container.querySelectorAll(':scope > span, :scope .stars');
    spans.forEach(span => {
      if (span.classList.contains('dot')) return;
      if (span.querySelector('[data-count]')) return;
      const text = span.textContent.trim();
      // Match leading number (int or decimal) + optional + sign, optionally followed by space and rest
      const m = text.match(/^(\d+(?:\.\d+)?)([+]?)(\s*[★]?)(\s*.*)$/);
      if (!m) return;
      const numStr = m[1];
      const plus = m[2] || '';
      const starPart = m[3] || '';
      const rest = m[4] || '';
      const numeric = parseFloat(numStr);
      if (isNaN(numeric) || numeric < 2) return;
      const decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0;
      const suffix = (plus + starPart).trim();
      const numSpan = document.createElement('span');
      numSpan.className = 'count-num';
      numSpan.setAttribute('data-count', numStr);
      numSpan.setAttribute('data-decimals', decimals);
      if (suffix) numSpan.setAttribute('data-suffix', suffix.startsWith('+') ? '+' : (suffix || ''));
      numSpan.textContent = '0' + (decimals ? '.' + '0'.repeat(decimals) : '') + (suffix.startsWith('+') ? '+' : '');
      span.innerHTML = '';
      span.appendChild(numSpan);
      if (starPart.includes('★')) {
        const starSpan = document.createElement('span');
        starSpan.textContent = ' ★';
        starSpan.className = 'count-star';
        span.appendChild(starSpan);
      }
      if (rest.trim()) {
        span.appendChild(document.createTextNode(' ' + rest.trim()));
      }
    });
  });
  // Re-observe any newly-created [data-count] elements
  if ('IntersectionObserver' in window) {
    const newCounters = document.querySelectorAll('.count-num[data-count]');
    if (newCounters.length) {
      const reIo = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = parseFloat(el.getAttribute('data-count'));
          const suffix = el.getAttribute('data-suffix') || '';
          const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
          const duration = 1500;
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
          reIo.unobserve(el);
        });
      }, { threshold: 0.4 });
      newCounters.forEach(c => reIo.observe(c));
    }
  }

  // ---------- Page-load cream overlay fade ----------
  if (!prefersReducedMotion) {
    const overlay = document.createElement('div');
    overlay.className = 'page-load-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    document.body.appendChild(overlay);
    setTimeout(() => overlay.classList.add('is-hidden'), 40);
    setTimeout(() => overlay.remove(), 900);
  }

  // ---------- Subtle parallax on hero stamp + home story images ----------
  const stamp = document.querySelector('.hero-stamp');
  const parallaxImgs = document.querySelectorAll(
    '.image-pair__main, .image-pair__inset, .poster img, .page-hero-visual img'
  );
  if (!prefersReducedMotion && (stamp || parallaxImgs.length)) {
    let pxScheduled = false;
    const updatePx = () => {
      const y = window.scrollY;
      if (stamp && y < window.innerHeight * 1.2) {
        stamp.style.transform = `translate3d(0, ${y * -0.08}px, 0) rotate(-4deg)`;
      }
      parallaxImgs.forEach(img => {
        const rect = img.getBoundingClientRect();
        const vh = window.innerHeight;
        if (rect.top > -rect.height && rect.top < vh) {
          const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
          const shift = progress * -18;
          img.style.transform = `translate3d(0, ${shift.toFixed(2)}px, 0)`;
        }
      });
      pxScheduled = false;
    };
    // Use rAF when available, but fall back to a short setTimeout so it still fires
    // in throttled/hidden contexts. Either way, we debounce to one call per frame.
    const schedule = () => {
      if (pxScheduled) return;
      pxScheduled = true;
      if (window.requestAnimationFrame) {
        const rafId = requestAnimationFrame(updatePx);
        setTimeout(() => { if (pxScheduled) { cancelAnimationFrame(rafId); updatePx(); } }, 120);
      } else {
        setTimeout(updatePx, 16);
      }
    };
    window.addEventListener('scroll', schedule, { passive: true });
    updatePx();
  }
})();

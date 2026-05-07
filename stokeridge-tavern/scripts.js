/* =====================================================
   STOKERIDGE TAVERN & GRILL — SHARED SCRIPTS
   Handles: nav, scroll reveals, parallax, menu tabs,
            bar tabs, open-now indicator, back-to-top,
            scroll progress, mobile nav, form validation
   ===================================================== */

/* ── MENU DATA ───────────────────────────────────── */
const M = {
  starters: [
    {name:"Cheese Quesadilla",price:"$10.99",desc:"Melted cheese in a crispy tortilla. Simple and satisfying."},
    {name:"Mozzarella Sticks",price:"$10.49",desc:"Golden-fried mozzarella with marinara."},
    {name:"Spinach Artichoke Dip",price:"$12.99",desc:"Creamy spinach and artichokes with smoky cheddar. Served with fried tortilla chips."},
    {name:"Bacon Cheese Fries",price:"$9.99",desc:"Seasoned fries loaded with bacon and melted cheese."},
    {name:"Bang-Bang Shrimp",price:"$12.49",desc:"Tender, crispy shrimp tossed in a creamy, zesty sauce on fresh greens."},
    {name:"Potato Skins",price:"$13.49",desc:"Crispy skins with melted cheddar, bacon, and sour cream."},
    {name:"Ahi Tuna",price:"$13.99",desc:"Sushi-grade ahi tuna in a sesame seed crust with soy sauce and wasabi."},
    {name:"Arbor Run Triple Threat",price:"$18.49",desc:"Choose three: mozzarella sticks, chicken rolls, wings, shrimp, potato skins, or dips."},
    {name:"Jalapeno Bacon Pimento Cheese Dip",price:"$14.99",desc:"Spicy pimento cheese with jalapenos and bacon. Served with chips."},
    {name:"Southwest Chicken Rolls",price:"$13.99",desc:"Crispy rolls stuffed with seasoned chicken and southwest flavors."},
    {name:"Fried Oysters",price:"$14.99",desc:"Hand-breaded oysters fried golden. Served with bang-bang sauce."},
    {name:"Chicken Tator-Totchos",price:"$15.49",desc:"Loaded tater tots with chicken, cheese, and all the fixings."}
  ],
  burgers: [
    {name:"Black and Blue Burger",price:"$13.99",desc:"Blackened spices with blue cheese crumbles."},
    {name:"StokeRidge Burger",price:"$14.49",desc:"American cheese, lettuce, tomato, and our signature sauce."},
    {name:"Farmer's Daughter Burger",price:"$15.99",desc:"Cheddar, fried egg, bacon, lettuce, and tomato."},
    {name:"Jalapeno Bacon Pimento Burger",price:"$15.49",desc:"Signature bacon pimento cheese and spicy mayo."},
    {name:"Carolina Classic Burger",price:"$14.49",desc:"Chili, coleslaw, mustard, onions. The real Carolina way."},
    {name:"BBQ Bacon Burger",price:"$14.49",desc:"Smoky BBQ, bacon, cheddar, lettuce, tomato."},
    {name:"Drippin' Chicken",price:"$13.99",desc:"Crispy or grilled chicken drippin' in your choice of sauce."},
    {name:"Hawaiian Chicken",price:"$14.49",desc:"Grilled chicken, pineapple, teriyaki, Swiss cheese."},
    {name:"StokeRidge Chicken",price:"$13.99",desc:"Grilled chicken with American cheese, lettuce, tomato, signature sauce."},
    {name:"Zesty Guacamole Chicken",price:"$15.49",desc:"Grilled chicken topped with fresh guacamole and zesty flavors."}
  ],
  handhelds: [
    {name:"Guaco Tacos",price:"$13.99",desc:"Three shrimp or chicken tacos with guacamole."},
    {name:"Big Phil Club",price:"$13.99",desc:"Turkey, bacon, tomato, lettuce, mayo on Texas toast."},
    {name:"Philly Cheesesteak",price:"$13.49",desc:"Steak or chicken with onions, peppers, melted provolone."},
    {name:"Reuben",price:"$12.99",desc:"Corned beef, sauerkraut, Swiss, Thousand Island on rye."},
    {name:"French Dip",price:"$12.99",desc:"Roast beef, provolone, toasted hoagie. Au jus for dipping."},
    {name:"Drippin' Shrimp Wrap",price:"$13.99",desc:"Shrimp drippin' in your choice of wing sauce."},
    {name:"Spicy Turkey Wrap",price:"$13.49",desc:"Turkey with spicy kick, lettuce, tomato, wrapped tight."},
    {name:"Buffalo Chicken Wrap",price:"$13.49",desc:"Crispy buffalo chicken, lettuce, tomato, ranch in a wrap."}
  ],
  plated: [
    {name:"Fish and Chips",price:"$15.99",desc:"Golden-battered cod, fresh-cut chips, tartar, slaw."},
    {name:"New Orleans Pasta",price:"$17.49",desc:"Spicy cream sauce, chicken, peppers, onions, mushrooms."},
    {name:"Chicken Stir-Fry",price:"$15.99",desc:"Fresh vegetables and chicken in a savory stir-fry sauce."},
    {name:"Green Pond Pasta",price:"$16.49",desc:"Creamy alfredo with your choice of protein."},
    {name:"Ribeye (10oz)",price:"$23.99",desc:"Hand-cut, grilled to perfection. 2 sides."},
    {name:"Sirloin (10oz)",price:"$19.49",desc:"Grilled to your temp. Ask for it 'Moonshined.'"},
    {name:"Rack of Ribs",price:"$24.99",desc:"Fall-off-the-bone baby backs with smoky BBQ. 2 sides."},
    {name:"Grilled Salmon",price:"$17.99",desc:"Blackened or honey bourbon glazed. 2 sides."}
  ],
  wings: [
    {name:"Boneless Wings",price:"$11.99",desc:"Crispy all-white-meat bites in your choice of sauce."},
    {name:"Jumbo Chicken Wings",price:"$15.49 / $34.99",desc:"Bone-in jumbos. A fan favorite since 2011. Half or full rack."},
    {name:"15 Signature Sauces",price:"",desc:"66 (Mild), 150 (Medium), 220 (Hot), Perdue 521 (Hot+), Buffalo Horseradish, DAH, Teriyaki, Hot Teriyaki, BBQ, Honey-Bourbon BBQ, Garlic-Parmesan, Cajun Dry Rub, Lemon-Pepper, Smokey Jones, Bang Bang."}
  ],
  salads: [
    {name:"Tha' Redneck Salad",price:"$14.99",desc:"Fried chicken, bacon, cheese, egg, croutons, ranch."},
    {name:"STG's Bang-Bang Salad",price:"$15.49",desc:"Bang-bang shrimp, greens, tomatoes, cucumbers."},
    {name:"Guilford Garden",price:"$10.99",desc:"Loaded with veggies, beans, cheese, bacon, croutons."},
    {name:"Blackened Caesar",price:"$9.99",desc:"Romaine, Caesar, Parmesan, croutons. Add protein."}
  ],
  soups: [
    {name:"Tomato Bisque",price:"$4.99 / $6.99",desc:"Slow-simmered tomatoes with herbs, garlic, cream."},
    {name:"Potato Soup",price:"$4.99 / $6.99",desc:"Creamy potatoes, bacon, cheddar, chives."},
    {name:"Chili",price:"$5.99 / $7.99",desc:"Scratch-made with beef, beans, tomatoes, bold spices."}
  ],
  sides: [
    {name:"Fried Chips",price:"",desc:"House-made, crispy, and addictive."},
    {name:"Tater Tots",price:"",desc:"Golden and crispy."},
    {name:"Seasoned Fries",price:"",desc:"Classic fries with our house seasoning."},
    {name:"Sweet Potato Fries",price:"",desc:"Lightly crispy with a touch of sweetness."},
    {name:"Mac & Cheese",price:"",desc:"Creamy, cheesy, comfort food done right."},
    {name:"Baked Potato",price:"",desc:"Loaded or plain. Your call."},
    {name:"Onion Rings",price:"",desc:"Beer-battered and golden fried."},
    {name:"Sauteed Vegetables",price:"",desc:"Fresh seasonal vegetables."},
    {name:"Broccoli",price:"",desc:"Steamed and seasoned."},
    {name:"Rice Pilaf",price:"",desc:"Fluffy and savory."}
  ],
  beverages: [
    {name:"Pepsi",price:"",desc:""},
    {name:"Diet Pepsi",price:"",desc:""},
    {name:"Dr. Pepper",price:"",desc:""},
    {name:"Diet Dr. Pepper",price:"",desc:""},
    {name:"Cheerwine",price:"",desc:""},
    {name:"Mountain Dew",price:"",desc:""},
    {name:"Starry",price:"",desc:""},
    {name:"Pink Lemonade",price:"",desc:""},
    {name:"Sweet / Unsweet Tea",price:"",desc:""},
    {name:"Coffee",price:"",desc:""},
    {name:"Milk",price:"",desc:""},
    {name:"Chocolate Milk",price:"",desc:""}
  ]
};

/* Featured items shown on home page */
const FEATURED_ITEMS = [
  {name:"Jumbo Chicken Wings",price:"$15.49 / $34.99",desc:"Bone-in jumbos. A fan favorite since 2011."},
  {name:"Ribeye (10oz)",price:"$23.99",desc:"Hand-cut, grilled to perfection. 2 sides."},
  {name:"StokeRidge Burger",price:"$14.49",desc:"American cheese, lettuce, tomato, signature sauce."},
  {name:"Bang-Bang Shrimp",price:"$12.49",desc:"Crispy shrimp in creamy, zesty sauce on fresh greens."},
  {name:"Rack of Ribs",price:"$24.99",desc:"Fall-off-the-bone baby backs with smoky BBQ. 2 sides."},
  {name:"Grilled Salmon",price:"$17.99",desc:"Blackened or honey bourbon glazed. 2 sides."},
  {name:"Spinach Artichoke Dip",price:"$12.99",desc:"Creamy spinach and artichokes with smoky cheddar."},
  {name:"Tha' Redneck Salad",price:"$14.99",desc:"Fried chicken, bacon, cheese, egg, croutons, ranch."}
];

/* ── MENU TAB SWITCHER ───────────────────────────── */
function showCat(c, b) {
  const g = document.getElementById('menuGrid');
  if (!g) return;
  g.classList.add('switching');
  setTimeout(() => {
    g.innerHTML = (M[c] || []).map((i, idx) =>
      `<div class="menu-item" style="animation-delay:${idx * 0.04}s">
         <div class="menu-item-header">
           <span class="menu-item-name">${i.name}</span>
           ${i.price ? `<span class="menu-item-leader"></span><span class="menu-item-price">${i.price}</span>` : ''}
         </div>
         ${i.desc ? `<p class="menu-item-desc">${i.desc}</p>` : ''}
       </div>`
    ).join('');
    g.classList.remove('switching');
  }, 200);
  document.querySelectorAll('.menu-cat-btn').forEach(x => x.classList.remove('active'));
  if (b) b.classList.add('active');
}

/* Render featured items for home page */
function renderFeatured() {
  const g = document.getElementById('featuredGrid');
  if (!g) return;
  g.innerHTML = FEATURED_ITEMS.map((i, idx) =>
    `<div class="menu-item reveal" style="animation-delay:${idx * 0.05}s">
       <div class="menu-item-header">
         <span class="menu-item-name">${i.name}</span>
         ${i.price ? `<span class="menu-item-leader"></span><span class="menu-item-price">${i.price}</span>` : ''}
       </div>
       <p class="menu-item-desc">${i.desc}</p>
     </div>`
  ).join('');
}

/* ── BAR DATA & TAB SWITCHER ─────────────────────── */
const BAR = {
  bourbon: [
    {name:"Blanton's",detail:"93 Proof",price:"$16.50"},
    {name:"Eagle Rare 10Y",detail:"90 Proof",price:"$14.50"},
    {name:"E.H. Taylor BP",detail:"130 Proof",price:"$18.50"},
    {name:"Stagg Jr.",detail:"130 Proof",price:"$20.50"},
    {name:"Weller 12Y",detail:"90 Proof",price:"$18.50"},
    {name:"Elijah Craig 18Y",detail:"90 Proof",price:"$24.50"},
    {name:"Old Fitzgerald 10Y",detail:"100 Proof",price:"$34.50"},
    {name:"Woodford Reserve",detail:"90.4 Proof",price:"$9.50"}
  ],
  tequila: [
    {name:"Clase Azul Reposado",detail:"Reposado",price:"$28.50"},
    {name:"Don Julio 1942",detail:"Anejo",price:"$24.50"},
    {name:"Casamigos Blanco",detail:"Blanco",price:"$12.50"},
    {name:"Patron Silver",detail:"Blanco",price:"$10.50"},
    {name:"Herradura Ultra",detail:"Anejo",price:"$14.50"},
    {name:"Espolon Reposado",detail:"Reposado",price:"$8.50"},
    {name:"Codigo 1530 Rosa",detail:"Rosa Blanco",price:"$12.50"},
    {name:"Teremana Blanco",detail:"Blanco",price:"$8.50"}
  ],
  drafts: [
    {name:"Michelob Ultra",detail:"Domestic",price:""},
    {name:"Miller Lite",detail:"Domestic",price:""},
    {name:"Modelo Especial",detail:"Import",price:""},
    {name:"Mango Cart",detail:"Wheat Ale",price:""},
    {name:"Wicked Weed Pernicious",detail:"IPA \u2022 Asheville, NC",price:""},
    {name:"Wise Man Mountain Calling",detail:"IPA \u2022 Winston-Salem, NC",price:""},
    {name:"Red Oak",detail:"Amber Lager \u2022 Whitsett, NC",price:""},
    {name:"Bold Rock Cider",detail:"Seasonal",price:""},
    {name:"Down East Cider",detail:"Seasonal",price:""},
    {name:"Legion Juice Jay",detail:"Hazy IPA \u2022 Charlotte, NC",price:""}
  ]
};

const BAR_IMAGES = {
  bourbon: "PHOTO NEEDED: Full bourbon shelf. Show all 50+ bottles lined up on the backbar shelves. Wide enough to see the depth of the collection. Warm lighting.",
  tequila: "PHOTO NEEDED: Tequila collection display. Show the tequila bottles -- Clase Azul, Don Julio 1942, and the rest. Should feel premium and curated.",
  drafts:  "PHOTO NEEDED: Draft tap handles in a row. Show the tap setup with multiple handles. Maybe a fresh pour in progress. Should convey variety and freshness."
};

function showBar(cat, btn) {
  const grid = document.getElementById('barGrid');
  if (!grid) return;
  grid.innerHTML = (BAR[cat] || []).map((item, idx) =>
    `<div class="bourbon-card" style="animation: menuItemIn 0.45s ${idx * 0.05}s forwards; opacity:0;">
       <div class="bourbon-name">${item.name}</div>
       <div class="bourbon-detail">${item.detail}</div>
       ${item.price ? `<div class="bourbon-price">${item.price}</div>` : ''}
     </div>`
  ).join('');
  const imgArea = document.getElementById('barImage');
  if (imgArea) {
    imgArea.innerHTML = `<div class="img-placeholder" style="height:100%"><span class="ph-label">Photo Coming Soon</span>${BAR_IMAGES[cat] || ''}</div>`;
  }
  btn.parentElement.querySelectorAll('.menu-cat-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

/* ── MOBILE NAV ──────────────────────────────────── */
function toggleMobileNav() {
  const nav = document.getElementById('mainNav');
  const l = document.getElementById('navLeft');
  const r = document.getElementById('navRight');
  const btn = document.querySelector('.mobile-toggle');
  if (nav) nav.classList.toggle('menu-open');
  if (l) l.classList.toggle('open');
  if (r) r.classList.toggle('open');
  if (btn) btn.classList.toggle('open');
  // Update aria-expanded for accessibility
  if (btn) btn.setAttribute('aria-expanded', btn.classList.contains('open') ? 'true' : 'false');
}

function initMobileNavClose() {
  document.querySelectorAll('.nav-left a, .nav-right a').forEach(link => {
    link.addEventListener('click', () => {
      const nav = document.getElementById('mainNav');
      const l = document.getElementById('navLeft');
      const r = document.getElementById('navRight');
      const btn = document.querySelector('.mobile-toggle');
      if (nav) nav.classList.remove('menu-open');
      if (l) l.classList.remove('open');
      if (r) r.classList.remove('open');
      if (btn) {
        btn.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

/* ── SCROLL REVEAL ───────────────────────────────── */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .quote-break, .divider, .img-cell');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });
  revealElements.forEach(el => observer.observe(el));
}

/* ── PARALLAX ON QUOTE BREAKS ────────────────────── */
function initParallax() {
  const parallaxSections = document.querySelectorAll('[data-parallax]');
  if (!parallaxSections.length) return;

  function updateParallax() {
    const scrollY = window.scrollY;
    const windowH = window.innerHeight;

    parallaxSections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < windowH) {
        const centerOffset = (rect.top + rect.height / 2 - windowH / 2) / windowH;
        const shift = centerOffset * -40;
        const bg = section.querySelector('.img-placeholder, img');
        if (bg) {
          bg.style.transform = `translateY(${shift}px) scale(1.1)`;
        }
      }
    });

    requestAnimationFrame(updateParallax);
  }

  if (window.innerWidth > 768) {
    requestAnimationFrame(updateParallax);
  }
}

/* ── NAV COMPACT ON SCROLL ───────────────────────── */
function initNavShadow() {
  const nav = document.getElementById('mainNav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 120) nav.classList.add('nav-compact');
    else nav.classList.remove('nav-compact');
  }, { passive: true });
}

/* ── SCROLL PROGRESS BAR ─────────────────────────── */
function initScrollProgress() {
  const bar = document.querySelector('.scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    bar.style.width = scrolled + '%';
  }, { passive: true });
}

/* ── BACK TO TOP ─────────────────────────────────── */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) btn.classList.add('show');
    else btn.classList.remove('show');
  }, { passive: true });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ── OPEN-NOW INDICATOR ──────────────────────────── */
/* Hours in local time:
   Mon-Thu 11-22, Fri-Sat 11-23, Sun 12-20 */
const HOURS = [
  { open: 12, close: 20 }, // Sun
  { open: 11, close: 22 }, // Mon
  { open: 11, close: 22 }, // Tue
  { open: 11, close: 22 }, // Wed
  { open: 11, close: 22 }, // Thu
  { open: 11, close: 23 }, // Fri
  { open: 11, close: 23 }  // Sat
];

function initOpenNow() {
  const indicator = document.querySelector('.open-indicator');
  const rows = document.querySelectorAll('.hours-table tr');
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours() + now.getMinutes() / 60;
  const today = HOURS[day];
  const isOpen = hour >= today.open && hour < today.close;

  if (indicator) {
    indicator.classList.toggle('is-open', isOpen);
    const label = indicator.querySelector('.label');
    if (label) label.textContent = isOpen ? "We're open now" : "We're closed";
  }

  // Mon=1..Sun=0; table rows start at Monday
  const tableIdx = day === 0 ? 6 : day - 1;
  if (rows.length >= 7) {
    rows[tableIdx].classList.add('today');
  }
}

/* ── COUNT-UP ANIMATION ON STATS ─────────────────── */
function initCountUp() {
  const nums = document.querySelectorAll('[data-count]');
  if (!nums.length) return;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const animate = (el) => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const duration = 1600;
    const start = performance.now();
    if (prefersReduced) {
      el.textContent = target.toLocaleString() + suffix;
      return;
    }
    const step = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      const current = Math.floor(target * eased);
      el.textContent = current.toLocaleString() + suffix;
      if (t < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString() + suffix;
    };
    requestAnimationFrame(step);
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animate(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  nums.forEach(n => io.observe(n));
}

/* ── CONTACT FORM (local only) ───────────────────── */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const fields = form.querySelectorAll('input[required], textarea[required]');
  const status = document.getElementById('formStatus');

  // Inline validation on blur (not keystroke) — matches MD guidance
  fields.forEach(field => {
    field.addEventListener('blur', () => {
      field.classList.add('touched');
      const parent = field.closest('.field');
      if (!parent) return;
      if (!field.checkValidity()) parent.classList.add('has-error');
      else parent.classList.remove('has-error');
    });
    // Clear error as they correct it
    field.addEventListener('input', () => {
      if (field.classList.contains('touched') && field.checkValidity()) {
        field.closest('.field')?.classList.remove('has-error');
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let firstInvalid = null;
    fields.forEach(field => {
      field.classList.add('touched');
      const parent = field.closest('.field');
      if (!field.checkValidity()) {
        parent?.classList.add('has-error');
        if (!firstInvalid) firstInvalid = field;
      } else {
        parent?.classList.remove('has-error');
      }
    });

    if (firstInvalid) {
      firstInvalid.focus();
      if (status) {
        status.textContent = 'Please fix the highlighted fields and try again.';
        status.className = 'form-status error';
      }
      return;
    }

    if (status) {
      status.textContent = "Thanks — we got it. We'll get back to you soon. Or give us a call at (336) 298-4942.";
      status.className = 'form-status success';
    }
    form.reset();
    form.querySelectorAll('.touched').forEach(f => f.classList.remove('touched'));
    form.querySelectorAll('.has-error').forEach(f => f.classList.remove('has-error'));
  });
}

/* ── INIT ─────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Home page — default menu tab
  const firstMenuBtn = document.querySelector('.menu-cat-btn');
  if (firstMenuBtn && document.getElementById('menuGrid')) {
    showCat('starters', firstMenuBtn);
  }

  renderFeatured();
  initScrollReveal();
  initParallax();
  initNavShadow();
  initMobileNavClose();
  initScrollProgress();
  initBackToTop();
  initOpenNow();
  initContactForm();
  initCountUp();
});

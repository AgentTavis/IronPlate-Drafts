// Full Moon Oyster Bar

const SPECIALS = [
  { dow:'Sun', name:'Sunday Funday', desc:'Easy hours, full menu, the whole table together.' },
  { dow:'Mon', name:'Oyster Monday', desc:'Our flagship night. Oysters every which way.' },
  { dow:'Tue', name:'Crabby Tuesday', desc:'Crab in every form. Cheap oysters on the half shell at the beach.' },
  { dow:'Wed', name:'Wine Down Wednesday', desc:'Ladies Night and Petite Filet with Grilled Shrimp Skewer at Atlantic Beach.', price:'$24.50 special at the beach' },
  { dow:'Thu', name:'Thirsty Thursday', desc:'Drink-focused programming. All-You-Can-Eat Snow Crab at Atlantic Beach.' },
  { dow:'Fri', name:'Finally Friday', desc:'Long weekend kickoff. Full menu, late hours at most locations.' },
  { dow:'Sat', name:'Sail into Saturday', desc:'Seasonal rotations and weekend specials all night.' },
];

function todayIndex(){ return new Date().getDay(); }

// Today banner in nav
function paintTodayBanner(){
  const el = document.querySelector('.today-banner');
  if(!el) return;
  const t = SPECIALS[todayIndex()];
  el.innerHTML = `Tonight, <b>${t.name}</b>`;
}

// Today strip on menu page
function paintTodayStrip(){
  const el = document.querySelector('.today-strip .nm');
  if(!el) return;
  const t = SPECIALS[todayIndex()];
  el.innerHTML = `Tonight, <b>${t.name}</b>`;
}

// Calendar grid (home + specials)
function paintCalendar(){
  document.querySelectorAll('[data-calendar]').forEach(grid=>{
    const today = todayIndex();
    // Re-order so today is first on specials page if data-today-first
    const order = grid.dataset.todayFirst === '1'
      ? Array.from({length:7},(_,i)=> (today+i)%7)
      : [1,2,3,4,5,6,0]; // Mon-Sun
    grid.innerHTML = order.map(i=>{
      const s = SPECIALS[i];
      const isToday = i===today;
      const badge = isToday ? '<span class="badge">Tonight</span>' : '';
      const price = s.price ? `<div class="price">${s.price}</div>` : '';
      return `<div class="${grid.dataset.cardClass||'cal-day'} ${isToday?'today':''}">
        ${badge}
        <div class="dow">${['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][i]}</div>
        <div class="name">${s.name}</div>
        <div class="desc">${s.desc}</div>
        ${price}
      </div>`;
    }).join('');
  });
}

// Hero word-by-word reveal
function heroLoad(){
  const hero = document.querySelector('.hero');
  if(!hero) return;
  const h1 = hero.querySelector('h1');
  if(h1 && !h1.dataset.split){
    h1.dataset.split = '1';
    const html = h1.innerHTML;
    // Split into words but preserve <span class="script"> wrappers
    h1.innerHTML = html.replace(/(<span[^>]*>[^<]*<\/span>|\S+)/g,'<span class="word">$1</span> ');
  }
  requestAnimationFrame(()=>hero.classList.add('loaded'));
}

// Reveal on scroll
function setupReveal(){
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  },{threshold:.12,rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('.reveal, .reveal-children').forEach(el=>io.observe(el));
}

// Scroll progress
function setupProgress(){
  const bar = document.querySelector('.scroll-progress');
  if(!bar) return;
  const fn = ()=>{
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    const pct = max>0 ? (h.scrollTop/max)*100 : 0;
    bar.style.width = pct + '%';
  };
  document.addEventListener('scroll',fn,{passive:true});
  fn();
}

// Back to top
function setupTop(){
  const btn = document.querySelector('.to-top');
  if(!btn) return;
  document.addEventListener('scroll',()=>{
    btn.classList.toggle('show', window.scrollY > 600);
  },{passive:true});
  btn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
}

// Mobile nav toggle
function setupNav(){
  const btn = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if(!btn||!links) return;
  btn.addEventListener('click',()=>{
    const open = links.classList.toggle('open');
    btn.setAttribute('aria-expanded', open?'true':'false');
  });
  links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
    links.classList.remove('open');
    btn.setAttribute('aria-expanded','false');
  }));
}

// Counter animation
function setupCounters(){
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(!e.isIntersecting) return;
      const el = e.target;
      const target = parseInt(el.dataset.count,10);
      const dur = 1400;
      const start = performance.now();
      function tick(t){
        const p = Math.min(1,(t-start)/dur);
        const eased = 1 - Math.pow(1-p,3);
        el.textContent = Math.round(target * eased).toLocaleString();
        if(p<1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      io.unobserve(el);
    });
  },{threshold:.5});
  document.querySelectorAll('[data-count]').forEach(el=>io.observe(el));
}

document.addEventListener('DOMContentLoaded',()=>{
  paintTodayBanner();
  paintTodayStrip();
  paintCalendar();
  heroLoad();
  setupReveal();
  setupProgress();
  setupTop();
  setupNav();
  setupCounters();
});

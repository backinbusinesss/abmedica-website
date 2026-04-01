/* === AB MEDICA — JS v3 === */
'use strict';

/* LOADER */
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader').classList.add('done'), 1500);
});

/* SCROLL PROGRESS */
const prog = document.getElementById('prog');
const nav  = document.getElementById('nav');
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  prog.style.width = pct + '%';
  nav.classList.toggle('stuck', window.scrollY > 60);
  toTop.classList.toggle('show', window.scrollY > 500);
}, { passive: true });

/* BACK TO TOP */
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* BURGER / MOBILE DRAWER */
const burger  = document.getElementById('burger');
const drawer  = document.getElementById('drawer');
const overlay = document.getElementById('overlay');
const openDrawer  = () => { burger.classList.add('open'); drawer.classList.add('open'); overlay.classList.add('open'); document.body.style.overflow = 'hidden'; };
const closeDrawer = () => { burger.classList.remove('open'); drawer.classList.remove('open'); overlay.classList.remove('open'); document.body.style.overflow = ''; };
burger.addEventListener('click', () => drawer.classList.contains('open') ? closeDrawer() : openDrawer());
overlay.addEventListener('click', closeDrawer);
drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));

/* MOBILE ACCORDION */
document.querySelectorAll('.mob-hd').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.mob-item');
    const open = item.classList.contains('open');
    document.querySelectorAll('.mob-item').forEach(i => i.classList.remove('open'));
    if (!open) item.classList.add('open');
  });
});

/* DROPDOWN MENUS (JS-controlled) */
const dds = document.querySelectorAll('.dd');
dds.forEach(dd => {
  const btn = dd.querySelector('.dd-btn');
  if (!btn) return;
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = dd.classList.contains('open');
    dds.forEach(d => d.classList.remove('open'));
    if (!isOpen) dd.classList.add('open');
  });
});
document.addEventListener('click', () => dds.forEach(d => d.classList.remove('open')));
document.addEventListener('keydown', e => { if (e.key === 'Escape') dds.forEach(d => d.classList.remove('open')); });

/* SEARCH */
const searchBox   = document.getElementById('searchBox');
const searchBtn   = document.getElementById('searchBtn');
const searchClose = document.getElementById('searchClose');
const searchInput = document.getElementById('searchInput');
searchBtn.addEventListener('click', () => { searchBox.classList.add('open'); setTimeout(() => searchInput.focus(), 200); });
searchClose.addEventListener('click', () => searchBox.classList.remove('open'));
searchBox.addEventListener('click', e => { if (e.target === searchBox) searchBox.classList.remove('open'); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') searchBox.classList.remove('open'); });
document.querySelectorAll('.search-tags button').forEach(b => {
  b.addEventListener('click', () => { searchInput.value = b.textContent; searchInput.focus(); });
});

/* HERO CANVAS PARTICLES */
const canvas = document.getElementById('heroCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let W, H, pts = [];
  const resize = () => { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; };
  window.addEventListener('resize', resize);
  resize();
  class Pt {
    constructor() { this.reset(true); }
    reset(init) {
      this.x  = Math.random() * W;
      this.y  = init ? Math.random() * H : H + 10;
      this.r  = Math.random() * 1.4 + 0.3;
      this.vx = (Math.random() - 0.5) * 0.25;
      this.vy = -(Math.random() * 0.35 + 0.1);
      this.a  = Math.random() * 0.45 + 0.1;
      this.col = Math.random() > 0.72 ? '201,237,8' : '255,255,255';
    }
    tick() {
      this.x += this.vx; this.y += this.vy; this.a -= 0.0004;
      if (this.y < -5 || this.a <= 0) this.reset(false);
    }
    draw() {
      ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(${this.col},${this.a})`; ctx.fill();
    }
  }
  for (let i = 0; i < 110; i++) pts.push(new Pt());
  const lines = () => {
    for (let i = 0; i < pts.length; i++) for (let j = i+1; j < pts.length; j++) {
      const dx = pts[i].x-pts[j].x, dy = pts[i].y-pts[j].y, d = Math.sqrt(dx*dx+dy*dy);
      if (d < 90) { ctx.beginPath(); ctx.moveTo(pts[i].x,pts[i].y); ctx.lineTo(pts[j].x,pts[j].y); ctx.strokeStyle=`rgba(255,255,255,${0.04*(1-d/90)})`; ctx.lineWidth=0.5; ctx.stroke(); }
    }
  };
  const loop = () => { ctx.clearRect(0,0,W,H); lines(); pts.forEach(p=>{p.draw();p.tick();}); requestAnimationFrame(loop); };
  loop();
}

/* HERO TEXT ROTATION */
const heroSpan = document.getElementById('heroSpan');
if (heroSpan) {
  const texts = ['l\'innovazione in sanità','la chirurgia robotica','la telemedicina','la connected care','il futuro della medicina','la medicina di precisione'];
  let i = 0;
  heroSpan.style.transition = 'opacity .45s ease, transform .45s ease';
  setInterval(() => {
    heroSpan.style.opacity = '0'; heroSpan.style.transform = 'translateY(12px)';
    setTimeout(() => {
      i = (i+1) % texts.length;
      heroSpan.textContent = texts[i];
      heroSpan.style.opacity = '1'; heroSpan.style.transform = 'translateY(0)';
    }, 450);
  }, 3200);
}

/* COUNTER */
const count = (el, target, dur=1800) => {
  const start = performance.now();
  const step = now => {
    const p = Math.min((now-start)/dur, 1);
    const e = 1 - Math.pow(1-p, 3);
    el.textContent = Math.round(target*e);
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
};

/* HERO NUMS */
const heroNums = document.querySelector('.hero-nums');
if (heroNums) {
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { heroNums.querySelectorAll('.hn-n').forEach(el => count(el, +el.dataset.to)); }
  }, { threshold: 0.5 }).observe(heroNums);
}

/* ASSIST STATS */
const statGrid = document.querySelector('.stat-grid');
if (statGrid) {
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { statGrid.querySelectorAll('.stbx-n').forEach(el => count(el, +el.dataset.to)); }
  }, { threshold: 0.4 }).observe(statGrid);
}

/* SCROLL REVEAL */
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('show'); revObs.unobserve(e.target); } });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
document.querySelectorAll('.fade-up').forEach(el => revObs.observe(el));

/* SOLUTION TABS */
document.querySelectorAll('.stab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.stab').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.sol-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    const panel = document.getElementById(btn.dataset.p);
    if (panel) { panel.classList.add('active'); }
  });
});

/* MEDIA TABS */
const media = {
  news: [
    { tag:'News', date:'28 Mar 2026', title:'AB Medica formalizza il closing con Intuitive Surgical', desc:'Accordo definitivo per la distribuzione esclusiva del sistema chirurgico robotico da Vinci in Italia.', bg:'linear-gradient(135deg,#00376D,#0055a5)' },
    { tag:'Riconoscimento', date:'15 Mar 2026', title:'Leader dell\'Innovazione 2026 — Corriere della Sera', desc:'AB Medica premiata tra le aziende più innovative d\'Italia nel settore healthcare.', bg:'linear-gradient(135deg,#002855,#0068c8)' },
    { tag:'Prodotto', date:'5 Mar 2026', title:'MAIA Platform si evolve con AI predittiva', desc:'Nuove funzionalità di intelligenza artificiale per il monitoraggio predittivo del paziente cronico.', bg:'linear-gradient(135deg,#003d7a,#006bb5)' },
  ],
  video: [
    { tag:'Intervista', date:'22 Mar 2026', title:'da Vinci Xi: la visione del chirurgo', desc:'Il Prof. Bianchi racconta come il sistema robotico ha trasformato la chirurgia urologica.', bg:'linear-gradient(135deg,#1a3a5c,#2a5080)' },
    { tag:'Demo Live', date:'12 Mar 2026', title:'Mako System: protesi di ginocchio in diretta', desc:'Video dimostrativo del sistema robotico ortopedico Mako in sala operatoria.', bg:'linear-gradient(135deg,#0d3060,#1e4d8a)' },
    { tag:'Tutorial', date:'2 Mar 2026', title:'MAIA Platform: guida per i professionisti', desc:'Come configurare la piattaforma di connected care per il monitoraggio remoto dei pazienti.', bg:'linear-gradient(135deg,#002850,#004a8c)' },
  ],
  podcast: [
    { tag:'Ep.12', date:'25 Mar 2026', title:'Sanità Digitale — Il futuro della telemedicina', desc:'Con il Prof. Verdi: opportunità e sfide della digital health nel SSN italiano.', bg:'linear-gradient(135deg,#00376D,#005a9e)' },
    { tag:'Ep.11', date:'18 Mar 2026', title:'Robotica in sala operatoria — La rivoluzione', desc:'Intervista con il dott. Ferrari: come la chirurgia robotica ha cambiato gli outcomes clinici.', bg:'linear-gradient(135deg,#003060,#0055a0)' },
    { tag:'Ep.10', date:'10 Mar 2026', title:'Innovazione & Salute — L\'ecosistema AB Medica', desc:'Come AB Medica seleziona e porta in Italia le tecnologie medicali più innovative del mondo.', bg:'linear-gradient(135deg,#002855,#004a90)' },
  ],
  stampa: [
    { tag:'Corriere della Sera', date:'15 Mar 2026', title:'"Leader dell\'Innovazione 2026"', desc:'Il Corriere della Sera include AB Medica nella lista delle aziende più innovative d\'Italia.', bg:'linear-gradient(135deg,#1a3050,#2a4a70)' },
    { tag:'Il Sole 24 Ore', date:'8 Mar 2026', title:'La robotica chirurgica conquista l\'Italia', desc:'Articolo sulla crescita del mercato robotico in Italia grazie alla distribuzione di AB Medica.', bg:'linear-gradient(135deg,#0d2840,#1e3e60)' },
    { tag:'la Repubblica', date:'1 Mar 2026', title:'Telemedicina: un salto nel futuro della cura', desc:'Come la connected care di AB Medica trasforma l\'assistenza ai pazienti cronici in Italia.', bg:'linear-gradient(135deg,#002040,#003560)' },
  ],
};
const grid = document.getElementById('mediaGrid');
const renderMedia = tab => {
  if (!grid) return;
  grid.style.opacity = '0';
  setTimeout(() => {
    grid.innerHTML = media[tab].map(m => `
      <div class="mc">
        <div class="mc-img" style="background:${m.bg}"><span class="mc-tag">${m.tag}</span></div>
        <div class="mc-body">
          <span class="mc-date">${m.date}</span>
          <h3>${m.title}</h3>
          <p>${m.desc}</p>
          <a href="#">Leggi tutto →</a>
        </div>
      </div>`).join('');
    grid.style.transition = 'opacity .35s ease';
    grid.style.opacity = '1';
    grid.querySelectorAll('.mc').forEach(el => el.classList.add('tilt'));
    attachTilt();
  }, 180);
};
renderMedia('news');
document.querySelectorAll('.mtab').forEach(b => {
  b.addEventListener('click', () => {
    document.querySelectorAll('.mtab').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    renderMedia(b.dataset.mt);
  });
});

/* MOCKUP BAR ANIMATION */
const mockupObs = new IntersectionObserver(([e]) => {
  if (e.isIntersecting) {
    e.target.querySelectorAll('.m-fill').forEach((bar, i) => {
      const w = bar.style.width; bar.style.width = '0';
      setTimeout(() => { bar.style.width = w; }, 300 + i * 180);
    });
    mockupObs.unobserve(e.target);
  }
}, { threshold: 0.5 });
const mockup = document.querySelector('.mockup');
if (mockup) mockupObs.observe(mockup);

/* CONTACT FORM */
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const orig = btn.textContent;
    btn.textContent = '✓ Inviato con successo!';
    btn.style.background = '#16a34a';
    setTimeout(() => { btn.textContent = orig; btn.style.background = ''; form.reset(); }, 3500);
  });
}

/* SMOOTH SCROLL */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

/* 3D TILT */
const attachTilt = () => {
  document.querySelectorAll('.tilt').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      el.style.transform = `translateY(-6px) rotateX(${-y*8}deg) rotateY(${x*8}deg)`;
      el.style.transformStyle = 'preserve-3d';
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; el.style.transformStyle = ''; });
  });
};
attachTilt();

// ==========================================
//  AB MEDICA — MAIN JS v2.0
// ==========================================
'use strict';

/* ---- LOADER ---- */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 1600);
});

/* ---- CUSTOM CURSOR ---- */
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
if (window.matchMedia('(pointer:fine)').matches) {
  let mx = 0, my = 0, fx = 0, fy = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  const animCursor = () => {
    if (cursor) { cursor.style.left = mx + 'px'; cursor.style.top = my + 'px'; }
    fx += (mx - fx) * 0.12;
    fy += (my - fy) * 0.12;
    if (follower) { follower.style.left = fx + 'px'; follower.style.top = fy + 'px'; }
    requestAnimationFrame(animCursor);
  };
  animCursor();
  document.querySelectorAll('a, button, .btn, .st-tab, .mtab, .robot-card, .st-card, .mc-card').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.style.width = '14px'; cursor.style.height = '14px'; follower.style.width = '56px'; follower.style.height = '56px'; follower.style.borderColor = 'rgba(201,237,8,0.6)'; });
    el.addEventListener('mouseleave', () => { cursor.style.width = '8px'; cursor.style.height = '8px'; follower.style.width = '36px'; follower.style.height = '36px'; follower.style.borderColor = 'rgba(201,237,8,0.5)'; });
  });
}

/* ---- SCROLL PROGRESS ---- */
const scrollProg = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  scrollProg.style.width = pct + '%';
}, { passive: true });

/* ---- NAVBAR SCROLL ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ---- HAMBURGER / MOBILE MENU ---- */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});
// Mobile accordion
document.querySelectorAll('.mobile-acc-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.mobile-acc-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.mobile-acc-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});
// Close mobile menu on link click
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
  });
});

/* ---- SEARCH OVERLAY ---- */
const searchBtn     = document.getElementById('searchBtn');
const searchOverlay = document.getElementById('searchOverlay');
const searchClose   = document.getElementById('searchClose');
const searchInput   = document.getElementById('searchInput');
searchBtn.addEventListener('click', () => { searchOverlay.classList.add('active'); setTimeout(() => searchInput && searchInput.focus(), 200); });
searchClose.addEventListener('click', () => searchOverlay.classList.remove('active'));
searchOverlay.addEventListener('click', e => { if (e.target === searchOverlay) searchOverlay.classList.remove('active'); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') searchOverlay.classList.remove('active'); });
document.querySelectorAll('.search-suggestions button').forEach(btn => {
  btn.addEventListener('click', () => { if (searchInput) searchInput.value = btn.textContent; });
});

/* ---- HERO PARTICLE CANVAS ---- */
const canvas = document.getElementById('heroCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];
  const resize = () => { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; };
  resize();
  window.addEventListener('resize', resize);
  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.r = Math.random() * 1.5 + 0.3;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = -Math.random() * 0.4 - 0.1;
      this.alpha = Math.random() * 0.5 + 0.1;
      this.color = Math.random() > 0.7 ? '201,237,8' : '255,255,255';
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
      ctx.fill();
    }
    update() {
      this.x += this.vx; this.y += this.vy; this.alpha -= 0.0005;
      if (this.y < -10 || this.alpha <= 0) this.reset();
    }
  }
  for (let i = 0; i < 120; i++) particles.push(new Particle());
  // Connection lines
  const drawLines = () => {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i+1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(255,255,255,${0.05 * (1 - dist/100)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  };
  const animParticles = () => {
    ctx.clearRect(0,0,W,H);
    drawLines();
    particles.forEach(p => { p.draw(); p.update(); });
    requestAnimationFrame(animParticles);
  };
  animParticles();
}

/* ---- HERO TEXT ROTATION ---- */
const heroRotate = document.getElementById('heroRotate');
if (heroRotate) {
  const phrases = [
    "l'innovazione in sanità",
    "la chirurgia robotica",
    "la telemedicina",
    "la connected care",
    "il futuro della medicina",
    "la medicina di precisione",
  ];
  let idx = 0;
  setInterval(() => {
    heroRotate.style.transform = 'translateY(-100%)';
    heroRotate.style.opacity = '0';
    setTimeout(() => {
      idx = (idx + 1) % phrases.length;
      heroRotate.textContent = phrases[idx];
      heroRotate.style.transform = 'translateY(0)';
      heroRotate.style.opacity = '1';
    }, 500);
  }, 3200);
  heroRotate.style.transition = 'transform 0.5s cubic-bezier(.4,0,.2,1), opacity 0.5s ease';
}

/* ---- COUNTER ANIMATION ---- */
const animCounter = (el, target, suffix = '') => {
  let start = 0; const dur = 1800;
  const startTime = performance.now();
  const step = (now) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / dur, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(start + (target - start) * ease);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
};

/* ---- SCROLL REVEAL ---- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); } });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ---- HERO STATS COUNTER ---- */
const heroStatObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.hstat-n').forEach(el => {
        const target = parseInt(el.dataset.target);
        animCounter(el, target);
      });
      heroStatObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
const heroStats = document.querySelector('.hero-stats');
if (heroStats) heroStatObserver.observe(heroStats);

/* ---- ASSIST STATS COUNTER ---- */
const assistObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.as-n').forEach(el => {
        const target = parseInt(el.dataset.target);
        animCounter(el, target);
      });
      assistObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
const assistStats = document.querySelector('.assist-stats');
if (assistStats) assistObserver.observe(assistStats);

/* ---- SOLUTION TABS ---- */
document.querySelectorAll('.st-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.st-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.st-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    const panel = document.querySelector(`[data-panel="${tab.dataset.sol}"]`);
    if (panel) panel.classList.add('active');
  });
});

/* ---- MEDIA CENTER TABS ---- */
const mediaData = {
  news: [
    { tag:'News', date:'28 Mar 2026', title:'AB Medica formalizza il closing con Intuitive Surgical', desc:'Accordo definitivo per la distribuzione esclusiva del sistema chirurgico robotico da Vinci in Italia.', bg:'linear-gradient(135deg,#00376D,#0055a5)' },
    { tag:'Riconoscimento', date:'15 Mar 2026', title:'Leader dell\'Innovazione 2026 — Corriere della Sera', desc:'AB Medica premiata tra le aziende più innovative d\'Italia nel settore healthcare per il secondo anno consecutivo.', bg:'linear-gradient(135deg,#002855,#0068c8)' },
    { tag:'Prodotto', date:'5 Mar 2026', title:'MAIA Platform: la connected care evolve con AI', desc:'Nuove funzionalità basate su intelligenza artificiale per il monitoraggio predittivo del paziente cronico.', bg:'linear-gradient(135deg,#003d7a,#006bb5)' },
  ],
  video: [
    { tag:'Intervista', date:'22 Mar 2026', title:'da Vinci Xi: la visione del chirurgo', desc:'Il Prof. Bianchi racconta come il sistema robotico Intuitive ha trasformato la chirurgia urologica nel suo reparto.', bg:'linear-gradient(135deg,#1a3a5c,#2a5080)' },
    { tag:'Demo Live', date:'12 Mar 2026', title:'Mako System in azione: protesi di ginocchio', desc:'Video dimostrativo completo del sistema robotico ortopedico Mako in sala operatoria presso il Policlinico.', bg:'linear-gradient(135deg,#0d3060,#1e4d8a)' },
    { tag:'Tutorial', date:'2 Mar 2026', title:'MAIA Platform: guida per i professionisti', desc:'Come configurare e utilizzare la piattaforma di connected care MAIA per il monitoraggio remoto dei pazienti.', bg:'linear-gradient(135deg,#002850,#004a8c)' },
  ],
  podcast: [
    { tag:'Podcast Ep.12', date:'25 Mar 2026', title:'Sanità Digitale — Il futuro della telemedicina', desc:'Con il Prof. Verdi dell\'Università di Milano: opportunità e sfide della digital health nel SSN italiano.', bg:'linear-gradient(135deg,#00376D,#005a9e)' },
    { tag:'Podcast Ep.11', date:'18 Mar 2026', title:'Robotica in sala operatoria — La rivoluzione', desc:'Intervista con il dott. Ferrari: come la chirurgia robotica ha cambiato outcomes clinici e qualità della vita.', bg:'linear-gradient(135deg,#003060,#0055a0)' },
    { tag:'Podcast Ep.10', date:'10 Mar 2026', title:'Innovazione & Salute — L\'ecosistema AB Medica', desc:'Come AB Medica seleziona, porta in Italia e supporta le tecnologie medicali più innovative del mondo.', bg:'linear-gradient(135deg,#002855,#004a90)' },
  ],
  stampa: [
    { tag:'Corriere della Sera', date:'15 Mar 2026', title:'"Leader dell\'Innovazione 2026"', desc:'Il Corriere della Sera include AB Medica nella lista delle aziende più innovative d\'Italia per il settore healthcare.', bg:'linear-gradient(135deg,#1a3050,#2a4a70)' },
    { tag:'Il Sole 24 Ore', date:'8 Mar 2026', title:'La robotica chirurgica conquista l\'Italia', desc:'Articolo di fondo sulla crescita esponenziale del mercato robotico in Italia grazie alla distribuzione di AB Medica.', bg:'linear-gradient(135deg,#0d2840,#1e3e60)' },
    { tag:'la Repubblica', date:'1 Mar 2026', title:'Telemedicina: un salto nel futuro della cura', desc:'Come la connected care di AB Medica sta trasformando l\'assistenza ai pazienti cronici in tutta Italia.', bg:'linear-gradient(135deg,#002040,#003560)' },
  ],
};
const mediaGrid = document.getElementById('mediaGrid');
const renderMedia = (tab) => {
  if (!mediaGrid) return;
  mediaGrid.style.opacity = '0';
  setTimeout(() => {
    mediaGrid.innerHTML = mediaData[tab].map(item => `
      <article class="mc-card">
        <div class="mc-img" style="background:${item.bg}">
          <span class="mc-tag">${item.tag}</span>
        </div>
        <div class="mc-body">
          <span class="mc-date">${item.date}</span>
          <h3>${item.title}</h3>
          <p>${item.desc}</p>
          <a href="#" class="mc-link">Leggi tutto →</a>
        </div>
      </article>`).join('');
    mediaGrid.style.transition = 'opacity 0.4s ease';
    mediaGrid.style.opacity = '1';
  }, 200);
};
renderMedia('news');
document.querySelectorAll('.mtab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.mtab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderMedia(btn.dataset.mtab);
  });
});

/* ---- CONTACT FORM ---- */
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const orig = btn.textContent;
    btn.textContent = '✓ Messaggio inviato con successo!';
    btn.style.background = '#28a745'; btn.style.color = '#fff';
    setTimeout(() => {
      btn.textContent = orig; btn.style.background = ''; btn.style.color = '';
      form.reset();
    }, 4000);
  });
}

/* ---- SMOOTH SCROLL ---- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = navbar ? navbar.offsetHeight : 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset - 20;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ---- BACK TO TOP ---- */
const backTop = document.getElementById('backTop');
window.addEventListener('scroll', () => {
  backTop.classList.toggle('visible', window.scrollY > 500);
}, { passive: true });
backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ---- ROBOT CARD TILT ---- */
document.querySelectorAll('.robot-card, .st-card, .fv-card, .fc-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rx = ((y - cy) / cy) * 5;
    const ry = ((x - cx) / cx) * -5;
    card.style.transform = `translateY(-8px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    card.style.transformStyle = 'preserve-3d';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transformStyle = '';
  });
});

/* ---- DH METRIC ANIMATION ---- */
const dhObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.dh-m-fill').forEach((bar, i) => {
        const w = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => { bar.style.width = w; }, 300 + i * 200);
      });
      dhObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
const dhPhone = document.querySelector('.dh-phone');
if (dhPhone) dhObserver.observe(dhPhone);

/* ---- LOTTIE ANIMATIONS (from LottieFiles CDN) ---- */
// Inject lottie-player script
const lottieScript = document.createElement('script');
lottieScript.src = 'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js';
document.head.appendChild(lottieScript);

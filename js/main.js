// ======= AB MEDICA — MAIN JS =======

document.addEventListener('DOMContentLoaded', () => {

  // ----- Navbar scroll -----
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  // ----- Hamburger menu -----
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
    });
  });

  // ----- Search overlay -----
  const searchBtn     = document.getElementById('searchBtn');
  const searchOverlay = document.getElementById('searchOverlay');
  const searchClose   = document.getElementById('searchClose');
  searchBtn.addEventListener('click', () => searchOverlay.classList.add('active'));
  searchClose.addEventListener('click', () => searchOverlay.classList.remove('active'));
  searchOverlay.addEventListener('click', (e) => {
    if (e.target === searchOverlay) searchOverlay.classList.remove('active');
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') searchOverlay.classList.remove('active');
  });

  // ----- Hero text rotation -----
  const phrases = [
    "l'innovazione in sanità",
    "la chirurgia robotica",
    "la telemedicina",
    "il futuro della medicina",
    "la connected care"
  ];
  let idx = 0;
  const heroHighlight = document.getElementById('heroHighlight');
  if (heroHighlight) {
    setInterval(() => {
      idx = (idx + 1) % phrases.length;
      heroHighlight.style.opacity = '0';
      heroHighlight.style.transform = 'translateY(10px)';
      setTimeout(() => {
        heroHighlight.textContent = phrases[idx];
        heroHighlight.style.opacity = '1';
        heroHighlight.style.transform = 'translateY(0)';
      }, 400);
    }, 3000);
    heroHighlight.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  }

  // ----- Stats counter animation -----
  const statNums = document.querySelectorAll('.stat-num');
  const animateCounter = (el, target, suffix) => {
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.textContent = target + suffix;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current) + suffix;
      }
    }, 20);
  };
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent;
        const num = parseInt(text);
        const suffix = text.replace(/[0-9]/g, '');
        animateCounter(el, num, suffix);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  statNums.forEach(el => counterObserver.observe(el));

  // ----- AOS (scroll reveal) -----
  const aosObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('[data-aos]').forEach(el => aosObserver.observe(el));

  // ----- Media tabs -----
  const tabBtns  = document.querySelectorAll('.tab-btn');
  const mediaGrid = document.getElementById('mediaGrid');
  const mediaContent = {
    news: [
      { tag: 'News', date: '28 Marzo 2026', title: 'AB Medica formalizza il closing con Intuitive', desc: 'Accordo definitivo per la distribuzione esclusiva del sistema da Vinci in Italia.', bg: 'linear-gradient(135deg, #00376D 0%, #0055a5 100%)' },
      { tag: 'Riconoscimento', date: '15 Marzo 2026', title: 'Leader dell\'Innovazione 2026 — Corriere della Sera', desc: 'AB Medica premiata tra le aziende più innovative d\'Italia.', bg: 'linear-gradient(135deg, #0a4d8c 0%, #1a6bb5 100%)' },
      { tag: 'Prodotto', date: '5 Marzo 2026', title: 'Maia: la piattaforma di connected care evolve', desc: 'Nuove funzionalità per il monitoraggio remoto continuo del paziente cronico.', bg: 'linear-gradient(135deg, #003d7a 0%, #006bb5 100%)' },
    ],
    video: [
      { tag: 'Video', date: '20 Marzo 2026', title: 'da Vinci: intervista al chirurgo', desc: 'Come il sistema robotico sta cambiando la chirurgia mininvasiva in Italia.', bg: 'linear-gradient(135deg, #1a3a5c 0%, #2a5080 100%)' },
      { tag: 'Demo', date: '10 Marzo 2026', title: 'Mako in azione: protesi al ginocchio', desc: 'Video dimostrativo del sistema robotico ortopedico Mako in sala operatoria.', bg: 'linear-gradient(135deg, #0d3060 0%, #1e4d8a 100%)' },
      { tag: 'Tutorial', date: '1 Marzo 2026', title: 'CarePad: guida all\'utilizzo', desc: 'Tutto quello che devi sapere sul nostro dispositivo di cura connessa.', bg: 'linear-gradient(135deg, #002850 0%, #004a8c 100%)' },
    ],
    podcast: [
      { tag: 'Podcast', date: '25 Marzo 2026', title: 'Sanità Digitale — Ep. 12', desc: 'Il futuro della telemedicina in Italia: opportunità e sfide.', bg: 'linear-gradient(135deg, #00376D 0%, #005a9e 100%)' },
      { tag: 'Podcast', date: '18 Marzo 2026', title: 'Robotica in Sala Operatoria — Ep. 11', desc: 'Intervista con il Prof. Rossi: la rivoluzione robotica in chirurgia.', bg: 'linear-gradient(135deg, #003060 0%, #0055a0 100%)' },
      { tag: 'Podcast', date: '5 Marzo 2026', title: 'Innovazione & Salute — Ep. 10', desc: 'Come AB Medica porta l\'innovazione nei nosocomi italiani.', bg: 'linear-gradient(135deg, #002855 0%, #004a90 100%)' },
    ],
    stampa: [
      { tag: 'Corriere', date: '22 Marzo 2026', title: '"Leader dell\'Innovazione 2026"', desc: 'Il Corriere della Sera premia AB Medica tra le aziende più innovative.', bg: 'linear-gradient(135deg, #1a3050 0%, #2a4a70 100%)' },
      { tag: 'Sole 24 Ore', date: '14 Marzo 2026', title: 'La robotica chirurgica conquista l\'Italia', desc: 'Articolo dedicato alla crescita del mercato robotico grazie ad AB Medica.', bg: 'linear-gradient(135deg, #0d2840 0%, #1e3e60 100%)' },
      { tag: 'Repubblica', date: '8 Marzo 2026', title: 'Telemedicina: un salto nel futuro', desc: 'Come la connected care sta trasformando l\'assistenza ai pazienti cronici.', bg: 'linear-gradient(135deg, #002040 0%, #003560 100%)' },
    ],
  };

  const renderMedia = (tab) => {
    const items = mediaContent[tab];
    mediaGrid.innerHTML = items.map(item => `
      <article class="media-card">
        <div class="media-card-img" style="background: ${item.bg};">
          <span class="media-tag">${item.tag}</span>
        </div>
        <div class="media-card-body">
          <span class="media-date">${item.date}</span>
          <h3>${item.title}</h3>
          <p>${item.desc}</p>
          <a href="#" class="card-link">Leggi tutto <span>→</span></a>
        </div>
      </article>
    `).join('');
    mediaGrid.style.animation = 'none';
    mediaGrid.offsetHeight;
    mediaGrid.style.animation = 'fadeInUp 0.5s ease';
  };

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderMedia(btn.dataset.tab);
    });
  });

  // ----- Contact form -----
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = '✓ Messaggio inviato!';
      btn.style.background = '#28a745';
      btn.style.borderColor = '#28a745';
      btn.style.color = '#fff';
      setTimeout(() => {
        btn.textContent = 'Invia Messaggio';
        btn.style.background = '';
        btn.style.borderColor = '';
        btn.style.color = '';
        form.reset();
      }, 3000);
    });
  }

  // ----- Smooth scroll for anchor links -----
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});

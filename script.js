/* =========================================================
   01. DOM READY — Core site features
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------------------------------------------------------
     1.1  MOBILE MENU
  --------------------------------------------------------- */

  const menuBtn = document.getElementById("menuBtn");
  const navbar = document.getElementById("navbar");

  if (menuBtn && navbar) {
    menuBtn.addEventListener("click", () => {
      navbar.classList.toggle("active");
    });
  }

  /* ---------------------------------------------------------
     TIMELINE ACCORDION — ONLY ONE OPEN
  --------------------------------------------------------- */

  const timelineCards = document.querySelectorAll(".timeline-card");

  timelineCards.forEach((card) => {
    const button = card.querySelector(".timeline-top");
    if (!button) return;
    button.addEventListener("click", () => {
      const isActive = card.classList.contains("active");
      timelineCards.forEach((item) => item.classList.remove("active"));
      if (!isActive) card.classList.add("active");
    });
  });

  /* ---------------------------------------------------------
     1.2  HEADER SCROLL
  --------------------------------------------------------- */

  const header = document.querySelector(".header");
  if (header) {
    window.addEventListener("scroll", () => {
      header.classList.toggle("scrolled", window.scrollY > 40);
    });
  }

  const footer = document.querySelector(".footer");
  if (footer) {
    footer.addEventListener("mousemove", (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      footer.style.background = `
        radial-gradient(
          circle at ${x}% ${y}%,
          rgba(28,255,114,.06),
          #050505 45%
        )
      `;
    });
  }

  /* ---------------------------------------------------------
     1.3  HOMEPAGE COUNTDOWN
  --------------------------------------------------------- */

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  if (daysEl && hoursEl && minutesEl && secondsEl) {
    const events = [
      { title: "GOT7", type: "ANNIVERSARY", month: 1, day: 16, startYear: 2014, recurring: true },
      { title: "JAY B", type: "BIRTHDAY", month: 1, day: 6, birthYear: 1994, recurring: true },
      { title: "MARK", type: "BIRTHDAY", month: 9, day: 4, birthYear: 1993, recurring: true },
      { title: "JACKSON", type: "BIRTHDAY", month: 3, day: 28, birthYear: 1994, recurring: true },
      { title: "JINYOUNG", type: "BIRTHDAY", month: 9, day: 22, birthYear: 1994, recurring: true },
      { title: "YOUNGJAE", type: "BIRTHDAY", month: 9, day: 17, birthYear: 1996, recurring: true },
      { title: "BAMBAM", type: "BIRTHDAY", month: 5, day: 2, birthYear: 1997, recurring: true },
      { title: "YUGYEOM", type: "BIRTHDAY", month: 11, day: 17, birthYear: 1997, recurring: true },
      { title: "JJ PROJECT", type: "ANNIVERSARY", month: 5, day: 12, startYear: 2012, recurring: true },
      { title: "JUS2", type: "ANNIVERSARY", month: 3, day: 7, startYear: 2019, recurring: true },
      { title: "iGOT7/AHGASE", type: "ANNIVERSARY", month: 5, day: 9, startYear: 2014, recurring: true },
      { title: "JAYB COMEBACK", date: "2026-06-10T20:00:00", recurring: false },
      { title: "WINTER COMEBACK", date: "2026-12-01T18:00:00", recurring: false },
    ];

    function getOrdinal(num) {
      const j = num % 10;
      const k = num % 100;
      if (j === 1 && k !== 11) return num + "ST";
      if (j === 2 && k !== 12) return num + "ND";
      if (j === 3 && k !== 13) return num + "RD";
      return num + "TH";
    }

    function getNextEvent() {
      const now = new Date();
      const upcoming = [];
      events.forEach((event) => {
        if (event.recurring) {
          let target = new Date(now.getFullYear(), event.month - 1, event.day, 0, 0, 0);
          if (target < now) target.setFullYear(now.getFullYear() + 1);
          upcoming.push({ ...event, target });
        } else {
          const target = new Date(event.date);
          if (target > now) upcoming.push({ ...event, target });
        }
      });
      upcoming.sort((a, b) => a.target.getTime() - b.target.getTime());
      return upcoming[0];
    }

    function updateCountdown() {
      const nextEvent = getNextEvent();
      const now = new Date();
      const distance = nextEvent.target.getTime() - now.getTime();
      daysEl.textContent = String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, "0");
      hoursEl.textContent = String(Math.floor((distance / (1000 * 60 * 60)) % 24)).padStart(2, "0");
      minutesEl.textContent = String(Math.floor((distance / (1000 * 60)) % 60)).padStart(2, "0");
      secondsEl.textContent = String(Math.floor((distance / 1000) % 60)).padStart(2, "0");
      const title = document.querySelector(".countdown-left h3");
      if (title) {
        let displayTitle = nextEvent.title;
        if (nextEvent.type === "ANNIVERSARY") {
          const years = nextEvent.target.getFullYear() - nextEvent.startYear;
          displayTitle = `${nextEvent.title} ${getOrdinal(years)} ANNIVERSARY`;
        }
        if (nextEvent.type === "BIRTHDAY") {
          const age = nextEvent.target.getFullYear() - nextEvent.birthYear;
          displayTitle = `${nextEvent.title} ${getOrdinal(age)} BIRTHDAY`;
        }
        title.textContent = displayTitle;
      }
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  /* ---------------------------------------------------------
     1.4  GLOBAL SCROLL REVEAL
  --------------------------------------------------------- */

  const revealSelectors = [
    ".story-section", ".stats-section", ".feature-section",
    ".album-card", ".film-card", ".footer", ".lore-card",
    ".lore-feature-box", ".gallery-card", ".gallery-quote",
    ".member-card", ".constellation-header", ".about-quote",
  ].join(", ");

  const revealElements = document.querySelectorAll(revealSelectors);
  if (revealElements.length > 0) {
    revealElements.forEach((el) => el.classList.add("hidden"));
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("show");
        });
      },
      { threshold: 0.15 }
    );
    revealElements.forEach((el) => revealObserver.observe(el));
  }

  /* ---------------------------------------------------------
     1.5  HERO PARALLAX
  --------------------------------------------------------- */

  const heroBg = document.querySelector(".hero-bg");
  if (heroBg) {
    window.addEventListener("scroll", () => {
      heroBg.style.transform = `scale(1.1) translateY(${window.pageYOffset * 0.12}px)`;
    });
  }

  /* ---------------------------------------------------------
     1.6  ACTIVE NAVBAR
  --------------------------------------------------------- */

  const navLinks = document.querySelectorAll(".navbar a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.forEach((nav) => nav.classList.remove("active"));
      link.classList.add("active");
    });
  });

  /* ---------------------------------------------------------
     1.7  LORE ACCORDION
  --------------------------------------------------------- */

  document.querySelectorAll(".accordion-item").forEach((item) => {
    const btn = item.querySelector(".accordion-btn");
    if (btn) btn.addEventListener("click", () => item.classList.toggle("active"));
  });

  /* ---------------------------------------------------------
     1.8  DISCOGRAPHY FILTER
  --------------------------------------------------------- */

  const filterBtns = document.querySelectorAll(".filter-btn");
  const albumCards = document.querySelectorAll(".album-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      albumCards.forEach((card) => {
        card.style.display =
          filter === "all" || card.dataset.category === filter ? "block" : "none";
      });
    });
  });

  document.querySelectorAll(".tracklist-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const currentCard = button.closest(".album-card");
      document.querySelectorAll(".album-card").forEach((card) => {
        if (card !== currentCard) card.classList.remove("active");
      });
      currentCard.classList.toggle("active");
    });
  });
  
/* =========================================================
   FILTER PANEL — tambah dalam script.js
   dalam DOMContentLoaded, selepas section 1.8 (Discography Filter)
========================================================= */

/* ---------------------------------------------------------
   1.8b  FILTER PANEL
--------------------------------------------------------- */

const filterPanelToggle = document.getElementById('filterPanelToggle');
const filterPanelClose  = document.getElementById('filterPanelClose');
const filterPanel       = document.getElementById('filterPanel');
const filterPanelOverlay = document.getElementById('filterPanelOverlay');
const fpReset           = document.getElementById('fpReset');

// Sections
const fpTypeSection   = document.getElementById('fpTypeSection');
const fpMemberSection = document.getElementById('fpMemberSection');
const fpUnitSection   = document.getElementById('fpUnitSection');

// Mixtape option — only show for SOLO
const fpMixtape = document.querySelector('.fp-mixtape');

// Current active category
let activeCategory = 'all';

// Open panel
function openFilterPanel() {
  filterPanel.classList.add('active');
  filterPanelOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Close panel
function closeFilterPanel() {
  filterPanel.classList.remove('active');
  filterPanelOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

// Update panel sections based on active category
function updatePanelSections(category) {
  // Hide all optional sections first
  fpMemberSection.classList.add('fp-hidden');
  fpUnitSection.classList.add('fp-hidden');
  if (fpMixtape) fpMixtape.classList.add('fp-hidden');

  if (category === 'solo' || category === 'ost') {
    fpMemberSection.classList.remove('fp-hidden');
    if (category === 'solo' && fpMixtape) {
      fpMixtape.classList.remove('fp-hidden');
    }
  } else if (category === 'units') {
    fpUnitSection.classList.remove('fp-hidden');
  }
}

// Apply filter based on panel selections
function applyPanelFilter() {
  const selectedType   = document.querySelector('input[name="fp-type"]:checked')?.value || 'all';
  const selectedMember = document.querySelector('input[name="fp-member"]:checked')?.value || 'all';
  const selectedUnit   = document.querySelector('input[name="fp-unit"]:checked')?.value || 'all';

  albumCards.forEach(card => {
    const cardCategory = card.dataset.category;
    const cardUnit     = card.dataset.unit || '';
    const cardType     = card.querySelector('.album-type')?.textContent?.trim() || '';

    // Category match
    if (activeCategory !== 'all' && cardCategory !== activeCategory) {
      card.style.display = 'none';
      return;
    }

    // Type match
    if (selectedType !== 'all' && cardType !== selectedType) {
      card.style.display = 'none';
      return;
    }

    // Member match (solo/ost)
    if ((activeCategory === 'solo' || activeCategory === 'ost') && selectedMember !== 'all') {
      if (cardUnit !== selectedMember) {
        card.style.display = 'none';
        return;
      }
    }

    // Unit match
    if (activeCategory === 'units' && selectedUnit !== 'all') {
      if (cardUnit !== selectedUnit) {
        card.style.display = 'none';
        return;
      }
    }

    card.style.display = 'block';
  });
}

// Reset panel
function resetPanel() {
  document.querySelectorAll('input[name="fp-type"]')[0].checked = true;
  const memberAll = document.querySelector('input[name="fp-member"]');
  if (memberAll) memberAll.checked = true;
  const unitAll = document.querySelector('input[name="fp-unit"]');
  if (unitAll) unitAll.checked = true;
  applyPanelFilter();
}

// Hook into existing filter buttons
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    activeCategory = btn.dataset.filter || 'all';
    updatePanelSections(activeCategory);
    resetPanel();
    openFilterPanel();
  });
});

// Panel events
if (filterPanelToggle) filterPanelToggle.addEventListener('click', openFilterPanel);
if (filterPanelClose)  filterPanelClose.addEventListener('click', closeFilterPanel);
if (filterPanelOverlay) filterPanelOverlay.addEventListener('click', closeFilterPanel);
if (fpReset) fpReset.addEventListener('click', resetPanel);

// Radio change → auto apply
document.querySelectorAll('input[name="fp-type"], input[name="fp-member"], input[name="fp-unit"]').forEach(radio => {
  radio.addEventListener('change', applyPanelFilter);
});

// ESC tutup panel
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeFilterPanel();
});

  /* ---------------------------------------------------------
     1.9  FILMOGRAPHY FILTER
  --------------------------------------------------------- */

  const filmFilterBtns = document.querySelectorAll(".film-filter-btn");
  const filmCards = document.querySelectorAll(".film-card");

  filmFilterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filmFilterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      filmCards.forEach((card) => {
        if (filter === "all" || card.dataset.category === filter) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  /* ---------------------------------------------------------
     1.10  FILM MODAL
  --------------------------------------------------------- */

  document.querySelectorAll('.film-card[data-modal]').forEach(card => {
    card.addEventListener('click', () => {
      const modal = document.getElementById(card.dataset.modal);
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  document.querySelectorAll('.film-modal').forEach(modal => {
    modal.querySelector('.modal-close')?.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  /* ---------------------------------------------------------
     1.11  AWARDS FILTER
  --------------------------------------------------------- */

  const awardBtns = document.querySelectorAll(".award-filter-btn");
  const awardCards = document.querySelectorAll(".award-card");

  awardBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      awardBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      awardCards.forEach((card) => {
        card.style.display =
          filter === "all" || card.dataset.category === filter ? "flex" : "none";
      });
    });
  });

  /* ---------------------------------------------------------
     1.12  GALLERY HOVER
  --------------------------------------------------------- */

  const galleryCards = document.querySelectorAll(".gallery-card");
  galleryCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      galleryCards.forEach((item) => item.classList.remove("active"));
      card.classList.add("active");
    });
  });

  /* ---------------------------------------------------------
     1.13  ABOUT MEMBER HOVER
  --------------------------------------------------------- */

  const memberCards = document.querySelectorAll(".member-card");
  memberCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      memberCards.forEach((item) => item.classList.remove("active"));
      card.classList.add("active");
    });
  });

  /* ---------------------------------------------------------
     1.14  MEMBER DOSSIER TABS
  --------------------------------------------------------- */

  const dossierBtns = document.querySelectorAll(".dossier-btn");
  const dossierContents = document.querySelectorAll(".dossier-content");

  dossierBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      dossierBtns.forEach((b) => b.classList.remove("active"));
      dossierContents.forEach((c) => c.classList.remove("active"));
      btn.classList.add("active");
      const target = document.getElementById(btn.dataset.tab);
      if (target) target.classList.add("active");
    });
  });

  /* ---------------------------------------------------------
     1.15  MEMBER MILITARY COUNTDOWN
  --------------------------------------------------------- */

  document.querySelectorAll(".military-card").forEach((card) => {
    const dischargeDate = card.dataset.discharge;
    if (!dischargeDate) return;
    const statusEl = card.querySelector(".military-status");
    const countdownEl = card.querySelector(".military-countdown");
    if (!statusEl || !countdownEl) return;
    function updateMilitary() {
      const distance = new Date(dischargeDate).getTime() - Date.now();
      if (distance <= 0) {
        statusEl.textContent = "COMPLETED";
        countdownEl.textContent = "Official military service completed and archived within THE NEST records.";
        return;
      }
      const days = Math.floor(distance / 86400000);
      statusEl.textContent = "SERVING";
      countdownEl.textContent = `${days} days until discharge`;
    }
    updateMilitary();
    setInterval(updateMilitary, 1000);
  });

  /* ---------------------------------------------------------
     1.16  URL FILTER PARAM (Discography)
  --------------------------------------------------------- */

  const urlParams = new URLSearchParams(window.location.search);
  const filterParam = urlParams.get('filter');
  const unitParam = urlParams.get('unit');

  if (filterParam) {
    filterBtns.forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.filter === filterParam) btn.classList.add('active');
    });
    albumCards.forEach(card => {
      if (filterParam === 'all') {
        card.style.display = 'block';
      } else if (unitParam) {
        card.style.display = card.dataset.unit === unitParam ? 'block' : 'none';
      } else {
        card.style.display = card.dataset.category === filterParam ? 'block' : 'none';
      }
    });
    const albumSection = document.querySelector('.album-grid');
    if (albumSection) {
      setTimeout(() => {
        albumSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 500);
    }
  }

  /* ---------------------------------------------------------
     1.17  GALLERY POPUP
  --------------------------------------------------------- */

  const galleryCollections = {
    'keep-spinning': { title: 'KEEP SPINNING WORLD TOUR', year: '2019 · CONCERT', prefix: 'keepspinning', total: 25 },
    'eyes-on-you':  { title: 'EYES ON YOU', year: '2018 · WORLD TOUR', prefix: 'eyesonyou', total: 25 },
    'flight-log':   { title: 'FLIGHT LOG TRILOGY', year: '2016 — 2017 · ERA', prefix: 'flightlog', total: 25 },
    'homecoming':   { title: 'GOT7 HOMECOMING', year: '2022 · FANCON', prefix: 'homecoming', total: 25 },
    '7for7':        { title: '7 FOR 7 DEBUT', year: '2014 · GENESIS', prefix: '7for7', total: 25 },
    'spinning-top': { title: 'SPINNING TOP', year: '2019 · ERA', prefix: 'spinningtop', total: 25 },
  };

  const PAGE_LAYOUTS = [9, 8, 8];

  const GRID_POSITIONS = {
    0: [ // Page 1 — 9 kotak
      { col: '1 / 3', row: '1 / 3' },
      { col: '3 / 5', row: '1' },
      { col: '3 / 5', row: '2' },
      { col: '1 / 3', row: '3' },
      { col: '3',     row: '3' },
      { col: '4',     row: '3' },
      { col: '1',     row: '4' },
      { col: '2',     row: '4' },
      { col: '3 / 5', row: '4' },
    ],
    1: [ // Page 2 — 8 kotak
      { col: '1 / 3', row: '1' },
      { col: '3 / 5', row: '1' },
      { col: '1',     row: '2' },
      { col: '2',     row: '2' },
      { col: '3 / 5', row: '2' },
      { col: '1 / 3', row: '3 / 5' },
      { col: '3 / 5', row: '3' },
      { col: '3 / 5', row: '4' },
    ],
    2: [ // Page 3 — 8 kotak
      { col: '1 / 3', row: '1' },
      { col: '3 / 5', row: '1 / 3' },
      { col: '1 / 3', row: '2' },
      { col: '1',     row: '3' },
      { col: '2',     row: '3' },
      { col: '3 / 5', row: '3' },
      { col: '1 / 3', row: '4' },
      { col: '3 / 5', row: '4' },
    ],
  };

  let currentPage = 0;
  let currentImages = [];

  function buildImages(collection) {
    const images = [];
    for (let i = 1; i <= collection.total; i++) {
      images.push(`assets/gallery/${collection.prefix}-${i}.jpg`);
    }
    return images;
  }

  function splitIntoPages(images) {
    const pages = [];
    let idx = 0;
    PAGE_LAYOUTS.forEach(count => {
      pages.push(images.slice(idx, idx + count));
      idx += count;
    });
    return pages;
  }

  function renderPage(pageIndex, pages) {
    const pageEls = document.querySelectorAll('.popup-page');
    if (!pageEls.length) return;

    pageEls.forEach((el, i) => {
      el.classList.remove('active');
      el.innerHTML = '';

      const imgs = pages[i] || [];
      const maxSlots = PAGE_LAYOUTS[i];
      const positions = GRID_POSITIONS[i] || [];

      for (let s = 0; s < maxSlots; s++) {
        const div = document.createElement('div');
        div.className = 'pg-img';

        // Assign grid position
        if (positions[s]) {
          div.style.gridColumn = positions[s].col;
          div.style.gridRow = positions[s].row;
        }

        if (imgs[s]) {
          const img = document.createElement('img');
          img.src = imgs[s];
          img.alt = '';
          img.loading = 'lazy';
          img.addEventListener('click', () => openViewer(imgs[s]));
          div.appendChild(img);
        } else {
          div.classList.add('empty');
        }

        el.appendChild(div);
      }
    });

    pageEls[pageIndex]?.classList.add('active');
  }

  function updatePopupNav() {
    const prevBtn = document.getElementById('popup-prev');
    const nextBtn = document.getElementById('popup-next');
    const counter = document.getElementById('popup-counter');
    const dots = document.querySelectorAll('.popup-dot');
    if (!prevBtn || !nextBtn) return;
    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = currentPage === PAGE_LAYOUTS.length - 1;
    if (counter) counter.textContent = `${currentPage + 1} / ${PAGE_LAYOUTS.length}`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === currentPage));
  }

  function openGalleryPopup(collectionKey) {
    const collection = galleryCollections[collectionKey];
    if (!collection) return;
    currentPage = 0;
    currentImages = buildImages(collection);
    const pages = splitIntoPages(currentImages);
    const titleEl = document.getElementById('popup-collection-title');
    const yearEl = document.getElementById('popup-collection-year');
    if (titleEl) titleEl.textContent = collection.title;
    if (yearEl) yearEl.textContent = collection.year;
    renderPage(currentPage, pages);
    updatePopupNav();
    const popup = document.getElementById('gallery-popup');
    if (popup) {
      popup.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeGalleryPopup() {
    const popup = document.getElementById('gallery-popup');
    if (popup) popup.classList.remove('active');
    document.body.style.overflow = '';
    currentPage = 0;
  }

  function nextPopupPage() {
    if (currentPage >= PAGE_LAYOUTS.length - 1) return;
    currentPage++;
    renderPage(currentPage, splitIntoPages(currentImages));
    updatePopupNav();
  }

  function prevPopupPage() {
    if (currentPage <= 0) return;
    currentPage--;
    renderPage(currentPage, splitIntoPages(currentImages));
    updatePopupNav();
  }

  function openViewer(src) {
    const viewer = document.getElementById('img-viewer');
    const viewerImg = document.getElementById('img-viewer-img');
    if (!viewer || !viewerImg) return;
    viewerImg.src = src;
    viewer.classList.add('active');
  }

  function closeViewer() {
    const viewer = document.getElementById('img-viewer');
    if (viewer) viewer.classList.remove('active');
  }

  // Gallery cards click
  document.querySelectorAll('.gallery-card[data-collection]').forEach(card => {
    card.addEventListener('click', () => openGalleryPopup(card.dataset.collection));
  });

  // Popup close
  const popupCloseBtn = document.getElementById('popup-close-btn');
  if (popupCloseBtn) popupCloseBtn.addEventListener('click', closeGalleryPopup);

  const galleryPopup = document.getElementById('gallery-popup');
  if (galleryPopup) {
    galleryPopup.addEventListener('click', (e) => {
      if (e.target === galleryPopup) closeGalleryPopup();
    });
  }

  // Nav buttons
  const popupPrev = document.getElementById('popup-prev');
  const popupNext = document.getElementById('popup-next');
  if (popupPrev) popupPrev.addEventListener('click', prevPopupPage);
  if (popupNext) popupNext.addEventListener('click', nextPopupPage);

  // Dots
  document.querySelectorAll('.popup-dot').forEach((dot, i) => {
    dot.addEventListener('click', () => {
      currentPage = i;
      renderPage(currentPage, splitIntoPages(currentImages));
      updatePopupNav();
    });
  });

  // Image viewer
  const imgViewerClose = document.getElementById('img-viewer-close');
  const imgViewer = document.getElementById('img-viewer');
  if (imgViewerClose) imgViewerClose.addEventListener('click', closeViewer);
  if (imgViewer) {
    imgViewer.addEventListener('click', (e) => {
      if (e.target === imgViewer) closeViewer();
    });
  }

  // ESC + Arrow keys
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeViewer(); closeGalleryPopup(); }
    if (e.key === 'ArrowRight') nextPopupPage();
    if (e.key === 'ArrowLeft') prevPopupPage();
  });

}); // end DOMContentLoaded

/* =========================================================
   02. UNITS PAGE
========================================================= */

const unitCards = document.querySelectorAll(".unit-card");

if (unitCards.length > 0) {
  unitCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      unitCards.forEach((item) => item.classList.remove("active"));
      card.classList.add("active");
    });
  });
}

const unitRevealSelectors = ".units-hero, .unit-card, .units-quote";
const unitElements = document.querySelectorAll(unitRevealSelectors);

if (unitElements.length > 0) {
  unitElements.forEach((el) => el.classList.add("hidden"));
  const unitObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("show");
      });
    },
    { threshold: 0.15 }
  );
  unitElements.forEach((el) => unitObserver.observe(el));
}

const unitsHero = document.querySelector(".units-hero");
if (unitsHero) {
  window.addEventListener("scroll", () => {
    unitsHero.style.transform = `translateY(${window.pageYOffset * 0.08}px)`;
  });
}

unitCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const rotateY = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const rotateX = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
  });
});

const unitsQuote = document.querySelector(".units-quote");
if (unitsQuote) {
  window.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    unitsQuote.style.background = `
      radial-gradient(
        circle at ${x}% ${y}%,
        rgba(28, 255, 114, .12),
        rgba(28, 255, 114, .03) 45%,
        rgba(28, 255, 114, .01) 100%
      )`;
  });
}

/* =========================================================
   03. UNIT DETAIL PAGE
========================================================= */

const timelineItems = document.querySelectorAll(".timeline-item");

if (timelineItems.length > 0) {
  timelineItems.forEach((item, index) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(40px)";
    setTimeout(() => {
      item.style.transition = "all .6s ease";
      item.style.opacity = "1";
      item.style.transform = "translateY(0)";
    }, index * 200);
  });
}

document.querySelectorAll(".release-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-8px) scale(1.02)";
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)";
  });
});

document.querySelectorAll(".unit-member-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.background = `
      radial-gradient(
        circle at ${x}px ${y}px,
        rgba(28, 255, 114, .18),
        #0f0f0f 45%
      )`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.background = "#0f0f0f";
  });
});

/* =========================================================
   04. JUS2 PAGE
========================================================= */

const jus2Page = document.querySelector(".jus2-theme");

if (jus2Page) {
  document.querySelectorAll(".release-card").forEach((card, index) => {
    card.animate(
      [
        { transform: "translateY(0px)" },
        { transform: "translateY(-10px)" },
        { transform: "translateY(0px)" },
      ],
      { duration: 3000 + index * 500, iterations: Infinity }
    );
  });

  const jus2HeroTitle = document.querySelector(".jus2-theme .unit-detail-hero h1");
  if (jus2HeroTitle) {
    window.addEventListener("mousemove", (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      jus2HeroTitle.style.textShadow = `
        0 0 10px rgba(168, 85, 247, .3),
        ${(x - 50) / 10}px ${(y - 50) / 10}px 30px rgba(168, 85, 247, .5)
      `;
    });
  }

  const jus2Observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".timeline-item").forEach((item) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(50px)";
    item.style.transition = "all .8s ease";
    jus2Observer.observe(item);
  });
}

/* =========================================================
   05. AHGASE PAGE
========================================================= */

const ahgaseAccordion = document.querySelectorAll(".accordion-item");

if (ahgaseAccordion.length > 0) {
  ahgaseAccordion.forEach((item) => {
    const btn = item.querySelector(".accordion-btn");
    if (btn) {
      btn.addEventListener("click", () => {
        const isActive = item.classList.contains("active");
        ahgaseAccordion.forEach((el) => el.classList.remove("active"));
        if (!isActive) item.classList.add("active");
      });
    }
  });
}

const ahgaseRevealSelectors = [
  ".identity-section", ".feature-card", ".agabong-card",
  ".archive-section", ".ahgase-quote",
].join(", ");

const ahgaseReveal = document.querySelectorAll(ahgaseRevealSelectors);

if (ahgaseReveal.length > 0) {
  ahgaseReveal.forEach((el) => el.classList.add("hidden"));
  const ahgaseObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("show");
      });
    },
    { threshold: 0.15 }
  );
  ahgaseReveal.forEach((el) => ahgaseObserver.observe(el));
}

const ahgaseHero = document.querySelector(".ahgase-hero");
if (ahgaseHero) {
  window.addEventListener("scroll", () => {
    ahgaseHero.style.transform = `translateY(${window.pageYOffset * 0.08}px)`;
  });
}

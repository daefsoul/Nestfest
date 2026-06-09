/* =========================================================
   01. DOM READY — Core site features
========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------
     1.1  MOBILE MENU
  --------------------------------------------------------- */

  const menuBtn = document.getElementById('menuBtn');
  const navbar  = document.getElementById('navbar');

  if (menuBtn && navbar) {
    menuBtn.addEventListener('click', () => {
      navbar.classList.toggle('active');
    });
  }
/* =========================
TIMELINE ACCORDION
ONLY ONE OPEN
========================= */

const timelineCards =
document.querySelectorAll(".timeline-card");

timelineCards.forEach(card => {

    const button =
    card.querySelector(".timeline-top");

    if(!button) return;

    button.addEventListener("click", () => {

        const isActive =
        card.classList.contains("active");

        timelineCards.forEach(item => {
            item.classList.remove("active");
        });

        if(!isActive){
            card.classList.add("active");
        }

    });

});
/* ---------------------------------------------------------
     1.2  HEADER SCROLL
  --------------------------------------------------------- */

  const header = document.querySelector('.header');

  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

const footer = document.querySelector(".footer");

if(footer){

  footer.addEventListener("mousemove",(e)=>{

    const x =
    (e.clientX / window.innerWidth) * 100;

    const y =
    (e.clientY / window.innerHeight) * 100;

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

  const daysEl    = document.getElementById('days');
  const hoursEl   = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  if (daysEl && hoursEl && minutesEl && secondsEl) {

const events = [

  // REPEAT SETIAP TAHUN
{
  title: "GOT7",
  type: "ANNIVERSARY",
  month: 1,
  day: 16,
  startYear: 2014,
  recurring: true
},

{
  title: "JAY B",
  type: "BIRTHDAY",
  month: 1,
  day: 6,
  birthYear: 1994,
  recurring: true
},
  {
	title: "MARK",
	type: "BIRTHDAY",
	month: 9,
	day: 4,
	birthYear: 1993,
	recurring: true
  },
  {
	title: "JACKSON",
	type: "BIRTHDAY",
	month: 3,
	day: 28,
	birthYear: 1994,
	recurring: true
  },
  {
	title: "JINYOUNG",
	type: "BIRTHDAY",
	month: 9,
	day: 22,
	birthYear: 1994,
	recurring: true
  },
  {
	title: "YOUNGJAE",
	type: "BIRTHDAY",
	month: 9,
	day: 17,
	birthYear: 1996,
	recurring: true
  },
  {
	title: "BAMBAM",
	type: "BIRTHDAY",
	month: 5,
	day: 2,
	birthYear: 1997,
	recurring: true
  },
  {
	title: "YUGYEOM",
	type: "BIRTHDAY",
	month: 11,
	day: 17,
	birthYear: 1997,
	recurring: true
  },
  {
	title: "JJ PROJECT",
	type: "ANNIVERSARY",
	month: 5,
	day: 12,
	startYear: 2012,
	recurring: true
  },
  {
	title: "JUS2",
	type: "ANNIVERSARY",
	month: 3,
	day: 7,
	startYear: 2019,
	recurring: true
  },
  {
	title: "iGOT7/AHGASE",
	type: "ANNIVERSARY",
	month: 5,
	day: 9,
	startYear: 2014,
	recurring: true
  },

  // SEKALI SAHAJA
  {
    title: "JAYB COMEBACK",
    date: "2026-06-10T20:00:00",
    recurring: false
  },

  {
    title: "WINTER COMEBACK",
    date: "2026-12-01T18:00:00",
    recurring: false
  }

];

function getOrdinal(num){

  const j = num % 10;
  const k = num % 100;

  if(j === 1 && k !== 11) return num + "ST";
  if(j === 2 && k !== 12) return num + "ND";
  if(j === 3 && k !== 13) return num + "RD";

  return num + "TH";
}

function getNextEvent() {

  const now = new Date();
  const upcoming = [];

  events.forEach(event => {

    if(event.recurring){

      let target = new Date(
        now.getFullYear(),
        event.month - 1,
        event.day,
        0,0,0
      );

      if(target < now){
        target.setFullYear(now.getFullYear() + 1);
      }

      upcoming.push({
        ...event,
        target
      });

    } else {

      const target = new Date(event.date);

      if(target > now){
        upcoming.push({
          ...event,
          target
        });
      }

    }

  });

  upcoming.sort(
    (a,b) => a.target.getTime() - b.target.getTime()
  );

  return upcoming[0];
}

function updateCountdown() {

  const nextEvent = getNextEvent();

  const now = new Date();

  const distance =
  nextEvent.target.getTime() - now.getTime();

  const days =
  Math.floor(distance / (1000 * 60 * 60 * 24));

  const hours =
  Math.floor((distance / (1000 * 60 * 60)) % 24);

  const minutes =
  Math.floor((distance / (1000 * 60)) % 60);

  const seconds =
  Math.floor((distance / 1000) % 60);

  daysEl.textContent =
  String(days).padStart(2,"0");

  hoursEl.textContent =
  String(hours).padStart(2,"0");

  minutesEl.textContent =
  String(minutes).padStart(2,"0");

  secondsEl.textContent =
  String(seconds).padStart(2,"0");

  const title =
  document.querySelector(".countdown-left h3");

  if(title){

  let displayTitle = nextEvent.title;

  if(nextEvent.type === "ANNIVERSARY"){

    const years =
    nextEvent.target.getFullYear() -
    nextEvent.startYear;

    displayTitle =
    `${nextEvent.title} ${getOrdinal(years)} ANNIVERSARY`;

  }

  if(nextEvent.type === "BIRTHDAY"){

    const age =
    nextEvent.target.getFullYear() -
    nextEvent.birthYear;

    displayTitle =
    `${nextEvent.title} ${getOrdinal(age)} BIRTHDAY`;

  }

  title.textContent = displayTitle;
}
}
updateCountdown();
setInterval(updateCountdown,1000);
  }

  /* ---------------------------------------------------------
     1.4  GLOBAL SCROLL REVEAL
  --------------------------------------------------------- */

  const revealSelectors = [
    '.story-section', '.stats-section', '.feature-section',
    '.album-card', '.film-card', '.footer',
    '.lore-card', '.lore-feature-box',
    '.gallery-card', '.gallery-quote',
    '.member-card', '.constellation-header', '.about-quote',
  ].join(', ');

  const revealElements = document.querySelectorAll(revealSelectors);

  if (revealElements.length > 0) {
    revealElements.forEach(el => el.classList.add('hidden'));

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('show');
      });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  /* ---------------------------------------------------------
     1.5  HERO PARALLAX
  --------------------------------------------------------- */

  const heroBg = document.querySelector('.hero-bg');

  if (heroBg) {
    window.addEventListener('scroll', () => {
      heroBg.style.transform = `scale(1.1) translateY(${window.pageYOffset * 0.12}px)`;
    });
  }

  /* ---------------------------------------------------------
     1.6  ACTIVE NAVBAR
  --------------------------------------------------------- */

  const navLinks = document.querySelectorAll('.navbar a');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.forEach(nav => nav.classList.remove('active'));
      link.classList.add('active');
    });
  });

  /* ---------------------------------------------------------
     1.7  LORE ACCORDION
  --------------------------------------------------------- */

  document.querySelectorAll('.accordion-item').forEach(item => {
    const btn = item.querySelector('.accordion-btn');
    if (btn) btn.addEventListener('click', () => item.classList.toggle('active'));
  });

  /* ---------------------------------------------------------
     1.8  DISCOGRAPHY FILTER
  --------------------------------------------------------- */

  const filterBtns  = document.querySelectorAll('.filter-btn');
  const albumCards  = document.querySelectorAll('.album-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      albumCards.forEach(card => {
        card.style.display =
          (filter === 'all' || card.dataset.category === filter) ? 'block' : 'none';
      });
    });
  });

document.querySelectorAll('.tracklist-toggle').forEach(button => {

    button.addEventListener('click', () => {

        const currentCard = button.closest('.album-card');

        document.querySelectorAll('.album-card').forEach(card => {
            if(card !== currentCard){
                card.classList.remove('active');
            }
        });

        currentCard.classList.toggle('active');

    });

});

  /* ---------------------------------------------------------
     1.9  FILMOGRAPHY FILTER
  --------------------------------------------------------- */

  const filmFilterBtns = document.querySelectorAll('.film-filter-btn');
  const filmCards      = document.querySelectorAll('.film-card');

  filmFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filmFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      filmCards.forEach(card => {
        card.style.display =
          (filter === 'all' || card.dataset.category === filter) ? 'block' : 'none';
      });
    });
  });

  /* ---------------------------------------------------------
     1.10 AWARDS FILTER
  --------------------------------------------------------- */

  const awardBtns  = document.querySelectorAll('.award-filter-btn');
  const awardCards = document.querySelectorAll('.award-card');

  awardBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      awardBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      awardCards.forEach(card => {
        card.style.display =
          (filter === 'all' || card.dataset.category === filter) ? 'flex' : 'none';
      });
    });
  });

  /* ---------------------------------------------------------
     1.11 GALLERY HOVER
  --------------------------------------------------------- */

  const galleryCards = document.querySelectorAll('.gallery-card');

  galleryCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      galleryCards.forEach(item => item.classList.remove('active'));
      card.classList.add('active');
    });
  });

  /* ---------------------------------------------------------
     1.12 ABOUT MEMBER HOVER
  --------------------------------------------------------- */

  const memberCards = document.querySelectorAll('.member-card');

  memberCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      memberCards.forEach(item => item.classList.remove('active'));
      card.classList.add('active');
    });
  });

  /* ---------------------------------------------------------
     1.13 MEMBER DOSSIER TABS
  --------------------------------------------------------- */

  const dossierBtns     = document.querySelectorAll('.dossier-btn');
  const dossierContents = document.querySelectorAll('.dossier-content');

  dossierBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      dossierBtns.forEach(b => b.classList.remove('active'));
      dossierContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');

      const target = document.getElementById(btn.dataset.tab);
      if (target) target.classList.add('active');
    });
  });

  /* ---------------------------------------------------------
     1.14 MEMBER MILITARY COUNTDOWN
  --------------------------------------------------------- */

  document.querySelectorAll('.military-card').forEach(card => {
    const dischargeDate = card.dataset.discharge;
    if (!dischargeDate) return;

    const statusEl    = card.querySelector('.military-status');
    const countdownEl = card.querySelector('.military-countdown');
    if (!statusEl || !countdownEl) return;

    function updateMilitary() {
      const distance = new Date(dischargeDate).getTime() - Date.now();

      if (distance <= 0) {
        statusEl.textContent    = 'COMPLETED';
        countdownEl.textContent = 'Official military service completed and archived within THE NEST records.';
        return;
      }

      const days = Math.floor(distance / 86400000);
      statusEl.textContent    = 'SERVING';
      countdownEl.textContent = `${days} days until discharge`;
    }

    updateMilitary();
    setInterval(updateMilitary, 1000);
  });

}); // end DOMContentLoaded

/* =========================================================
   02. UNITS PAGE
========================================================= */

/* ---------------------------------------------------------
   2.1  UNIT CARD HOVER
--------------------------------------------------------- */

const unitCards = document.querySelectorAll('.unit-card');

if (unitCards.length > 0) {
  unitCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      unitCards.forEach(item => item.classList.remove('active'));
      card.classList.add('active');
    });
  });
}

/* ---------------------------------------------------------
   2.2  UNITS SCROLL REVEAL
--------------------------------------------------------- */

const unitRevealSelectors = '.units-hero, .unit-card, .units-quote';
const unitElements = document.querySelectorAll(unitRevealSelectors);

if (unitElements.length > 0) {
  unitElements.forEach(el => el.classList.add('hidden'));

  const unitObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('show');
    });
  }, { threshold: 0.15 });

  unitElements.forEach(el => unitObserver.observe(el));
}

/* ---------------------------------------------------------
   2.3  UNITS HERO PARALLAX
--------------------------------------------------------- */

const unitsHero = document.querySelector('.units-hero');

if (unitsHero) {
  window.addEventListener('scroll', () => {
    unitsHero.style.transform = `translateY(${window.pageYOffset * 0.08}px)`;
  });
}

/* ---------------------------------------------------------
   2.4  UNIT CARD TILT EFFECT
--------------------------------------------------------- */

unitCards.forEach(card => {

  card.addEventListener('mousemove', (e) => {
    const rect    = card.getBoundingClientRect();
    const rotateY = ((e.clientX - rect.left) / rect.width  - 0.5) *  10;
    const rotateX = ((e.clientY - rect.top)  / rect.height - 0.5) * -10;

    card.style.transform =
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
  });

});

/* ---------------------------------------------------------
   2.5  QUOTE GLOW EFFECT
--------------------------------------------------------- */

const unitsQuote = document.querySelector('.units-quote');

if (unitsQuote) {
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth)  * 100;
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

/* ---------------------------------------------------------
   3.1  TIMELINE FADE IN
--------------------------------------------------------- */

const timelineItems = document.querySelectorAll('.timeline-item');

if (timelineItems.length > 0) {
  timelineItems.forEach((item, index) => {
    item.style.opacity   = '0';
    item.style.transform = 'translateY(40px)';

    setTimeout(() => {
      item.style.transition = 'all .6s ease';
      item.style.opacity    = '1';
      item.style.transform  = 'translateY(0)';
    }, index * 200);
  });
}

/* ---------------------------------------------------------
   3.2  RELEASE CARD HOVER
--------------------------------------------------------- */

document.querySelectorAll('.release-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-8px) scale(1.02)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) scale(1)';
  });
});

/* ---------------------------------------------------------
   3.3  UNIT MEMBER CARD GLOW
--------------------------------------------------------- */

document.querySelectorAll('.unit-member-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x    = e.clientX - rect.left;
    const y    = e.clientY - rect.top;

    card.style.background = `
      radial-gradient(
        circle at ${x}px ${y}px,
        rgba(28, 255, 114, .18),
        #0f0f0f 45%
      )`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.background = '#0f0f0f';
  });
});

/* =========================================================
   04. JUS2 PAGE
========================================================= */

const jus2Page = document.querySelector('.jus2-theme');

if (jus2Page) {

  /* ---------------------------------------------------------
     4.1  FLOATING RELEASE CARDS
  --------------------------------------------------------- */

  document.querySelectorAll('.release-card').forEach((card, index) => {
    card.animate(
      [
        { transform: 'translateY(0px)'   },
        { transform: 'translateY(-10px)' },
        { transform: 'translateY(0px)'   },
      ],
      {
        duration:   3000 + (index * 500),
        iterations: Infinity,
      }
    );
  });

  /* ---------------------------------------------------------
     4.2  HERO GLOW
  --------------------------------------------------------- */

  const jus2HeroTitle = document.querySelector('.jus2-theme .unit-detail-hero h1');

  if (jus2HeroTitle) {
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth)  * 100;
      const y = (e.clientY / window.innerHeight) * 100;

      jus2HeroTitle.style.textShadow = `
        0 0 10px rgba(168, 85, 247, .3),
        ${(x - 50) / 10}px ${(y - 50) / 10}px 30px rgba(168, 85, 247, .5)
      `;
    });
  }

  /* ---------------------------------------------------------
     4.3  TIMELINE FADE IN
  --------------------------------------------------------- */

  const jus2Observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.timeline-item').forEach(item => {
    item.style.opacity    = '0';
    item.style.transform  = 'translateY(50px)';
    item.style.transition = 'all .8s ease';
    jus2Observer.observe(item);
  });

}

/* =========================================================
   05. AHGASE PAGE
========================================================= */

/* ---------------------------------------------------------
   5.1  ACCORDION
--------------------------------------------------------- */

const ahgaseAccordion = document.querySelectorAll('.accordion-item');

if (ahgaseAccordion.length > 0) {
  ahgaseAccordion.forEach(item => {
    const btn = item.querySelector('.accordion-btn');

    if (btn) {
      btn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all, then open the clicked one if it was closed
        ahgaseAccordion.forEach(el => el.classList.remove('active'));
        if (!isActive) item.classList.add('active');
      });
    }
  });
}

/* ---------------------------------------------------------
   5.2  SCROLL REVEAL
--------------------------------------------------------- */

const ahgaseRevealSelectors = [
  '.identity-section', '.feature-card',
  '.agabong-card', '.archive-section', '.ahgase-quote',
].join(', ');

const ahgaseReveal = document.querySelectorAll(ahgaseRevealSelectors);

if (ahgaseReveal.length > 0) {
  ahgaseReveal.forEach(el => el.classList.add('hidden'));

  const ahgaseObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('show');
    });
  }, { threshold: 0.15 });

  ahgaseReveal.forEach(el => ahgaseObserver.observe(el));
}

/* ---------------------------------------------------------
   5.3  HERO PARALLAX
--------------------------------------------------------- */

const ahgaseHero = document.querySelector('.ahgase-hero');

if (ahgaseHero) {
  window.addEventListener('scroll', () => {
    ahgaseHero.style.transform = `translateY(${window.pageYOffset * 0.08}px)`;
  });
}
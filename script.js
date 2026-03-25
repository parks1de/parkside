/**
 * PARKSIDE — script.js
 * Minimal interaction layer.
 * Nav scroll state · Mobile menu · Reveal animations
 */

'use strict';

// ── NAV ──────────────────────────────────────────────
const nav = document.getElementById('nav');

let lastScrollY = 0;
let ticking = false;

function updateNav() {
  const scrolled = window.scrollY > 20;
  nav.classList.toggle('scrolled', scrolled);
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(updateNav);
    ticking = true;
  }
}, { passive: true });

// ── MOBILE MENU ───────────────────────────────────────
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

menuToggle?.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen);

  const spans = menuToggle.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(4px, 5px)';
    spans[1].style.transform = 'rotate(-45deg) translate(4px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.transform = '';
  }
});

// Close mobile menu when a link is clicked
mobileMenu?.querySelectorAll('.nav-mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    const spans = menuToggle?.querySelectorAll('span');
    if (spans) {
      spans[0].style.transform = '';
      spans[1].style.transform = '';
    }
  });
});

// ── SCROLL REVEAL ─────────────────────────────────────
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px',
  }
);

// Attach reveal to key elements
function initReveal() {
  const elements = [
    ...document.querySelectorAll('.work-card'),
    ...document.querySelectorAll('.about-copy'),
    ...document.querySelectorAll('.about-capabilities'),
    ...document.querySelectorAll('.about-clients'),
    ...document.querySelectorAll('.contact-copy'),
    ...document.querySelectorAll('.contact-details'),
  ];

  elements.forEach((el, i) => {
    el.setAttribute('data-reveal', '');
    // Stagger work cards slightly
    if (el.classList.contains('work-card')) {
      el.style.transitionDelay = `${(i % 3) * 80}ms`;
    }
    revealObserver.observe(el);
  });
}

// ── SMOOTH ANCHOR SCROLL ─────────────────────────────
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const navHeight = nav.offsetHeight;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 8;

      window.scrollTo({
        top: targetTop,
        behavior: 'smooth',
      });
    });
  });
}

// ── HERO PARALLAX (subtle) ───────────────────────────
function initHeroParallax() {
  const heroBg = document.querySelector('.hero-grid-bg');
  if (!heroBg) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const heroH = document.querySelector('.hero')?.offsetHeight ?? 0;
        if (scrollY < heroH) {
          heroBg.style.transform = `translateY(${scrollY * 0.2}px)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

// ── WORK CARD HOVER ──────────────────────────────────
function initCardHover() {
  document.querySelectorAll('.work-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      // Dim sibling cards slightly
      document.querySelectorAll('.work-card').forEach(other => {
        if (other !== card) {
          other.style.opacity = '0.6';
        }
      });
    });

    card.addEventListener('mouseleave', () => {
      document.querySelectorAll('.work-card').forEach(other => {
        other.style.opacity = '';
      });
    });
  });
}

// ── INIT ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  updateNav();
  initReveal();
  initSmoothScroll();
  initHeroParallax();
  initCardHover();
});

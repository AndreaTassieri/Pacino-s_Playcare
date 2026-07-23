/**
 * Pacino's Playcare — Global JavaScript
 * Handles: navigation toggle, active link highlighting, smooth scroll
 */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     Navigation: mobile toggle
  ---------------------------------------------------------- */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks  = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when a nav link is clicked (mobile UX)
    navLinks.addEventListener('click', function (e) {
      if (e.target.closest('.nav-links__link')) {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close menu on outside click
    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close menu on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  /* ----------------------------------------------------------
     Active nav link: mark current page
  ---------------------------------------------------------- */
  function setActiveNavLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('.nav-links__link[data-page]');

    links.forEach(function (link) {
      const page = link.getAttribute('data-page');
      if (page === currentPath || (currentPath === '' && page === 'index.html')) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  }

  setActiveNavLink();

  /* ----------------------------------------------------------
     Smooth-scroll for anchor links on the same page
  ---------------------------------------------------------- */
  document.addEventListener('click', function (e) {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;

    const targetId = anchor.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (!target) return;

    e.preventDefault();
    const navHeight = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--nav-height'),
      10
    ) || 70;

    const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
    window.scrollTo({ top: top, behavior: 'smooth' });
  });

  /* ----------------------------------------------------------
     Intersection Observer: fade-in on scroll
  ---------------------------------------------------------- */
  const animatables = document.querySelectorAll('[data-animate]');
  if (animatables.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    animatables.forEach(function (el) { observer.observe(el); });
  } else {
    // Fallback: show everything immediately
    animatables.forEach(function (el) { el.classList.add('animated'); });
  }
})();

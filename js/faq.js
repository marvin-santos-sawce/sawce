/* ═══════════════════════════════════════════════
   SAWCE COMPANY — FAQ Accordion v1.0
   ═══════════════════════════════════════════════ */

'use strict';

/* ─────────────────────────────────────────────
   FAQ Accordion Logic
───────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(button => {
    button.addEventListener('click', () => {
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      const answerId = button.getAttribute('aria-controls');
      const answer = document.getElementById(answerId);

      // Close all other questions
      faqQuestions.forEach(otherButton => {
        if (otherButton !== button) {
          otherButton.setAttribute('aria-expanded', 'false');
          const otherAnswerId = otherButton.getAttribute('aria-controls');
          const otherAnswer = document.getElementById(otherAnswerId);
          otherAnswer.hidden = true;
          otherButton.querySelector('.faq-icon').textContent = '+';
        }
      });

      // Toggle current question
      button.setAttribute('aria-expanded', !isExpanded);
      answer.hidden = isExpanded;
      button.querySelector('.faq-icon').textContent = isExpanded ? '+' : '−';
    });
  });

  // Mobile menu handler (from main.js)
  const mobileBtn = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Responsive mobile nav
  function handleResize() {
    const isMobile = window.innerWidth < 768;
    const desktopNav = document.getElementById('desktop-nav');
    const headerCta = document.getElementById('header-cta');

    if (desktopNav) desktopNav.style.display = isMobile ? 'none' : 'flex';
    if (headerCta) headerCta.style.display = isMobile ? 'none' : 'inline-block';
    if (!isMobile && mobileMenu) mobileMenu.classList.add('hidden');
  }

  window.addEventListener('resize', handleResize);
  handleResize();
});

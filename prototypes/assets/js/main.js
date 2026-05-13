// === Gavia Works 2026 — Main JS ===
document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuBtn = document.querySelector('[data-mobile-menu-btn]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu && !mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
    }
  });

  const header = document.querySelector('[data-header]');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('nav-blur', 'border-b', 'border-gavia-border');
      } else {
        header.classList.remove('nav-blur', 'border-b', 'border-gavia-border');
      }
    }, { passive: true });
  }

  // Mobile mega menu accordion
  const megaTriggers = document.querySelectorAll('[data-mega-trigger]');
  megaTriggers.forEach(trigger => {
    trigger.setAttribute('aria-expanded', 'false');
    const toggleBtn = trigger.querySelector('[data-mega-toggle]');
    if (!toggleBtn) return;
    toggleBtn.addEventListener('click', (e) => {
      if (window.matchMedia('(min-width: 1024px)').matches) return;
      e.preventDefault();
      const expanded = trigger.getAttribute('aria-expanded') === 'true';
      megaTriggers.forEach(t => t.setAttribute('aria-expanded', 'false'));
      trigger.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (mobileMenu) mobileMenu.classList.add('hidden');
      }
    });
  });
});

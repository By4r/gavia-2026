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

  // Dil seçici — şimdilik sadece aktif state toggle (i18n entegrasyonu sonra)
  document.querySelectorAll('[data-lang-switch]').forEach(group => {
    const buttons = group.querySelectorAll('[data-lang]');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => {
          b.classList.remove('text-gavia-mint');
          b.classList.add('text-gray-400', 'hover:text-gavia-mint');
          b.removeAttribute('aria-current');
        });
        btn.classList.add('text-gavia-mint');
        btn.classList.remove('text-gray-400', 'hover:text-gavia-mint');
        btn.setAttribute('aria-current', 'true');
      });
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

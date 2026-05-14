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

  // Dil seçici — dropdown (desktop) + expanded list (mobile)
  const langSwitcher = document.querySelector('[data-lang-switcher]');
  if (langSwitcher) {
    const trigger = langSwitcher.querySelector('[data-lang-trigger]');
    const menu = langSwitcher.querySelector('[data-lang-menu]');
    const itemsOf = (root) => [...root.querySelectorAll('[role="option"]')];

    const openMenu = () => {
      menu.classList.remove('hidden');
      trigger.setAttribute('aria-expanded', 'true');
      const selected = itemsOf(menu).find(i => i.getAttribute('aria-selected') === 'true');
      (selected || itemsOf(menu)[0]).focus();
    };
    const closeMenu = (returnFocus) => {
      menu.classList.add('hidden');
      trigger.setAttribute('aria-expanded', 'false');
      if (returnFocus) trigger.focus();
    };

    trigger.addEventListener('click', () => {
      menu.classList.contains('hidden') ? openMenu() : closeMenu(false);
    });

    document.addEventListener('click', (e) => {
      if (!langSwitcher.contains(e.target) && !menu.classList.contains('hidden')) closeMenu(false);
    });

    document.addEventListener('keydown', (e) => {
      if (menu.classList.contains('hidden')) return;
      const list = itemsOf(menu);
      const idx = list.indexOf(document.activeElement);
      if (e.key === 'Escape') { e.preventDefault(); closeMenu(true); }
      if (e.key === 'ArrowDown') { e.preventDefault(); list[(idx + 1) % list.length].focus(); }
      if (e.key === 'ArrowUp') { e.preventDefault(); list[(idx - 1 + list.length) % list.length].focus(); }
      if (e.key === 'Home') { e.preventDefault(); list[0].focus(); }
      if (e.key === 'End') { e.preventDefault(); list[list.length - 1].focus(); }
    });

    itemsOf(menu).forEach(item => {
      item.addEventListener('click', () => selectLang(item.dataset.lang));
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectLang(item.dataset.lang); }
      });
    });

    // Mobile expanded list — aynı selectLang çağırır
    document.querySelectorAll('[data-lang-switcher-mobile] [role="option"]').forEach(item => {
      item.addEventListener('click', () => selectLang(item.dataset.lang));
    });

    function selectLang(code) {
      document.documentElement.lang = code;
      const current = langSwitcher.querySelector('[data-lang-current]');
      if (current) current.textContent = code.toUpperCase();

      const syncList = (root) => {
        itemsOf(root).forEach(i => {
          const sel = i.dataset.lang === code;
          i.setAttribute('aria-selected', String(sel));
          sel ? i.setAttribute('aria-current', 'true') : i.removeAttribute('aria-current');
          const check = i.querySelector('[data-lang-check]');
          if (check) check.classList.toggle('hidden', !sel);
        });
      };
      syncList(menu);
      const mobileRoot = document.querySelector('[data-lang-switcher-mobile]');
      if (mobileRoot) syncList(mobileRoot);

      try { localStorage.setItem('gavia-lang', code); } catch {}
      closeMenu(false);
    }
  }

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

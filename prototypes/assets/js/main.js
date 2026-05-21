// === Gavia Works 2026 — Main JS ===
document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuBtn = document.querySelector('[data-mobile-menu-btn]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');

  // Mobile menüye desktop mega-trigger'ların sub-link'lerini accordion olarak
  // inject et — flat anchor link yerine "Hizmetler ▾ → Özel Yazılım, Mobil..."
  // expandable yapı. native <details>/<summary> kullanır, ekstra JS gerektirmez.
  (function buildMobileMega() {
    if (!mobileMenu) return;
    const mobileNav = mobileMenu.querySelector('nav');
    if (!mobileNav) return;
    document.querySelectorAll('header[data-header] nav.hidden.lg\\:flex [data-mega-trigger]').forEach(trigger => {
      const toggleBtn = trigger.querySelector('[data-mega-toggle]');
      if (!toggleBtn) return;
      const label = (toggleBtn.firstChild?.textContent || toggleBtn.textContent || '').trim();
      if (!label) return;
      const mobileLink = [...mobileNav.querySelectorAll(':scope > a')].find(a => a.textContent.trim() === label);
      if (!mobileLink) return;
      const subLinks = trigger.querySelectorAll('.mega-link');
      if (!subLinks.length) return;

      const details = document.createElement('details');
      details.className = 'mobile-mega';
      const summary = document.createElement('summary');
      summary.textContent = label;
      details.appendChild(summary);
      subLinks.forEach(sl => {
        const a = document.createElement('a');
        a.href = sl.getAttribute('href') || '#';
        a.textContent = sl.dataset.megaTitle || sl.querySelector('.font-semibold')?.textContent.trim() || sl.textContent.trim();
        details.appendChild(a);
      });
      // Ürünler accordion'ına Çalışmalar ekle (patron isteği — calismalar
      // ana mobile tab'ı yerine ürünler dropdown'ı içinde alt seçenek)
      if (label === 'Ürünler') {
        const cal = document.createElement('a');
        cal.href = './calismalar.html';
        cal.textContent = 'Çalışmalar';
        details.appendChild(cal);
      }
      mobileLink.replaceWith(details);
    });
  })();
  const syncMenuLock = () => {
    const open = mobileMenu && !mobileMenu.classList.contains('hidden');
    if (open) {
      // Scrollbar yer alanını compense et — overflow:hidden açılınca scrollbar
      // kaybolur ve içerik 15px sağa kayar. Padding-right ile aynı genişlikte
      // boşluk bırakırız, viewport sabit kalır.
      const sbw = window.innerWidth - document.documentElement.clientWidth;
      if (sbw > 0) document.body.style.paddingRight = sbw + 'px';
    } else {
      document.body.style.paddingRight = '';
    }
    document.body.classList.toggle('is-mobile-menu-open', !!open);
    if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  };
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      // Menü kapanırken açık mega trigger'ları da kapat
      if (mobileMenu.classList.contains('hidden')) {
        document.querySelectorAll('[data-mega-trigger]').forEach(t => t.setAttribute('aria-expanded', 'false'));
      }
      syncMenuLock();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu && !mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
      document.querySelectorAll('[data-mega-trigger]').forEach(t => t.setAttribute('aria-expanded', 'false'));
      syncMenuLock();
    }
  });

  // Mobile menüdeki tüm link'lere click → menü kapansın (anchor olmasa bile)
  if (mobileMenu) {
    mobileMenu.querySelectorAll('a[href]').forEach(link => {
      link.addEventListener('click', () => {
        // Mega trigger içindeki link ise menüyü kapatma (alt seçenekleri açıyor olabilir)
        // Ama gerçek bir gezinme link'i ise kapansın.
        const href = link.getAttribute('href');
        if (href && href !== '#') {
          mobileMenu.classList.add('hidden');
          document.querySelectorAll('[data-mega-trigger]').forEach(t => t.setAttribute('aria-expanded', 'false'));
          syncMenuLock();
        }
      });
    });
  }

  const header = document.querySelector('[data-header]');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('nav-blur');
      } else {
        header.classList.remove('nav-blur');
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

  // Mega menu billboard: option hover'da showcase görsel + title/desc swap
  megaTriggers.forEach(trigger => {
    const showcase = trigger.querySelector('[data-mega-showcase]');
    if (!showcase) return;
    const imgEl   = showcase.querySelector('[data-mega-image]');
    const titleEl = showcase.querySelector('[data-mega-title]');
    const descEl  = showcase.querySelector('[data-mega-desc]');
    const bodyEl  = showcase.querySelector('.mega-showcase-body');
    const links   = trigger.querySelectorAll('.mega-link[data-mega-image-src]');
    if (!imgEl || !links.length) return;

    // Fallback için tek seferlik onerror handler
    if (imgEl.dataset.fallback) {
      imgEl.addEventListener('error', function fb() {
        imgEl.removeEventListener('error', fb);
        imgEl.src = imgEl.dataset.fallback;
      });
    }

    let current = imgEl.src;
    let swapTimer = null;
    const apply = (link) => {
      const src   = link.dataset.megaImageSrc;
      const fb    = link.dataset.megaImageFallback || '';
      const title = link.dataset.megaTitle || '';
      const desc  = link.dataset.megaDesc  || '';
      if (!src || src === current) return;
      current = src;

      imgEl.classList.add('is-swapping');
      if (bodyEl) bodyEl.classList.add('is-swapping');
      clearTimeout(swapTimer);
      swapTimer = setTimeout(() => {
        imgEl.dataset.fallback = fb;
        imgEl.src = src;
        if (titleEl && title) titleEl.textContent = title;
        if (descEl  && desc ) descEl.textContent  = desc;
        // tek seferlik fallback rebind
        if (fb) {
          imgEl.onerror = () => { imgEl.onerror = null; imgEl.src = fb; };
        }
        // bir sonraki frame'de opacity geri gelsin
        requestAnimationFrame(() => {
          imgEl.classList.remove('is-swapping');
          if (bodyEl) bodyEl.classList.remove('is-swapping');
        });
      }, 180);
    };

    links.forEach(link => {
      link.addEventListener('mouseenter', () => apply(link));
      link.addEventListener('focus',      () => apply(link));
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
          i.classList.toggle('hidden', sel);
          i.setAttribute('tabindex', sel ? '-1' : '0');
        });
      };
      syncList(menu);
      const mobileRoot = document.querySelector('[data-lang-switcher-mobile]');
      if (mobileRoot) syncList(mobileRoot);

      try { localStorage.setItem('gavia-lang', code); } catch {}
      closeMenu(false);
    }

    let initialLang = 'en';
    try { initialLang = localStorage.getItem('gavia-lang') || 'en'; } catch {}
    selectLang(initialLang);
  }

  // Footer reveal: spacer height = footer height (kopma olmasın), hero gizleme
  const revealSpacer = document.querySelector('.footer-reveal-spacer');
  const heroStickyEl = document.querySelector('.hero-sticky');
  const footerFixed = document.querySelector('.footer-fixed-bottom');
  if (revealSpacer && footerFixed) {
    const syncSpacer = () => { revealSpacer.style.height = footerFixed.offsetHeight + 'px'; };
    syncSpacer();
    window.addEventListener('resize', syncSpacer, { passive: true });
  }
  if (revealSpacer && heroStickyEl && 'IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      heroStickyEl.classList.toggle('is-hidden', entry.isIntersecting);
    }, { threshold: 0 }).observe(revealSpacer);
  }

  // Fast-scroll flash fix: hero-zone'u geçer geçmez hero'yu gizle.
  // Observer'ın gecikmesinde hero focus-chip'leri footer-reveal alanında bir an
  // gözüküyordu — scroll listener anında hide eder, observer back-up rolünde kalır.
  const heroZoneEl = document.querySelector('.hero-zone');
  if (heroZoneEl && heroStickyEl) {
    const syncHeroHide = () => {
      const past = window.scrollY > (heroZoneEl.offsetTop + heroZoneEl.offsetHeight - 1);
      heroStickyEl.classList.toggle('is-hidden', past);
    };
    syncHeroHide();
    window.addEventListener('scroll', syncHeroHide, { passive: true });
    window.addEventListener('resize', syncHeroHide, { passive: true });
  }

  // Products scroll-lock (Thoughtworks-style): sticky pane + IntersectionObserver.
  // Mobile (<768) ve prefers-reduced-motion'da observer çalışmaz, kartlar default
  // görünür kalır (CSS fallback). Footer reveal observer'ı ayrı kapsam, çakışma yok.
  const productsRoot = document.querySelector('[data-products-scroll]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile     = window.matchMedia('(max-width: 767px)').matches;
  if (productsRoot && 'IntersectionObserver' in window && !reduceMotion && !isMobile) {
    const steps  = productsRoot.querySelectorAll('[data-products-step]');
    const slides = productsRoot.querySelectorAll('[data-products-slide]');
    const progressBars = productsRoot.querySelectorAll('[data-products-progress] span');

    const setActive = (idx) => {
      steps.forEach((s, i)        => s.classList.toggle('is-active', i === idx));
      slides.forEach((s, i)       => s.classList.toggle('is-active', i === idx));
      progressBars.forEach((p, i) => p.classList.toggle('is-active', i === idx));
    };

    // rootMargin: viewport ortasında dar bir bant — kartın merkezi banda
    // girdiğinde aktif olsun (Thoughtworks dump'taki -45/-45 değeri)
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idx = parseInt(entry.target.dataset.productsStep, 10);
          if (!Number.isNaN(idx)) setActive(idx);
        }
      });
    }, { threshold: 0, rootMargin: '-45% 0px -45% 0px' });

    steps.forEach(step => io.observe(step));
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (mobileMenu) {
          mobileMenu.classList.add('hidden');
          document.querySelectorAll('[data-mega-trigger]').forEach(t => t.setAttribute('aria-expanded', 'false'));
          syncMenuLock();
        }
      }
    });
  });

  // Cookie consent banner — dynamic DOM injection, localStorage-gated.
  // Skipped on pages with data-no-cookie body attribute (yapay-zeka cinematic).
  (function initCookieBanner() {
    if (document.body.hasAttribute('data-no-cookie')) return;
    let stored = null;
    try { stored = localStorage.getItem('gavia-cookie-consent'); } catch {}
    if (stored) return;

    const cookiePath = /\/(hizmetler|urunler|calismalar|surdurulebilirlik)\//.test(window.location.pathname)
      ? '../cerez-politikasi.html'
      : './cerez-politikasi.html';

    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-live', 'polite');
    banner.setAttribute('aria-label', 'Çerez tercihi');
    banner.innerHTML = `
      <div class="cookie-banner__body">
        <p class="cookie-banner__text">
          Bu sitede deneyimi iyileştirmek için çerez kullanıyoruz.
          <a href="${cookiePath}">Çerez Politikası</a>
        </p>
        <div class="cookie-banner__actions">
          <button type="button" class="cookie-banner__btn cookie-banner__btn--ghost" data-cookie-decline>Reddet</button>
          <button type="button" class="cookie-banner__btn cookie-banner__btn--primary" data-cookie-accept>Kabul Et</button>
        </div>
      </div>
    `;
    document.body.appendChild(banner);
    requestAnimationFrame(() => banner.classList.add('is-visible'));

    const dismiss = (value) => {
      try { localStorage.setItem('gavia-cookie-consent', value); } catch {}
      banner.classList.remove('is-visible');
      setTimeout(() => banner.remove(), 300);
    };
    banner.querySelector('[data-cookie-accept]').addEventListener('click', () => dismiss('accept'));
    banner.querySelector('[data-cookie-decline]').addEventListener('click', () => dismiss('decline'));
  })();

  // Case-study gallery lightbox — click .gallery-item to enlarge, with prev/next + keyboard nav.
  (function buildGalleryLightbox() {
    const items = document.querySelectorAll('.gallery-item');
    if (!items.length) return;

    const css = document.createElement('style');
    css.textContent = `
      .gallery-item { cursor: zoom-in; }
      .gv-lightbox {
        position: fixed; inset: 0; z-index: 100;
        background: rgba(2,8,55,0.94);
        display: flex; align-items: center; justify-content: center;
        opacity: 0; pointer-events: none;
        transition: opacity .28s ease;
        padding: 5vh 6vw;
      }
      .gv-lightbox.is-open { opacity: 1; pointer-events: auto; }
      .gv-lightbox-stage {
        position: relative;
        width: min(1400px, 90vw);
        height: min(82vh, 820px);
        border-radius: 14px;
        overflow: hidden;
        background: rgba(255,255,255,0.04);
        box-shadow: 0 40px 100px -40px rgba(0,0,0,0.6);
      }
      .gv-lightbox-image {
        width: 100%; height: 100%;
        background-size: contain; background-position: center; background-repeat: no-repeat;
        transition: opacity .25s ease;
      }
      .gv-lightbox-close, .gv-lightbox-arrow {
        position: absolute;
        width: 46px; height: 46px;
        border-radius: 999px;
        background: rgba(255,255,255,0.08);
        border: 1px solid rgba(255,255,255,0.16);
        color: #fff;
        display: inline-flex; align-items: center; justify-content: center;
        cursor: pointer;
        transition: background .25s, border-color .25s, transform .25s;
        font-size: 18px;
      }
      .gv-lightbox-close:hover, .gv-lightbox-arrow:hover {
        background: rgba(63,213,173,0.18);
        border-color: rgba(63,213,173,0.45);
      }
      .gv-lightbox-close {
        top: max(24px, 3vh); right: max(24px, 3vw); z-index: 2;
      }
      .gv-lightbox-arrow {
        top: 50%; transform: translateY(-50%);
      }
      .gv-lightbox-arrow:hover { transform: translateY(-50%) scale(1.05); }
      .gv-lightbox-arrow.prev { left: max(20px, 2vw); }
      .gv-lightbox-arrow.next { right: max(20px, 2vw); }
      .gv-lightbox-counter {
        position: absolute;
        bottom: max(24px, 3vh); left: 50%; transform: translateX(-50%);
        color: rgba(255,255,255,0.7);
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 12px; letter-spacing: .08em;
      }
      @media (max-width: 640px) {
        .gv-lightbox { padding: 4vh 4vw; }
        .gv-lightbox-arrow { width: 40px; height: 40px; }
      }
    `;
    document.head.appendChild(css);

    const overlay = document.createElement('div');
    overlay.className = 'gv-lightbox';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Görsel önizleme');
    overlay.innerHTML = `
      <button class="gv-lightbox-close" type="button" aria-label="Kapat"><i class="fa-solid fa-xmark"></i></button>
      <button class="gv-lightbox-arrow prev" type="button" aria-label="Önceki görsel"><i class="fa-solid fa-chevron-left"></i></button>
      <div class="gv-lightbox-stage">
        <div class="gv-lightbox-image"></div>
      </div>
      <button class="gv-lightbox-arrow next" type="button" aria-label="Sonraki görsel"><i class="fa-solid fa-chevron-right"></i></button>
      <div class="gv-lightbox-counter"></div>
    `;
    document.body.appendChild(overlay);

    const imageEl = overlay.querySelector('.gv-lightbox-image');
    const counterEl = overlay.querySelector('.gv-lightbox-counter');
    const closeBtn = overlay.querySelector('.gv-lightbox-close');
    const prevBtn = overlay.querySelector('.gv-lightbox-arrow.prev');
    const nextBtn = overlay.querySelector('.gv-lightbox-arrow.next');

    const urls = Array.from(items).map(item => {
      const style = item.getAttribute('style') || '';
      const m = style.match(/url\(['"]?([^'")]+)['"]?\)/);
      return m ? m[1] : '';
    }).filter(Boolean);

    if (!urls.length) return;

    let currentIndex = 0;

    const renderAt = (i) => {
      currentIndex = ((i % urls.length) + urls.length) % urls.length;
      imageEl.style.backgroundImage = `url('${urls[currentIndex]}')`;
      counterEl.textContent = `${currentIndex + 1} / ${urls.length}`;
    };

    const open = (i) => {
      renderAt(i);
      overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    };
    const close = () => {
      overlay.classList.remove('is-open');
      document.body.style.overflow = '';
    };

    items.forEach((item, i) => {
      item.addEventListener('click', () => open(i));
      item.setAttribute('role', 'button');
      item.setAttribute('tabindex', '0');
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open(i);
        }
      });
    });
    closeBtn.addEventListener('click', close);
    prevBtn.addEventListener('click', (e) => { e.stopPropagation(); renderAt(currentIndex - 1); });
    nextBtn.addEventListener('click', (e) => { e.stopPropagation(); renderAt(currentIndex + 1); });
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) close();
    });
    document.addEventListener('keydown', (e) => {
      if (!overlay.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') renderAt(currentIndex - 1);
      else if (e.key === 'ArrowRight') renderAt(currentIndex + 1);
    });
  })();
});

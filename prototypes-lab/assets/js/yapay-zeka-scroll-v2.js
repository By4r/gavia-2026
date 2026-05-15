// Gavia Works — Yapay Zeka V2
// Persistent video crossfade + GSAP ScrollTrigger + Lenis + scroll-rail
// Shares yapay-zeka-scene.js (which reads --scene-accent CSS var).

(function () {
  // Reduced motion bypass: native scroll, no animation
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.site-bg__video').forEach((v, i) => {
      if (i !== 0) { try { v.pause(); } catch {} }
    });
    return;
  }

  function ready(fn) {
    if (document.readyState === 'complete') fn();
    else window.addEventListener('load', fn, { once: true });
  }

  ready(function boot() {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    const Lenis = window.Lenis;

    if (!gsap || !ScrollTrigger || !Lenis) {
      console.warn('[yapay-zeka-scroll-v2] GSAP / ScrollTrigger / Lenis not available');
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // ── Lenis smooth scroll (cinematic slowdown via wheelMultiplier) ──
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.9
    });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    // ── Persistent background crossfade ──
    const bgVideos = Array.from(document.querySelectorAll('.site-bg__video'));
    const bgByStage = Object.fromEntries(bgVideos.map(v => [v.dataset.stage, v]));
    let activeBgStage = '00';

    function activateBg(stage) {
      if (stage === activeBgStage) return;
      const next = bgByStage[stage];
      const prev = bgByStage[activeBgStage];
      if (!next) return;
      if (isMobile && stage !== '00') return;

      try { next.load?.(); } catch {}
      const playPromise = next.play?.();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {});
      }
      gsap.to(next, { autoAlpha: 1, duration: 0.6, ease: 'power2.out',
        onStart: () => next.classList.add('is-active') });
      if (prev) {
        gsap.to(prev, { autoAlpha: 0, duration: 0.6, ease: 'power2.out',
          onComplete: () => { try { prev.pause?.(); } catch {} prev.classList.remove('is-active'); } });
      }
      activeBgStage = stage;
    }

    // ── Scroll-rail wiring ──
    const RAIL_LABELS = {
      '00': '//00 YAPAY ZEKA',
      '01': '//01 OTOMASYON',
      '02': '//02 AI AGENT',
      '03': '//03 VERI & BELGE',
      '04': '//04 ETIK & KVKK',
      '05': '//05 KONUSALIM'
    };
    const railLabel = document.querySelector('.scroll-rail__label');
    const railSegs  = Array.from(document.querySelectorAll('.scroll-rail__segments li'));

    function setActiveStage(stage) {
      if (railLabel) railLabel.textContent = RAIL_LABELS[stage] || railLabel.textContent;
      const n = parseInt(stage, 10);
      railSegs.forEach((seg, i) => {
        seg.classList.toggle('is-active', i === n);
        seg.classList.toggle('is-done', i < n);
        if (i < n)      seg.style.setProperty('--seg-progress', '1');
        else if (i > n) seg.style.setProperty('--seg-progress', '0');
      });
    }

    // ── Initial hidden state for pinned chapter fade containers ──
    const chapters = document.querySelectorAll('.chapter[data-stage]');
    if (!isMobile) {
      chapters.forEach((chapter) => {
        const stage = chapter.getAttribute('data-stage');
        if (!stage || stage === '00' || stage === '05') return;
        const fade = chapter.querySelector('.chapter__fade');
        if (fade) gsap.set(fade, { autoAlpha: 0, y: 40 });
      });
    }

    function simpleFadeUp(chapter) {
      const fade = chapter.querySelector('.chapter__fade');
      if (!fade) return;
      gsap.fromTo(fade,
        { autoAlpha: 0, y: 40 },
        { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power2.out',
          scrollTrigger: { trigger: chapter, start: 'top 80%', toggleActions: 'play none none reverse' } });
    }

    // ── Hero (stage 00): scene baseline + rail seg 0 + body class ──
    const hero = document.querySelector('[data-stage="00"]');
    if (hero) {
      ScrollTrigger.create({
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          window.__yzScene?.setStage('00', self.progress);
          railSegs[0]?.style.setProperty('--seg-progress', self.progress.toFixed(3));
        },
        onLeave: () => { document.body.classList.add('in-chapter'); },
        onEnterBack: () => {
          document.body.classList.remove('in-chapter');
          setActiveStage('00');
          activateBg('00');
        }
      });
    }

    // ── Per-chapter pinned timeline + bg crossfade trigger ──
    chapters.forEach((chapter) => {
      const stage = chapter.getAttribute('data-stage');
      if (!stage || stage === '00') return;

      const pin = chapter.querySelector('.chapter__pin');
      const fade = chapter.querySelector('.chapter__fade');
      const isCta = stage === '05' || !pin;

      // Crossfade + rail label trigger (fires just before pin engages)
      ScrollTrigger.create({
        trigger: chapter,
        start: 'top 70%',
        end: 'top 30%',
        onEnter: () => {
          activateBg(stage);
          setActiveStage(stage);
          if (isCta) document.body.classList.add('in-cta');
        },
        onEnterBack: () => {
          activateBg(stage);
          setActiveStage(stage);
          if (!isCta) document.body.classList.remove('in-cta');
        }
      });
      if (isCta) {
        ScrollTrigger.create({
          trigger: chapter,
          start: 'top bottom',
          end: 'top 70%',
          onLeaveBack: () => document.body.classList.remove('in-cta')
        });
      }

      // Mobile / CTA bypass — no pinning, simple fade-up + stage progress
      if (isMobile || isCta) {
        simpleFadeUp(chapter);
        ScrollTrigger.create({
          trigger: chapter,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: true,
          onUpdate: (self) => { window.__yzScene?.setStage(stage, self.progress); }
        });
        return;
      }

      // Desktop pinned chapter with text stagger reveal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: chapter,
          pin: pin,
          start: 'top top',
          end: '+=100%',
          scrub: 0.4,
          onUpdate: (self) => {
            window.__yzScene?.setStage(stage, self.progress);
            const segIdx = parseInt(stage, 10);
            railSegs[segIdx]?.style.setProperty('--seg-progress', self.progress.toFixed(3));
          }
        }
      });

      if (fade) {
        tl.fromTo(fade, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, ease: 'power2.out', duration: 0.2 }, 0);
      }

      const items = chapter.querySelectorAll('.chapter__media li');
      const tail  = chapter.querySelector('.chapter__media details.more, .chapter__media .btn-primary');
      if (items.length) {
        gsap.set(items, { autoAlpha: 0, y: 24 });
        items.forEach((li, i) => {
          const start = 0.20 + i * 0.15;
          tl.to(li, { autoAlpha: 1, y: 0, ease: 'power2.out', duration: 0.12 }, start);
        });
      }
      if (tail) {
        gsap.set(tail, { autoAlpha: 0, y: 16 });
        tl.to(tail, { autoAlpha: 1, y: 0, ease: 'power2.out', duration: 0.15 }, 0.82);
      }
      if (fade) {
        tl.to(fade, { autoAlpha: 0.25, y: -16, ease: 'power2.in', duration: 0.15 }, 0.92);
      }
    });

    // Debounced resize
    let resizeTimer = 0;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => { ScrollTrigger.refresh(); }, 200);
    });
  });
})();

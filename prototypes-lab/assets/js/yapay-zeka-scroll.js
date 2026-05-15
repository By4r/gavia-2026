// Gavia Works — Yapay Zeka T3
// GSAP ScrollTrigger + Lenis smooth scroll, wired to the Three.js scene
// via the public hook window.__yzScene?.setStage(stage, progress).

(function () {
  // --- Reduced motion bypass: native scroll, no animation ---
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  // GSAP and Lenis are loaded as defer scripts in the page. Because this
  // module is loaded as type=module (which is implicitly deferred), and the
  // CDN scripts are also deferred, we still wait for window load to be safe.
  function ready(fn) {
    if (document.readyState === 'complete') fn();
    else window.addEventListener('load', fn, { once: true });
  }

  ready(function boot() {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    const Lenis = window.Lenis;

    if (!gsap || !ScrollTrigger || !Lenis) {
      // Libraries missing — fail soft, native scroll keeps working.
      // eslint-disable-next-line no-console
      console.warn('[yapay-zeka-scroll] GSAP / ScrollTrigger / Lenis not available');
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // --- Lenis smooth scroll ---
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    const chapters = document.querySelectorAll('.chapter[data-stage]');

    // Set initial hidden state for pinned chapters once GSAP is confirmed
    // available. Default CSS keeps chapters visible so non-JS / pre-init
    // renders don't show empty space.
    if (!isMobile) {
      chapters.forEach((chapter) => {
        const stage = chapter.getAttribute('data-stage');
        if (!stage || stage === '00' || stage === '05') return;
        const fade = chapter.querySelector('.chapter__fade');
        if (fade) gsap.set(fade, { autoAlpha: 0, y: 40 });
      });
    }

    // Helper: simple fade-up for a chapter (no pin)
    function simpleFadeUp(chapter) {
      const fade = chapter.querySelector('.chapter__fade');
      if (!fade) return;
      gsap.fromTo(
        fade,
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: chapter,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }

    // Hero (stage 00): reset scene baseline; also drive body.in-chapter toggle
    const hero = document.querySelector('[data-stage="00"]');
    if (hero) {
      ScrollTrigger.create({
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          window.__yzScene?.setStage('00', self.progress);
        },
        onLeave: () => document.body.classList.add('in-chapter'),
        onEnterBack: () => document.body.classList.remove('in-chapter')
      });
    }

    // Per-chapter video play/pause via IntersectionObserver (efficient,
    // independent of pin scrub). Only plays when ≥25% visible.
    const videos = document.querySelectorAll('.chapter__visual video');
    if (videos.length && 'IntersectionObserver' in window) {
      const vio = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          const v = e.target;
          if (e.isIntersecting && e.intersectionRatio > 0.25) {
            const p = v.play();
            if (p && typeof p.catch === 'function') p.catch(() => {});
          } else {
            v.pause();
          }
        });
      }, { threshold: [0, 0.25, 0.5, 1] });
      videos.forEach((v) => vio.observe(v));
    }

    chapters.forEach((chapter) => {
      const stage = chapter.getAttribute('data-stage');
      if (!stage || stage === '00') return; // hero handled above

      const pin = chapter.querySelector('.chapter__pin');
      const fade = chapter.querySelector('.chapter__fade');
      const isCta = stage === '05' || !pin;

      // Mobile bypass — no pinning, just fade-up
      if (isMobile || isCta) {
        simpleFadeUp(chapter);
        // Still wire stage progress (without pin) so scene reacts.
        ScrollTrigger.create({
          trigger: chapter,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: true,
          onUpdate: (self) => {
            window.__yzScene?.setStage(stage, self.progress);
          }
        });
        return;
      }

      // Desktop: pinned chapter with fade-in then fade-out
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: chapter,
          pin: pin,
          start: 'top top',
          end: '+=80%',
          scrub: true,
          onUpdate: (self) => {
            window.__yzScene?.setStage(stage, self.progress);
          }
        }
      });

      if (fade) {
        // Entry: 0..30% of pin → fade-up
        tl.fromTo(
          fade,
          { autoAlpha: 0, y: 40 },
          { autoAlpha: 1, y: 0, ease: 'power2.out', duration: 0.3 },
          0
        );
        // Hold middle
        tl.to(fade, { autoAlpha: 1, duration: 0.4 }, 0.3);
        // Exit: 70%..100% → fade to 0.3 so next takes over
        tl.to(
          fade,
          { autoAlpha: 0.3, y: -10, ease: 'power2.in', duration: 0.3 },
          0.7
        );
      }

      // Light parallax on the chapter video figure (subtle scale + y)
      const visual = chapter.querySelector('.chapter__visual');
      if (visual) {
        gsap.fromTo(
          visual,
          { yPercent: 6, scale: 1.04 },
          {
            yPercent: -6,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: chapter,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          }
        );
      }
    });

    // --- Debounced resize → ScrollTrigger.refresh ---
    let resizeTimer = 0;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);
    });
  });
})();

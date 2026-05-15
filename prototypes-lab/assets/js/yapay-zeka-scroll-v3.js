// Gavia Works — Yapay Zeka V3
// Particle cinematic choreography (scatter / cameraDive / lattice)
// + Plazma section long-pin (300vh) + scroll-rail 7 segments
// Shares yapay-zeka-scene.js (V3 mode enables morph + bloom).

(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
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
      console.warn('[yapay-zeka-scroll-v3] libraries missing');
      return;
    }
    gsap.registerPlugin(ScrollTrigger);

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

    // ── Persistent BG video crossfade (V2 pattern, deepest layer) ──
    const bgVideos = Array.from(document.querySelectorAll('.site-bg__video'));
    const bgByStage = Object.fromEntries(bgVideos.map(v => [v.dataset.stage, v]));
    let activeBgStage = '00';

    function activateBg(stage) {
      // Map plazma to stage '02' (network video) for BG since plazma section
      // hides the BG via body.in-plazma; we still set it for return path.
      const mapped = stage === 'plazma' ? '02' : stage;
      if (mapped === activeBgStage) return;
      const next = bgByStage[mapped];
      const prev = bgByStage[activeBgStage];
      if (!next) return;
      if (isMobile && mapped !== '00') return;

      // All BG videos autoplay=true; we never pause them — only crossfade opacity.
      // This avoids the "play() while not ready" stutter on scroll triggers.
      const p = next.play?.(); if (p?.catch) p.catch(() => {});
      gsap.to(next, { autoAlpha: 1, duration: 0.6, ease: 'power2.out',
        onStart: () => next.classList.add('is-active') });
      if (prev) {
        gsap.to(prev, { autoAlpha: 0, duration: 0.6, ease: 'power2.out',
          onComplete: () => prev.classList.remove('is-active') });
      }
      activeBgStage = mapped;
    }

    // ── Scroll-rail wiring (7 segments incl. plazma) ──
    const RAIL_LABELS = {
      '00': '//00 YAPAY ZEKA',
      '01': '//01 OTOMASYON',
      '02': '//02 AI AGENT',
      'plazma': '//PLAZMA — DÜŞÜNCENİN AKIŞI',
      '03': '//03 VERI & BELGE',
      '04': '//04 ETIK & KVKK',
      '05': '//05 KONUSALIM'
    };
    const RAIL_ORDER = ['00', '01', '02', 'plazma', '03', '04', '05'];
    const railLabel = document.querySelector('.scroll-rail__label');
    const railSegs  = Array.from(document.querySelectorAll('.scroll-rail__segments li'));

    function setActiveStage(stage) {
      if (railLabel) railLabel.textContent = RAIL_LABELS[stage] || railLabel.textContent;
      const idx = RAIL_ORDER.indexOf(stage);
      railSegs.forEach((seg, i) => {
        seg.classList.toggle('is-active', i === idx);
        seg.classList.toggle('is-done', i < idx);
        if (i < idx)      seg.style.setProperty('--seg-progress', '1');
        else if (i > idx) seg.style.setProperty('--seg-progress', '0');
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

    // ── Hero (stage 00) ──
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
        onLeave:     () => document.body.classList.add('in-chapter'),
        onEnterBack: () => {
          document.body.classList.remove('in-chapter');
          setActiveStage('00');
          activateBg('00');
        }
      });
    }

    // ── Plazma section: long pin 300vh ──
    const plazma = document.querySelector('.plazma[data-stage="plazma"]');
    if (plazma) {
      const pin   = plazma.querySelector('.plazma__pin');
      const video = plazma.querySelector('.plazma__video');
      const label = plazma.querySelector('.plazma__label');

      // Plazma video has autoplay attr — always running, no pause/play toggling
      // (toggling causes "stutter on first frame" bug Beyar reported).

      // Stage activation + entry/exit + body.in-plazma class
      ScrollTrigger.create({
        trigger: plazma,
        start: 'top 70%',
        end:   'bottom 30%',
        onEnter:     () => { setActiveStage('plazma'); activateBg('plazma'); document.body.classList.add('in-plazma'); },
        onEnterBack: () => { setActiveStage('plazma'); activateBg('plazma'); document.body.classList.add('in-plazma'); },
        onLeave:     () => { document.body.classList.remove('in-plazma'); },
        onLeaveBack: () => { document.body.classList.remove('in-plazma'); }
      });

      if (!isMobile) {
        // ENTRY transition: top bottom → top top (1 viewport scroll)
        //   video opacity 0 → 1, scene fades out — "dönüştürüyormuşuz" hissi
        const sceneEl = document.getElementById('scene-canvas');
        if (video) gsap.set(video, { autoAlpha: 0 });
        if (label) gsap.set(label, { autoAlpha: 0 });
        ScrollTrigger.create({
          trigger: plazma,
          start: 'top bottom',
          end:   'top top',
          scrub: 0.5,
          onUpdate: (self) => {
            if (video) gsap.set(video, { autoAlpha: self.progress });
            if (label) gsap.set(label, { autoAlpha: self.progress * 0.7 });
            if (sceneEl) sceneEl.style.opacity = (1 - self.progress * 0.95).toFixed(3);
          }
        });

        // Plazma section is now a scroll spacer (300vh) — plazma__media is fixed.
        // Track progress for scene state + rail segment, no pin.
        ScrollTrigger.create({
          trigger: plazma,
          start: 'top top',
          end:   'bottom bottom',
          scrub: 0.4,
          onUpdate: (self) => {
            window.__yzScene?.setStage('plazma', self.progress);
            railSegs[3]?.style.setProperty('--seg-progress', self.progress.toFixed(3));
          }
        });

        // EXIT transition into Ch03 — video sönümlü devam eder (Beyar request)
        //   Plazma end → Ch03 start: video 1 → 0.35 (sönümlü, Ch03'e taşır)
        //   Ch03 mid → Ch03 end: video 0.35 → 0 (tam fade-out)
        const ch3 = document.querySelector('[data-stage="03"]');
        if (ch3) {
          // Plazma end → Ch03 top — opacity 1 → 0.35
          ScrollTrigger.create({
            trigger: ch3,
            start: 'top bottom',
            end:   'top top',
            scrub: 0.5,
            onUpdate: (self) => {
              if (video) gsap.set(video, { autoAlpha: 1 - self.progress * 0.65 });
              if (label) gsap.set(label, { autoAlpha: (1 - self.progress) * 0.7 });
              if (sceneEl) sceneEl.style.opacity = (0.05 + self.progress * 0.55).toFixed(3);
            }
          });
          // Ch03 inside pin — opacity 0.35 → 0 (true exit at the very end)
          ScrollTrigger.create({
            trigger: ch3,
            start: 'top top',
            end:   'bottom top',
            scrub: 0.5,
            onUpdate: (self) => {
              if (video) gsap.set(video, { autoAlpha: 0.35 * (1 - self.progress) });
              if (sceneEl) sceneEl.style.opacity = (0.6 + self.progress * 0.4).toFixed(3);
            }
          });
        }
      } else {
        // Mobile — just label visible, particle stage call on scroll
        if (label) gsap.set(label, { autoAlpha: 0.7 });
        ScrollTrigger.create({
          trigger: plazma,
          start: 'top 80%',
          end:   'bottom 20%',
          scrub: true,
          onUpdate: (self) => { window.__yzScene?.setStage('plazma', self.progress); }
        });
      }
    }

    // ── Per-chapter pinned timeline + stage progress + rail label ──
    chapters.forEach((chapter) => {
      const stage = chapter.getAttribute('data-stage');
      if (!stage || stage === '00') return;

      const pin  = chapter.querySelector('.chapter__pin');
      const fade = chapter.querySelector('.chapter__fade');
      const isCta = stage === '05' || !pin;

      // Stage activation + rail label + bg crossfade
      ScrollTrigger.create({
        trigger: chapter,
        start: 'top 70%',
        end:   'top 30%',
        onEnter:     () => { setActiveStage(stage); activateBg(stage); if (isCta) document.body.classList.add('in-cta'); },
        onEnterBack: () => { setActiveStage(stage); activateBg(stage); if (!isCta) document.body.classList.remove('in-cta'); }
      });
      if (isCta) {
        ScrollTrigger.create({
          trigger: chapter,
          start: 'top bottom',
          end: 'top 70%',
          onLeaveBack: () => document.body.classList.remove('in-cta')
        });
      }

      // Mobile / CTA bypass
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
            const segIdx = RAIL_ORDER.indexOf(stage);
            if (segIdx >= 0) railSegs[segIdx]?.style.setProperty('--seg-progress', self.progress.toFixed(3));
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

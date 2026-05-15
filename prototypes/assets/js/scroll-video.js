/* ============================================================
   scroll-video.js — v11
   ------------------------------------------------------------
   MEGA HERO scroll-linked:
   #hero (240vh kapsayıcı, sticky pin içinde 100vh ekran).
   GSAP ScrollTrigger ile dış scroll progress → video.currentTime
   + Screen A (01 intro) / Screen B (02 selected work) crossfade
   + alt-sağ progress bar + label (01 / 02).
   Mobil + reduced-motion: scrub kapalı, video autoplay loop'a düşer
   (CSS .ai-hero-screen-b display:none — basit hero).
   ============================================================ */
(function () {
  'use strict';

  var prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isMobile = window.matchMedia('(max-width: 768px)').matches;

  function initHeroScrub() {
    var section = document.querySelector('#hero[data-hero-scrub]');
    if (!section) return;
    var video = section.querySelector('[data-hero-video]');
    if (!video) return;

    var screenA = section.querySelector('[data-hero-screen="a"]');
    var screenB = section.querySelector('[data-hero-screen="b"]');
    var screenC = section.querySelector('[data-hero-screen="c"]');
    var progressBar = section.querySelector('[data-hero-progress-bar]');
    var progressLabel = section.querySelector('[data-hero-progress-label]');
    var marqueeTrack = section.querySelector('.ai-hero-marquee-r1 .ai-hero-marquee-track');
    var zCards = screenC ? screenC.querySelectorAll('[data-z-card]') : [];

    // Mobil / reduced-motion → video basit autoplay loop'a düşer
    if (prefersReduce || isMobile) {
      try {
        video.setAttribute('loop', '');
        video.muted = true;
        video.playsInline = true;
        var pf = video.play();
        if (pf && typeof pf.catch === 'function') pf.catch(function () {});
      } catch (e) {}
      if (screenA) screenA.classList.add('is-active');
      return;
    }

    if (!window.gsap || !window.ScrollTrigger) {
      // GSAP yoksa graceful: video autoplay loop, sadece Screen A görünür
      try {
        video.setAttribute('loop', '');
        video.muted = true;
        var pg = video.play();
        if (pg && typeof pg.catch === 'function') pg.catch(function () {});
      } catch (e) {}
      if (screenA) screenA.classList.add('is-active');
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // v14 — Lenis kaldırıldı. Düz native scroll + ScrollTrigger scrub.

    // v15 — Scroll-driven seek with "seeking flag" pattern (Apple iPhone product pages mantığı)
    // Bir seek tamamlanmadan yenisi başlatılmaz → decode jank elimine, scroll-driven HISSI korunur.
    video.muted = true;
    video.playsInline = true;
    video.removeAttribute('autoplay');
    video.removeAttribute('loop');
    try { video.pause(); } catch (e) {}

    var dur = 0;
    var pendingT = -1;
    var seeking = false;
    var SEEK_THRESHOLD = 0.04;

    video.addEventListener('seeked', function () {
      seeking = false;
      // If new target arrived during seek, fire it now
      if (pendingT >= 0 && Math.abs(pendingT - video.currentTime) > SEEK_THRESHOLD) {
        var t = pendingT;
        pendingT = -1;
        seeking = true;
        try { video.currentTime = t; } catch (e) { seeking = false; }
      } else {
        pendingT = -1;
      }
    });

    function setup() {
      dur = video.duration;
      if (!dur || isNaN(dur) || dur === Infinity) {
        video.setAttribute('loop', '');
        var pp = video.play(); if (pp && pp.catch) pp.catch(function () {});
      }
      // initial seek to 0
      try { video.currentTime = 0; } catch (e) {}

      // 3-phase: A 0-10% (intro), B 10-45% (marquee), C 45-100% (z-stage cards)
      var A_END = 0.10;
      var B_END = 0.45;
      var lastScreen = '';
      if (screenA) screenA.classList.add('is-active');

      // z-stage card crossfade bandı (45..98%) içinde 4 kart
      var N = zCards.length || 4;
      var Z_LOW = B_END + 0.04;   // 0.49
      var Z_HIGH = 0.98;
      var Z_STEP = (Z_HIGH - Z_LOW) / (N - 1);

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.0,
        onUpdate: function (self) {
          var p = self.progress;

          // 1) video frame seek (rate-limited via seeking flag)
          if (dur) {
            var t = Math.min(p * dur, dur - 0.05);
            if (!seeking) {
              if (Math.abs(t - video.currentTime) > SEEK_THRESHOLD) {
                seeking = true;
                pendingT = -1;
                try { video.currentTime = t; } catch (e) { seeking = false; }
              }
            } else {
              pendingT = t;
            }
          }

          // 2) screen swap (A/B/C)
          var nextScreen = p < A_END ? 'a' : (p < B_END ? 'b' : 'c');
          if (nextScreen !== lastScreen) {
            if (screenA) screenA.classList.toggle('is-active', nextScreen === 'a');
            if (screenB) screenB.classList.toggle('is-active', nextScreen === 'b');
            if (screenC) screenC.classList.toggle('is-active', nextScreen === 'c');
            lastScreen = nextScreen;
          }

          // 3) progress bar + label (01 / 02 / 03 — three sections in hero)
          if (progressBar) progressBar.style.transform = 'scaleX(' + p.toFixed(3) + ')';
          if (progressLabel) {
            var lbl = nextScreen === 'a' ? '01' : (nextScreen === 'b' ? '02' : '03');
            progressLabel.textContent = lbl + ' / 03';
          }

          // 4) marquee — B aralığı (A_END..B_END) → translateX 0 → -50%
          if (marqueeTrack) {
            var mp;
            if (p < A_END) mp = 0;
            else if (p > B_END) mp = 1;
            else mp = (p - A_END) / (B_END - A_END);
            marqueeTrack.style.transform = 'translateX(' + (-mp * 50).toFixed(3) + '%)';
          }

          // 5) Z-stage glass cards — Apple Deep Dive: translateY parallax + opacity fade
          // d < 0 (upcoming): aşağıdan yukarı çıkar; d > 0 (passed): yukarıdan dışarı çıkar
          if (zCards.length) {
            for (var i = 0; i < zCards.length; i++) {
              var card = zCards[i];
              var center = Z_LOW + i * Z_STEP;
              var d = p - center;
              var absD = Math.abs(d);
              var fadeBand = Z_STEP * 0.55;
              var opacity = 1 - Math.min(1, absD / fadeBand);
              opacity = Math.max(0, opacity);
              // parallax offset: -80px (yukarıdan inerken) → 0 → +80px (aşağıdan dışarı)
              var ty = -d * 220; // px
              card.style.opacity = opacity.toFixed(3);
              card.style.transform =
                'translate(-50%, calc(-50% + ' + ty.toFixed(1) + 'px))';
              card.style.zIndex = String(20 + Math.round((1 - absD) * 20));
            }
          }
        }
      });

      window.addEventListener('resize', function () { ScrollTrigger.refresh(); }, { passive: true });
    }

    if (video.readyState >= 1) {
      setup();
    } else {
      video.addEventListener('loadedmetadata', setup, { once: true });
      try { video.load(); } catch (e) {}
    }
  }

  if (document.readyState === 'complete') {
    initHeroScrub();
  } else {
    window.addEventListener('load', initHeroScrub);
  }

  /* ---------- v17b — Section reveal: #hizmet-rail çıkarıldı (sticky pane'i kırıyor)
                #hero exit overlay: hero pin'in son %8'inde hero overlay opacity 0'a (smooth fade) ---------- */
  function initSectionReveal() {
    if (prefersReduce || !window.gsap || !window.ScrollTrigger) return;

    // Hero exit fade — pin'in son piece'inde hero overlay yumuşar; Section 03 alttan beliriyormuş gibi
    var heroOverlay = document.querySelector('.ai-hero-video-overlay');
    var heroPin = document.querySelector('.ai-hero-pin');
    if (heroOverlay && heroPin) {
      gsap.to(heroPin, {
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'bottom 88%',
          end: 'bottom top',
          scrub: 1.0
        }
      });
    }

    // Hero pin sırasında header transparent, hero bittikten sonra "scrolled" state
    ScrollTrigger.create({
      trigger: '#hero',
      start: 'bottom 80%',
      end: 'bottom top',
      toggleClass: { targets: 'body', className: 'is-past-hero' }
    });

    // CTA + footer için slide-up (Section 03 hariç — sticky kırılıyor)
    var targets = document.querySelectorAll('#cta');
    targets.forEach(function (s) {
      gsap.fromTo(
        s,
        { yPercent: 8, opacity: 0.5 },
        {
          yPercent: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: { trigger: s, start: 'top 92%', end: 'top 55%', scrub: 1.0 }
        }
      );
    });
  }
  if (document.readyState === 'complete') {
    initSectionReveal();
  } else {
    window.addEventListener('load', initSectionReveal);
  }

  /* ---------- Section 04 — Hero Screen C'ye taşındı; legacy init no-op ---------- */
  function initYaklasimZ() {
    return; // disabled
    if (prefersReduce || isMobile) return;
    if (!window.gsap || !window.ScrollTrigger) return;
    var sec = document.querySelector('#yaklasim[data-yaklasim-scrub]');
    if (!sec) return;
    var cards = sec.querySelectorAll('[data-z-card]');
    if (!cards.length) return;
    var bar = sec.querySelector('[data-z-progress-bar]');
    var lbl = sec.querySelector('[data-z-progress-label]');
    var N = cards.length;

    ScrollTrigger.create({
      trigger: sec,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.0,
      onUpdate: function (self) {
        var p = self.progress;
        // v13b — full-bleed image crossfade + ken-burns (Z-axis transform KALDIRILDI; "bozuk olmadı")
        var BAND_LOW = 0.06;
        var BAND_HIGH = 0.94;
        var bandStep = (BAND_HIGH - BAND_LOW) / (N - 1);
        cards.forEach(function (card, i) {
          var center = BAND_LOW + i * bandStep;
          var d = p - center; // signed
          var absD = Math.abs(d);
          // crossfade: full visible at center, 0 by next step boundary
          var opacity = 1 - Math.min(1, absD / (bandStep * 0.6));
          opacity = Math.max(0, opacity);
          // ken-burns: hafif scale + drift (scroll yönüne göre)
          var scale = 1.06 + d * 0.04;
          card.style.opacity = opacity.toFixed(3);
          card.style.transform = 'scale(' + Math.max(1, scale).toFixed(3) + ')';
          card.style.zIndex = String(20 + Math.round((1 - absD) * 20));
        });

        // progress + label
        if (bar) bar.style.transform = 'scaleX(' + p.toFixed(3) + ')';
        if (lbl) {
          // active = which card center is closest behind us
          var active = Math.min(N, Math.max(1, Math.round(p * (N + 0.4))));
          lbl.textContent = '0' + active + ' / 0' + N;
        }

        // legacy data-active-step for video filter swap kept
        var idx = Math.min(N - 1, Math.floor(p * N));
        sec.dataset.activeStep = String(idx);
        sec.classList.add('has-active');
      }
    });

    window.addEventListener('resize', function () { ScrollTrigger.refresh(); }, { passive: true });
  }

  if (document.readyState === 'complete') {
    initYaklasimZ();
  } else {
    window.addEventListener('load', initYaklasimZ);
  }
})();

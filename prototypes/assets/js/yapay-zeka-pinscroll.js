// === Yapay Zeka — horizontal pin-scroll engine ===
// Vertical scroll inside a `.pin-section` translates into horizontal
// movement of `.gallery__row` (the card track). Section "sticks" until
// the entire track has been traversed, then releases vertically.
//
// Mobile (<768px) and prefers-reduced-motion: bypass entirely, falling
// back to the native horizontal scroll the gallery already supports.

(function () {
  'use strict';

  var MQ_MOBILE = '(max-width: 768px)';
  var MQ_REDUCE = '(prefers-reduced-motion: reduce)';

  function shouldDisable() {
    return window.matchMedia(MQ_MOBILE).matches ||
           window.matchMedia(MQ_REDUCE).matches;
  }

  function setupSection(section) {
    var inner = section.querySelector('.pin-section__inner');
    var track = section.querySelector('[data-pin-track]');
    var gallery = section.querySelector('.gallery');
    if (!inner || !track || !gallery) return null;

    var state = {
      section: section,
      inner: inner,
      track: track,
      gallery: gallery,
      maxOffset: 0,
      sectionTop: 0,
      sectionHeight: 0,
      lastProgress: -1,
    };

    function measure() {
      // Reset track transform before measuring so offsets are natural
      var prevTransform = track.style.transform;
      track.style.transform = '';
      // Symmetric-gap geometry:
      //   At progress 0, first card sits `galleryPadLeft` from viewport-left.
      //   At progress 1, we want last card to sit the same gap (`galleryPadLeft`)
      //   from viewport-right — mirrored breathing room.
      //
      //   trackContentW = track.offsetWidth - trackPadRight  (last card's right
      //     edge in track coordinates)
      //   Initial last-card-right in viewport = galleryPadLeft + trackContentW
      //   Desired last-card-right in viewport = clientWidth - galleryPadLeft
      //   → maxOffset = trackContentW + galleryPadLeft - (clientWidth - galleryPadLeft)
      //              = trackContentW + 2*galleryPadLeft - clientWidth
      var galleryCS = getComputedStyle(gallery);
      var galleryPadL = parseFloat(galleryCS.paddingLeft) || 0;
      // track.scrollWidth on a grid container reports the rightmost child edge,
      // NOT including the container's own padding-right. So this is already the
      // last card's right edge in track coordinates — we don't subtract padding.
      var trackContentW = track.scrollWidth;
      var clientW = gallery.clientWidth;
      // maxOffset puts last card's right edge `galleryPadL` inside viewport-right,
      // matching first card's `galleryPadL` gap from viewport-left → symmetric.
      var maxOffset = Math.max(0, trackContentW + 2 * galleryPadL - clientW);
      // Restore so subsequent update() doesn't flash
      if (prevTransform) track.style.transform = prevTransform;
      state.maxOffset = maxOffset;

      // Total scroll distance = 100vh (initial fit) + horizontal travel + comfort buffer.
      // We want a deliberate 1:1.4 ratio: 1px of horizontal card movement takes ~1.4px of
      // vertical scroll, so the user feels the cards "fully traverse" before the page
      // unpins and continues. Patron explicitly wants cards to finish before vertical
      // scroll resumes — generous travel multiplier achieves this without dragging on.
      var vh = window.innerHeight;
      var travel = maxOffset > 0 ? Math.ceil(maxOffset * 1.4) : 0;
      // floor at 0 (no cards beyond viewport → no pinning needed)
      var totalH = vh + travel;
      section.style.setProperty('--pin-h', totalH + 'px');
      section.setAttribute('data-pin-ready', '');

      // Re-read offsetTop after height set
      var rect = section.getBoundingClientRect();
      state.sectionTop = rect.top + window.scrollY;
      state.sectionHeight = section.offsetHeight;
    }

    function update() {
      var scrollY = window.scrollY;
      var vh = window.innerHeight;
      var raw = (scrollY - state.sectionTop) / (state.sectionHeight - vh);
      var progress = Math.max(0, Math.min(1, raw));
      if (progress === state.lastProgress) return;
      state.lastProgress = progress;
      var x = -state.maxOffset * progress;
      track.style.transform = 'translate3d(' + x.toFixed(1) + 'px, 0, 0)';
    }

    function reset() {
      section.style.removeProperty('--pin-h');
      section.removeAttribute('data-pin-ready');
      track.style.transform = '';
      state.lastProgress = -1;
    }

    return { measure: measure, update: update, reset: reset, state: state };
  }

  var sections = [];
  var disabled = false;
  var rafPending = false;

  function onScroll() {
    if (rafPending || disabled) return;
    rafPending = true;
    requestAnimationFrame(function () {
      rafPending = false;
      for (var i = 0; i < sections.length; i++) sections[i].update();
    });
  }

  function onResize() {
    // Re-evaluate disabled state on resize (e.g., user rotates device)
    var nowDisabled = shouldDisable();
    if (nowDisabled !== disabled) {
      disabled = nowDisabled;
      if (disabled) {
        sections.forEach(function (s) { s.reset(); });
      } else {
        sections.forEach(function (s) { s.measure(); s.update(); });
      }
      return;
    }
    if (disabled) return;
    sections.forEach(function (s) { s.measure(); s.update(); });
  }

  function init() {
    var nodes = document.querySelectorAll('[data-pin-section]');
    if (!nodes.length) return;
    nodes.forEach(function (n) {
      var s = setupSection(n);
      if (s) sections.push(s);
    });
    if (!sections.length) return;

    disabled = shouldDisable();
    if (!disabled) {
      sections.forEach(function (s) { s.measure(); s.update(); });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    // Images inside the cards can load late and shift trackW — recompute on load
    var imgs = document.querySelectorAll('[data-pin-track] img');
    imgs.forEach(function (img) {
      if (img.complete) return;
      img.addEventListener('load', onResize, { once: true });
      img.addEventListener('error', onResize, { once: true });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

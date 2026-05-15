// === Gavia Works 2026 — Hero Magnetic Orb (v8 — Fantasy minimal) ===
// Yeniden yazıldı: önceki v7 chaotic particle (h1-gravity, ripple, scroll-morph,
// video-glow rings, trail excitation) Beyar feedback ile silindi.
//
// v8 design intent — Fantasy.co editorial minimal:
//   - Single ambient orb that softly follows the mouse (lerp 0.08)
//   - Idle: orb gently drifts on a slow lissajous path near center
//   - Mouse move: orb magnetically attracts toward pointer + scale up
//   - Quiet field of dots in the background (60 desktop / 30 mobile) — no
//     connection lines, no aggressive forces; just a soft constellation
//   - Mint accent only, monochrom restraint
//   - prefers-reduced-motion: orb fades to a static breathe; dots frozen
//
// No dependencies, no brand.css edits, no main.js edits. Performance 60fps.
(() => {
  const canvas = document.getElementById('hero-particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  const MINT = { r: 63, g: 213, b: 173 };
  const MINT_BRIGHT = { r: 110, g: 232, b: 198 };

  const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mqMobile = window.matchMedia('(max-width: 767px)');

  let dpr = 1;
  let width = 0, height = 0;
  let centerX = 0, centerY = 0;
  let dots = [];

  // Orb: lerped mouse follow + idle drift
  const orb = {
    x: 0, y: 0,           // current rendered position
    tx: 0, ty: 0,         // target (mouse OR idle drift)
    baseR: 120,           // radius
    scale: 1,             // grows on mouse-active
    targetScale: 1,
  };

  let mouseActive = false;
  let lastMoveTs = 0;
  let rafId = null;
  let paused = false;
  let reduceMotion = mqReduce.matches;
  let isMobile = mqMobile.matches;

  const dotCount = () => (isMobile ? 30 : 60);

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = Math.max(1, Math.floor(width * dpr));
    canvas.height = Math.max(1, Math.floor(height * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    centerX = width * 0.5;
    centerY = height * 0.55;
    orb.baseR = Math.min(width, height) * (isMobile ? 0.22 : 0.18);
    if (dots.length !== dotCount()) initDots();
    // place orb at center initially
    if (orb.x === 0 && orb.y === 0) {
      orb.x = centerX; orb.y = centerY;
      orb.tx = centerX; orb.ty = centerY;
    }
  }

  function rand(min, max) { return Math.random() * (max - min) + min; }

  function initDots() {
    const n = dotCount();
    dots = new Array(n).fill(0).map(() => ({
      x: rand(0, width),
      y: rand(0, height),
      r: rand(0.6, 1.8),
      a: rand(0.18, 0.55),
      phase: Math.random() * Math.PI * 2,
      speed: rand(0.0008, 0.0022),
    }));
  }

  // Pointer
  function pointerToLocal(e) {
    const rect = canvas.getBoundingClientRect();
    const cx = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const cy = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
    return { x: cx, y: cy };
  }
  function onPointerMove(e) {
    const { x, y } = pointerToLocal(e);
    orb.tx = x;
    orb.ty = y;
    mouseActive = true;
    lastMoveTs = performance.now();
    orb.targetScale = 1.12;
  }
  function onPointerLeave() {
    mouseActive = false;
    orb.targetScale = 1;
  }
  // Listen on the hero section, not just canvas — so movement over h1/CTA
  // chips still drives the orb (canvas is z-0 below content).
  const heroEl = canvas.closest('[data-hero-spotlight]') || canvas.parentElement;
  const moveTarget = heroEl || window;
  moveTarget.addEventListener('mousemove', onPointerMove);
  moveTarget.addEventListener('mouseleave', onPointerLeave);
  moveTarget.addEventListener('touchmove', onPointerMove, { passive: true });
  moveTarget.addEventListener('touchend', onPointerLeave);

  // Idle drift (slow lissajous around hero center) when mouse inactive >800ms
  function idleTarget(t) {
    const a = Math.sin(t * 0.00018) * width * 0.18;
    const b = Math.cos(t * 0.00023) * height * 0.10;
    orb.tx = centerX + a;
    orb.ty = centerY + b;
  }

  function step(t) {
    if (!mouseActive || (t - lastMoveTs) > 800) {
      idleTarget(t);
      orb.targetScale = 1;
    }

    // Lerp orb position + scale
    const lerp = reduceMotion ? 0.04 : 0.08;
    orb.x += (orb.tx - orb.x) * lerp;
    orb.y += (orb.ty - orb.y) * lerp;
    orb.scale += (orb.targetScale - orb.scale) * 0.08;

    ctx.clearRect(0, 0, width, height);

    // Background dots
    for (let i = 0; i < dots.length; i++) {
      const d = dots[i];
      const tw = reduceMotion ? 1 : (0.6 + Math.sin(t * d.speed + d.phase) * 0.4);
      const a = d.a * tw;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${MINT.r},${MINT.g},${MINT.b},${a.toFixed(3)})`;
      ctx.fill();
    }

    // Orb — soft mint glow disk
    const breathe = reduceMotion ? 1 : (1 + Math.sin(t * 0.0014) * 0.05);
    const r = orb.baseR * orb.scale * breathe;

    // Outer glow
    const glow = ctx.createRadialGradient(orb.x, orb.y, r * 0.1, orb.x, orb.y, r * 2.6);
    glow.addColorStop(0,    `rgba(${MINT_BRIGHT.r},${MINT_BRIGHT.g},${MINT_BRIGHT.b},0.42)`);
    glow.addColorStop(0.28, `rgba(${MINT.r},${MINT.g},${MINT.b},0.18)`);
    glow.addColorStop(0.65, `rgba(${MINT.r},${MINT.g},${MINT.b},0.05)`);
    glow.addColorStop(1,    'rgba(2,5,20,0)');
    ctx.fillStyle = glow;
    ctx.fillRect(orb.x - r * 2.8, orb.y - r * 2.8, r * 5.6, r * 5.6);

    // Inner core
    const core = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, r * 0.7);
    core.addColorStop(0,   `rgba(${MINT_BRIGHT.r},${MINT_BRIGHT.g},${MINT_BRIGHT.b},0.55)`);
    core.addColorStop(0.6, `rgba(${MINT.r},${MINT.g},${MINT.b},0.18)`);
    core.addColorStop(1,   `rgba(${MINT.r},${MINT.g},${MINT.b},0)`);
    ctx.fillStyle = core;
    ctx.beginPath();
    ctx.arc(orb.x, orb.y, r * 0.7, 0, Math.PI * 2);
    ctx.fill();

    // Single thin ring (Fantasy restraint — one accent line, not 7)
    if (!reduceMotion) {
      ctx.beginPath();
      ctx.arc(orb.x, orb.y, r * 0.9, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${MINT_BRIGHT.r},${MINT_BRIGHT.g},${MINT_BRIGHT.b},0.32)`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    if (!paused) rafId = requestAnimationFrame(step);
  }

  // Visibility pause
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      paused = true;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
    } else if (paused) {
      paused = false;
      rafId = requestAnimationFrame(step);
    }
  });

  mqReduce.addEventListener?.('change', (e) => { reduceMotion = e.matches; });
  mqMobile.addEventListener?.('change', (e) => { isMobile = e.matches; initDots(); });

  let resizeRaf = null;
  window.addEventListener('resize', () => {
    if (resizeRaf) cancelAnimationFrame(resizeRaf);
    resizeRaf = requestAnimationFrame(resize);
  }, { passive: true });

  resize();
  initDots();
  rafId = requestAnimationFrame(step);
})();

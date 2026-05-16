import * as THREE from 'https://unpkg.com/three@0.158.0/build/three.module.js';

const CANVAS_HOST_ID = 'scene-canvas';
const COLOR_BG = 0x0A0F1C;

// Read accent from CSS var --scene-accent if present (V2/V3 mint #3FD5AD);
// fallback to V1 cyan #2DD4BF when the var is not defined.
function readSceneAccent() {
  try {
    const v = getComputedStyle(document.documentElement).getPropertyValue('--scene-accent').trim();
    if (v) return new THREE.Color(v);
  } catch (e) {}
  return new THREE.Color(0x2DD4BF);
}
const COLOR_PRIMARY = readSceneAccent();
const COLOR_SECONDARY = COLOR_PRIMARY.clone().multiplyScalar(0.45);

const SPHERE_RADIUS = 4;
const LINE_THRESHOLD = 1.1;
const NEIGHBORS = 3;

function probeWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch (e) { return false; }
}

function makeCircleTexture(boost) {
  const size = 64;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  if (boost) {
    // V3 — brighter, tighter hot-spot, glow falloff (electric feel)
    g.addColorStop(0,   'rgba(255,255,255,1)');
    g.addColorStop(0.2, 'rgba(255,255,255,0.95)');
    g.addColorStop(0.5, 'rgba(255,255,255,0.55)');
    g.addColorStop(1,   'rgba(255,255,255,0)');
  } else {
    g.addColorStop(0,   'rgba(255,255,255,1)');
    g.addColorStop(0.4, 'rgba(255,255,255,0.6)');
    g.addColorStop(1,   'rgba(255,255,255,0)');
  }
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function randomInSphere(radius) {
  let x, y, z, d2;
  do {
    x = Math.random() * 2 - 1;
    y = Math.random() * 2 - 1;
    z = Math.random() * 2 - 1;
    d2 = x * x + y * y + z * z;
  } while (d2 > 1 || d2 < 0.0001);
  return [x * radius, y * radius, z * radius];
}

function buildParticles(count) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const p = randomInSphere(SPHERE_RADIUS);
    positions[i * 3] = p[0];
    positions[i * 3 + 1] = p[1];
    positions[i * 3 + 2] = p[2];
    const c = Math.random() < 0.7 ? COLOR_PRIMARY : COLOR_SECONDARY;
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }
  return { positions, colors };
}

function buildLatticeTargets(count) {
  // 3D cubic lattice — same count of points, organized grid
  const side = Math.ceil(Math.cbrt(count));
  const step = (SPHERE_RADIUS * 1.5) / side;
  const offset = -(side - 1) * step / 2;
  const out = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const x = i % side;
    const y = Math.floor(i / side) % side;
    const z = Math.floor(i / (side * side)) % side;
    out[i * 3]     = offset + x * step;
    out[i * 3 + 1] = offset + y * step;
    out[i * 3 + 2] = offset + z * step;
  }
  return out;
}

function buildLines(positions, count) {
  const segments = [];
  const segColors = [];
  for (let i = 0; i < count; i++) {
    const xi = positions[i * 3], yi = positions[i * 3 + 1], zi = positions[i * 3 + 2];
    const dists = [];
    for (let j = 0; j < count; j++) {
      if (j === i) continue;
      const dx = positions[j * 3] - xi;
      const dy = positions[j * 3 + 1] - yi;
      const dz = positions[j * 3 + 2] - zi;
      const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (d < LINE_THRESHOLD) dists.push({ j, d });
    }
    dists.sort((a, b) => a.d - b.d);
    const top = dists.slice(0, NEIGHBORS);
    for (const { j, d } of top) {
      if (j < i) continue;
      const t = 1 - d / LINE_THRESHOLD;
      segments.push(xi, yi, zi, positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]);
      const r = COLOR_PRIMARY.r * t, g = COLOR_PRIMARY.g * t, b = COLOR_PRIMARY.b * t;
      segColors.push(r, g, b, r, g, b);
    }
  }
  return {
    positions: new Float32Array(segments),
    colors: new Float32Array(segColors)
  };
}

// ---- Stage tables ----
// V1/V2 baseline (T4 values preserved bit-for-bit for backward compat)
const STAGE_TABLE_DEFAULT = {
  '00': { z: 8,  rot: 0.0005, opacity: 1.00, orbit: 0, size: 0.08 },
  '01': { z: 6,  rot: 0.0015, opacity: 1.00, orbit: 0, size: 0.07 },
  '02': { z: 7,  rot: 0.0020, opacity: 1.00, orbit: 1, size: 0.10 },
  '03': { z: 4,  rot: 0.0010, opacity: 1.00, orbit: 0, size: 0.12 },
  '04': { z: 9,  rot: 0.0030, opacity: 0.85, orbit: 0, size: 0.07 },
  '05': { z: 12, rot: 0.0026, opacity: 0.65, orbit: 0, size: 0.06 }
};

// V3 — Particle cinematic choreography (Plan A hybrid + boost)
// scatter ∈ [0..1] → scene.scale boost + rot speed boost
// lattice ∈ [0..1] → vertex morph from random sphere → cubic lattice
// fovBoost ∈ [0..1] → camera FOV widens (close-up feel)
const STAGE_TABLE_V3 = {
  '00': { z: 8,   rot: 0.0005, opacity: 1.00, orbit: 0, size: 0.11, scatter: 0,   lattice: 0,   fovBoost: 0 },
  '01': { z: 10,  rot: 0.0030, opacity: 1.00, orbit: 0, size: 0.10, scatter: 1,   lattice: 0,   fovBoost: 0.25 },
  '02': { z: 1.5, rot: 0.0010, opacity: 1.00, orbit: 0, size: 0.22, scatter: 0.3, lattice: 0,   fovBoost: 1 },
  'plazma': { z: 1.5, rot: 0, opacity: 0,    orbit: 0, size: 0.18, scatter: 0,   lattice: 0.3, fovBoost: 0.6 },
  '03': { z: 4,   rot: 0.0008, opacity: 1.00, orbit: 0, size: 0.13, scatter: 0,   lattice: 1,   fovBoost: 0.2 },
  '04': { z: 8,   rot: 0.0003, opacity: 0.55, orbit: 0, size: 0.09, scatter: 0,   lattice: 0.5, fovBoost: 0 },
  '05': { z: 14,  rot: 0,      opacity: 0.25, orbit: 0, size: 0.06, scatter: 0,   lattice: 0,   fovBoost: -0.1 }
};

function nextKey(table, key) {
  if (key === '02' && table['plazma']) return 'plazma';
  if (key === 'plazma') return '03';
  const n = parseInt(key, 10);
  if (!isNaN(n)) {
    const k = String(n + 1).padStart(2, '0');
    if (table[k]) return k;
  }
  return null;
}

async function init() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) return;
  if (!probeWebGL()) return;

  const host = document.getElementById(CANVAS_HOST_ID);
  if (!host) return;

  const isMobile = window.innerWidth < 768;
  const yzVer = document.documentElement.dataset.yzVersion ||
                document.body?.dataset.yzVersion || null;
  const isV2 = yzVer === 'v2';
  const isV3 = yzVer === 'v3';

  const COUNT = isMobile ? 250 : 800;
  const useLines = !isMobile;
  const STAGE_TABLE = isV3 ? STAGE_TABLE_V3 : STAGE_TABLE_DEFAULT;

  // V2/V3 need transparent canvas so background layer shows through;
  // V1 expects opaque scene clear color (matches its CSS gradient).
  const wantTransparent = isV2 || isV3;
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: wantTransparent,
    powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(wantTransparent ? 0x000000 : COLOR_BG, wantTransparent ? 0 : 1);
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.05, 100);
  camera.position.z = 8;

  let points, lines, sprite;
  let originPositions = null;  // V3 — copy of build-time particle positions
  let latticeTargets = null;   // V3 — cubic lattice target positions

  function build() {
    const { positions, colors } = buildParticles(COUNT);
    if (isV3) {
      originPositions = new Float32Array(positions);
      latticeTargets = buildLatticeTargets(COUNT);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    sprite = makeCircleTexture(isV3);
    const mat = new THREE.PointsMaterial({
      size: 0.08,
      sizeAttenuation: true,
      vertexColors: true,
      map: sprite,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      opacity: 1
    });
    points = new THREE.Points(geo, mat);
    scene.add(points);

    if (useLines) {
      const lineData = buildLines(positions, COUNT);
      const lgeo = new THREE.BufferGeometry();
      lgeo.setAttribute('position', new THREE.BufferAttribute(lineData.positions, 3));
      lgeo.setAttribute('color', new THREE.BufferAttribute(lineData.colors, 3));
      const lmat = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: isV3 ? 0.55 : 0.35,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      });
      lines = new THREE.LineSegments(lgeo, lmat);
      scene.add(lines);
    }
  }

  function disposeScene() {
    if (points) { points.geometry.dispose(); points.material.dispose(); scene.remove(points); points = null; }
    if (lines)  { lines.geometry.dispose();  lines.material.dispose();  scene.remove(lines);  lines = null; }
    if (sprite) { sprite.dispose(); sprite = null; }
  }

  build();

  // ---- Postprocessing: UnrealBloomPass for V3 desktop only ----
  let composer = null;
  if (isV3 && !isMobile) {
    try {
      const [{ EffectComposer }, { RenderPass }, { UnrealBloomPass }, { OutputPass }] = await Promise.all([
        import('https://unpkg.com/three@0.158.0/examples/jsm/postprocessing/EffectComposer.js'),
        import('https://unpkg.com/three@0.158.0/examples/jsm/postprocessing/RenderPass.js'),
        import('https://unpkg.com/three@0.158.0/examples/jsm/postprocessing/UnrealBloomPass.js'),
        import('https://unpkg.com/three@0.158.0/examples/jsm/postprocessing/OutputPass.js')
      ]);
      composer = new EffectComposer(renderer);
      composer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      composer.setSize(window.innerWidth, window.innerHeight);
      composer.addPass(new RenderPass(scene, camera));
      const bloom = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        0.55,  // strength — düşük tutuldu (önceki 1.0 net particle'ı blur'ladı)
        0.35,  // radius
        0.15   // threshold — sadece parlak vertex'ler bloom alır, kontrast korunur
      );
      composer.addPass(bloom);
      composer.addPass(new OutputPass());
    } catch (e) {
      composer = null; // fallback to renderer.render
    }
  }

  // ---- Current targets (interpolated within and across stages) ----
  const currentTargets = {
    z: 8, rot: 0.0005, opacity: 1.0, orbit: 0, size: 0.08, pulse: 0,
    scatter: 0, lattice: 0, fovBoost: 0
  };

  function lerpBlend(from, to, p) {
    const out = {};
    for (const k of Object.keys(from)) {
      const a = from[k] || 0, b = (to[k] != null ? to[k] : a);
      out[k] = a + (b - a) * p;
    }
    return out;
  }

  window.__yzScene = {
    setStage(stage, progress) {
      const key = String(stage);
      const cur = STAGE_TABLE[key];
      if (!cur) return;
      const nKey = nextKey(STAGE_TABLE, key);
      const nxt = (nKey && STAGE_TABLE[nKey]) || cur;
      const p = Math.max(0, Math.min(1, progress || 0));
      const blended = lerpBlend(cur, nxt, p);
      currentTargets.z = blended.z;
      currentTargets.rot = blended.rot;
      currentTargets.opacity = blended.opacity;
      currentTargets.orbit = blended.orbit ?? 0;
      currentTargets.size = blended.size;
      // V3 morph params (default 0 for V1/V2)
      currentTargets.scatter  = blended.scatter  ?? 0;
      currentTargets.lattice  = blended.lattice  ?? 0;
      currentTargets.fovBoost = blended.fovBoost ?? 0;
      currentTargets.pulse = key === '02' ? 1 : 0;
    },
    // V3 — direct morph control (additive; V1/V2 do not call)
    setMorph(name, t) {
      const v = Math.max(0, Math.min(1, t || 0));
      if (name in currentTargets) currentTargets[name] = v;
    }
  };

  // ---- Vertex morph: lerp sphere positions ⇄ lattice based on currentTargets.lattice ----
  let lastLatticeApplied = -1;
  function applyVertexMorph() {
    if (!isV3 || !points || !originPositions || !latticeTargets) return;
    const t = currentTargets.lattice;
    // Skip if change negligible
    if (Math.abs(t - lastLatticeApplied) < 0.005) return;
    lastLatticeApplied = t;
    const posAttr = points.geometry.attributes.position;
    const arr = posAttr.array;
    for (let i = 0, n = arr.length; i < n; i++) {
      arr[i] = originPositions[i] * (1 - t) + latticeTargets[i] * t;
    }
    posAttr.needsUpdate = true;
  }

  // ---- Render tick ----
  const start = performance.now();
  const BASE_FOV = 60;

  function tick() {
    const t = performance.now() - start;

    // Camera Z lerp
    camera.position.z += (currentTargets.z - camera.position.z) * 0.08;

    // V3 — FOV widen on cameraDive
    if (isV3) {
      const targetFov = BASE_FOV + currentTargets.fovBoost * 18;
      if (Math.abs(camera.fov - targetFov) > 0.05) {
        camera.fov += (targetFov - camera.fov) * 0.08;
        camera.updateProjectionMatrix();
      }
    }

    // Orbit (stage 02 V1/V2): subtle vertical orbit
    if (currentTargets.orbit > 0) {
      const yTarget = Math.sin(t * 0.0004) * 1.5 * currentTargets.orbit;
      camera.position.y += (yTarget - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);
    } else {
      camera.position.y += (0 - camera.position.y) * 0.05;
    }

    // Rotation
    scene.rotation.y += currentTargets.rot;
    scene.rotation.x = Math.sin(t * 0.0003) * 0.05;

    // V3 — Scatter affects scene.scale (sahte parçalanma)
    if (isV3) {
      const scaleTarget = 1 + currentTargets.scatter * 0.5;
      scene.scale.x += (scaleTarget - scene.scale.x) * 0.06;
      scene.scale.y = scene.scale.x;
      scene.scale.z = scene.scale.x;
      applyVertexMorph();
    }

    // Opacity (pulse for V1/V2 stage 02)
    let targetOpacity = currentTargets.opacity;
    if (currentTargets.pulse > 0) {
      targetOpacity = currentTargets.opacity * (0.85 + Math.sin(t * 0.002) * 0.15);
    }
    let targetSize = currentTargets.size;
    if (currentTargets.pulse > 0) {
      targetSize = currentTargets.size * (0.92 + Math.sin(t * 0.002) * 0.08);
    }
    if (points && points.material) {
      const m = points.material;
      m.opacity = (m.opacity == null ? 1 : m.opacity) + (targetOpacity - (m.opacity == null ? 1 : m.opacity)) * 0.1;
      m.transparent = true;
      m.size += (targetSize - m.size) * 0.1;
    }
    if (lines && lines.material) {
      const lm = lines.material;
      let baseLine = (isV3 ? 0.55 : 0.35);
      // V3 — electric pulse on lines (sin wave amplitude on opacity)
      if (isV3) baseLine = baseLine * (0.70 + 0.30 * Math.sin(t * 0.0035));
      const lineTarget = targetOpacity * baseLine;
      lm.opacity += (lineTarget - lm.opacity) * 0.1;
    }

    if (composer) composer.render();
    else renderer.render(scene, camera);
  }

  let running = false;
  function play() { if (running) return; running = true; renderer.setAnimationLoop(tick); }
  function pause() { if (!running) return; running = false; renderer.setAnimationLoop(null); }
  play();

  let resizeTimer = 0;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      if (composer) composer.setSize(window.innerWidth, window.innerHeight);
    }, 150);
  });

  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) play(); else pause();
    }
  });
  io.observe(host);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) pause(); else play();
  });

  renderer.domElement.addEventListener('webglcontextlost', (e) => {
    e.preventDefault();
    pause();
  });
  renderer.domElement.addEventListener('webglcontextrestored', () => {
    disposeScene();
    build();
    play();
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => { init().catch?.(e => console.warn(e)); });
} else {
  init().catch?.(e => console.warn(e));
}

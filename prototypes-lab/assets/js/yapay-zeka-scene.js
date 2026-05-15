import * as THREE from 'https://unpkg.com/three@0.158.0/build/three.module.js';

const CANVAS_HOST_ID = 'scene-canvas';
const COLOR_BG = 0x0A0F1C;
const COLOR_PRIMARY = new THREE.Color(0x2DD4BF);
const COLOR_SECONDARY = new THREE.Color(0x0F766E);
const SPHERE_RADIUS = 4;
const LINE_THRESHOLD = 1.1;
const NEIGHBORS = 3;

function probeWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch (e) {
    return false;
  }
}

function makeCircleTexture() {
  const size = 64;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.4, 'rgba(255,255,255,0.6)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
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

function init() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) return;
  if (!probeWebGL()) return;

  const host = document.getElementById(CANVAS_HOST_ID);
  if (!host) return;

  const isMobile = window.innerWidth < 768;
  const COUNT = isMobile ? 250 : 800;
  const useLines = !isMobile;

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false,
    powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(COLOR_BG, 1);
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 8;

  let points, lines, sprite;

  function build() {
    const { positions, colors } = buildParticles(COUNT);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    sprite = makeCircleTexture();
    const mat = new THREE.PointsMaterial({
      size: 0.08,
      sizeAttenuation: true,
      vertexColors: true,
      map: sprite,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
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
        opacity: 0.35,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      });
      lines = new THREE.LineSegments(lgeo, lmat);
      scene.add(lines);
    }
  }

  function disposeScene() {
    if (points) {
      points.geometry.dispose();
      points.material.dispose();
      scene.remove(points);
      points = null;
    }
    if (lines) {
      lines.geometry.dispose();
      lines.material.dispose();
      scene.remove(lines);
      lines = null;
    }
    if (sprite) {
      sprite.dispose();
      sprite = null;
    }
  }

  build();

  // T3 — scroll-driven stage targets (consumed by render loop)
  // Stage table (per T3 plan §3):
  //   00 hero  z=8,  rotY 0.0005, opacity 1.0
  //   01       z=6,  rotY 0.001,  opacity 1.0
  //   02       z=7   (orbit y),   rotY 0.0015, opacity pulse
  //   03       z=4,  rotY 0.0008, opacity 1.0
  //   04       z=10, rotY 0.0003, opacity 0.4
  //   05       z=14, rotY 0,      opacity 0.15
  const STAGE_TABLE = {
    '00': { z: 8,  rot: 0.0005, opacity: 1.0,  orbit: 0 },
    '01': { z: 6,  rot: 0.001,  opacity: 1.0,  orbit: 0 },
    '02': { z: 7,  rot: 0.0015, opacity: 1.0,  orbit: 1 }, // orbit=1 → camera y orbit
    '03': { z: 4,  rot: 0.0008, opacity: 1.0,  orbit: 0 },
    '04': { z: 10, rot: 0.0003, opacity: 0.4,  orbit: 0 },
    '05': { z: 14, rot: 0,      opacity: 0.15, orbit: 0 }
  };
  // Currently active target values (interpolated within and across stages)
  const currentTargets = {
    z: 8,
    rot: 0.0005,
    opacity: 1.0,
    orbit: 0,
    pulse: 0
  };
  function lerpStage(from, to, p) {
    return {
      z: from.z + (to.z - from.z) * p,
      rot: from.rot + (to.rot - from.rot) * p,
      opacity: from.opacity + (to.opacity - from.opacity) * p,
      orbit: from.orbit + (to.orbit - from.orbit) * p
    };
  }
  window.__yzScene = {
    setStage(stage, progress) {
      const key = String(stage);
      const cur = STAGE_TABLE[key];
      if (!cur) return;
      // Find next stage as numeric+1, fall back to current if none.
      const n = parseInt(key, 10);
      const nextKey = String(n + 1).padStart(2, '0');
      const nxt = STAGE_TABLE[nextKey] || cur;
      const p = Math.max(0, Math.min(1, progress || 0));
      const blended = lerpStage(cur, nxt, p);
      currentTargets.z = blended.z;
      currentTargets.rot = blended.rot;
      currentTargets.opacity = blended.opacity;
      currentTargets.orbit = blended.orbit;
      // stage 02 pulse — slight breathing on opacity within stage
      if (key === '02') {
        currentTargets.pulse = 1;
      } else {
        currentTargets.pulse = 0;
      }
    }
  };

  const start = performance.now();
  function tick() {
    const t = performance.now() - start;
    // Smooth lerp camera.z toward target
    camera.position.z += (currentTargets.z - camera.position.z) * 0.08;
    // Orbit (stage 02): subtle vertical orbit around scene center
    if (currentTargets.orbit > 0) {
      const yTarget = Math.sin(t * 0.0004) * 1.5 * currentTargets.orbit;
      camera.position.y += (yTarget - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);
    } else {
      camera.position.y += (0 - camera.position.y) * 0.05;
    }
    // Variable rotation speed
    scene.rotation.y += currentTargets.rot;
    scene.rotation.x = Math.sin(t * 0.0003) * 0.05;
    // Particle/line opacity lerp
    let targetOpacity = currentTargets.opacity;
    if (currentTargets.pulse > 0) {
      targetOpacity = currentTargets.opacity * (0.85 + Math.sin(t * 0.002) * 0.15);
    }
    if (points && points.material) {
      const m = points.material;
      m.opacity = (m.opacity == null ? 1 : m.opacity) + (targetOpacity - (m.opacity == null ? 1 : m.opacity)) * 0.1;
      m.transparent = true;
    }
    if (lines && lines.material) {
      const lm = lines.material;
      const lineTarget = targetOpacity * 0.35;
      lm.opacity += (lineTarget - lm.opacity) * 0.1;
    }
    renderer.render(scene, camera);
  }

  let running = false;
  function play() {
    if (running) return;
    running = true;
    renderer.setAnimationLoop(tick);
  }
  function pause() {
    if (!running) return;
    running = false;
    renderer.setAnimationLoop(null);
  }
  play();

  let resizeTimer = 0;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
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
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

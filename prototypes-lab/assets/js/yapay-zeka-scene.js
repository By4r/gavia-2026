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

  const start = performance.now();
  function tick() {
    const t = performance.now() - start;
    scene.rotation.y += 0.0005;
    scene.rotation.x = Math.sin(t * 0.0003) * 0.05;
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

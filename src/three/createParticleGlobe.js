import * as THREE from 'three';

const BRASS = 0xa9833f;
const RADIUS = 2.3;

/**
 * Very simplified continent outlines (rough [lat, lon] polygons, degrees).
 * Nowhere near cartographically precise — this is a decorative background
 * element rendered as sparse points, not a map product — but landmasses
 * should read as recognisable silhouettes rather than a uniform dot-sphere.
 */
const CONTINENTS = [
  // North America
  [
    [70, -165], [70, -60], [50, -55], [25, -80], [15, -95],
    [30, -115], [50, -130], [60, -140], [70, -165],
  ],
  // South America
  [
    [12, -80], [5, -35], [-20, -35], [-55, -70], [-30, -75], [-5, -80], [12, -80],
  ],
  // Africa
  [
    [37, -10], [32, 35], [12, 50], [-35, 20], [-35, 15], [0, 10], [15, -15], [37, -10],
  ],
  // Eurasia
  [
    [70, 30], [75, 100], [65, 170], [50, 140], [20, 105],
    [10, 80], [12, 45], [35, 25], [45, 15], [55, 10], [70, 30],
  ],
  // Australia
  [
    [-10, 113], [-12, 142], [-25, 153], [-38, 145], [-35, 117], [-20, 113], [-10, 113],
  ],
];

function pointInPolygon(lat, lon, poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [latI, lonI] = poly[i];
    const [latJ, lonJ] = poly[j];
    const crosses = lonI > lon !== lonJ > lon;
    if (crosses && lat < ((latJ - latI) * (lon - lonI)) / (lonJ - lonI) + latI) {
      inside = !inside;
    }
  }
  return inside;
}

function isLand(lat, lon) {
  return CONTINENTS.some((poly) => pointInPolygon(lat, lon, poly));
}

/** Dense candidate lattice over the sphere, filtered down to land points. */
function landPositions(targetCount, radius) {
  const candidates = Math.max(targetCount * 6, 8000);
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  const land = [];

  for (let i = 0; i < candidates; i++) {
    const y = 1 - (i / Math.max(candidates - 1, 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = goldenAngle * i;
    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;

    const lat = (Math.asin(y) * 180) / Math.PI;
    const lon = (Math.atan2(z, x) * 180) / Math.PI;

    if (isLand(lat, lon)) land.push([x * radius, y * radius, z * radius]);
  }

  // Downsample if the lattice produced more land points than needed.
  if (land.length <= targetCount) return land;
  const step = land.length / targetCount;
  const picked = [];
  for (let i = 0; i < targetCount; i++) picked.push(land[Math.floor(i * step)]);
  return picked;
}

/**
 * A slowly, continuously rotating point-cloud world globe — a persistent
 * background layer, not scoped to any one section. Geometry is static (built
 * once); only the group's rotation changes per frame, which is why this can
 * run for the whole session without a per-vertex update loop.
 */
export function createParticleGlobe({ container, count, reducedMotion }) {
  const width = container.clientWidth || 1;
  const height = container.clientHeight || 1;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.z = 6.4;

  const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.setSize(width, height);
  renderer.domElement.style.display = 'block';
  container.appendChild(renderer.domElement);

  const points = landPositions(count, RADIUS);
  const positions = new Float32Array(points.length * 3);
  points.forEach(([x, y, z], i) => {
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
  });

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  // Normal blending, not additive: additive barely registers against the
  // light sections (white + a mid-brightness tint stays close to white) —
  // this needs to read clearly against both bg-light and bg-dark.
  const material = new THREE.PointsMaterial({
    color: BRASS,
    size: width < 640 ? 0.045 : 0.036,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.65,
    blending: THREE.NormalBlending,
    depthWrite: false,
  });

  const group = new THREE.Group();
  group.add(new THREE.Points(geometry, material));
  group.rotation.x = 0.35; // slight axial tilt, like a real globe
  scene.add(group);

  const AUTO_ROTATE_SPEED = 0.033; // rad/sec — 40% slower than the original 0.055

  // Slow camera dolly — the globe periodically drifts closer, then eases
  // back out, on top of the constant rotation. One full in-and-out cycle
  // takes DOLLY_PERIOD seconds; DOLLY_AMPLITUDE sets how far it travels.
  const DOLLY_BASE = 6.4;
  const DOLLY_AMPLITUDE = 1.7;
  const DOLLY_PERIOD = 14;

  const clock = new THREE.Clock();
  let raf = null;
  let scrollNudge = 0;

  function renderStaticFrame() {
    renderer.render(scene, camera);
  }

  function frame() {
    raf = requestAnimationFrame(frame);
    const delta = clock.getDelta();
    const t = clock.getElapsedTime();
    group.rotation.y += delta * AUTO_ROTATE_SPEED + scrollNudge * delta * 0.4;
    camera.position.z = DOLLY_BASE + Math.sin((t / DOLLY_PERIOD) * Math.PI * 2) * DOLLY_AMPLITUDE;
    renderer.render(scene, camera);
  }

  function start() {
    if (raf || reducedMotion) return;
    frame();
  }
  function stop() {
    if (raf) cancelAnimationFrame(raf);
    raf = null;
  }
  function setScrollNudge(v) {
    scrollNudge = v;
  }
  function resize() {
    const w = container.clientWidth || 1;
    const h = container.clientHeight || 1;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    if (reducedMotion) renderStaticFrame();
  }
  function dispose() {
    stop();
    geometry.dispose();
    material.dispose();
    renderer.dispose();
    if (renderer.domElement.parentNode === container) {
      container.removeChild(renderer.domElement);
    }
  }

  if (reducedMotion) renderStaticFrame();

  return { start, stop, setScrollNudge, resize, dispose };
}

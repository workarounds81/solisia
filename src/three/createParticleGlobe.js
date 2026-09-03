import * as THREE from 'three';

const BRASS = 0xa9833f;
const RADIUS = 2.1;

/** Even distribution of `count` points on a sphere surface. */
function fibonacciSphere(count, radius) {
  const positions = new Float32Array(count * 3);
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / Math.max(count - 1, 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = goldenAngle * i;
    positions[i * 3] = Math.cos(theta) * r * radius;
    positions[i * 3 + 1] = y * radius;
    positions[i * 3 + 2] = Math.sin(theta) * r * radius;
  }
  return positions;
}

/** Target positions for the "dispersed" swarm state: pushed outward + jittered. */
function dispersedCloud(compact, spread) {
  const out = new Float32Array(compact.length);
  for (let i = 0; i < compact.length; i += 3) {
    const x = compact[i];
    const y = compact[i + 1];
    const z = compact[i + 2];
    const len = Math.hypot(x, y, z) || 1;
    const nx = x / len;
    const ny = y / len;
    const nz = z / len;
    const extra = spread * (0.4 + Math.random() * 0.6);
    out[i] = x + nx * extra + (Math.random() - 0.5) * spread * 0.5;
    out[i + 1] = y + ny * extra + (Math.random() - 0.5) * spread * 0.5;
    out[i + 2] = z + nz * extra + (Math.random() - 0.5) * spread * 0.5;
  }
  return out;
}

/**
 * A lightweight point-cloud sphere: idle wave wobble at rest, and a
 * scroll-driven lerp from "compact sphere" to "dispersed swarm" plus
 * rotation/translation/scale. No shaders, no post-processing — just
 * BufferGeometry position updates, kept cheap enough for mobile.
 */
export function createParticleGlobe({ container, count, reducedMotion }) {
  const width = container.clientWidth || 1;
  const height = container.clientHeight || 1;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.z = 6.2;

  const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.setSize(width, height);
  renderer.domElement.style.display = 'block';
  container.appendChild(renderer.domElement);

  const compact = fibonacciSphere(count, RADIUS);
  const dispersed = dispersedCloud(compact, RADIUS * 1.5);
  const positions = compact.slice();

  const phases = new Float32Array(count);
  for (let i = 0; i < count; i++) phases[i] = Math.random() * Math.PI * 2;

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: BRASS,
    size: width < 640 ? 0.03 : 0.022,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.82,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const group = new THREE.Group();
  group.add(new THREE.Points(geometry, material));
  scene.add(group);

  const posAttr = geometry.attributes.position;
  const clock = new THREE.Clock();

  let raf = null;
  let progress = 0;
  let targetProgress = 0;

  function renderStaticFrame() {
    renderer.render(scene, camera);
  }

  function frame() {
    raf = requestAnimationFrame(frame);
    const t = clock.getElapsedTime();
    progress += (targetProgress - progress) * 0.06;

    const arr = posAttr.array;
    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const cx = compact[ix];
      const cy = compact[ix + 1];
      const cz = compact[ix + 2];
      const dx = dispersed[ix];
      const dy = dispersed[ix + 1];
      const dz = dispersed[ix + 2];
      const len = Math.hypot(cx, cy, cz) || 1;
      const wobble = Math.sin(t * 0.6 + phases[i]) * 0.045;
      arr[ix] = cx + (dx - cx) * progress + (cx / len) * wobble;
      arr[ix + 1] = cy + (dy - cy) * progress + (cy / len) * wobble;
      arr[ix + 2] = cz + (dz - cz) * progress + (cz / len) * wobble;
    }
    posAttr.needsUpdate = true;

    group.rotation.y = t * 0.08 + progress * Math.PI * 0.9;
    group.rotation.x = progress * 0.25;
    group.position.y = -progress * 0.9;
    group.scale.setScalar(1 + progress * 0.35);
    material.opacity = 0.82 - progress * 0.35;

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
  function setProgress(p) {
    targetProgress = Math.min(1, Math.max(0, p));
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

  return { start, stop, setProgress, resize, dispose };
}

let currentColor = new THREE.Color('#00ffff');
let targetColor = new THREE.Color('#00ffff');

const canvas = document.getElementById('c');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(window.devicePixelRatio);

const parent = canvas.parentElement;
renderer.setSize(parent.clientWidth, parent.clientHeight);
renderer.setClearColor(0x000000, 1);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, parent.clientWidth / parent.clientHeight, 0.1, 100);
camera.position.set(2.5, 1.8, 2.5);
camera.lookAt(0, 0, 0);

const geo = new THREE.BoxGeometry(1.2, 1.2, 1.2);

const faceMat = new THREE.MeshStandardMaterial({
  color: 0x000000,
  transparent: true,
  opacity: 0.18,
  roughness: 0.1,
  metalness: 0.9,
  side: THREE.FrontSide
});

const edgesGeo = new THREE.EdgesGeometry(geo);
const edgeMat = new THREE.LineBasicMaterial({ color: currentColor, linewidth: 2 });
const edges = new THREE.LineSegments(edgesGeo, edgeMat);

const cube = new THREE.Mesh(geo, faceMat);
scene.add(cube);
scene.add(edges);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.05);
scene.add(ambientLight);

const glowLight = new THREE.PointLight(currentColor, 3, 8);
glowLight.position.set(1.5, 1.5, 1.5);
scene.add(glowLight);

const glowLight2 = new THREE.PointLight(currentColor, 2, 8);
glowLight2.position.set(-1.5, -1.5, -1.5);
scene.add(glowLight2);

const particles = [];
const particleGeo = new THREE.SphereGeometry(0.015, 4, 4);
for (let i = 0; i < 60; i++) {
  const mat = new THREE.MeshBasicMaterial({ color: currentColor, transparent: true, opacity: Math.random() * 0.7 + 0.2 });
  const p = new THREE.Mesh(particleGeo, mat);
  const r = 1.8 + Math.random() * 1.4;
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos(2 * Math.random() - 1);
  p.position.set(r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta), r * Math.cos(phi));
  p.userData = { r, theta, phi, speed: (Math.random() - 0.5) * 0.003 };
  scene.add(p);
  particles.push(p);
}

let isDragging = false, prevX = 0, prevY = 0;
let rotX = 0.4, rotY = 0.4;

canvas.addEventListener('mousedown', e => { isDragging = true; prevX = e.clientX; prevY = e.clientY; });
canvas.addEventListener('mousemove', e => {
  if (!isDragging) return;
  rotY += (e.clientX - prevX) * 0.008;
  rotX += (e.clientY - prevY) * 0.008;
  prevX = e.clientX; prevY = e.clientY;
});
canvas.addEventListener('mouseup', () => isDragging = false);
canvas.addEventListener('mouseleave', () => isDragging = false);

canvas.addEventListener('touchstart', e => { isDragging = true; prevX = e.touches[0].clientX; prevY = e.touches[0].clientY; });
canvas.addEventListener('touchmove', e => {
  if (!isDragging) return;
  rotY += (e.touches[0].clientX - prevX) * 0.008;
  rotX += (e.touches[0].clientY - prevY) * 0.008;
  prevX = e.touches[0].clientX; prevY = e.touches[0].clientY;
  e.preventDefault();
}, { passive: false });
canvas.addEventListener('touchend', () => isDragging = false);

window.setColor = (hex) => { targetColor.set(hex); };

let t = 0;
function animate() {
  requestAnimationFrame(animate);
  t += 0.01;

  currentColor.lerp(targetColor, 0.05);
  edgeMat.color.copy(currentColor);
  glowLight.color.copy(currentColor);
  glowLight2.color.copy(currentColor);

  if (!isDragging) {
    rotY += 0.005;
    rotX += 0.002;
  }

  cube.rotation.x = rotX;
  cube.rotation.y = rotY;
  edges.rotation.x = rotX;
  edges.rotation.y = rotY;

  const pulse = 2.5 + Math.sin(t * 2) * 0.8;
  glowLight.intensity = pulse;
  glowLight2.intensity = pulse * 0.7;
  edgeMat.opacity !== undefined && (edgeMat.opacity = 1);

  particles.forEach(p => {
    p.userData.theta += p.userData.speed;
    const { r, theta, phi } = p.userData;
    p.position.set(r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta), r * Math.cos(phi));
    p.material.color.copy(currentColor);
    p.material.opacity = 0.3 + 0.4 * Math.abs(Math.sin(t + r));
  });

  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  const w = parent.clientWidth, h = parent.clientHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
});
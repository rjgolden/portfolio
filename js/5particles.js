// particle storage
const particles = [];

// star texture
function createStarTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;

  const ctx = canvas.getContext("2d");
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);

  gradient.addColorStop(0.0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.15, "rgba(255,255,255,0.9)");
  gradient.addColorStop(0.45, "rgba(255,255,255,0.25)");
  gradient.addColorStop(1.0, "rgba(255,255,255,0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  return new THREE.CanvasTexture(canvas);
}

const sharedStarTexture = createStarTexture();

// particle creation
for (let i = 0; i < 600; i++) {
  const size = Math.random() * 0.09 + 0.035;

  const mat = new THREE.SpriteMaterial({
    map: sharedStarTexture,
    color: currentColor.clone().multiplyScalar(0.8 + Math.random() * 0.8),
    transparent: true,
    opacity: Math.random() * 0.45 + 0.1,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const particle = new THREE.Sprite(mat);
  particle.scale.set(size, size, 1);

  const radius = 1.8 + Math.random() * 4.2;
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos(2 * Math.random() - 1);

  particle.userData = {
    r: radius,
    theta,
    phi,
    speed: (Math.random() - 0.5) * 0.003,
    baseSize: size,
    baseOpacity: Math.random() * 0.65 + 0.18,
    pulseOffset: Math.random() * Math.PI * 2,
    parallaxFactor: 1 / radius,
    shadeFactor: 0.7 + Math.random() * 0.9
  };

  scene.add(particle);
  particles.push(particle);
}
// particle storage
const particles = [];

// shared geometry for performance
const sharedParticleGeo = new THREE.SphereGeometry(1, 8, 6);

// particle creation
for (let i = 0; i < 1000; i++) {
  const size = Math.random() * 0.018 + 0.005;

  const mat = new THREE.MeshBasicMaterial({
    color: currentColor.clone().multiplyScalar(Math.random()),
    transparent: true,
    opacity: Math.random() * 0.5 + 0.05,
    blending: THREE.AdditiveBlending
  });

  const particle = new THREE.Mesh(sharedParticleGeo, mat);
  particle.scale.setScalar(size);

  const radius = 2.5 + Math.random() * 6;
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos(2 * Math.random() - 1);

  particle.userData = {
    r: radius,
    theta,
    phi,
    speed: (Math.random() - 0.5) * 0.003,
    baseOpacity: Math.random() * 0.4 + 0.05,
    pulseOffset: Math.random() * Math.PI * 2,
    parallaxFactor: 1 / radius,
    shadeFactor: 0.6 + Math.random() * 0.8
  };

  scene.add(particle);
  particles.push(particle);
}
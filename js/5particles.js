// ---------- PARTICLES ----------
const particles = [];

const sharedParticleGeo = new THREE.SphereGeometry(1, 8, 6);

for (let i = 0; i < 1500; i++) {
    const size = Math.random() * 0.018 + 0.005;

    const mat = new THREE.MeshBasicMaterial({
        color: currentColor.clone().multiplyScalar(Math.random()),
        transparent: true,
        opacity: Math.random() * 0.5 + 0.05,
        blending: THREE.AdditiveBlending
    });

    const p = new THREE.Mesh(sharedParticleGeo, mat);
    p.scale.setScalar(size);

    const r = 2.5 + Math.random() * 6;  
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    p.userData = {
        r,
        theta,
        phi,
        speed: (Math.random() - 0.5) * 0.003,   
        baseOpacity: Math.random() * 0.4 + 0.05,
        pulseOffset: Math.random() * Math.PI * 2,    
        parallaxFactor: 1 / r
    };
  
    p.userData.shadeFactor = 0.6 + Math.random() * 0.8; // 0.6 = darker, 1.4 = brighter

    scene.add(p);
    particles.push(p);
}
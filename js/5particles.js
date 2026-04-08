// ---------- PARTICLES ----------
const particles = [];

for (let i = 0; i < 300; i++) {
    const size = Math.random() * 0.02 + 0.004;
    const particleGeo = new THREE.SphereGeometry(size, 3, 3);
    const mat = new THREE.MeshBasicMaterial({
        color: currentColor * Math.random(),
        transparent: true,
        opacity: Math.random() * 0.5 + 0.05
    });

    const p = new THREE.Mesh(particleGeo, mat);

    const r = 2.5 + Math.random() * 6;  // much wider spread
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    p.userData = {
        r,
        theta,
        phi,
        speed: (Math.random() - 0.5) * 0.0008,  // slower drift
        baseOpacity: Math.random() * 0.4 + 0.05,
        pulseOffset: Math.random() * Math.PI * 2  // unique pulse per particle
    };

    scene.add(p);
    particles.push(p);
}
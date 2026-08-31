// cube
const geo = new THREE.BoxGeometry(1.3, 1.3, 1.3);
const cube = new THREE.Mesh(geo, materials);
scene.add(cube);

// cube edges
const edges = new THREE.LineSegments(
    new THREE.EdgesGeometry(geo),
    new THREE.LineBasicMaterial({
        color: currentColor,
        depthTest: false
    })
);
edges.scale.set(1.001, 1.001, 1.001);
scene.add(edges);

// lights
const glowLight = new THREE.PointLight(currentColor, 3, 8);
glowLight.position.set(1.5, 1.5, 1.5);
scene.add(glowLight);

const glowLight2 = new THREE.PointLight(currentColor, 2, 8);
glowLight2.position.set(-1.5, -1.5, -1.5);
scene.add(glowLight2);

// face normals
const normals = [
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(-1, 0, 0),
    new THREE.Vector3(0, 1, 0),
    new THREE.Vector3(0, -1, 0),
    new THREE.Vector3(0, 0, 1),
    new THREE.Vector3(0, 0, -1)
];
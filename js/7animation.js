// ---------- ANIMATION ----------
let t = 0;
let lastActive = -1;
let lastFaceColorHex = null;
const frustum = new THREE.Frustum();
const projScreenMatrix = new THREE.Matrix4();
const tempRelativeCam = new THREE.Vector3();
const tempCamDir = new THREE.Vector3();
const tempWorldNormal = new THREE.Vector3();
const tempRight = new THREE.Vector3();
const tempUp = new THREE.Vector3();
const tempForward = new THREE.Vector3();

function animate() {
  requestAnimationFrame(animate);
  t += 0.01;

  currentColor.lerp(targetColor, 0.05);

  camera.position.lerp(cameraTargetPosition, cameraLerpStrength);
  camera.quaternion.copy(defaultCameraQuaternion);

  if (typeof updateUIPlanePosition === "function") {
    updateUIPlanePosition();
  }
  
  edges.material.color.copy(currentColor);
  glowLight.color.copy(currentColor);
  glowLight2.color.copy(currentColor);

  const keySpeed = 0.03;

  camera.getWorldDirection(tempForward);
  tempRight.crossVectors(tempForward, camera.up).normalize();
  tempUp.copy(camera.up).normalize();

  if (keys.ArrowLeft) {
    cubeQuat.premultiply(new THREE.Quaternion().setFromAxisAngle(tempUp, -keySpeed));
  }
  if (keys.ArrowRight) {
    cubeQuat.premultiply(new THREE.Quaternion().setFromAxisAngle(tempUp, keySpeed));
  }
  if (keys.ArrowUp) {
    cubeQuat.premultiply(new THREE.Quaternion().setFromAxisAngle(tempRight, -keySpeed));
  }
  if (keys.ArrowDown) {
    cubeQuat.premultiply(new THREE.Quaternion().setFromAxisAngle(tempRight, keySpeed));
  }

  if (!isDragging) {
    const idleQ = new THREE.Quaternion().setFromEuler(new THREE.Euler(0.002, 0.005, 0));
    cubeQuat.multiply(idleQ);
  }

  cube.quaternion.copy(cubeQuat);
  edges.quaternion.copy(cubeQuat);

  // ---------- FACE DETECTION ----------
  camera.getWorldDirection(tempCamDir);
  tempCamDir.negate();

  let maxDot = -Infinity;
  let active = 0;

  normals.forEach((n, i) => {
    tempWorldNormal.copy(n).applyQuaternion(cube.quaternion);
    const d = tempWorldNormal.dot(tempCamDir);

    if (d > maxDot) {
      maxDot = d;
      active = i;
    }
  });

  // ---------- UPDATE TEXT ONLY WHEN NEEDED ----------
  const activeHex = "#" + currentColor.getHexString();

  faceCanvases.forEach((face, i) => {
      drawFace(face, activeHex, i === active);
  });

  if (active !== lastActive) {
    lastActive = active;

    const panelOpen = typeof window.isPanelOpen === "function" && window.isPanelOpen();

    if (!panelOpen && sound2.buffer) {
      if (sound2.isPlaying) sound2.stop();
      sound2.play();
    }
  }

  // ---------- PARTICLES ----------
  projScreenMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
  frustum.setFromProjectionMatrix(projScreenMatrix);
  tempRelativeCam.copy(camera.position).sub(particleOrigin);
  particles.forEach(p => {
    p.userData.theta += p.userData.speed;

    const { r, theta, phi } = p.userData;

    const baseX = r * Math.sin(phi) * Math.cos(theta);
    const baseY = r * Math.sin(phi) * Math.sin(theta);
    const baseZ = r * Math.cos(phi);

    const parallaxX = -tempRelativeCam.x * (1 - p.userData.parallaxFactor);
    const parallaxY = -tempRelativeCam.y * (1 - p.userData.parallaxFactor);
    const parallaxZ = -tempRelativeCam.z * (1 - p.userData.parallaxFactor);

    p.position.set(
      baseX + parallaxX,
      baseY + parallaxY,
      baseZ + parallaxZ
    );
    

    const intensity = 0.7 + Math.sin(t * 2 + p.userData.pulseOffset) * 0.4;
    p.material.color.copy(currentColor).multiplyScalar(intensity);
    const depthFade = 1 - (r - 2.5) / 8;
    p.material.opacity = depthFade * (0.3 + 0.4 * Math.abs(Math.sin(t * 0.3 + r)));
  });

  if (typeof updateAllUIScreenColors === "function") {
    updateAllUIScreenColors();
  }
  if (typeof updateColorMenuTheme === "function") {
    updateColorMenuTheme();
  }
  if (typeof updateAudioMenuTheme === "function") {
    updateAudioMenuTheme();
  }
  renderer.render(scene, camera);
}

animate();

// ---------- RESIZE ----------
window.addEventListener('resize', () => {
  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  if (isMobile) {
    defaultCameraPosition.set(3.2, 2.3, 3.2);
  } else {
    defaultCameraPosition.set(2.5, 1.8, 2.5);
  }

  resetCameraHome();

  const w = parent.clientWidth;
  const h = parent.clientHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
});
// animation state
let t = 0;
let lastActive = -1;


// reusable math objects
const tempRelativeCam = new THREE.Vector3();
const tempCamDir = new THREE.Vector3();
const tempWorldNormal = new THREE.Vector3();

const tempRight = new THREE.Vector3();
const tempUp = new THREE.Vector3();
const tempForward = new THREE.Vector3();

const tempKeyQuat = new THREE.Quaternion();
const tempIdleQuat = new THREE.Quaternion();
const tempIdleEuler = new THREE.Euler(0.002, 0.005, 0);

const tempParticleOffset = new THREE.Vector3();


// color updates
function updateSceneColor() {
  currentColor.lerp(targetColor, 0.05);

  edges.material.color.copy(currentColor);
  glowLight.color.copy(currentColor);
  glowLight2.color.copy(currentColor);
}


// camera updates
function updateCamera() {
  camera.position.lerp(cameraTargetPosition, cameraLerpStrength);
  camera.quaternion.copy(defaultCameraQuaternion);

  if (typeof updateUIPlanePosition === "function") {
    updateUIPlanePosition();
  }
}


// keyboard rotation
function applyKeyboardRotation() {
  const keySpeed = 0.03;

  camera.getWorldDirection(tempForward);
  tempRight.crossVectors(tempForward, camera.up).normalize();
  tempUp.copy(camera.up).normalize();

  if (keys.ArrowLeft) {
    tempKeyQuat.setFromAxisAngle(tempUp, -keySpeed);
    cubeQuat.premultiply(tempKeyQuat);
  }

  if (keys.ArrowRight) {
    tempKeyQuat.setFromAxisAngle(tempUp, keySpeed);
    cubeQuat.premultiply(tempKeyQuat);
  }

  if (keys.ArrowUp) {
    tempKeyQuat.setFromAxisAngle(tempRight, -keySpeed);
    cubeQuat.premultiply(tempKeyQuat);
  }

  if (keys.ArrowDown) {
    tempKeyQuat.setFromAxisAngle(tempRight, keySpeed);
    cubeQuat.premultiply(tempKeyQuat);
  }
}


// idle rotation
function applyIdleRotation() {
  if (isDragging) return;

  tempIdleQuat.setFromEuler(tempIdleEuler);
  cubeQuat.multiply(tempIdleQuat);
}


// cube updates
function updateCubeRotation() {
  applyKeyboardRotation();
  applyIdleRotation();

  cube.quaternion.copy(cubeQuat);
  edges.quaternion.copy(cubeQuat);
}


// face detection
function getActiveFaceIndex() {
  camera.getWorldDirection(tempCamDir);
  tempCamDir.negate();

  let maxDot = -Infinity;
  let active = 0;

  normals.forEach((normal, index) => {
    tempWorldNormal.copy(normal).applyQuaternion(cube.quaternion);

    const dot = tempWorldNormal.dot(tempCamDir);

    if (dot > maxDot) {
      maxDot = dot;
      active = index;
    }
  });

  return active;
}

function updateFaceCanvases(activeFaceIndex) {
  const activeHex = "#" + currentColor.getHexString();

  faceCanvases.forEach((face, index) => {
    drawFace(face, activeHex, index === activeFaceIndex);
  });
}

function playFaceSwitchSound(activeFaceIndex) {
  if (activeFaceIndex === lastActive) return;

  lastActive = activeFaceIndex;

  const panelOpen = typeof window.isPanelOpen === "function" && window.isPanelOpen();

  if (!panelOpen && sound2.buffer) {
    if (sound2.isPlaying) {
      sound2.stop();
    }

    sound2.play();
  }
}

function updateActiveFace() {
  const activeFaceIndex = getActiveFaceIndex();

  updateFaceCanvases(activeFaceIndex);
  playFaceSwitchSound(activeFaceIndex);
}


function updateParticlePosition(particle) {
  particle.userData.theta += particle.userData.speed;

  const { r, theta, phi } = particle.userData;

  const baseX = r * Math.sin(phi) * Math.cos(theta);
  const baseY = r * Math.sin(phi) * Math.sin(theta);
  const baseZ = r * Math.cos(phi);

  const parallaxX = -tempRelativeCam.x * (1 - particle.userData.parallaxFactor);
  const parallaxY = -tempRelativeCam.y * (1 - particle.userData.parallaxFactor);
  const parallaxZ = -tempRelativeCam.z * (1 - particle.userData.parallaxFactor);

  particle.position.set(
    baseX + parallaxX + tempParticleOffset.x,
    baseY + parallaxY + tempParticleOffset.y,
    baseZ + parallaxZ + tempParticleOffset.z
  );
}

function updateParticleMaterial(particle) {
  const { r, pulseOffset, baseOpacity, baseSize, shadeFactor } = particle.userData;

  const twinkle = 0.65 + Math.sin(t * 3.5 + pulseOffset) * 0.35;
  const depthFade = 1 - (r - 2.5) / 8;
  const brightness = 0.35 + twinkle * 0.65;

  particle.material.color
    .copy(currentColor)
    .multiplyScalar(shadeFactor * brightness);

  particle.material.opacity = baseOpacity * depthFade * twinkle;

  const scale = baseSize * (0.8 + twinkle * 0.4);
  particle.scale.set(scale, scale, 1);
}

function updateParticles() {
  tempRelativeCam.copy(camera.position).sub(particleOrigin);

  tempParticleOffset
    .copy(particleOrigin)
    .sub(defaultCameraPosition);

  particles.forEach(particle => {
    updateParticlePosition(particle);
    updateParticleMaterial(particle);
  });
}


// ui theme updates
function updateUITheme() {
  if (typeof updateAllUIScreenColors === "function") {
    updateAllUIScreenColors();
  }

  if (typeof updateColorMenuTheme === "function") {
    updateColorMenuTheme();
  }

  if (typeof updateAudioMenuTheme === "function") {
    updateAudioMenuTheme();
  }
}


// render loop
function animate() {
  requestAnimationFrame(animate);

  t += 0.01;

  updateSceneColor();
  updateCamera();
  updateCubeRotation();
  updateActiveFace();
  updateParticles();
  updateUITheme();

  renderer.render(scene, camera);
}

animate();


// resize
window.addEventListener("resize", () => {
  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  if (isMobile) {
    defaultCameraPosition.set(3.2, 2.3, 3.2);
  } else {
    defaultCameraPosition.set(2.5, 1.8, 2.5);
  }

  resetCameraHome();

  const width = parent.clientWidth;
  const height = parent.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
});
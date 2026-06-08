// animation state
let t = 0;
let lastActive = -1;
let lastFrameTime = performance.now();
const TARGET_FPS = 60;
const FRAME_INTERVAL = 1000 / TARGET_FPS;
let bootHidden = false;

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

function updateRainbowTheme() {
  if (!rainbowThemeEnabled) return;

  const hue = (t * 25) % 360;
  targetColor.setHSL(hue / 360, 1.0, 0.55);
}

function updateThemeMode() {
  document.body.classList.toggle("light-mode", lightModeEnabled);
  if (lightModeEnabled) {
    renderer.setClearColor(LIGHT_BG, 1);
    document.documentElement.style.setProperty("--page-bg", "#f2efe7");
    document.documentElement.style.setProperty("--panel-bg", "rgba(221, 214, 200, 0.78)");
  } else {
    renderer.setClearColor(DARK_BG, 1);
    document.documentElement.style.setProperty("--page-bg", "#000");
    document.documentElement.style.setProperty("--panel-bg", "rgba(0, 0, 0, 0)");
  }
}

// color updates
function updateSceneColor() {
  currentColor.lerp(targetColor, 0.05);

  edges.material.color.copy(currentColor);
  glowLight.color.copy(currentColor);
  glowLight2.color.copy(currentColor);

  document.documentElement.style.setProperty(
  "--ui-color",
  "#" + currentColor.getHexString());
}


function updateCamera(deltaTime) {
  const alpha = 1 - Math.pow(1 - cameraLerpStrength, deltaTime * 60);

  camera.position.lerp(cameraTargetPosition, alpha);
  camera.quaternion.copy(defaultCameraQuaternion);

  if (typeof updateUIPlanePosition === "function") {
    updateUIPlanePosition();
  }
}


function applyKeyboardRotation(deltaTime) {
  const keySpeed = 4.2;

  camera.getWorldDirection(tempForward);
  tempRight.crossVectors(tempForward, camera.up).normalize();
  tempUp.copy(camera.up).normalize();

  if (keys.ArrowLeft) {
    tempKeyQuat.setFromAxisAngle(tempUp, -keySpeed * deltaTime);
    cubeQuat.premultiply(tempKeyQuat);
  }

  if (keys.ArrowRight) {
    tempKeyQuat.setFromAxisAngle(tempUp, keySpeed * deltaTime);
    cubeQuat.premultiply(tempKeyQuat);
  }

  if (keys.ArrowUp) {
    tempKeyQuat.setFromAxisAngle(tempRight, -keySpeed * deltaTime);
    cubeQuat.premultiply(tempKeyQuat);
  }

  if (keys.ArrowDown) {
    tempKeyQuat.setFromAxisAngle(tempRight, keySpeed * deltaTime);
    cubeQuat.premultiply(tempKeyQuat);
  }
}

function applyIdleRotation(deltaTime) {
  if (isDragging) return;

  tempIdleEuler.set(0.12 * deltaTime, 0.30 * deltaTime, 0);
  tempIdleQuat.setFromEuler(tempIdleEuler);
  cubeQuat.multiply(tempIdleQuat);
}

function updateCubeRotation(deltaTime) {
  applyKeyboardRotation(deltaTime);
  applyIdleRotation(deltaTime);

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

  if (lightModeEnabled) {
    particle.material.blending = THREE.NormalBlending;

    particle.material.color
      .copy(currentColor)
      .multiplyScalar(0.45 + brightness * 0.35);

    particle.material.opacity = Math.min(
      0.95,
      baseOpacity * depthFade * twinkle * 2.2
    );
  } else {
    particle.material.blending = THREE.AdditiveBlending;

    particle.material.color
      .copy(currentColor)
      .multiplyScalar(shadeFactor * brightness);

    particle.material.opacity = baseOpacity * depthFade * twinkle;
  }

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
}

function animate(now = performance.now()) {
  requestAnimationFrame(animate);

  const elapsed = now - lastFrameTime;

  //60 FPS
  if (elapsed < 1000 / 60) return;

  const deltaTime = 1 / 60;
  lastFrameTime = now - (elapsed % (1000 / 60));

  t += deltaTime;

  updateRainbowTheme();
  updateThemeMode();
  updateSceneColor();
  updateCamera(deltaTime);
  updateCubeRotation(deltaTime);
  updateActiveFace();
  updateParticles();
  updateUITheme();

  renderer.render(scene, camera);

  if (!bootHidden) {
    bootHidden = true;

    const boot = document.getElementById("boot-overlay");

    if (boot) {
      boot.classList.add("hidden");
      boot.addEventListener("transitionend", () => boot.remove(), { once: true });
    }
  }
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
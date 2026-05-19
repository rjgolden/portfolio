// interaction state
let isDragging = false;
let prevX = 0;
let prevY = 0;

let mouseDownPos = { x: 0, y: 0 };
let touchStartPos = { x: 0, y: 0 };

let isTouchDragging = false;
let isHovering = false;

const CLICK_THRESHOLD = 8;
const ROTATION_SPEED = 3.2;


// cube rotation
let cubeQuat = new THREE.Quaternion().setFromEuler(
  new THREE.Euler(0.4, 0.4, 0)
);

function rotateCubeFromPointer(clientX, clientY) {
  const dx = (clientX - prevX) / canvas.clientWidth;
  const dy = (clientY - prevY) / canvas.clientHeight;

  const right = new THREE.Vector3();
  const up = new THREE.Vector3();
  const forward = new THREE.Vector3();

  camera.getWorldDirection(forward);
  right.crossVectors(forward, camera.up).normalize();
  up.copy(camera.up).normalize();

  const qx = new THREE.Quaternion().setFromAxisAngle(up, dx * ROTATION_SPEED);
  const qy = new THREE.Quaternion().setFromAxisAngle(right, dy * ROTATION_SPEED);

  cubeQuat.premultiply(qx).premultiply(qy);

  prevX = clientX;
  prevY = clientY;
}


window.hideCubeInstructions = function() {
  const el = document.getElementById("cube-instructions");
  if (!el || el.classList.contains("fade-out")) return;

  el.classList.add("fade-out");

  setTimeout(() => {
    el.classList.add("hidden");

    showIntroduction();

  }, 600);
};

function showIntroduction() {
  const intro = document.querySelector(".introduction");
  if (!intro) return;

  intro.classList.remove("hidden");

  requestAnimationFrame(() => {
    intro.classList.remove("fade-out");
    intro.classList.add("show");
  });
}

function hideIntroduction() {
  const intro = document.querySelector(".introduction");
  if (!intro || intro.classList.contains("fade-out")) return;

  intro.classList.add("fade-out");
  intro.classList.remove("show");

  setTimeout(() => {
    intro.classList.add("hidden");
  }, 600);
}

// raycasting helpers
function updateMouseFromPointer(pointer) {
  const rect = canvas.getBoundingClientRect();

  mouse.x = ((pointer.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((pointer.clientY - rect.top) / rect.height) * 2 + 1;
}

function getCubeIntersections(pointer) {
  updateMouseFromPointer(pointer);
  raycaster.setFromCamera(mouse, camera);
  return raycaster.intersectObject(cube);
}

function updateHoverFromPointer(pointer) {
  const intersects = getCubeIntersections(pointer);

  isHovering = intersects.length > 0;
  canvas.style.cursor = isHovering ? "pointer" : "default";
}


// cube click
function handleCubeClick(pointer) {
  const intersects = getCubeIntersections(pointer);
  if (intersects.length === 0) return;

  const materialIndex = Math.floor(intersects[0].faceIndex / 2);
  if (materialIndex < 0 || materialIndex >= labels.length) return;

  hideIntroduction();
  moveCameraToFace(materialIndex);

  isPanelOpen = true;
  pendingFaceIndex = materialIndex;

  particleOrigin.copy(cameraTargetPosition);
  playBeep();
}

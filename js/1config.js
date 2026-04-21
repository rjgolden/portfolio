let currentColor = new THREE.Color('#FFB000');
let targetColor = new THREE.Color('#FFB000');
let pendingFaceIndex = null;

const canvas = document.getElementById('c');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const parent = canvas.parentElement;
renderer.setSize(parent.clientWidth, parent.clientHeight);
renderer.setClearColor(0x000000, 1);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(50, parent.clientWidth / parent.clientHeight, 0.1, 100);

// ---------- DEFAULT CAMERA ----------
const defaultCameraPosition = new THREE.Vector3(2.5, 1.8, 2.5);
const defaultLookTarget = new THREE.Vector3(0, 0, 0);

let particleOrigin = defaultCameraPosition.clone();

camera.position.copy(defaultCameraPosition);
camera.lookAt(defaultLookTarget);

// Lock this orientation forever for flat 2D-style scrolling
const defaultCameraQuaternion = camera.quaternion.clone();

// ---------- CAMERA MOVEMENT ----------
const cameraTargetPosition = defaultCameraPosition.clone();
const cameraLerpStrength = 0.08;

// Build the 2D plane axes from the HOME view
const homeForward = defaultLookTarget.clone().sub(defaultCameraPosition).normalize();
const homeRight = new THREE.Vector3(1, 0, 0)
  .applyQuaternion(defaultCameraQuaternion)
  .normalize();

const homeUp = new THREE.Vector3(0, 1, 0)
  .applyQuaternion(defaultCameraQuaternion)
  .normalize();

// Equal movement distance from home.
// Increase/decrease this until the cube is just barely offscreen.
const pageDistance = 5.0;

// Because diagonal moves cover both x and y, we scale them so ALL moves
// have the same total travel distance from center.
const diag = pageDistance / Math.sqrt(2);

// 6 destinations:
// upper-left, lower-left, above, below, upper-right, lower-right
const faceViewportOffsets = {
  0: { x: -diag, y:  diag }, // upper-left
  1: { x: -diag, y: -diag }, // lower-left
  2: { x:  0,    y:  pageDistance }, // above
  3: { x:  0,    y: -pageDistance }, // below
  4: { x:  diag, y:  diag }, // upper-right
  5: { x:  diag, y: -diag }  // lower-right
};

window.moveCameraToFace = function(faceIndex) {
  const slot = faceViewportOffsets[faceIndex];
  if (!slot) return;

  cameraTargetPosition.copy(defaultCameraPosition)
    .add(homeRight.clone().multiplyScalar(slot.x))
    .add(homeUp.clone().multiplyScalar(slot.y));

  if (typeof hideAllUIScreens === "function") {
    hideAllUIScreens();
  }
};

window.resetCameraHome = function() {
  cameraTargetPosition.copy(defaultCameraPosition);
};
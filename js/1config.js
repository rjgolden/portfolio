// color state
const INITIAL_COLOR = "#FFB000";
const MOBILE_BREAKPOINT = "(max-width: 768px)";

let currentColor = new THREE.Color(INITIAL_COLOR);
let targetColor = new THREE.Color(INITIAL_COLOR);
let pendingFaceIndex = null;


// renderer setup
const canvas = document.getElementById("c");
const parent = canvas.parentElement;

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
  powerPreference: "high-performance"
});

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));
renderer.setSize(parent.clientWidth, parent.clientHeight);
renderer.setClearColor(0x000000, 1);


// scene + camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, parent.clientWidth / parent.clientHeight, 0.1, 100);

// default camera state
const defaultCameraPosition = new THREE.Vector3(2.5, 1.8, 2.5);
const defaultLookTarget = new THREE.Vector3(0, 0, 0);

if (window.matchMedia(MOBILE_BREAKPOINT).matches) {
  defaultCameraPosition.set(3.0, 2.1, 3.0);
}

let particleOrigin = defaultCameraPosition.clone();

camera.position.copy(defaultCameraPosition);
camera.lookAt(defaultLookTarget);

const defaultCameraQuaternion = camera.quaternion.clone();


// camera movement
const cameraTargetPosition = defaultCameraPosition.clone();
const cameraLerpStrength = 0.08;

const homeForward = defaultLookTarget.clone()
  .sub(defaultCameraPosition)
  .normalize();

const homeRight = new THREE.Vector3(1, 0, 0)
  .applyQuaternion(defaultCameraQuaternion)
  .normalize();

const homeUp = new THREE.Vector3(0, 1, 0)
  .applyQuaternion(defaultCameraQuaternion)
  .normalize();


// layout values
const pageDistance = 5.0;
const diag = 4.5;
const mobileDiag = pageDistance / Math.sqrt(2);

const faceViewportOffsetsDesktop = {
  0: { x: -diag, y:  diag },
  1: { x: -diag, y: -diag },
  2: { x: 0,     y:  pageDistance },
  3: { x: 0,     y: -pageDistance },
  4: { x:  diag, y:  diag },
  5: { x:  diag, y: -diag }
};

const faceViewportOffsetsMobile = {
  0: { x: -4.5, y:  mobileDiag },
  1: { x: -4.5, y: -mobileDiag },
  2: { x: 0,    y:  pageDistance },
  3: { x: 0,    y: -pageDistance },
  4: { x: 4.5,  y:  mobileDiag },
  5: { x: 4.5,  y: -mobileDiag }
};


// helpers
function isMobileViewport() {
  return window.matchMedia(MOBILE_BREAKPOINT).matches;
}

function getFaceViewportOffsets() {
  return isMobileViewport()
    ? faceViewportOffsetsMobile
    : faceViewportOffsetsDesktop;
}


// camera controls
window.moveCameraToFace = function(faceIndex) {
  const slot = getFaceViewportOffsets()[faceIndex];
  if (!slot) return;

  cameraTargetPosition
    .copy(defaultCameraPosition)
    .add(homeRight.clone().multiplyScalar(slot.x))
    .add(homeUp.clone().multiplyScalar(slot.y));

  if (typeof hideAllUIScreens === "function") {
    hideAllUIScreens();
  }
};

window.resetCameraHome = function() {
  cameraTargetPosition.copy(defaultCameraPosition);
};
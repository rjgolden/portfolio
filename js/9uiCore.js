// ui containers
const uiLayer = document.getElementById("ui-layer");

const uiPlane = document.createElement("div");
uiPlane.className = "ui-plane";
uiLayer.appendChild(uiPlane);

const uiScreens = new Map();


// panel state
let isPanelOpen = false;

window.isPanelOpen = function() {
  return isPanelOpen;
};

window.updateUIPlanePosition = function() {
  const offset = camera.position.clone().sub(defaultCameraPosition);

  const x = offset.dot(homeRight);
  const y = offset.dot(homeUp);

  const pxPerUnitX = parent.clientWidth / pageDistance;
  const pxPerUnitY = parent.clientHeight / pageDistance;

  uiPlane.style.transform = `translate(${-x * pxPerUnitX}px, ${y * pxPerUnitY}px)`;
};

// compatibility placeholders
window.showUIScreen = function() {};
window.hideUIScreen = function() {};
window.hideAllUIScreens = function() {};
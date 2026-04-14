// ---------- UI SCREEN ----------

const uiLayer = document.getElementById("ui-layer");

const uiScreenSlots = [
  "slot-right-middle", // Home
  "slot-left-middle",  // About
  "slot-right-top",    // Projects
  "slot-right-bottom", // Contact
  "slot-left-top",     // GitHub
  "slot-left-bottom"   // Resume
];

const openScreens = new Map();

function getUIColor() {
  return "#" + currentColor.getHexString();
}

function makeScreenId(faceIndex) {
  return `ui-screen-${faceIndex}`;
}

function updateSingleUIScreenColor(screen) {
  const color = getUIColor();
  screen.style.borderColor = color;
  screen.style.color = color;
}

function updateAllUIScreenColors() {
  openScreens.forEach(screen => {
    updateSingleUIScreenColor(screen);
  });
}

function createUIScreen(faceIndex) {
  const screen = document.createElement("div");
  screen.className = `ui-screen ${uiScreenSlots[faceIndex] || "slot-right-middle"}`;
  screen.id = makeScreenId(faceIndex);

  const closeBtn = document.createElement("button");
  closeBtn.className = "ui-screen-close";
  closeBtn.type = "button";
  closeBtn.textContent = "X";

  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    hideUIScreen(faceIndex);
  });

  const content = document.createElement("div");
  content.className = "ui-screen-content";
  content.textContent = labels[faceIndex] || "UI PANEL";

  screen.appendChild(closeBtn);
  screen.appendChild(content);

  updateSingleUIScreenColor(screen);

  return screen;
}

window.showUIScreen = function(faceIndex) {
  if (faceIndex < 0 || faceIndex >= labels.length) return;

  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    hideAllUIScreens();
  }

  if (openScreens.has(faceIndex)) return;

  const screen = createUIScreen(faceIndex);
  uiLayer.appendChild(screen);
  openScreens.set(faceIndex, screen);
};

window.hideUIScreen = function(faceIndex) {
  const screen = openScreens.get(faceIndex);
  if (!screen) return;

  screen.remove();
  openScreens.delete(faceIndex);
};

window.hideAllUIScreens = function() {
  openScreens.forEach(screen => screen.remove());
  openScreens.clear();
};

window.updateUIScreen = function() {
  updateAllUIScreenColors();
};
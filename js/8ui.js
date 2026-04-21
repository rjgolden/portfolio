const uiLayer = document.getElementById("ui-layer");

const uiPlane = document.createElement("div");
uiPlane.className = "ui-plane";
uiLayer.appendChild(uiPlane);

const uiScreens = new Map();

function getUIColor() {
  return "#" + currentColor.getHexString();
}

function updateSingleUIScreenColor(screen) {
  const color = getUIColor();
  screen.style.borderColor = color;
  screen.style.color = color;
}

function updateUIScreenContent(screen, faceIndex) {
  const data = panelData[faceIndex] || {
    title: labels[faceIndex] || "UI PANEL",
    body: "<p>No content yet.</p>",
    links: []
  };

  const linksHtml = data.links.map(link => `
    <a class="ui-panel-link" href="${link.url}" target="_blank" rel="noopener noreferrer">
      ${link.label}
    </a>
  `).join("");

  screen.querySelector(".ui-screen-content").innerHTML = `
    <h2 class="ui-panel-title">${data.title}</h2>
    <div class="ui-panel-body">${data.body}</div>
    <div class="ui-panel-links">${linksHtml}</div>
  `;

  screen.querySelectorAll(".ui-panel-link").forEach(linkEl => {
    linkEl.addEventListener("click", () => playBeep());
  });
}

function createUIScreen(faceIndex, slotClass) {
  const screen = document.createElement("div");
  screen.className = `ui-screen ${slotClass}`;

  const closeBtn = document.createElement("button");
  closeBtn.className = "ui-screen-close";
  closeBtn.type = "button";
  closeBtn.textContent = "X";

  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    sound4.play();
    resetCameraHome();
  });

  const content = document.createElement("div");
  content.className = "ui-screen-content";

  screen.appendChild(closeBtn);
  screen.appendChild(content);

  updateUIScreenContent(screen, faceIndex);
  updateSingleUIScreenColor(screen);

  return screen;
}

// layout matches camera destinations
const slots = [
  "slot-upper-left",
  "slot-lower-left",
  "slot-above",
  "slot-below",
  "slot-upper-right",
  "slot-lower-right"
];

for (let i = 0; i < labels.length; i++) {
  const screen = createUIScreen(i, slots[i]);
  uiPlane.appendChild(screen);
  uiScreens.set(i, screen);
}

window.updateAllUIScreenColors = function() {
  uiScreens.forEach(screen => updateSingleUIScreenColor(screen));
};

// no popup behavior anymore
window.showUIScreen = function() {};
window.hideUIScreen = function() {};
window.hideAllUIScreens = function() {};

window.updateUIPlanePosition = function() {
  const offset = camera.position.clone().sub(defaultCameraPosition);

  const x = offset.dot(homeRight);
  const y = offset.dot(homeUp);

  const uiWidth = parent.clientWidth;
  const uiHeight = parent.clientHeight;

  const pxPerUnitX = uiWidth / pageDistance;
  const pxPerUnitY = uiHeight / pageDistance;

  uiPlane.style.transform = `translate(${ -x * pxPerUnitX }px, ${ y * pxPerUnitY }px)`;
};
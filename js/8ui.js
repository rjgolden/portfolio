const uiLayer = document.getElementById("ui-layer");

const uiPlane = document.createElement("div");
uiPlane.className = "ui-plane";
uiLayer.appendChild(uiPlane);

const uiScreens = new Map();

const colorFab = document.getElementById("color-fab");
const colorMenu = document.getElementById("color-menu");

function getUIColor() {
  return "#" + currentColor.getHexString();
}

function updateSingleUIScreenColor(screen) {
  const color = getUIColor();
  screen.style.borderColor = color;
  screen.style.color = color;
}

function updateColorMenuTheme() {
  const color = getUIColor();

  const fab = document.getElementById("color-fab");
  const menu = document.getElementById("color-menu");
  const customBtn = document.getElementById("custom-color-btn");

  if (fab) {
    fab.style.color = color;
  }

  if (menu) {
    menu.style.color = color;
    menu.style.borderColor = color;
    menu.style.boxShadow = `0 0 14px ${color}`;
  }
}

function initColorMenu() {
  const fab = document.getElementById("color-fab");
  const menu = document.getElementById("color-menu");
  const picker = document.getElementById("color-picker");
  const customBtn = document.getElementById("custom-color-btn");
  const presetButtons = document.querySelectorAll(".color-btn[data-color]");

  if (!fab || !menu || !picker || !customBtn) return;

  fab.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.toggle("open");
    playBeep();
  });

  presetButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const color = btn.dataset.color;
      if (!color) return;
      setColor(color);
      picker.value = color;
      menu.classList.remove("open");
      sound5.play();
      updateColorMenuTheme();
    });
  });

  customBtn.addEventListener("click", () => {
    sound5.play();
  });

  picker.addEventListener("input", () => {
    setColor(picker.value);
    updateColorMenuTheme();
  });

  document.addEventListener("click", (e) => {
    const clickedInside = fab.contains(e.target) || menu.contains(e.target);
    if (!clickedInside) {
      menu.classList.remove("open");
    }
  });

  updateColorMenuTheme();
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

initColorMenu();
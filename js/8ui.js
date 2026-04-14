// ---------- UI SCREEN ----------

const uiLayer = document.getElementById("ui-layer");

const uiScreenSlots = [
  "slot-left-top",  // About
  "slot-left-middle", // Skills
  "slot-left-bottom",    // Projects
  "slot-right-top", // Resume
  "slot-right-middle",     // Contact
  "slot-right-bottom"   // Extra
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

window.updateAllUIScreenColors = function() {
  openScreens.forEach(screen => {
    updateSingleUIScreenColor(screen);
  });
};

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
    playBeep();
    hideUIScreen(faceIndex);
  });

  const content = document.createElement("div");
  content.className = "ui-screen-content";

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

  content.innerHTML = `
    <h2 class="ui-panel-title">${data.title}</h2>
    <div class="ui-panel-body">${data.body}</div>
    <div class="ui-panel-links">${linksHtml}</div>
  `;

    // Add beep to all links
    const linkElements = content.querySelectorAll(".ui-panel-link");
        linkElements.forEach(linkEl => {
        linkEl.addEventListener("click", () => {
            playBeep();
        });
    });

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

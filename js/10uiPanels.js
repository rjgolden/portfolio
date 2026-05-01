// panel link rendering
function renderPanelLink(link) {
  if (link.project || link.content) {
    return `
      <button class="ui-panel-link ui-content-link" type="button">
        ${link.label}
      </button>
    `;
  }

  const isMail = link.url.startsWith("mailto:");
  const attrs = isMail ? "" : ' target="_blank" rel="noopener noreferrer"';
  const popoutClass = link.popout ? " ui-popout-link" : "";

  const popoutIcon = link.popout
    ? `<span class="popout-indicator">
         <img src="resources/popout.png" alt="">
       </span>`
    : "";

  return `
    <a class="ui-panel-link${popoutClass}" href="${link.url}"${attrs}>
      <span class="link-text">${link.label}</span>
      ${popoutIcon}
    </a>
  `;
}


// panel rendering helpers
function getPanelData(faceIndex) {
  return panelData[faceIndex] || {
    title: labels[faceIndex] || "UI PANEL",
    body: "<p>No content yet.</p>",
    links: []
  };
}

function renderPanelTitle(title) {
  return title && title.trim()
    ? `<h2 class="ui-panel-title">${title}</h2>`
    : "";
}

function renderPanelBody(body) {
  return body && body.trim()
    ? `<div class="ui-panel-body">${body}</div>`
    : "";
}

function renderPanelLinks(links) {
  if (!Array.isArray(links) || links.length === 0) return "";

  return `
    <div class="ui-panel-links">
      ${links.map(renderPanelLink).join("")}
    </div>
  `;
}


// panel content update
function updateUIScreenContent(screen, faceIndex) {
  const data = getPanelData(faceIndex);

  screen.querySelector(".ui-screen-content").innerHTML = `
    ${renderPanelTitle(data.title)}
    ${renderPanelBody(data.body)}
    ${renderPanelLinks(data.links)}
  `;

  attachPanelLinkListeners(screen, faceIndex, data.links);
}

function attachPanelLinkListeners(screen, faceIndex, links) {
  if (!Array.isArray(links) || links.length === 0) return;

  screen.querySelectorAll(".ui-panel-link").forEach((el, i) => {
    const linkData = links[i];

    el.addEventListener("click", e => {
      playBeep();

      if (linkData && (linkData.project || linkData.content)) {
        e.preventDefault();
        showPanelContent(screen, faceIndex, linkData);
      }
    });
  });
}


// content view
function showPanelContent(screen, faceIndex, linkData) {
  const content = linkData.project || linkData.content;

  screen.querySelector(".ui-screen-content").innerHTML = `
    <h2 class="ui-panel-title">${linkData.label}</h2>
    <div class="ui-panel-body">${content}</div>
    <div class="ui-panel-links">
      <button class="ui-panel-link ui-content-back" type="button">
        Back
      </button>
    </div>
  `;

  screen.querySelector(".ui-content-back").addEventListener("click", () => {
    playBeep();
    updateUIScreenContent(screen, faceIndex);
  });
}


// screen creation
function createUIScreen(faceIndex, slotClass) {
  const screen = document.createElement("div");
  screen.className = `ui-screen ${slotClass}`;

  const closeBtn = document.createElement("button");
  closeBtn.className = "ui-screen-close";
  closeBtn.textContent = "X";

  closeBtn.addEventListener("click", e => {
    e.stopPropagation();
    sound4.play();
    resetCameraHome();
    isPanelOpen = false;
  });

  const content = document.createElement("div");
  content.className = "ui-screen-content";

  screen.appendChild(closeBtn);
  screen.appendChild(content);

  updateUIScreenContent(screen, faceIndex);
  updateSingleUIScreenColor(screen);

  return screen;
}


// slots
const slots = [
  "slot-upper-left",
  "slot-lower-left",
  "slot-above",
  "slot-below",
  "slot-upper-right",
  "slot-lower-right"
];


// create screens
for (let i = 0; i < labels.length; i++) {
  const screen = createUIScreen(i, slots[i]);
  uiPlane.appendChild(screen);
  uiScreens.set(i, screen);
}
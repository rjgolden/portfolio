function renderPanelLink(link) {
  if (link.action || link.project || link.content) {
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
    ? `<h1 class="ui-panel-title">${title}</h1>`
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
  
  if (data.title === "Settings") {
    initSettingsPanel(screen);
  }
}

function attachPanelLinkListeners(screen, faceIndex, links) {
    if (!Array.isArray(links) || links.length === 0) return;

    screen.querySelectorAll(".ui-panel-link").forEach((el, i) => {
    const linkData = links[i];

    el.addEventListener("click", e => {
      playBeep();

      if (linkData && linkData.action === "toggleTheme") {
        e.preventDefault();

        lightModeEnabled = !lightModeEnabled;
        sound5.play();

        return;
      }

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
    <h1 class="ui-panel-title">${linkData.label}</h1>
    <div class="ui-panel-body">${content}</div>
    <div class="ui-panel-links">
      <button class="ui-panel-link ui-content-back" type="button">
        Back
      </button>
    </div>
  `;

  if (linkData.label === "Audio Menu" || linkData.label === "Color Menu") {
    initSettingsPanel(screen);
  }

  screen.querySelector(".ui-content-back").addEventListener("click", () => {
    playBeep();
    updateUIScreenContent(screen, faceIndex);
  });
}

function initSettingsPanel(screen) {
  const sfxSlider = screen.querySelector("#settings-sfx-volume");
  const musicSlider = screen.querySelector("#settings-music-volume");
  const muteCheckbox = screen.querySelector("#settings-mute-all-audio");

  if (sfxSlider) {
    sfxSlider.value = sfxSliderValue;

    sfxSlider.addEventListener("input", () => {
      sfxSliderValue = Number(sfxSlider.value);
      applyAudioVolumes();
    });

    sfxSlider.addEventListener("change", () => {
      saveStoredValue(STORAGE_KEYS.sfxVolume, sfxSliderValue);
      playBeep();
    });
  }

  if (musicSlider) {
    musicSlider.value = musicSliderValue;

    musicSlider.addEventListener("input", () => {
      musicSliderValue = Number(musicSlider.value);
      applyAudioVolumes();
    });

    musicSlider.addEventListener("change", () => {
      saveStoredValue(STORAGE_KEYS.musicVolume, musicSliderValue);
      playBeep();
    });
  }

  if (muteCheckbox) {
    muteCheckbox.checked = masterMuted;

    muteCheckbox.addEventListener("change", () => {
      masterMuted = muteCheckbox.checked;
      saveStoredValue(STORAGE_KEYS.muted, masterMuted);
      applyAudioVolumes();
      playBeep();
    });
  }

  screen.querySelectorAll(".color-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const color = btn.dataset.color;
      if (!color) return;
      rainbowThemeEnabled = false;
      saveStoredValue(STORAGE_KEYS.uiColor, color);
      setColor(color);
      sound5.play();
    });
  });

  const picker = screen.querySelector("#settings-color-picker");

  if (picker) {
      picker.addEventListener("input", () => {
      rainbowThemeEnabled = false;

      setColor(picker.value);
      saveStoredValue(STORAGE_KEYS.uiColor, picker.value);

      sound5.play();
    });
  }

  const customRainbowBtn = screen.querySelector(".ui-panel-link.color-btn.rainbow");

  if (customRainbowBtn) {
    customRainbowBtn.addEventListener("click", () => {
      rainbowThemeEnabled = true;
      saveStoredValue(STORAGE_KEYS.uiColor, "rainbow");
      sound5.play();
    });
  }

  const lightModeBtn = screen.querySelector(".ui-panel-link.color-btn.light-mode");

  if (lightModeBtn) {
    lightModeBtn.addEventListener("click", () => {
      lightModeEnabled = !lightModeEnabled;
      sound5.play();
    });
}
}

// screen creation
function createUIScreen(faceIndex, slotClass) {
  const screen = document.createElement("div");
  screen.className = `ui-screen ${slotClass}`;

  const closeBtn = document.createElement("button");
  closeBtn.className = "ui-screen-close";
  const backIcons = {
    0: "→",
    1: "→", 
    2: "↓",
    3: "↑", 
    4: "←", 
    5: "←"  
  };

  const dir = backIcons[faceIndex] || "X";

  closeBtn.innerHTML = `<span class="close-arrow">${dir}</span>`;

  if (dir === "←" || dir === "→") {
    closeBtn.classList.add("horizontal");
  }

  closeBtn.addEventListener("click", e => {
    e.stopPropagation();
    sound4.play();
    resetCameraHome();
    isPanelOpen = false;
    showIntroduction();
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
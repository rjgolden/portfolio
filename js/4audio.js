// audio listener
const listener = new THREE.AudioListener();
camera.add(listener);


// audio sources
const sound = new THREE.Audio(listener);
const sound2 = new THREE.Audio(listener);
const sound3 = new THREE.Audio(listener);
const sound4 = new THREE.Audio(listener);
const sound5 = new THREE.Audio(listener);

const audioLoader = new THREE.AudioLoader();


// audio state
let contextResumed = false;
let ambianceReady = false;

let sfxSliderValue = 35;
let musicSliderValue = 25;
let masterMuted = false;


// volume settings
const maxVolumes = {
  music: 0.05,
  sfx: 0.08
};

const sfxMix = {
  switch: 0.33,
  beep: 0.66,
  back: 1.0,
  colorSelect: 1.0
};


// volume helpers
function sliderToVolume(sliderValue, maxVolume) {
  const normalized = sliderValue / 100;
  return Math.pow(normalized, 2) * maxVolume;
}

function getVol(volume) {
  return masterMuted ? 0 : volume;
}

function applyAudioVolumes() {
  const musicVolume = sliderToVolume(musicSliderValue, maxVolumes.music);
  const sfxVolume = sliderToVolume(sfxSliderValue, maxVolumes.sfx);

  sound.setVolume(getVol(musicVolume));
  sound2.setVolume(getVol(sfxVolume * sfxMix.switch));
  sound3.setVolume(getVol(sfxVolume * sfxMix.beep));
  sound4.setVolume(getVol(sfxVolume * sfxMix.back));
  sound5.setVolume(getVol(sfxVolume * sfxMix.colorSelect));
}


// audio loading
audioLoader.load("audio/ambiance.ogg", buffer => {
  sound.setBuffer(buffer);
  sound.setLoop(true);
  applyAudioVolumes();

  ambianceReady = true;
  tryPlayAmbiance();
});

audioLoader.load("audio/switch.ogg", buffer => {
  sound2.setBuffer(buffer);
  applyAudioVolumes();
});

audioLoader.load("audio/beep.ogg", buffer => {
  sound3.setBuffer(buffer);
  applyAudioVolumes();
});

audioLoader.load("audio/back.ogg", buffer => {
  sound4.setBuffer(buffer);
  applyAudioVolumes();
});

audioLoader.load("audio/colorSelect.ogg", buffer => {
  sound5.setBuffer(buffer);
  applyAudioVolumes();
});


// audio context
function resumeAudioContext() {
  if (contextResumed) return;

  listener.context.resume()
    .then(() => {
      contextResumed = true;
      tryPlayAmbiance();
    })
    .catch(err => console.warn("Audio resume failed:", err));
}

function tryPlayAmbiance() {
  if (contextResumed && ambianceReady && sound.buffer && !sound.isPlaying) {
    sound.play();
  }
}


// interaction unlock
["click", "touchstart", "touchend"].forEach(eventType => {
  document.addEventListener(eventType, resumeAudioContext, {
    once: true,
    passive: true
  });
});

canvas.addEventListener("touchstart", resumeAudioContext, {
  once: true,
  passive: true
});

canvas.addEventListener("click", resumeAudioContext, {
  once: true
});


// sound effects
window.playBeep = function() {
  if (!sound3.buffer || !contextResumed) return;

  if (sound3.isPlaying) {
    sound3.stop();
  }

  sound3.setPlaybackRate(0.95 + Math.random() * 0.1);
  sound3.play();
};


// audio menu theme
window.updateAudioMenuTheme = function() {
  const color = "#" + currentColor.getHexString();

  const fab = document.getElementById("audio-fab");
  const menu = document.getElementById("audio-menu");

  if (fab) {
    fab.style.color = color;
    fab.style.borderColor = color;
    fab.style.boxShadow = `0 0 10px ${color}`;
  }

  if (menu) {
    menu.style.color = color;
    menu.style.borderColor = color;
    menu.style.boxShadow = `0 0 14px ${color}`;
  }
};


// audio menu setup
function initAudioMenu() {
  const fab = document.getElementById("audio-fab");
  const menu = document.getElementById("audio-menu");
  const sfxSlider = document.getElementById("sfx-volume");
  const musicSlider = document.getElementById("music-volume");
  const muteCheckbox = document.getElementById("mute-all-audio");

  if (!fab || !menu || !sfxSlider || !musicSlider || !muteCheckbox) {
    console.warn("Audio menu elements not found");
    return;
  }

  sfxSlider.value = sfxSliderValue;
  musicSlider.value = musicSliderValue;

  fab.addEventListener("click", e => {
    e.stopPropagation();
    menu.classList.toggle("open");

    if (typeof playBeep === "function") {
      playBeep();
    }
  });

  sfxSlider.addEventListener("input", () => {
    sfxSliderValue = Number(sfxSlider.value);
    applyAudioVolumes();
  });

  musicSlider.addEventListener("input", () => {
    musicSliderValue = Number(musicSlider.value);
    applyAudioVolumes();
  });

  muteCheckbox.addEventListener("change", () => {
    masterMuted = muteCheckbox.checked;
    applyAudioVolumes();
  });

  menu.addEventListener("click", e => {
    e.stopPropagation();
  });

  document.addEventListener("click", () => {
    menu.classList.remove("open");
  });

  updateAudioMenuTheme();
  applyAudioVolumes();
}


// initialize
initAudioMenu();
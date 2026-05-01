// ---------- AUDIO SETUP ----------
const listener = new THREE.AudioListener();
camera.add(listener);

const sound = new THREE.Audio(listener);      // ambiance
const sound2 = new THREE.Audio(listener);     // switch
const sound3 = new THREE.Audio(listener);     // beep
const sound4 = new THREE.Audio(listener);     // back
const sound5 = new THREE.Audio(listener);     // color select

const audioLoader = new THREE.AudioLoader();

let contextResumed = false;
let ambianceReady = false;

let sfxSliderValue = 35;
let musicSliderValue = 25;
let masterMuted = false;

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

function sliderToVolume(sliderValue, maxVolume) {
  const normalized = sliderValue / 100;

  // Curved scaling: low slider values stay quiet,
  // high slider values ramp up more naturally.
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

// Load sounds
audioLoader.load('audio/ambiance.ogg', function(buffer) {
    sound.setBuffer(buffer);
    sound.setLoop(true);
    applyAudioVolumes();
    ambianceReady = true;
    tryPlayAmbiance();
});

audioLoader.load('audio/switch.ogg', function(buffer) {
    sound2.setBuffer(buffer);
    applyAudioVolumes();
});

audioLoader.load('audio/beep.ogg', function(buffer) {
    sound3.setBuffer(buffer);
    applyAudioVolumes();
});

audioLoader.load('audio/back.ogg', function(buffer) {
    sound4.setBuffer(buffer);
    applyAudioVolumes();
});

audioLoader.load('audio/colorSelect.ogg', function(buffer) {
    sound5.setBuffer(buffer);
    applyAudioVolumes();
});

function resumeAudioContext() {
    if (contextResumed) return;
    
    listener.context.resume().then(() => {
        contextResumed = true;
        console.log("✅ AudioContext resumed");
        tryPlayAmbiance();
    }).catch(err => console.warn("Audio resume failed:", err));
}

function tryPlayAmbiance() {
    if (contextResumed && ambianceReady && sound.buffer && !sound.isPlaying) {
        sound.play();
    }
}

// Listen for user interaction on BOTH desktop and mobile
['click', 'touchstart', 'touchend'].forEach(eventType => {
    document.addEventListener(eventType, resumeAudioContext, { 
        once: true, 
        passive: true 
    });
});

// Also resume when user taps the canvas specifically
canvas.addEventListener('touchstart', resumeAudioContext, { once: true, passive: true });
canvas.addEventListener('click', resumeAudioContext, { once: true });

// Resume again if user interacts with buttons
window.playBeep = function() {
  if (sound3.buffer && contextResumed) {
    if (sound3.isPlaying) sound3.stop();
    sound3.setPlaybackRate(0.95 + Math.random() * 0.1);
    sound3.play();
  }
};

window.updateAudioMenuTheme - function() {
  const fab = document.getElementById("audio-fab");
  const menu = document.getElementById("audio-menu");

  if (fab) {
    fab.style.color = currentColor;
  }

  if (menu) {
    menu.style.color = currentColor;
    menu.style.borderColor = currentColor;
    menu.style.boxShadow = `0 0 14px ${currentColor}`;
  }
}

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

  fab.addEventListener("click", (e) => {
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

  menu.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  document.addEventListener("click", () => {
    menu.classList.remove("open");
  });

  updateAudioMenuTheme();
  applyAudioVolumes();
}

initAudioMenu();

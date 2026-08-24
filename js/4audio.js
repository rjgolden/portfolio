// audio listener
const listener = new THREE.AudioListener();
camera.add(listener);


// audio sources
const music1 = new THREE.Audio(listener);
const sound2 = new THREE.Audio(listener);
const sound3 = new THREE.Audio(listener);
const sound4 = new THREE.Audio(listener);
const sound5 = new THREE.Audio(listener);
const audioLoader = new THREE.AudioLoader();
let backgroundMusic = music1;

// audio state
let contextResumed = false;
let ambianceReady = false;

let sfxSliderValue = Number(
  loadStoredValue(STORAGE_KEYS.sfxVolume, 35)
);

let musicSliderValue = Number(
  loadStoredValue(STORAGE_KEYS.musicVolume, 25)
);

let masterMuted = loadStoredValue(STORAGE_KEYS.muted, "false") === "true";


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

  backgroundMusic.setVolume(getVol(musicVolume));
  sound2.setVolume(getVol(sfxVolume * sfxMix.switch));
  sound3.setVolume(getVol(sfxVolume * sfxMix.beep));
  sound4.setVolume(getVol(sfxVolume * sfxMix.back));
  sound5.setVolume(getVol(sfxVolume * sfxMix.colorSelect));
}


// audio loading
audioLoader.load("audio/ambiance.ogg", buffer => {
  backgroundMusic.setBuffer(buffer);
  backgroundMusic.setLoop(true);
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
  if (contextResumed && ambianceReady && backgroundMusic.buffer && !backgroundMusic.isPlaying) {
    backgroundMusic.play();
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

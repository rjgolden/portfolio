// audio listener
const listener = new THREE.AudioListener();
camera.add(listener);


const audioLoader = new THREE.AudioLoader();

// music
const music1 = new THREE.Audio(listener);
const music2 = new THREE.Audio(listener);
const music3 = new THREE.Audio(listener);
const music4 = new THREE.Audio(listener);
const music5 = new THREE.Audio(listener);
const music6 = new THREE.Audio(listener);
const music7 = new THREE.Audio(listener);

// sound effects
const sound2 = new THREE.Audio(listener);
const sound3 = new THREE.Audio(listener);
const sound4 = new THREE.Audio(listener);
const sound5 = new THREE.Audio(listener);

// available music
const musicTracks = [
  { id: "song1", name: "Gamecube", audio: music1, url: "audio/Music/ambiance.ogg" },
  { id: "song2", name: "Xbox OG", audio: music2, url: "audio/Music/XboxOG.ogg" },
  { id: "song3", name: "Wii", audio: music3, url: "audio/Music/Wii.ogg" },
  { id: "song4", name: "DSI", audio: music4, url: "audio/Music/DSI.ogg" },
  { id: "song5", name: "3DS", audio: music5, url: "audio/Music/3DS.ogg" },
  { id: "song6", name: "WiiU", audio: music6, url: "audio/Music/WiiU.ogg" },
  { id: "song7", name: "Ps4", audio: music7, url: "audio/Music/PS4.ogg" }
];

const savedMusicId = loadStoredValue(
  STORAGE_KEYS.backgroundMusic,
  musicTracks[0].id
);

let currentMusicIndex = musicTracks.findIndex(
  track => track.id === savedMusicId
);

if (currentMusicIndex === -1) {
  currentMusicIndex = 0;
}

let backgroundMusic = musicTracks[currentMusicIndex].audio;

// audio state
let contextResumed = false;

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

  music1.setVolume(getVol(musicVolume));
  music2.setVolume(getVol(musicVolume));
  music3.setVolume(getVol(musicVolume));
  music4.setVolume(getVol(musicVolume));
  music5.setVolume(getVol(musicVolume));
  music6.setVolume(getVol(musicVolume));
  music7.setVolume(getVol(musicVolume));
  sound2.setVolume(getVol(sfxVolume * sfxMix.switch));
  sound3.setVolume(getVol(sfxVolume * sfxMix.beep));
  sound4.setVolume(getVol(sfxVolume * sfxMix.back));
  sound5.setVolume(getVol(sfxVolume * sfxMix.colorSelect));
}


// audio loading
musicTracks.forEach(track => {
  audioLoader.load(
    track.url,

    buffer => {
      track.audio.setBuffer(buffer);
      track.audio.setLoop(true);

      // If this is currently the selected track,
      // apply its volume and try to start it.
      if (track.audio === backgroundMusic) {
        applyAudioVolumes();
        tryPlayBackgroundMusic();
      }
    },

    undefined,

    error => {
      console.warn(`Failed to load music: ${track.url}`, error);
    }
  );
});

audioLoader.load("audio/SFX/switch.ogg", buffer => {
  sound2.setBuffer(buffer);
  applyAudioVolumes();
});

audioLoader.load("audio/SFX/beep.ogg", buffer => {
  sound3.setBuffer(buffer);
  applyAudioVolumes();
});

audioLoader.load("audio/SFX/back.ogg", buffer => {
  sound4.setBuffer(buffer);
  applyAudioVolumes();
});

audioLoader.load("audio/SFX/colorSelect.ogg", buffer => {
  sound5.setBuffer(buffer);
  applyAudioVolumes();
});

// audio context
function resumeAudioContext() {
  if (contextResumed) return;

  listener.context.resume()
    .then(() => {
      contextResumed = true;
      tryPlayBackgroundMusic();
    })
    .catch(err => console.warn("Audio resume failed:", err));
}

function tryPlayBackgroundMusic() {
  if (
    contextResumed &&
    backgroundMusic.buffer &&
    !backgroundMusic.isPlaying
  ) {
    backgroundMusic.play();
  }
}

function setBackgroundMusic(index) {
  if (index < 0 || index >= musicTracks.length) return;

  const newMusic = musicTracks[index].audio;

  if (backgroundMusic === newMusic) return;

  if (backgroundMusic.isPlaying) {
    backgroundMusic.stop();
  }

  currentMusicIndex = index;

  saveStoredValue(
    STORAGE_KEYS.backgroundMusic,
    musicTracks[currentMusicIndex].id
  );

  backgroundMusic = newMusic;

  applyAudioVolumes();
  tryPlayBackgroundMusic();
}

function changeBackgroundMusic(direction) {
  const nextIndex =
    (currentMusicIndex + direction + musicTracks.length) %
    musicTracks.length;

  setBackgroundMusic(nextIndex);
}

function getCurrentMusicName() {
  return musicTracks[currentMusicIndex].name;
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

// ---------- AUDIO SETUP (Improved) ----------
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

// Load sounds
audioLoader.load('audio/ambiance.ogg', function(buffer) {
    sound.setBuffer(buffer);
    sound.setLoop(true);
    sound.setVolume(0.01);
    ambianceReady = true;
    tryPlayAmbiance();
});

audioLoader.load('audio/switch.ogg', function(buffer) {
    sound2.setBuffer(buffer);
    sound2.setVolume(0.01);
});

audioLoader.load('audio/beep.ogg', function(buffer) {
    sound3.setBuffer(buffer);
    sound3.setVolume(0.02);
});

audioLoader.load('audio/back.ogg', function(buffer) {
    sound4.setBuffer(buffer);
    sound4.setVolume(0.03);
});

audioLoader.load('audio/colorSelect.ogg', function(buffer) {
    sound5.setBuffer(buffer);
    sound5.setVolume(0.03);
});

// Better resume functions
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

// Optional: Resume again if user interacts with buttons
window.playBeep = function() {
  if (sound3.buffer && contextResumed) {
    if (sound3.isPlaying) sound3.stop();
    sound3.setPlaybackRate(0.95 + Math.random() * 0.1);
    sound3.play();
  }
};
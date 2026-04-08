// ---------- FACE SETUP ----------
const labels = ["Home", "About", "Projects", "Contact", "GitHub", "Resume"];

// Raycaster for clicking
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Define links for each face (in the same order as your `labels` and `normals`)
const faceLinks = [
"https://example.com/home",      // +X  (right)
"https://example.com/about",     // -X  (left)   ← adjust URLs as needed
"https://example.com/projects",  // +Y  (top)
"https://example.com/contact",   // -Y  (bottom)
"https://github.com/rjgolden", // +Z  (front, depending on rotation)
"https://example.com/resume"     // -Z  (back)
];

const faceCanvases = labels.map(label => {
const canvas = document.createElement("canvas");
canvas.width = 512;
canvas.height = 512;

return {
    label,
    canvas,
    ctx: canvas.getContext("2d"),
    texture: new THREE.CanvasTexture(canvas)
};
});

const materials = faceCanvases.map(f =>
new THREE.MeshBasicMaterial({
    map: f.texture,
    transparent: true,
    depthWrite: false
})
);

// ---------- DRAW FUNCTION ----------
function drawFace(face, color, isActive) {
const { canvas, ctx, label, texture } = face;

ctx.clearRect(0, 0, canvas.width, canvas.height);

// background
ctx.fillStyle = "rgba(0,0,0,0.65)";
ctx.fillRect(0, 0, canvas.width, canvas.height);

if (isActive) {
    ctx.shadowColor = color;
    ctx.shadowBlur = 60;

    // extra glow pass (this is the trick)
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.25;
    ctx.fillText(label, canvas.width / 2, canvas.height / 2);
    ctx.globalAlpha = 1;
} 
else {
    ctx.shadowBlur = 0;
}

ctx.fillStyle = isActive ? color : "#222";
ctx.font = "bold 60px 'Press Start 2P'";
ctx.textAlign = "center";
ctx.textBaseline = "middle";

ctx.fillText(label, canvas.width / 2, canvas.height / 2);

texture.needsUpdate = true;
}

// initial draw
faceCanvases.forEach(f => drawFace(f, "#ffaa00", false));
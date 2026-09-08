// face labels
const labels = ["About", "Settings", "Projects", "Resume", "Contact", "Extras"];


// raycasting
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();


// face canvas setup
const faceCanvases = labels.map(label => {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const texture = new THREE.CanvasTexture(canvas);

  texture.generateMipmaps = false;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;

  return {
    label,
    canvas,
    ctx: canvas.getContext("2d"),
    texture
  };
});


// materials
const materials = faceCanvases.map(face =>
  new THREE.MeshBasicMaterial({
    map: face.texture,
    transparent: true,
    depthWrite: false
  })
);

function drawGlowStroke(ctx, text, x, y, color, layers = 4) {
  ctx.save();
  ctx.strokeStyle = lightModeEnabled ? "#1d1c1c" : "#c2bebe";
  ctx.lineJoin = "round";
  ctx.globalAlpha = 0.15; // tune to taste
  ctx.fillStyle = color;
  ctx.shadowColor = color;
  ctx.shadowBlur = isMobile ? 15 : 40;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.globalAlpha = 1;
  for (let i = layers; i >= 1; i--) {
    ctx.lineWidth = (2 / layers) * i;
    ctx.strokeText(text, x, y);
  }
  ctx.restore();
}

function drawFace(face, color, isActive) {
  const { canvas, ctx, label, texture } = face;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = lightModeEnabled ? LIGHT_BG : DARK_BG;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = "bold 55px 'Press Start 2P'";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  if (isActive) {
    drawGlowStroke(ctx, label, canvas.width / 2, canvas.height / 2, color, 4, 14);
  }

  ctx.globalAlpha = 0.8;
  ctx.fillStyle = isActive ? color : lightModeEnabled ? "#969595" : "#706d6d";
  ctx.fillText(label, canvas.width / 2, canvas.height / 2);

  texture.needsUpdate = true;
}

// initial render
faceCanvases.forEach(face => {
  drawFace(face, "#ffaa00", false);
});
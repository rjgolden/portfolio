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


// draw face
function drawFace(face, color, isActive) {
  const { canvas, ctx, label, texture } = face;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = lightModeEnabled ? LIGHT_BG : DARK_BG;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = "bold 55px 'Press Start 2P'";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.lineJoin = "round";

  if (isActive) {
    ctx.globalAlpha = 0.15; // tune to taste
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1;
    ctx.shadowColor = color;
    ctx.shadowBlur = isMobile ? 12 : 35;
    ctx.fillText(label, canvas.width / 2, canvas.height / 2);
    ctx.lineWidth = 4;
    ctx.strokeStyle = lightModeEnabled ? "#969595" : "#706d6d"; // outline color
    ctx.strokeText(label, canvas.width / 2, canvas.height / 2);
    ctx.fillText(label, canvas.width / 2, canvas.height / 2);
    ctx.globalAlpha = 0.75;
  } else {
    ctx.shadowBlur = 0;
    ctx.shadowColor = "transparent";
    ctx.globalAlpha = 1;
    ctx.fillStyle = lightModeEnabled ? "#636060" : "#222";
    ctx.fillText(label, canvas.width / 2, canvas.height / 2);
  }
  ctx.globalAlpha = 1;
  texture.needsUpdate = true;
}


// initial render
faceCanvases.forEach(face => {
  drawFace(face, "#ffaa00", false);
});
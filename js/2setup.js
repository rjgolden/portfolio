// face labels
const labels = ["About", "Settings", "Projects", "Resume", "Contact", "Feed"];


// raycasting
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();


// face canvas setup
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

  ctx.fillStyle = lightModeEnabled
  ? "rgba(210,200,184,0.42)"
  : "rgba(0,0,0,0.65)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (isActive) {
    ctx.shadowColor = color;

    if (lightModeEnabled && isCompactLayout()) {
      ctx.shadowBlur = 10;
    } else {
      ctx.shadowBlur = 60;
    }

    ctx.fillStyle = color;

    ctx.globalAlpha = 0.25;
    ctx.fillText(label, canvas.width / 2, canvas.height / 2);

    ctx.globalAlpha = 0.75;
  } else {
    ctx.shadowBlur = 0;
  }

  ctx.fillStyle = isActive ? color : lightModeEnabled ? "#3d3a3a" : "#222";
  ctx.font = "bold 55px 'Press Start 2P'";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.fillText(label, canvas.width / 2, canvas.height / 2);

  texture.needsUpdate = true;
}


// initial render
faceCanvases.forEach(face => {
  drawFace(face, "#ffaa00", false);
});
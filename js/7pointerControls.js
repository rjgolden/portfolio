// mouse controls
canvas.addEventListener("mousedown", e => {
  hideCubeInstructions();

  isDragging = false;

  mouseDownPos.x = e.clientX;
  mouseDownPos.y = e.clientY;

  prevX = e.clientX;
  prevY = e.clientY;
});

canvas.addEventListener("mousemove", e => {
  if (isDragging) {
    canvas.style.cursor = "grabbing";
  }

  if (e.buttons === 0) {
    updateHoverFromPointer(e);
    return;
  }

  const totalDx = e.clientX - mouseDownPos.x;
  const totalDy = e.clientY - mouseDownPos.y;

  if (Math.hypot(totalDx, totalDy) > CLICK_THRESHOLD) {
    isDragging = true;
  }

  if (!isDragging) return;

  rotateCubeFromPointer(e.clientX, e.clientY);
});

canvas.addEventListener("mouseup", e => {
  if (!isDragging) {
    handleCubeClick(e);
  }

  isDragging = false;
});

canvas.addEventListener("mouseleave", () => {
  isDragging = false;
});


// touch controls
canvas.addEventListener("touchstart", e => {
  hideCubeInstructions();

  if (e.touches.length !== 1) return;
  e.preventDefault();

  const touch = e.touches[0];

  isTouchDragging = false;

  touchStartPos.x = touch.clientX;
  touchStartPos.y = touch.clientY;

  prevX = touch.clientX;
  prevY = touch.clientY;

  updateHoverFromPointer(touch);
}, { passive: false });

canvas.addEventListener("touchmove", e => {
  if (e.touches.length !== 1) return;
  e.preventDefault();

  const touch = e.touches[0];

  const totalDx = touch.clientX - touchStartPos.x;
  const totalDy = touch.clientY - touchStartPos.y;

  if (Math.hypot(totalDx, totalDy) > CLICK_THRESHOLD) {
    isTouchDragging = true;
  }

  if (!isTouchDragging) return;

  rotateCubeFromPointer(touch.clientX, touch.clientY);
}, { passive: false });

canvas.addEventListener("touchend", e => {
  if (!isTouchDragging && e.changedTouches.length > 0) {
    handleCubeClick(e.changedTouches[0]);
  }

  isTouchDragging = false;
}, { passive: false });


// keyboard controls
const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false
};

window.addEventListener("keydown", e => {
  if (keys.hasOwnProperty(e.key)) {
    keys[e.key] = true;
  }
});

window.addEventListener("keyup", e => {
  if (keys.hasOwnProperty(e.key)) {
    keys[e.key] = false;
  }
});


// color controls
window.setColor = hex => targetColor.set(hex);
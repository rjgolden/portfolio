// ---------- INTERACTION ----------
  let isDragging = false;
  let prevX = 0, prevY = 0;
  let mouseDownPos = { x: 0, y: 0 };
  const CLICK_THRESHOLD = 8;   // pixels of movement before it counts as drag

  let cubeQuat = new THREE.Quaternion().setFromEuler(
    new THREE.Euler(0.4, 0.4, 0)
  );

  // Mouse Down
  canvas.addEventListener('mousedown', e => {
    isDragging = false;
    mouseDownPos.x = e.clientX;
    mouseDownPos.y = e.clientY;
    prevX = e.clientX;
    prevY = e.clientY;
  });

  // Mouse Move
  canvas.addEventListener('mousemove', e => {
    if (e.buttons === 0) return; // mouse not pressed

    const totalDx = e.clientX - mouseDownPos.x;
    const totalDy = e.clientY - mouseDownPos.y;

    if (Math.hypot(totalDx, totalDy) > CLICK_THRESHOLD) {
      isDragging = true;
    }

    if (!isDragging) return;

    // Rotation code
    const dx = (e.clientX - prevX) / canvas.clientWidth;
    const dy = (e.clientY - prevY) / canvas.clientHeight;
    const rotSpeed = 2.5;

    const right = new THREE.Vector3();
    const up = new THREE.Vector3();
    const forward = new THREE.Vector3();

    camera.getWorldDirection(forward);
    right.crossVectors(forward, camera.up).normalize();
    up.copy(camera.up).normalize();

    const qx = new THREE.Quaternion().setFromAxisAngle(up, dx * rotSpeed);
    const qy = new THREE.Quaternion().setFromAxisAngle(right, dy * rotSpeed);

    cubeQuat.premultiply(qx).premultiply(qy);

    prevX = e.clientX;
    prevY = e.clientY;
  });

  canvas.addEventListener('mouseup', (event) => {
    if (!isDragging) {
      handleCubeClick(event);   
    }
    isDragging = false;
  });

  canvas.addEventListener('mouseleave', () => {
    isDragging = false;
  });

  // Helper function for clicking faces
  function handleCubeClick(event) {
    const rect = canvas.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObject(cube);

    if (intersects.length > 0) {
      const materialIndex = Math.floor(intersects[0].faceIndex / 2);

      if (materialIndex >= 0 && materialIndex < labels.length) {
        moveCameraToFace(materialIndex);
        isPanelOpen = true;
        pendingFaceIndex = materialIndex;
        particleOrigin.copy(cameraTargetPosition);
        playBeep();
      }
    }
  }

 function hideCubeInstructions() {
    const el = document.getElementById("cube-instructions");
    if (!el || el.classList.contains("fade-out")) return;

    el.classList.add("fade-out");

    setTimeout(() => {
      el.classList.add("hidden");
    }, 600); // match CSS transition duration
  }

  // ---------- CURSOR HANDLING ----------
  let isHovering = false;

  canvas.addEventListener('mousemove', (e) => {
    if (isDragging) {
      canvas.style.cursor = 'grabbing';
      return;
    }

    // Raycast to see if mouse is over the cube
    const rect = canvas.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(cube);

    const wasHovering = isHovering;
    isHovering = intersects.length > 0;

    if (isHovering) {
      canvas.style.cursor = 'pointer';
    } else {
      canvas.style.cursor = 'default';
    }
  });

  canvas.addEventListener('mousedown', e => {
    hideCubeInstructions();

    isDragging = false;
    mouseDownPos.x = e.clientX;
    mouseDownPos.y = e.clientY;
    prevX = e.clientX;
    prevY = e.clientY;
  });

  // ---------- MOBILE TOUCH HANDLING ----------
  let touchStartPos = { x: 0, y: 0 };
  let isTouchDragging = false;

  canvas.addEventListener('touchstart', e => {
    hideCubeInstructions();

    if (e.touches.length !== 1) return;
    e.preventDefault();

    const touch = e.touches[0];

    isTouchDragging = false;
    touchStartPos.x = touch.clientX;
    touchStartPos.y = touch.clientY;
    prevX = touch.clientX;
    prevY = touch.clientY;

    updateHoverFromTouch(touch);
  }, { passive: false });

  canvas.addEventListener('touchmove', e => {
    if (e.touches.length !== 1) return;
    e.preventDefault();

    const touch = e.touches[0];

    const totalDx = touch.clientX - touchStartPos.x;
    const totalDy = touch.clientY - touchStartPos.y;

    // Threshold to distinguish tap from drag
    if (Math.hypot(totalDx, totalDy) > CLICK_THRESHOLD) {
      isTouchDragging = true;
    }

    if (!isTouchDragging) return;

    // Rotation (same logic as mouse)
    const dx = (touch.clientX - prevX) / canvas.clientWidth;
    const dy = (touch.clientY - prevY) / canvas.clientHeight;
    const rotSpeed = 2.5;

    const right = new THREE.Vector3();
    const up = new THREE.Vector3();
    const forward = new THREE.Vector3();

    camera.getWorldDirection(forward);
    right.crossVectors(forward, camera.up).normalize();
    up.copy(camera.up).normalize();

    const qx = new THREE.Quaternion().setFromAxisAngle(up, dx * rotSpeed);
    const qy = new THREE.Quaternion().setFromAxisAngle(right, dy * rotSpeed);

    cubeQuat.premultiply(qx).premultiply(qy);

    prevX = touch.clientX;
    prevY = touch.clientY;
  }, { passive: false });

  canvas.addEventListener('touchend', e => {
    if (!isTouchDragging && e.changedTouches.length > 0) {
      // It was a tap, treat as click
      const touch = e.changedTouches[0];
      handleCubeClick(touch);
    }

    isTouchDragging = false;
  }, { passive: false });

  // Prevent zoom on double-tap
  canvas.addEventListener('touchend', e => {
    if (e.touches.length > 1) e.preventDefault();
  }, { passive: false });

  // Helper to check hover on touchstart (optional visual feedback)
  function updateHoverFromTouch(touch) {
    const rect = canvas.getBoundingClientRect();
    mouse.x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(cube);

    canvas.style.cursor = intersects.length > 0 ? 'pointer' : 'default';
  }

  // ---------- KEYBOARD ----------
  const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
  };

  window.addEventListener("keydown", e => {
    if (keys.hasOwnProperty(e.key)) keys[e.key] = true;
  });

  window.addEventListener("keyup", e => {
    if (keys.hasOwnProperty(e.key)) keys[e.key] = false;
  });

  // ---------- COLOR ----------
  window.setColor = (hex) => targetColor.set(hex);
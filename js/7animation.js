// ---------- ANIMATION ----------
  let t = 0;
  let lastActive = -1;
  const frustum = new THREE.Frustum();
  const projScreenMatrix = new THREE.Matrix4();

  function animate() {
    requestAnimationFrame(animate);
    t += 0.01;

    currentColor.lerp(targetColor, 0.05);

    edges.material.color.copy(currentColor);
    glowLight.color.copy(currentColor);
    glowLight2.color.copy(currentColor);

    const keySpeed = 0.03;

    const right = new THREE.Vector3();
    const up = new THREE.Vector3();
    const forward = new THREE.Vector3();

    camera.getWorldDirection(forward);
    right.crossVectors(forward, camera.up).normalize();
    up.copy(camera.up).normalize();

    if (keys.ArrowLeft) {
      cubeQuat.premultiply(new THREE.Quaternion().setFromAxisAngle(up, -keySpeed));
    }
    if (keys.ArrowRight) {
      cubeQuat.premultiply(new THREE.Quaternion().setFromAxisAngle(up, keySpeed));
    }
    if (keys.ArrowUp) {
      cubeQuat.premultiply(new THREE.Quaternion().setFromAxisAngle(right, -keySpeed));
    }
    if (keys.ArrowDown) {
      cubeQuat.premultiply(new THREE.Quaternion().setFromAxisAngle(right, keySpeed));
    }

    if (!isDragging) {
      const idleQ = new THREE.Quaternion().setFromEuler(new THREE.Euler(0.002, 0.005, 0));
      cubeQuat.multiply(idleQ);
    }

    cube.quaternion.copy(cubeQuat);
    edges.quaternion.copy(cubeQuat);

    // ---------- FACE DETECTION ----------
    const camDir = new THREE.Vector3();
    camera.getWorldDirection(camDir);
    camDir.negate();

    let maxDot = -Infinity;
    let active = 0;

    normals.forEach((n, i) => {
      const worldNormal = n.clone().applyQuaternion(cube.quaternion);
      const d = worldNormal.dot(camDir);

      if (d > maxDot) {
        maxDot = d;
        active = i;
      }
    });

    // ---------- UPDATE TEXT ONLY WHEN NEEDED ----------
    const activeHex = "#" + currentColor.getHexString();

    faceCanvases.forEach((face, i) => {
        drawFace(face, activeHex, i === active);
    });

    if (active !== lastActive) {
      lastActive = active;
      if (sound2.buffer) {
          if (sound2.isPlaying) sound2.stop();
          sound2.play();
      }
    }

    // ---------- PARTICLES ----------
    particles.forEach(p => {
    p.userData.theta += p.userData.speed;

    const { r, theta, phi } = p.userData;

    p.position.set(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
    );

    // frustum cull
    projScreenMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
    frustum.setFromProjectionMatrix(projScreenMatrix);

    if (!frustum.containsPoint(p.position)) {
        // respawn at a new random position within view
        p.userData.theta = Math.random() * Math.PI * 2;
        p.userData.phi = Math.acos(2 * Math.random() - 1);
        p.userData.r = 2.5 + Math.random() * 6;
        p.visible = false;
    } else {
        p.visible = true;
    }

    const intensity = 0.7 + Math.sin(t * 2 + p.userData.pulseOffset) * 0.4;
    p.material.color.copy(currentColor).multiplyScalar(intensity);
    const depthFade = 1 - (r - 2.5) / 8;
    p.material.opacity = depthFade * (0.3 + 0.4 * Math.abs(Math.sin(t * 0.3 + r)));
  });

    renderer.render(scene, camera);
  }

  animate();

  // ---------- RESIZE ----------
  window.addEventListener('resize', () => {
    const w = parent.clientWidth;
    const h = parent.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
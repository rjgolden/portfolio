const ezNavOrder = [
  { label: "Home", faceIndex: null },
  { label: "About", faceIndex: 0 },
  { label: "Contact", faceIndex: 4 },
  { label: "Settings", faceIndex: 1 },
  { label: "Feed", faceIndex: 5 },
  { label: "Resume", faceIndex: 3 },
  { label: "Projects", faceIndex: 2 }
];

let ezNavIndex = 0;

function updateEzNavLabel() {
  const label = document.getElementById("ez-nav-label");
  if (!label) return;

  label.textContent = ezNavOrder[ezNavIndex].label;
}

function goToEzNavIndex(index) {
  ezNavIndex = (index + ezNavOrder.length) % ezNavOrder.length;

  const item = ezNavOrder[ezNavIndex];

  if (item.faceIndex === null) {
    resetCameraHome();
    isPanelOpen = false;

    if (typeof showIntroduction === "function") {
      showIntroduction();
    }
  } else {
    if (typeof hideIntroduction === "function") {
      hideIntroduction();
    }

    moveCameraToFace(item.faceIndex);
    isPanelOpen = true;
    pendingFaceIndex = item.faceIndex;
    particleOrigin.copy(cameraTargetPosition);
    playBeep();
  }

  updateEzNavLabel();
}

function handleEzNav(direction) {
  hideCubeInstructions();
  goToEzNavIndex(ezNavIndex + direction);
}

const prevBtn = document.getElementById("ez-nav-prev");
const nextBtn = document.getElementById("ez-nav-next");

prevBtn?.addEventListener("click", () => {
  handleEzNav(-1);
});

nextBtn?.addEventListener("click", () => {
  handleEzNav(1);
});

updateEzNavLabel();
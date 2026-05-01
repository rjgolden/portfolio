// theme update
function updateColorMenuTheme() {
  const color = "#" + currentColor.getHexString();

  const fab = document.getElementById("color-fab");
  const menu = document.getElementById("color-menu");

  if (fab) {
    fab.style.color = color;
  }

  if (menu) {
    menu.style.color = color;
    menu.style.borderColor = color;
    menu.style.boxShadow = `0 0 14px ${color}`;
  }
}


// init
function initColorMenu() {
  const fab = document.getElementById("color-fab");
  const menu = document.getElementById("color-menu");
  const picker = document.getElementById("color-picker");
  const customBtn = document.getElementById("custom-color-btn");
  const presets = document.querySelectorAll(".color-btn[data-color]");

  if (!fab || !menu || !picker || !customBtn) return;

  fab.addEventListener("click", e => {
    e.stopPropagation();
    menu.classList.toggle("open");
    playBeep();
  });

  presets.forEach(btn => {
    btn.addEventListener("click", () => {
      const color = btn.dataset.color;
      if (!color) return;

      setColor(color);
      picker.value = color;

      menu.classList.remove("open");
      sound5.play();

      updateColorMenuTheme();
    });
  });

  customBtn.addEventListener("click", () => {
    sound5.play();
  });

  picker.addEventListener("input", () => {
    setColor(picker.value);
    updateColorMenuTheme();
  });

  document.addEventListener("click", e => {
    const inside = fab.contains(e.target) || menu.contains(e.target);
    if (!inside) {
      menu.classList.remove("open");
    }
  });

  updateColorMenuTheme();
}


// init
initColorMenu();
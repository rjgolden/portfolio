let currentColor = new THREE.Color('#FFB000');
let targetColor = new THREE.Color('#FFB000');

const canvas = document.getElementById('c');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const parent = canvas.parentElement;
renderer.setSize(parent.clientWidth, parent.clientHeight);
renderer.setClearColor(0x000000, 1);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(50, parent.clientWidth / parent.clientHeight, 0.1, 100);
camera.position.set(2.5, 1.8, 2.5);
camera.lookAt(0, 0, 0);

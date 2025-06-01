import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

// ------ Renderer ------
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

// ------ Scene ------
const scene = new THREE.Scene();

// ------ Camera ------
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 10);
const controls = new OrbitControls(camera, renderer.domElement);

// ------ Light ------
scene.add(new THREE.AmbientLight(0xffffff, 1));
scene.add(new THREE.HemisphereLight(0xffffbb, 0x080820, 1));

// ------ Load .hdr environment map ------
new RGBELoader().load('textures/new_bk.hdr', function (texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = texture;
    scene.background = texture;

    // ------ Metal Object ------
    const geometry = new THREE.BoxGeometry(3, 3, 3);
    const material = new THREE.MeshStandardMaterial({
        color: 0xff0000,
        roughness: 0,
        metalness: 0.5
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
});

// ------ Resize ------
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// ------ Animate ------
const animate = () => {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
};
animate();

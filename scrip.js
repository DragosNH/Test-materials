import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// ------ Scene ------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 10);

// ------ Renderer ------
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls( camera, renderer.domElement );

// ------ Objects ------
const geometry = new THREE.BoxGeometry(5,5,5);
const materials = [
  new THREE.MeshBasicMaterial({color: 0xff0000}),
  new THREE.MeshBasicMaterial({color: 0x0000ff}),
  new THREE.MeshBasicMaterial({color: 0x00ff00}),
  new THREE.MeshBasicMaterial({color: 0xff00ff}),
  new THREE.MeshBasicMaterial({color: 0x00ffff}),
  new THREE.MeshBasicMaterial({color: 0xffff00})
];
const cube = new THREE.Mesh(geometry, materials);
scene.add(cube);


// ------ Responsive page ------
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
});


const animate = () => {

    controls.update();

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
animate();
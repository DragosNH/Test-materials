import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { dispersion } from 'three/tsl';

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

// ------ Light ------
// --- Ambient light ---
const softLight = new THREE.AmbientLight( 0xffffff );
scene.add( softLight );
// --- Hemisphere light ---
const hemisphereLight = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
scene.add( hemisphereLight );

// ------ Objects ------
const geometry = new THREE.BoxGeometry(3,3,3);
const material = new THREE.MeshPhysicalMaterial(
    {color: 0xff0000},
    {dispersion: 0.5},
    {ior: 2},
    {reflectivity: 1}
);
const cube = new THREE.Mesh(geometry, material);
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
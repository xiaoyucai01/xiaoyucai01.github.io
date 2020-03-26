import * as THREE from './three.module.js';
import {OrbitControls} from './OrbitControls.js';
import Stats from './stats.module.js';

let container = document.createElement('div');
document.body.appendChild(container);

//scenee, camera, renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 50;
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xDDDDDD, 1);
container.appendChild(renderer.domElement);

// mouse controls
let controls;
controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.update();

// stats
let stats = new Stats();
container.appendChild(stats.dom);
let clock = new THREE.Clock();
let mixer;
console.log('123');

// make a cube and apply a texture
let cube;
let loader = new THREE.TextureLoader();
loader.load('metal003.png', function(texture){
	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set(2, 2);

	let geometry = new THREE.BoxGeometry(12, 12, 12);

	const materials = [
	    new THREE.MeshBasicMaterial({map: loader.load('01.jpg')}),
	    new THREE.MeshBasicMaterial({map: loader.load('02.jpg')}),
	    new THREE.MeshBasicMaterial({map: loader.load('03.jpg')}),
	    new THREE.MeshBasicMaterial({map: loader.load('02.jpg')}),
	    new THREE.MeshBasicMaterial({map: loader.load('03.jpg')}),
	    new THREE.MeshBasicMaterial({map: loader.load('01.jpg')}),
	];
	let material = new THREE.MeshLambertMaterial({map: texture, shading: THREE.FlatShading});
	cube = new THREE.Mesh(geometry, materials);

	scene.add(cube);

	draw();

	// add a ambientLight
	let light = new THREE.AmbientLight('rgb(255, 255, 255)'); // soft white light
	scene.add(light);
	// add a spotLight
	let spotLight = new THREE.SpotLight('rgb(255, 255, 255)');
	spotLight.position.set( 100, 1000, 1000 );
	spotLight.castShadow = true;
	scene.add(spotLight);
})


function draw() {
	cube.position.x = 0;
	cube.rotation.z += 0.01;
	//cube.rotation.y += 0.01;
	renderer.render(scene, camera);
	stats.update();

	requestAnimationFrame(draw);
}

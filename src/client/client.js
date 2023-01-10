import gsap from "gsap";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import './style.scss';

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(2);
document.body.appendChild(renderer.domElement);

//--------------------------TEXTURE --------------------//

const textureLoader = new THREE.TextureLoader()
import { sunTexture, mercuryTexture, venusTexture, earthTexture, marsTexture, jupiterTexture, saturnTexture, uranusTexture, neptuneTexture, plutoTexture, uranusRingTexture, saturnRingTexture } from './img/index.js';


//--------------------------SUN RENDER------------------------------------//
function createSun() {
  return new THREE.Mesh(
    new THREE.SphereGeometry(16, 30, 30),
    new THREE.MeshBasicMaterial({
      map: textureLoader.load(sunTexture)
    })
  );
}

const sun = createSun();
scene.add(sun);

//--------------------------PLANET FUNCTION------------------------------------//

function createPlanete(size, texture, position, ring) {
  const geo = new THREE.SphereGeometry(size, 30, 30)
  const mat = new THREE.MeshStandardMaterial({
    map: textureLoader.load(texture)
  })
  const mesh = new THREE.Mesh(geo, mat)
  const obj = new THREE.Object3D();
  obj.add(mesh)
  if (ring) {
    const ringGeo = new THREE.RingGeometry(
      ring.innerRadius,
      ring.outerRadius,
      32);
    const ringMat = new THREE.MeshBasicMaterial({
      map: textureLoader.load(ring.texture),
      side: THREE.DoubleSide
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    obj.add(ringMesh);
    ringMesh.position.x = position;
    ringMesh.rotation.x = -0.5 * Math.PI;
  }
  scene.add(obj);
  mesh.position.x = position
  return { mesh, obj };
}

//------------------------PLANET RENDER------------------------------------//
const mercury = createPlanete(3.2, mercuryTexture, 28);
const venus = createPlanete(5.8, venusTexture, 44);
const earth = createPlanete(6, earthTexture, 62);
const mars = createPlanete(4, marsTexture, 78);
const jupiter = createPlanete(12, jupiterTexture, 100);
const saturn = createPlanete(10, saturnTexture, 138, {
  innerRadius: 10,
  outerRadius: 20,
  texture: saturnRingTexture
});
const uranus = createPlanete(7, uranusTexture, 176, {
  innerRadius: 7,
  outerRadius: 12,
  texture: uranusRingTexture
});
const neptune = createPlanete(7, neptuneTexture, 200);
const pluto = createPlanete(2.8, plutoTexture, 216);

//----------------------------------------------------------------------//

//STARS
function addStar() {
  const geometry = new THREE.SphereGeometry(0.3, 24, 24);
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
  });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(300));

  star.position.set(x, y, z);
  star.userData.rx = Math.random() * 0.01 - 0.005;
  star.userData.ry = Math.random() * 0.01 - 0.005;
  star.userData.rz = Math.random() * 0.01 - 0.005;
  //Star Rotation
  star.rotation.x += star.userData.rx;
  star.rotation.y += star.userData.ry;
  star.rotation.z += star.userData.rz;
  scene.add(star);
  return { star }
}

Array(300).fill().forEach(addStar);

//LIGHTING RENDER
const pointLight = new THREE.PointLight(0xffffff, 2, 300);
scene.add(pointLight);

//PERFECTIVE CAMERA
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 50, 125);
camera.lookAt(new THREE.Vector3(0, 0, 0));

//CONTROL
const controls = new OrbitControls(camera, renderer.domElement);
controls.enabled = true;
controls.enablePan = false;


//HELPER
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);
// const helper = new THREE.DirectionalLightHelper(directionalLight, 5);
// scene.add(helper);

//RESIZE
window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

//ANIMATE
function render() {
  controls.update();

  //Self-rotation
  sun.rotateY(0.001);
  mercury.mesh.rotateY(0.004);
  venus.mesh.rotateY(0.002);
  earth.mesh.rotateY(0.02);
  mars.mesh.rotateY(0.018);
  jupiter.mesh.rotateY(0.04);
  saturn.mesh.rotateY(0.038);
  uranus.mesh.rotateY(0.03);
  neptune.mesh.rotateY(0.032);
  pluto.mesh.rotateY(0.008);

  //Around-sun-rotation
  const earthRotation = 2 * Math.PI * (1 / 60) * (1 / 60)
  mercury.obj.rotateY(earthRotation * 4.14);
  venus.obj.rotateY(earthRotation * 1.6);
  earth.obj.rotateY(earthRotation);
  mars.obj.rotateY(earthRotation * 0.5);
  jupiter.obj.rotateY(earthRotation * 0.0842372490191553);
  saturn.obj.rotateY(earthRotation * 0.033934548159167);
  uranus.obj.rotateY(earthRotation * 0.0118942874832991);
  neptune.obj.rotateY(earthRotation * 0.006064130254195);
  pluto.obj.rotateY(earthRotation * 0.0040331491712707);


  renderer.render(scene, camera);
}
renderer.setAnimationLoop(render);

//ANIMATE

//MOUSE ANIMATION

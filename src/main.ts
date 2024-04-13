import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls'
import { testLight } from './light';
import TestCube from './testCube';

/* ------------------ Global State -----------------*/

const renderer = setupRenderer();
const camera = setupCamera({
  fov: 100,
  aspect: window.innerWidth / window.innerHeight,
  near: 1,
  far: 2000,
});
const cameraControls = setupCameraControls(camera, renderer, {
  minDistance: 20,
  maxDistance: 400,
});
const scene = setupScene({
  bgColor: 0x000000,
  bgLightColor: 0x333333,
  bgLightIntensity: 0.5,
  // helper: true,
});

/* ------------------ Main -----------------*/

;(function() {

  // Hook Renderer to DOM
  document.body.appendChild(renderer.domElement);

  // Resize
  window.addEventListener('resize', () => {
    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;
  
    renderer.setSize(canvasWidth, canvasHeight);
  
    camera.aspect = canvasWidth / canvasHeight;
    camera.updateProjectionMatrix();
  });

  // Cube
  const testCube = new TestCube({
    x: 0, y: 0, z: 0,
    color: 0x00FF00, // Green
    width: 10, height: 10, depth: 10,
  });
  scene.add(testCube.mesh);

  // Light
  scene.add(testLight(10, 0, 0));
  scene.add(testLight(0, 10, 0));
  scene.add(testLight(0, 0, 10));

  // Update Hook
  function update() {
    testCube.update();
  }

  // Setup render function
  function render() {
    requestAnimationFrame(render);
    update();
    renderer.render(scene, camera);
  }

  render();
})();

/* ------------------ Setup Functions -----------------*/

function setupRenderer() {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  // renderer.outputEncoding = THREE.sRGBEncoding;
  return renderer;
}

type CameraParams = {
  fov: number,
  aspect: number,
  near: number,
  far: number,
};
function setupCamera(params: CameraParams) {
  const { fov, aspect, near, far } = params;

  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

  return camera;
}

type CameraControlsParams = {
  minDistance: number,
  maxDistance: number,
};
function setupCameraControls(camera: THREE.Camera, renderer: THREE.Renderer, params: CameraControlsParams) {
  const { minDistance, maxDistance } = params;

  const cameraControls = new OrbitControls(camera, renderer.domElement);
  cameraControls.minDistance = minDistance;
  cameraControls.maxDistance = maxDistance;
  cameraControls.enablePan = false;
  cameraControls.update();

  return cameraControls;
}

type InitSceneParams = {
  bgColor: number, // Hex
  bgLightColor: number,
  bgLightIntensity: number,
  helper?: boolean,
};
function setupScene(params: InitSceneParams) {
  const { bgColor, bgLightColor, bgLightIntensity, helper, } = params;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(bgColor);
  scene.add(new THREE.AmbientLight(bgLightColor, bgLightIntensity));

  if(helper) {
    const axesHelper = new THREE.AxesHelper(100);
    scene.add(axesHelper);
  }

  return scene;
}

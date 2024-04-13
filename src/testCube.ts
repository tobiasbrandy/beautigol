import * as THREE from 'three';

type TestCubeParams = {
  x: number,
  y: number,
  z: number

  color: number,

  width: number,
  height: number,
  depth: number,
};

export default class TestCube {
  mesh: THREE.Mesh

  constructor(params: TestCubeParams) {
    const geometry = new THREE.BoxGeometry(params.width, params.height, params.depth);
    const material = new THREE.MeshPhongMaterial({ color: params.color });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.set(params.x, params.y, params.z);
  }

  update() {
    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.01;
  }
}

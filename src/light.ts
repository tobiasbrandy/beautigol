import * as THREE from 'three';

export function testLight(x: number, y: number, z: number) {
  const light = new THREE.PointLight(0xFFFFFF, 20);
  light.position.set(x, y, z);
  return light;
}

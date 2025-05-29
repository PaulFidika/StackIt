import * as THREE from 'three';

class Ripple {
  constructor(position, color) {
    const geom = new THREE.PlaneGeometry(2, 2);
    const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.5, depthWrite: false });
    this.mesh = new THREE.Mesh(geom, mat);
    this.mesh.rotation.x = -Math.PI / 2;
    this.mesh.position.copy(position.clone().add(new THREE.Vector3(0, 0.1, 0)));
    this.scaleSpeed = 4;
    this.fadeSpeed = 1;
  }

  update(delta) {
    this.mesh.scale.x += this.scaleSpeed * delta;
    this.mesh.scale.y += this.scaleSpeed * delta;
    this.mesh.material.opacity -= this.fadeSpeed * delta;
  }

  isDone() {
    return this.mesh.material.opacity <= 0;
  }
}

export default Ripple;

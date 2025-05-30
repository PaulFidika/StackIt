/* eslint-disable no-param-reassign, no-trailing-spaces, eol-last */
import * as THREE from 'three';

class Firework {
  constructor(position, color = 0xffffff, particleCount = 12) {
    this.params = {
      duration: 1.2,
    };
    this.elapsed = 0;
    this.isComplete = false;

    this.group = new THREE.Group();
    this.velocities = [];

    for (let i = 0; i < particleCount; i += 1) {
      const geom = new THREE.BoxGeometry(0.5, 0.5, 0.5);
      const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 1 });
      const cube = new THREE.Mesh(geom, mat);
      cube.position.copy(position);
      this.group.add(cube);
      const dir = new THREE.Vector3(
        (Math.random() - 0.5),
        Math.random() * 0.8 + 0.2,
        (Math.random() - 0.5),
      ).normalize();
      this.velocities.push(dir.multiplyScalar(15 + Math.random() * 10));
    }
  }

  update(delta) {
    if (this.isComplete) return;
    this.elapsed += delta;
    const t = this.elapsed / this.params.duration;
    if (t >= 1) {
      this.isComplete = true;
      return;
    }
    this.group.children.forEach((cube, idx) => {
      cube.position.addScaledVector(this.velocities[idx], delta);
      cube.material.opacity = 1 - t;
    });
  }
}

export default Firework; 
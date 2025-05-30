/* eslint-disable no-trailing-spaces, eol-last */
import * as THREE from 'three';

class Ripple {
  constructor(position, color = 0xffffff) {
    this.params = {
      duration: 0.6,
      maxScale: 4,
    };
    this.elapsed = 0;
    this.isComplete = false;

    const geom = new THREE.PlaneGeometry(1, 1, 1, 1);
    const mat = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    this.mesh = new THREE.Mesh(geom, mat);
    this.mesh.rotation.x = -Math.PI / 2;
    this.mesh.position.copy(position);
    this.mesh.position.y += 0.5;
    this.mesh.scale.setScalar(0.1);
  }

  update(delta, camera) {
    if (this.isComplete) return;
    if (camera) {
      this.mesh.lookAt(camera.position);
    }
    this.elapsed += delta;
    const t = this.elapsed / this.params.duration;
    if (t >= 1) {
      this.isComplete = true;
      return;
    }
    const scale = THREE.MathUtils.lerp(0.1, this.params.maxScale, t);
    this.mesh.scale.setScalar(scale);
    this.mesh.material.opacity = 0.8 * (1 - t);
  }
}

export default Ripple;

// end 
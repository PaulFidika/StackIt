import * as THREE from 'three';

class Firework {
  constructor(position, color) {
    const geom = new THREE.BufferGeometry();
    const positions = [];
    this.velocities = [];
    const count = 8;
    for (let i = 0; i < count; i += 1) {
      positions.push(0, 0, 0);
      const v = new THREE.Vector3(
        (Math.random() * 2 - 1),
        Math.random() * 2 + 1,
        (Math.random() * 2 - 1),
      );
      this.velocities.push(v);
    }
    geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({ color, size: 0.5, transparent: true, opacity: 0.8, depthWrite: false });
    this.points = new THREE.Points(geom, mat);
    this.points.position.copy(position.clone().add(new THREE.Vector3(0, 0.5, 0)));
    this.fadeSpeed = 1;
  }

  update(delta) {
    const posAttr = this.points.geometry.getAttribute('position');
    for (let i = 0; i < this.velocities.length; i += 1) {
      const vx = this.velocities[i];
      posAttr.array[i * 3] += vx.x * delta * 5;
      posAttr.array[i * 3 + 1] += vx.y * delta * 5;
      posAttr.array[i * 3 + 2] += vx.z * delta * 5;
    }
    posAttr.needsUpdate = true;
    this.points.material.opacity -= this.fadeSpeed * delta;
  }

  isDone() {
    return this.points.material.opacity <= 0;
  }
}

export default Firework;

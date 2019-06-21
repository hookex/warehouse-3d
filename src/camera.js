import * as THREE from "three";

export function initCamera() {
    const fov = 45;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 40000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(-800, 1600, 4000);
    return camera
}

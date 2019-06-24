import * as THREE from "three";

export function initCamera(Warehouse) {
    const fov = 45;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 40000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(Warehouse.width / 2, Warehouse.width, Warehouse.length * 2);
    return camera
}

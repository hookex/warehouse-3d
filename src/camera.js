import * as THREE from "three";
import {WarehouseLength, WarehouseWidth} from "./index";

export function initCamera() {
    const fov = 45;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 20000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 2000, 4400);
    return camera
}

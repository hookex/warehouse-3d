import * as THREE from "three";
import {Warehouse} from "./index";
import {makeAxisGrid} from "./gui";

export function initPlane(group) {
    // const loader = new THREE.TextureLoader();
    // const texture = loader.load('https://threejsfundamentals.org/threejs/resources/images/checker.png');
    // texture.wrapS = THREE.RepeatWrapping;
    // texture.wrapT = THREE.RepeatWrapping;
    // texture.magFilter = THREE.NearestFilter;
    // const repeats = planeSize / 2;
    // texture.repeat.set(repeats, repeats);

    const planeGeo = new THREE.PlaneGeometry(Warehouse.width, Warehouse.length, 1, 1);
    const planeMat = new THREE.MeshLambertMaterial({
        color: new THREE.Color(0x999999),
        side: THREE.DoubleSide,
        shading: THREE.SmoothShading
    });
    const mesh = new THREE.Mesh(planeGeo, planeMat);
    mesh.rotation.x = Math.PI * -0.5;
    mesh.position.set(Warehouse.width / 2, 0, Warehouse.length / 2);
    mesh.castShadow = false;
    mesh.receiveShadow = true;
    group.add(mesh);
    makeAxisGrid(group, "warehouse")
}

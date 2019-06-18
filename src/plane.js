import * as THREE from "three";
import {WarehouseLength, WarehouseWidth} from "./index";


export function initPlane(group) {
    // const loader = new THREE.TextureLoader();
    // const texture = loader.load('https://threejsfundamentals.org/threejs/resources/images/checker.png');
    // texture.wrapS = THREE.RepeatWrapping;
    // texture.wrapT = THREE.RepeatWrapping;
    // texture.magFilter = THREE.NearestFilter;
    // const repeats = planeSize / 2;
    // texture.repeat.set(repeats, repeats);

    const planeGeo = new THREE.PlaneGeometry(WarehouseWidth, WarehouseLength, 200, 200);
    const planeMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0x999999),
        side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(planeGeo, planeMat);
    mesh.rotation.x = Math.PI * -0.5;
    mesh.position.set(WarehouseWidth/2, -1, WarehouseLength/2)
    group.add(mesh);
    // makeAxisGrid(warehouseSystem, "warehouse")
}

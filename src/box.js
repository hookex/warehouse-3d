import * as THREE from "three";
import {WarehouseLength, WarehouseWidth} from "./index";

const InstancedMesh = require('three-instanced-mesh')(THREE);

export function initBox(scene, count = 500) {
    let geometry = new THREE.BoxBufferGeometry(36, 100, 72);
    let material = new THREE.MeshPhongMaterial({color: 0xFFFFFF});

    const cluster = new InstancedMesh(
        geometry,
        material,
        count,
        false,
        false,
        false,
    );

    let v3 = new THREE.Vector3();
    let quaternion = new THREE.Quaternion();

    let subCount = parseInt(Math.sqrt(count))

    let index = 0;
    for (let i = 0; i < subCount; i++) {
        for (let j = 0; j < subCount; j++) {
            index++;

            const {x, z} = getRandomPosition()
            cluster.setQuaternionAt(index, quaternion);
            cluster.setPositionAt(index, v3.set(x, 50, z));
            cluster.setScaleAt(index, v3.set(1, 1, 1));
        }
    }

    cluster.castShadow = true;
    cluster.receiveShadow = true;

    scene.add(cluster)
}


function getRandomPosition() {
    const unit = 40;

    const ranX = Math.random() * (WarehouseWidth);
    const ranZ = Math.random() * (WarehouseLength - 200);


    return {
        x: ranX - ranX % unit,
        z: ranZ - ranZ % unit,
    }
}

import * as THREE from "three";

const InstancedMesh = require('three-instanced-mesh')(THREE);

export function initBox(scene, count = 500) {
    let geometry = new THREE.BoxBufferGeometry(36, 100, 72);
    let material = new THREE.MeshBasicMaterial({color: 0xFFFFFF});

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
            cluster.setPositionAt(index, v3.set(x, 1, z));
            cluster.setScaleAt(index, v3.set(1, 1, 1));
        }
    }

    scene.add(cluster)
}


function getRandomPosition() {
    const width = 2000;
    const length = 2000;
    const unit = 40;

    const ranX = Math.random() * 2000
    const ranZ = Math.random() * 2000


    return {
        x: ranX - ranX % unit,
        z: ranZ - ranZ % unit,
    }
}

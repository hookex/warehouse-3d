import * as THREE from "three";
import {Warehouse} from "./index";
import {getRandomPosition} from "./util";
import {MapData} from "./map-data";

const InstancedMesh = require('three-instanced-mesh')(THREE);

export function initQueue(scene, Warehouse) {
    let queue = MapData.queue.map((data) => {
        return {
            x: data.x * MapData.unit,
            z: data.z * MapData.unit,
        }
    });

    let count = queue.length;

    const loader = new THREE.TextureLoader();
    const texture = loader.load('/src/images/StationQueue.png');

    let geometry = new THREE.PlaneBufferGeometry(Warehouse.unit-2, Warehouse.unit-2);
    geometry.rotateX(-Math.PI / 2);
    let material = new THREE.MeshLambertMaterial({map: texture});
    material.transparent = true;

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

    for (let i = 0; i < count; i++) {
        const data = queue[i];
        cluster.setQuaternionAt(i, quaternion);
        cluster.setPositionAt(i, v3.set(data.x + Warehouse.unit / 2+1, 1, data.z + Warehouse.unit / 2+1));
        cluster.setScaleAt(i, v3.set(1, 1, 1));
    }

    cluster.receiveShadow = true;

    scene.add(cluster)
}



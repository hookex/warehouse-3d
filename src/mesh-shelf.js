import * as THREE from "three";
import {Warehouse} from "./index";
import {getRandomPosition} from "./util";
import {MapData} from "./map-data";

const InstancedMesh = require('three-instanced-mesh')(THREE);

export function initMeshShelf(scene) {
    let shelvesData = MapData.shelves.map((data) => {
        return {
            x: data.x * MapData.unit,
            z: data.z * MapData.unit,
        }
    });

    let count = shelvesData.length;

    let geometry = new THREE.BoxBufferGeometry(Warehouse.unit-2, Warehouse.unit * 2, Warehouse.unit-2,1,1,1);
    let material = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
    material.transparent = true;
    material.opacity = 0.8;

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
        const data = shelvesData[i];
        cluster.setQuaternionAt(i, quaternion);
        cluster.setPositionAt(i, v3.set( data.x+ Warehouse.unit / 2 + 1, Warehouse.unit, data.z + Warehouse.unit / 2 + 1));
        cluster.setScaleAt(i, v3.set(1, 1, 1));
    }

    cluster.castShadow = true;
    cluster.receiveShadow = true;

    scene.add(cluster)
}



import * as THREE from "three";
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {getRandomPosition} from "./util";
import {Warehouse} from "./index";
import {MapData} from "./map-data";

const InstancedMesh = require('three-instanced-mesh')(THREE);

export function initInstancingShelf(group) {
    const gltfLoader = new GLTFLoader();

    let shelvesData = MapData.shelves.map((data) => {
        return {
            x: data.x * MapData.unit,
            z: data.z * MapData.unit,
        }
    });

    let count = shelvesData.length;

    gltfLoader.load('./assets/models/box/scene.gltf', (gltf) => {
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                if (child.castShadow !== undefined) {
                    child.castShadow = true;
                }
            }
        });

        const root = gltf.scene;
        const shelf = root.getObjectByName('Cube003_box_0');

        if (!shelf) {
            return;
        }

        const fix = {
            rot: [-Math.PI / 2, 0, 0],
            scalar: 18,
        };

        shelf.geometry.rotateX(fix.rot[0]);
        shelf.geometry.rotateY(fix.rot[1]);
        shelf.geometry.rotateZ(fix.rot[2]);
        shelf.geometry.scale(fix.scalar, fix.scalar, fix.scalar);

        const box = new THREE.Box3().setFromObject(shelf);
        const width = box.getSize().x / 2;
        const length = box.getSize().z / 2;
        const height = box.getSize().y;
        shelf.position.set(0, 0, 0);

        const material = new THREE.MeshLambertMaterial({
            color: new THREE.Color(0xFFFFFF),
            map: shelf.material.map,
        });

        const cluster = new InstancedMesh(
            shelf.geometry,
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
            cluster.setPositionAt(i, v3.set(data.x + Warehouse.unit / 2, height / 2, data.z + Warehouse.unit / 2));
            cluster.setScaleAt(i, v3.set(1, 1, 1));
        }

        cluster.visible = true;
        cluster.castShadow = true;
        cluster.receiveShadow = true;

        group.add(cluster);
    });
}

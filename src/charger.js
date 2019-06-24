import * as THREE from "three";
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {getRandomPosition} from "./util";
import {Warehouse} from "./index";
import {MapData} from "./map-data";

const InstancedMesh = require('three-instanced-mesh')(THREE);
const manCount = 100;

export function initCharger(group) {
    const gltfLoader = new GLTFLoader();

    gltfLoader.load('/src/models/battery/scene.gltf', (gltf) => {
        console.log('gltf', gltf)
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                console.log('child', child)
                if (child.castShadow !== undefined) {
                    child.castShadow = true;
                }
                console.log("mesh", child);
            }
        });

        const root = gltf.scene;
        const battery = root.getObjectByName('battery_Material_#26_0');

        if (!battery) {
            return;
        }

        const fix = {
            rot: [0, 0, 0],
            scalar: 10,
        };

        battery.geometry.rotateX(fix.rot[0]);
        battery.geometry.rotateY(fix.rot[1]);
        battery.geometry.rotateZ(fix.rot[2]);
        battery.geometry.scale(fix.scalar, fix.scalar, fix.scalar);

        const box = new THREE.Box3().setFromObject(battery);
        const length = box.getSize().x / 2;
        const height = box.getSize().y;
        battery.position.set(length / 2, 0, length / 2);

        const cluster = new InstancedMesh(
            battery.geometry,
            battery.material,
            manCount,
            true,
            false,
            true,
        );

        let v3 = new THREE.Vector3();
        let quaternion = new THREE.Quaternion();

        let chargersData = MapData.chargers.map((data) => {
            return {
                x: data.x * MapData.unit,
                z: data.z * MapData.unit,
            }
        });

        let count = chargersData.length;

        for (let i = 0; i < count; i++) {
            const data = chargersData[i];
            cluster.setQuaternionAt(i, quaternion);
            cluster.setPositionAt(i, v3.set(data.x + Warehouse.unit / 2, height/2, data.z + Warehouse.unit / 2));
            cluster.setScaleAt(i, v3.set(1, 1, 1));
        }

        group.add(cluster);
    });
}

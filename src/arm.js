import * as THREE from "three";
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {Warehouse, WarehouseLength, WarehouseUnit} from "./index";
import {getRandomPosition} from "./util";
import {MapData} from "./map-data";

export function initArm(group, Warehouse) {
    const gltfLoader = new GLTFLoader();

    gltfLoader.load('/src/models/robotarm/scene.gltf', (gltf) => {
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                if (child.castShadow !== undefined) {
                    child.castShadow = true;
                }
            }
        });

        const arm = gltf.scene;

        const fix = {
            rot: [0, Math.PI / 2, 0],
            scalar: 0.5,
        };

        let armsData = MapData.arms.map((data) => {
            return {
                x: data.x * MapData.unit,
                z: data.z * MapData.unit,
            }
        });

        let count = armsData.length;
        console.log('count', armsData, count);

        for (let i = 0; i < count; i++) {
            const data = armsData[i];
            const obj = new THREE.Object3D();
            let armClone = arm.clone();
            armClone.getWorldDirection(obj.position);
            armClone.rotation.set(...fix.rot);
            armClone.scale.setScalar(fix.scalar);
            armClone.position.set(0, 0, 0);
            obj.add(armClone);
            obj.position.set(data.x + Warehouse.unit / 2, 0, data.z + Warehouse.unit / 2);
            Warehouse.arms.push(obj);
            group.add(obj);

            // const mixer = new THREE.AnimationMixer(armClone);
            // Warehouse.armMixers.push(mixer);
            // const action = mixer.clipAction(gltf.animations[0]);
            // action.timeScale = 2;
            // action.startAt(Math.random() * 2).play();
        }
    });
}

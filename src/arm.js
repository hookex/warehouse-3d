import * as THREE from "three";
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {Warehouse, WarehouseLength, WarehouseUnit} from "./index";
import {getRandomPosition} from "./util";

const armCount = 50;

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
            rot: [0, -Math.PI / 2, 0],
            scalar: 1,
        };

        for (let i = 0; i < armCount; i++) {
            const {x, z} = getRandomPosition(Warehouse.width, Warehouse.length - Warehouse.unit * 8);
            const obj = new THREE.Object3D();
            let armClone = arm.clone()
            armClone.getWorldDirection(obj.position);
            armClone.rotation.set(...fix.rot);
            armClone.scale.setScalar(fix.scalar);
            armClone.position.set(0, 0, 0);
            obj.add(armClone);
            obj.position.set(x + Warehouse.unit / 2, 0, z + Warehouse.unit / 2);
            Warehouse.arms.push(obj);
            group.add(obj);

            const mixer = new THREE.AnimationMixer(armClone);
            Warehouse.armMixers.push(mixer);
            const action = mixer.clipAction(gltf.animations[0]);
            action.timeScale = 2;
            action.startAt(Math.random()*2).play();
        }
    });
}

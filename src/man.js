import * as THREE from "three";
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {WarehouseLength, WarehouseUnit} from "./index";

const InstancedMesh = require('three-instanced-mesh')(THREE);

export function initMan(group, Warehouse) {
    const gltfLoader = new GLTFLoader();

    gltfLoader.load('/src/models/man/CesiumMan.gltf', (gltf) => {
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                if (child.castShadow !== undefined) {
                    child.castShadow = true;
                }
                console.log("mesh", child);
            }
        });

        const man = gltf.scene;

        // const box = new THREE.Box3().setFromObject(man);
        // Warehouse.unit / box.getSize().y

        const fix = {
            rot: [0, -Math.PI / 2, 0],
            scalar: 50,
        };

        const obj = new THREE.Object3D();
        man.getWorldDirection(obj.position);
        man.position.set(0, 0, 0);
        man.rotation.set(...fix.rot);
        man.scale.setScalar(fix.scalar);
        obj.add(man);
        Warehouse.man.push(obj);
        group.add(obj);

        Warehouse.mixer = new THREE.AnimationMixer(man);
        Warehouse.mixer.clipAction(gltf.animations[0]).play();
    });
}

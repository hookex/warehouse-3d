import * as THREE from "three";
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {getRandomPosition} from "./util";
import {Warehouse} from "./index";

const InstancedMesh = require('three-instanced-mesh')(THREE);
const manCount = 100;

export function initManInstance(group) {
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

        const root = gltf.scene;
        const man = root.getObjectByName('Cesium_Man');

        if (!man) {
            return;
        }

        const fix = {
            rot: [-Math.PI / 2, -Math.PI / 2, 0],
            scalar: 50,
        };

        man.geometry.rotateX(fix.rot[0]);
        man.geometry.rotateY(fix.rot[1]);
        man.geometry.rotateZ(fix.rot[2]);
        man.geometry.scale(fix.scalar, fix.scalar, fix.scalar);

        const box = new THREE.Box3().setFromObject(man);
        const length = box.getSize().x / 2;
        man.position.set(length / 2, 0, length / 2);

        const cluster = new InstancedMesh(
            man.geometry,
            man.material,
            manCount,
            true,
            false,
            true,
        );

        let v3 = new THREE.Vector3();
        let quaternion = new THREE.Quaternion();

        let subCount = parseInt(Math.sqrt(manCount))

        let index = 0;
        for (let i = 0; i < subCount; i++) {
            for (let j = 0; j < subCount; j++) {
                index++;
                const {x, z} = getRandomPosition(Warehouse.width, Warehouse.length - Warehouse.unit * 8);
                cluster.setQuaternionAt(index, quaternion);
                cluster.setPositionAt(index, v3.set(x + Warehouse.unit / 2, 0, z + Warehouse.unit / 2));
                cluster.setScaleAt(index, v3.set(1, 1, 1));
            }
        }

        Warehouse.manMixer = new THREE.AnimationMixer(gltf.scene);
        Warehouse.manMixer.clipAction(gltf.animations[0]).play();

        Warehouse.manCluster = cluster;
        group.add(cluster);
    });
}

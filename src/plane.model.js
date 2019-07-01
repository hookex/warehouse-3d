import * as THREE from "three";
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {getRandomPosition} from "./util";
import {Warehouse} from "./index";
import {MapData} from "./map-data";

const InstancedMesh = require('three-instanced-mesh')(THREE);
const manCount = 100;

export function initPlaneModel(group, Warehouse) {
    const gltfLoader = new GLTFLoader();

    gltfLoader.load('./assets/models/two_side_plane/TwoSidedPlane.gltf', (gltf) => {
        let plane = undefined;

        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                plane = child;
                console.log('TwoSidedPlane instance', child)

                if (child.castShadow !== undefined) {
                    child.castShadow = true;
                }
            }
        });


        if (!plane) {
            return;
        }

        const fix = {
            rot: [-Math.PI / 2, Math.PI / 2, Math.PI / 2],
            scalar: 20,
        };

        plane.geometry.rotateX(fix.rot[0]);
        plane.geometry.rotateY(fix.rot[1]);
        plane.geometry.rotateZ(fix.rot[2]);
        plane.geometry.scale(fix.scalar, fix.scalar, fix.scalar);

        let xCount = Warehouse.width / Warehouse.unit;
        let yCount = Warehouse.length / Warehouse.unit;

        const cluster = new InstancedMesh(
            plane.geometry,
            plane.material,
            xCount * yCount,
            true,
            false,
            true,
        );

        let v3 = new THREE.Vector3();
        let quaternion = new THREE.Quaternion();

        let index = 0;
        for (let i = 0; i < xCount; i++) {
            for (let j = 0; j < yCount; j++) {
                const x = Warehouse.unit * i + Warehouse.unit / 2;
                const z = Warehouse.unit * j + Warehouse.unit / 2;
                console.log('position', i, x, z)
                cluster.setQuaternionAt(index, quaternion);
                cluster.setPositionAt(index, v3.set(x, 0, z));
                cluster.setScaleAt(index, v3.set(1, 1, 1));
                index++;
            }
        }

        group.add(cluster);
    });
}

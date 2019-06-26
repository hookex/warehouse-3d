import * as THREE from "three";
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {getRandomPosition} from "./util";
import {Warehouse} from "./index";
import {MapData} from "./map-data";

const InstancedMesh = require('three-instanced-mesh')(THREE);

export function initInstancingElevator(group) {
    const gltfLoader = new GLTFLoader();


    let elevatorsData = MapData.elevators.map((data) => {
        return {
            x: data.x * MapData.unit,
            z: data.z * MapData.unit,
        }
    });

    let count = elevatorsData.length;

    gltfLoader.load('/src/models/elevator/scene.gltf', (gltf) => {
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                console.log('child', child)
                if (child.castShadow !== undefined) {
                    child.castShadow = true;
                }
            }
        });

        const root = gltf.scene;
        const elevator = root.getObjectById(87);

        if (!elevator) {
            return;
        }

        const fix = {
            rot: [-Math.PI / 2, 0, 0],
            scalar: 18,
        };

        elevator.geometry.rotateX(fix.rot[0]);
        elevator.geometry.rotateY(fix.rot[1]);
        elevator.geometry.rotateZ(fix.rot[2]);
        elevator.geometry.scale(fix.scalar, fix.scalar, fix.scalar);

        const box = new THREE.Box3().setFromObject(elevator);
        const width = box.getSize().x / 2;
        const length = box.getSize().z / 2;
        const height = box.getSize().y;
        elevator.position.set(0, 0, 0);

        const material = new THREE.MeshLambertMaterial({
            color: new THREE.Color(0xFFFFFF),
            map: elevator.material.map,
        });

        const cluster = new InstancedMesh(
            elevator.geometry,
            material,
            count,
            false,
            false,
            false,
        );

        let v3 = new THREE.Vector3();
        let quaternion = new THREE.Quaternion();

        for (let i = 0; i < count; i++) {
            const data = elevatorsData[i];
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

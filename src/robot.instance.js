import * as THREE from "three";
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {getRandomPosition} from "./util";
import {Warehouse} from "./index";
import {MapData} from "./map-data";

const InstancedMesh = require('three-instanced-mesh')(THREE);
const manCount = 100;

export function initInstancingRobot(group, Warehouse) {
    const gltfLoader = new GLTFLoader();

    gltfLoader.load('/src/models/voxel_robot/scene.gltf', (gltf) => {
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                console.log('robot', child)

                if (child.castShadow !== undefined) {
                    child.castShadow = true;
                }
            }
        });

        const root = gltf.scene;
        const robot = root.getObjectById(83);

        if (!robot) {
            return;
        }

        const fix = {
            rot: [-Math.PI / 2, Math.PI / 2, 0],
            scalar: 2,
        };

        robot.geometry.rotateX(fix.rot[0]);
        robot.geometry.rotateY(fix.rot[1]);
        robot.geometry.rotateZ(fix.rot[2]);
        robot.geometry.scale(fix.scalar, fix.scalar, fix.scalar);
        const box = new THREE.Box3().setFromObject(robot);
        console.log('box.getSize()',box.getSize())

        const width = box.getSize().x / 2;
        const length = box.getSize().y / 2;

        const cluster = new InstancedMesh(
            robot.geometry,
            robot.material,
            manCount,
            true,
            false,
            true,
        );

        let v3 = new THREE.Vector3();
        let quaternion = new THREE.Quaternion();

        let robotsData = MapData.robots.map((data) => {
            return {
                x: data.x * MapData.unit,
                z: data.z * MapData.unit,
            }
        });

        let count = robotsData.length;

        for (let i = 0; i < count; i++) {
            const data = robotsData[i];
            cluster.setQuaternionAt(i, quaternion);
            cluster.setPositionAt(i, v3.set(data.x, 0, data.z));
            cluster.setScaleAt(i, v3.set(1, 1, 1));
        }
        Warehouse.robotCluster = cluster;
        group.add(cluster);
    });
}

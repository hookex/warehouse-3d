import * as THREE from "three";
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {MapData} from "./map-data";

const InstancedMesh = require('three-instanced-mesh')(THREE);

export function initInstancingRobot(group, Warehouse) {
    const gltfLoader = new GLTFLoader();

    gltfLoader.load('/src/models/voxel_robot/scene.gltf', (gltf) => {
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
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

        robot.geometry.center();

        let robotsData = MapData.robots.map((data) => {
            return {
                x: data.x * MapData.unit,
                z: data.z * MapData.unit,
            }
        });

        let count = robotsData.length;

        const material = new THREE.MeshPhongMaterial({
            map: robot.material.map
        });

        const cluster = new InstancedMesh(
            robot.geometry,
            material,
            count,
            true,
            false,
            true,
        );

        let v3 = new THREE.Vector3();
        let quaternion = new THREE.Quaternion();

        for (let i = 0; i < count; i++) {
            const data = robotsData[i];
            cluster.setQuaternionAt(i, quaternion);
            cluster.setPositionAt(i, v3.set(data.x + Warehouse.unit / 2, robot.geometry.boundingBox.getSize().y / 2 + 1, data.z + Warehouse.unit / 2));
            cluster.setScaleAt(i, v3.set(1, 1, 1));
        }

        cluster.visible = true;
        cluster.castShadow = true;
        cluster.receiveShadow = true;
        cluster.frustumCulled = true;

        Warehouse.robotCluster = cluster;
        group.add(cluster);
    });
}

import * as THREE from "three";
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';

const InstancedMesh = require('three-instanced-mesh')(THREE);

export function initManInstance(group) {
    const gltfLoader = new GLTFLoader();

    gltfLoader.load('/src/models/man/CesiumMan.gltf', (gltf) => {
        console.log('gltf', gltf);

        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                if (child.castShadow !== undefined) {
                    child.castShadow = true;
                    // child.rotation.y = Math.PI * 0.5
                }
                console.log("mesh", child);
            }
        });

        const root = gltf.scene;
        const instance = root.getObjectByName('Cesium_Man');

        if (!instance) {
            return;
        }

        const cluster = new InstancedMesh(
            instance.geometry,
            instance.material,
            10,
            true,
            false,
            true,
        );

        let _v3 = new THREE.Vector3();
        let _q = new THREE.Quaternion();

        for (let i = 0; i < 10; i++) {
            cluster.setQuaternionAt(i, _q);
            cluster.setPositionAt(i, _v3.set(i * 100, 0, i * 100));
            cluster.setScaleAt(i, _v3.set(100, 100, 100));
        }

        group.add(cluster);

        // const loadedCars = root.getObjectByName('Cars');
        // const fixes = [
        //     {prefix: 'Car_08', y: 0, rot: [Math.PI * .5, 0, Math.PI * .5],},
        //     {prefix: 'CAR_03', y: 33, rot: [0, Math.PI, 0],},
        //     {prefix: 'Car_04', y: 40, rot: [0, Math.PI, 0],},
        // ];
        //
        // root.updateMatrixWorld();
        // for (const car of loadedCars.children.slice()) {
        //     const fix = fixes.find(fix => car.name.startsWith(fix.prefix));
        //     const obj = new THREE.Object3D();
        //     car.position.set(0, fix.y, 0);
        //     car.rotation.set(...fix.rot);
        //     obj.add(car);
        //     scene.add(obj);
        //     shlefs.push(obj);
        // }
        //
        // // compute the box that contains all the stuff
        // // from root and below
        // const box = new THREE.Box3().setFromObject(root);
        //
        // const boxSize = box.getSize(new THREE.Vector3()).length();
        // const boxCenter = box.getCenter(new THREE.Vector3());
        //
        // // set the camera to frame the box
        // frameArea(boxSize * 0.5, boxSize, boxCenter, camera);
        //
        // // update the Trackball controls to handle the new size
        // controls.maxDistance = boxSize * 10;
        // controls.target.copy(boxCenter);
        // controls.update();
    });
}

import * as THREE from "three";
import OrbitControls from 'three-orbitcontrols'

import createGeometry from 'three-bmfont-text'
import loadFont from 'load-bmfont'

import Stats from '@drecom/stats.js'

let stats = new Stats({maxFPS: 60, maxMem: 100}); // Set upper limit of graph
stats.begin();
document.body.appendChild(stats.dom);

import {resizeRendererToDisplaySize} from './display'
import {initShelf} from './shelf'
import {initCamera} from './camera'
import {initBox} from './box'
import {initLight} from "./light";
import {initPlane} from "./plane";
import {initLogo} from "./logo";
import {makeAxisGrid} from "./gui";
import {initMan} from "./man";

export const WarehouseWidth = 2000;
export const WarehouseLength = 2000;
export const WarehouseUnit = 40;

let clock = new THREE.Clock();

const Warehouse = {
    mixer: null,
    man: [],
};


async function main() {
    const canvas = document.querySelector('#warehouse');
    const renderer = new THREE.WebGLRenderer({canvas});
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;

    const camera = initCamera()

    const controls = new OrbitControls(camera, canvas);
    controls.target.set(WarehouseWidth / 2, 5, WarehouseLength / 2);
    controls.update();

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x181B1E);

    const warehouseSystem = new THREE.Object3D();
    scene.add(warehouseSystem);
    // makeAxisGrid(warehouseSystem);

    initPlane(warehouseSystem);
    initLight(scene);
    initBox(warehouseSystem, 200);
    initLogo(warehouseSystem);
    initMan(warehouseSystem, Warehouse);

    function render() {
        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        const delta = clock.getDelta();

        if (Warehouse.mixer != null) {
            Warehouse.mixer.update(delta);
        }
        //
        // Warehouse.man.forEach((man) => {
        //     const direction = new THREE.Vector3()
        //     man.getWorldDirection(direction);
        //     let {x, y, z} = man.position;
        //     if (direction.x !== 0) {
        //         x++;
        //     }
        //     if (direction.z !== 0) {
        //         z++;
        //     }
        //     man.position.set(x, y, z)
        // });

        renderer.render(scene, camera);

        stats.update();
        requestAnimationFrame(render);
    }

    render()
}

main();

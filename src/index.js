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
import {initManInstance} from "./man.instance";
import {getRandomPosition} from "./util";
import {initArm} from "./arm";

let clock = new THREE.Clock();

export const Warehouse = {
    width: 2000,
    length: 2000,
    unit: 40,
    mixer: null,
    man: [],
    manCluster: null,
    manMixer: undefined,
    arms: [],
    armMixers: [],
};


function main() {
    const canvas = document.querySelector('#warehouse');
    const renderer = new THREE.WebGLRenderer({canvas});
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;

    const camera = initCamera();

    const controls = new OrbitControls(camera, canvas);
    controls.target.set(Warehouse.width / 2, 5, Warehouse.length / 2);
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
    initArm(warehouseSystem, Warehouse);
    initMan(warehouseSystem, Warehouse);
    initManInstance(warehouseSystem, Warehouse);

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

        if (Warehouse.manMixer != null) {
            Warehouse.manMixer.update(delta);
        }

        if (Warehouse.armMixers && Warehouse.armMixers.length) {
            Warehouse.armMixers.forEach((mixer) => {
                mixer.update(delta);
            })
        }

        Warehouse.man.forEach((man) => {
            const direction = new THREE.Vector3();
            man.getWorldDirection(direction);
            let {x, y, z} = man.position;
            z += 2;
            man.position.set(x, y, z)
        });

        if (Warehouse.manCluster) {
            for (let i = 0; i < Warehouse.manCluster.numInstances; i++) {
                let {x, y, z} = Warehouse.manCluster.getPositionAt(i);
                const v3 = new THREE.Vector3();
                Warehouse.manCluster.setPositionAt(i, v3.set(x, y, ++z));
                Warehouse.manCluster.needsUpdate('position')
            }
        }

        renderer.render(scene, camera);

        stats.update();
        requestAnimationFrame(render);
    }

    render()
}

main();


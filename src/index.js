import * as THREE from "three";
import OrbitControls from 'three-orbitcontrols'

import createGeometry from 'three-bmfont-text'
import loadFont from 'load-bmfont'

import Stats from '@drecom/stats.js'

let stats = new Stats({maxFPS: 60, maxMem: 100}); // Set upper limit of graph
stats.begin();
document.body.appendChild(stats.dom);

import {resizeRendererToDisplaySize} from './display'
import {initInstancingShelf} from './intancing-shelf'
import {initCamera} from './camera'
import {initMeshShelf} from './mesh-shelf'
import {initLight} from "./light";
import {initPlane} from "./plane";
import {initLogo} from "./logo";
import {makeAxisGrid} from "./gui";
import {initMan} from "./man";
import {initManInstance} from "./man.instance";
import {getRandomPosition} from "./util";
import {initArm} from "./arm";

import {MapData} from './map-data'
import {initRotates} from "./rotate";
import {initParkZones} from "./park";
import {initQueue} from "./queue";
import {initCharger} from "./charger";
import {initForbidden} from "./forbidden";

let clock = new THREE.Clock();

export const Warehouse = {
    renderer: undefined,
    width: MapData.width * MapData.unit,
    length: MapData.length * MapData.unit,
    unit: MapData.unit,
    mixer: null,
    man: [],
    manCluster: null,
    manMixer: undefined,
    arms: [],
    armMixers: [],
    rotatesCluster: undefined,
};


function main() {
    const canvas = document.querySelector('#warehouse');
    Warehouse.renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        precision: "highp",
        powerPreference: "high-performance",
    });
    Warehouse.renderer.shadowMap.enabled = true;
    Warehouse.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const camera = initCamera(Warehouse);

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
    initLogo(warehouseSystem, Warehouse);
    initArm(warehouseSystem, Warehouse);
    initRotates(warehouseSystem, Warehouse);
    initParkZones(warehouseSystem, Warehouse);
    initQueue(warehouseSystem, Warehouse);
    initCharger(warehouseSystem, Warehouse);
    initForbidden(warehouseSystem, Warehouse);
    // initMeshShelf(warehouseSystem, Warehouse);
    initInstancingShelf(warehouseSystem, Warehouse);
    // initMan(warehouseSystem, Warehouse);

    let startQuan = 0;

    function render() {
        if (resizeRendererToDisplaySize(Warehouse.renderer)) {
            const canvas = Warehouse.renderer.domElement;
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


        if (Warehouse.rotatesCluster) {
            const cluster = Warehouse.rotatesCluster;
            const delta = 0.002;

            for (let i = 0; i < cluster.numInstances; i++) {
                let q = cluster.getQuaternionAt(i)
                startQuan += Math.PI * delta;
                q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), startQuan)
                cluster.setQuaternionAt(i, q);
                cluster.needsUpdate('quaternion')
            }
        }

        Warehouse.renderer.render(scene, camera);

        stats.update();
        requestAnimationFrame(render);
    }

    render()
}

main();


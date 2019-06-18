import * as THREE from "three";
import OrbitControls from 'three-orbitcontrols'

import createGeometry from 'three-bmfont-text'
import loadFont from 'load-bmfont'


import Stats from '@drecom/stats.js'

let stats = new Stats({maxFPS: 60, maxMem: 100}); // Set upper limit of graph
stats.begin();
document.body.appendChild(stats.dom);

import camera from './camera'
import {resizeRendererToDisplaySize} from './display'
import {initShelf} from './shelf'
import {initBox} from './box'

const WarehouseWidth = 2000
const WarehouseLength = 2000

function main() {

    const canvas = document.querySelector('#warehouse');
    const renderer = new THREE.WebGLRenderer({canvas});
    renderer.shadowMap.enabled = true;

    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 5, 0);
    controls.update();

    const scene = new THREE.Scene();

    const warehouseSystem = new THREE.Object3D();
    scene.add(warehouseSystem)


    // 背景色
    scene.background = new THREE.Color('rgb(24, 27, 30)');

    // 全局灯光
    {
        // const skyColor = 0xFFFFFF;  // light blue
        // const groundColor = 0xB97A20;  // brownish orange
        // const intensity = 1;
        // const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
        // scene.add(light);
    }

    // 仓库底图
    {
        // const loader = new THREE.TextureLoader();
        // const texture = loader.load('https://threejsfundamentals.org/threejs/resources/images/checker.png');
        // texture.wrapS = THREE.RepeatWrapping;
        // texture.wrapT = THREE.RepeatWrapping;
        // texture.magFilter = THREE.NearestFilter;
        // const repeats = planeSize / 2;
        // texture.repeat.set(repeats, repeats);

        const planeGeo = new THREE.PlaneGeometry(WarehouseWidth, WarehouseLength, 200, 200);
        const planeMat = new THREE.MeshBasicMaterial({
            color: new THREE.Color(0x999999),
            side: THREE.DoubleSide,
        });
        const mesh = new THREE.Mesh(planeGeo, planeMat);
        mesh.rotation.x = Math.PI * -0.5;
        mesh.position.set(0, 0, 0)
        warehouseSystem.add(mesh);
        // makeAxisGrid(warehouseSystem, "warehouse")
    }

    {
        let loader = new THREE.FontLoader();
        loader.load('/src/fonts/helvetiker_bold.typeface.json', function (font) {
            let text = "Hooke House";

            let geo = new THREE.TextGeometry(text, {
                font: font,
                size: 100,
                height: 10,
            });

            geo.computeBoundingBox();

            let mat = new THREE.MeshBasicMaterial({color: 0x0e57a2});
            let mesh = new THREE.Mesh(geo, mat);
            mesh.position.set(-400, 100, WarehouseWidth / 2)
            scene.add(mesh);
        });
    }

    // initShelf(scene)
    initBox(scene)

    function render() {
        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }


        renderer.render(scene, camera);

        stats.update();
        requestAnimationFrame(render);
    }

    render()
}

main();

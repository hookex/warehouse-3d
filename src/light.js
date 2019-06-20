import * as THREE from "three";
import {makeAxisGrid} from "./gui";
import {Warehouse, WarehouseLength, WarehouseUnit, WarehouseWidth} from "./index";

export function initLight(group) {
    // Lights
    group.add(new THREE.AmbientLight(0x404040));

    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.name = 'Spot Light';
    spotLight.angle = 1;
    spotLight.penumbra = 0.3;
    spotLight.position.set(Warehouse.width / 2, Warehouse.length, 2 * Warehouse.width);
    spotLight.castShadow = true;
    spotLight.shadow.camera.near = 1;
    spotLight.shadow.camera.far = 6000;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    group.add(spotLight);

    // makeAxisGrid(spotLight, "spotLight")

    // const dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
    // dirLight.name = 'Dir. Light';
    // dirLight.position.set( 0, 10, 0 );
    // // dirLight.castShadow = true;
    // dirLight.shadow.camera.near = 1;
    // dirLight.shadow.camera.far = 10;
    // dirLight.shadow.camera.right = 15;
    // dirLight.shadow.camera.left = - 15;
    // dirLight.shadow.camera.top	= 15;
    // dirLight.shadow.camera.bottom = - 15;
    // dirLight.shadow.mapSize.width = 1024;
    // dirLight.shadow.mapSize.height = 1024;
    //
    // group.add(dirLight)
}

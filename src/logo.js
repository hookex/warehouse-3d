import * as THREE from "three";
import {Warehouse} from "./index";

export function initLogo(group) {
    let loader = new THREE.FontLoader();
    loader.load('/src/fonts/helvetiker_bold.typeface.json', function (font) {
        let text = "Warehouse";

        let geo = new THREE.TextGeometry(text, {
            font: font,
            size: Warehouse.unit / 2,
            height: Warehouse.unit / 8,
        });


        let mat = new THREE.MeshPhongMaterial({color: 0x0e57a2});
        let mesh = new THREE.Mesh(geo, mat);
        mesh.castShadow = true;

        const box = new THREE.Box3().setFromObject(mesh);
        const fontWidth = box.getSize().x;

        mesh.position.set(Warehouse.width / 2 - fontWidth / 2, 0, Warehouse.length - Warehouse.unit / 2)
        group.add(mesh);
    });
}

import * as THREE from "three";
import {Warehouse} from "./index";

export function initLogo(group) {
    let loader = new THREE.FontLoader();
    loader.load('/src/fonts/helvetiker_bold.typeface.json', function (font) {
        let text = "Hooke House";

        let geo = new THREE.TextGeometry(text, {
            font: font,
            size: 100,
            height: 10,
        });

        geo.computeBoundingBox();

        let mat = new THREE.MeshPhongMaterial({color: 0x0e57a2});
        let mesh = new THREE.Mesh(geo, mat);
        mesh.castShadow = true;
        mesh.position.set(-400 + Warehouse.width / 2, 100, Warehouse.width)
        group.add(mesh);
    });
}

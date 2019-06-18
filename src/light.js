import * as THREE from "three";

export function initLight(group) {
    const skyColor = 0xFFFFFF;  // light blue
    const groundColor = 0xB97A20;  // brownish orange
    const intensity = 1;
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    group.add(light);
}

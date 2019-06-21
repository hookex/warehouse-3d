import {Warehouse} from "./index";

export function getRandomPosition(x, z) {
    const unit = 40;

    const ranX = Math.random() * x;
    const ranZ = Math.random() * z;

    return {
        x: ranX - ranX % unit,
        z: ranZ - ranZ % unit,
    }
}

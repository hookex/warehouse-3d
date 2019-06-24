import * as THREE from "three";
import Dat from "dat.gui";
import {Warehouse} from "./index";

const gui = new Dat.GUI();

class AxisGridHelper {
    constructor(node) {
        const box = new THREE.Box3().setFromObject(node);
        const length = box.getSize().x;

        const axes = new THREE.AxesHelper(length);
        axes.material.depthTest = false;
        axes.renderOrder = 0;
        node.add(axes);

        const grid = new THREE.GridHelper(length, Warehouse.width / Warehouse.unit);
        grid.position.set(length / 2, 0, length / 2);
        grid.material.depthTest = false;
        grid.renderOrder = 0;
        node.add(grid);

        this.grid = grid;
        this.axes = axes;
        this.visible = true;
    }

    get visible() {
        return this._visible;
    }

    set visible(v) {
        this._visible = v;
        this.grid.visible = v;
        this.axes.visible = false;
    }
}

export function makeAxisGrid(node, label, units) {
    const helper = new AxisGridHelper(node, units);
    gui.add(helper, 'visible').name(label);
}

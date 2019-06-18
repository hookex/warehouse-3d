import * as THREE from "three";
import Dat from "dat.gui";

const gui = new Dat.GUI();

class AxisGridHelper {
    constructor(node, units = 40) {
        const axes = new THREE.AxesHelper();
        axes.material.depthTest = false;
        axes.renderOrder = 2;
        node.add(axes);

        const grid = new THREE.GridHelper(2000, 40);
        grid.material.depthTest = false;
        grid.renderOrder = 1;
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
        this.axes.visible = v;
    }
}

export function makeAxisGrid(node, label, units) {
    const helper = new AxisGridHelper(node, units);
    gui.add(helper, 'visible').name(label);
}

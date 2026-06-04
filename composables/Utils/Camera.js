import { PerspectiveCamera } from 'three';

import GL from '../GL.js';

export default class Camera {
    constructor() {
        this.gl = new GL();
        this.canvas = this.gl.canvas;
        this.sizes = this.gl.sizes;
        this.scene = this.gl.scene;

        this.setInstance();
    }

    setInstance() {
        this.instance = new PerspectiveCamera(30, this.sizes.width / this.sizes.height, 10, 1000);
        this.instance.position.z = 600;
        this.instance.fov = 2 * Math.atan((this.sizes.height / 2) / 600) * 180 / Math.PI;
        this.scene.add(this.instance);
        this.instance.updateProjectionMatrix();
    }

    resize() {
        this.instance.fov = 2 * Math.atan((this.sizes.height / 2) / 600) * 180 / Math.PI;
        this.instance.aspect = this.sizes.width / this.sizes.height;
        this.instance.updateProjectionMatrix();
    }
}
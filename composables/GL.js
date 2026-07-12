import { Scene, PlaneGeometry, TextureLoader, Vector2, ShaderMaterial } from 'three';

import Camera from "./Utils/Camera.js";
import Sizes from "./Utils/Sizes.js";
import Time from "./Utils/Time.js";
import Renderer from './Utils/Renderer.js';
import fragment from '../assets/shaders/parallaxFragment.glsl';
import vertex from '../assets/shaders/vertex.glsl';

let instance = null;

export default class GL {
    constructor(canvas, container, overlay, menuOverlay) {

        if (instance)
            return instance;

        instance = this;
        window.gl = this;
        this.canvas = canvas;
        this.container = container;
        this.overlay = overlay;
        this.menuOverlay = menuOverlay;

        this.sizes = new Sizes();
        this.time = new Time();
        this.scene = new Scene();
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.textureLoader = new TextureLoader();
        this.geometry = new PlaneGeometry(1, 1, 100, 100);
        this.allMaterials = [];
        this.debugActive = false;
        this.currentCategory = 'photos';
        this.allTypesProject = ['photos', 'videos', 'contact'];
        this.firstLoadProject = true;
        this.firstLoadApp = true;
        this.indexMenuOpen = false;

        this.sizes.on('resize', () => {
            this.resize()
        })

        // window.addEventListener('resize', () => {
        //     window.location.reload();
        // }, { once: true })

        this.time.on('tick', () => {
            this.update()
        })

        document.ondblclick = function (e) {
            e.preventDefault();
        }

        this.createSliderMaterial();
    }

    createSliderMaterial() {
        this.material = new ShaderMaterial(
            {
                uniforms: {
                    uSlider: { value: 0.0 },
                    uSliderProgress: { value: 0.0 },
                    uScreenProgress: { value: 0.0 },
                    uTexture: { value: null },
                    uTextureNext: { value: null },
                    uTextureRatio: { value: new Vector2(16, 9) },
                    uParallaxStrength: { value: 0.1 },
                    uScrollProgress: { value: 0.0 },
                    uResolution: { value: new Vector2(this.sizes.width, this.sizes.height) },
                    uQuadSize: { value: new Vector2(1, 1) },
                },
                vertexShader: vertex,
                fragmentShader: fragment,
            }
        )
        this.material.transparent = true;
    }

    resize() {
        this.camera.resize();
        this.renderer.resize();
        this.sizes.width = window.innerWidth;
        this.sizes.height = window.innerHeight;
        if (this.ASlider)
            this.ASlider.resize();
        if (this.homeSlider)
            this.homeSlider.resize();
        if (this.itemSlider)
            this.itemSlider.resize();
        if (this.allMaterials.length > 0) {
            this.allMaterials.forEach(object => {
                object.uniforms.uResolution.value.x = this.sizes.width;
                object.uniforms.uResolution.value.y = this.sizes.height;
            });
        }
    }

    update() {
        if (this.ASlider) {
            this.ASlider.syncLabels();
        }
        this.renderer.update();
        if (this.debugActive) {
            this.material.uniforms.uSliderProgress.value = this.settings.sliderProgress;
            this.material.uniforms.uScreenProgress.value = this.settings.screenProgress;
        }
    }
}
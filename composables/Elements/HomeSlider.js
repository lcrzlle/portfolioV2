import GL from '../GL.js';
import vertex from '../assets/shaders/vertex.glsl';
import overlayFragment from '../assets/shaders/overlayFragment.glsl';
import { Mesh, Vector2, ShaderMaterial } from 'three';

export default class HomeSlider {
    constructor(assets, placeholder) {
        this.gl = new GL();
        this.sizes = this.gl.sizes;
        this.scene = this.gl.scene;
        this.container = this.gl.container;
        this.textureLoader = this.gl.textureLoader;
        this.material = this.gl.material;
        this.geometry = this.gl.geometry;
        this.allMaterials = this.gl.allMaterials;
        this.actualSlide = 0;

        this.createOverlayMaterial();
        this.createOverlay(placeholder);
        this.createHomeSlider(assets, placeholder);
    }

    createHomeSlider(assets, placeholder) {
        this.store = assets.map((img, index) => {
            let bounds = placeholder.getBoundingClientRect();
            let texture = this.textureLoader.load(img.src);
            let clonedMaterial = this.material.clone()

            clonedMaterial.uniforms.uTexture.value = texture;
            clonedMaterial.uniforms.uQuadSize.value.x = bounds.width;
            clonedMaterial.uniforms.uQuadSize.value.y = bounds.height;
            clonedMaterial.uniforms.uScreenProgress.value = 1.;
            clonedMaterial.uniforms.uSliderProgress.value = 0.;
            this.allMaterials.push(clonedMaterial);

            let mesh = new Mesh(this.geometry, clonedMaterial);
            mesh.scale.set(bounds.width, bounds.height, 0);
            mesh.position.x = 0;
            mesh.position.z = 10 * (-index);
            return {
                img: img,
                mesh: mesh,
                top: bounds.top,
                left: bounds.left,
                width: bounds.width,
                height: bounds.height,
            }
        });
    }

    createOverlayMaterial() {
        this.overlayMaterial = new ShaderMaterial(
            {
                wireframe: false,
                uniforms: {
                    uOpacity: { value: 0.55 },
                    uScreenProgress: { value: 1.0 },
                    uResolution: { value: new Vector2(this.sizes.width, this.sizes.height) },
                    uQuadSize: { value: new Vector2(1, 1) },
                },
                vertexShader: vertex,
                fragmentShader: overlayFragment,
            }
        )
        this.overlayMaterial.transparent = true;
    }

    createOverlay(placeholder) {
        let bounds = placeholder.getBoundingClientRect();
        this.overlayShader = new Mesh(this.geometry, this.overlayMaterial);
        this.overlayShader.scale.set(bounds.width, bounds.height, 0);
        this.scene.add(this.overlayShader);
        this.overlayShader.position.x = 0;
        this.overlayShader.position.z = 20;
        this.allMaterials.push(this.overlayMaterial);
    }

    resize() {
        this.store.forEach(object => {
            let bounds = object.img.getBoundingClientRect();
            object.mesh.scale.set(bounds.width, bounds.height, 0);
            object.top = bounds.top;
            object.left = bounds.left;
            object.width = bounds.width;
            object.height = bounds.height;
        });
    }

    destroy() {
        this.store.forEach(object => {
            this.scene.remove(object.mesh);
            object.mesh.geometry.dispose();
            object.mesh.material.dispose();
            object.mesh = undefined;
        });
        this.scene.remove(this.overlayShader);
        this.overlayShader.geometry.dispose();
        this.overlayMaterial.dispose();
        this.overlayShader = undefined;
    }
}
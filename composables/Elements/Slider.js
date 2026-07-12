// import * as THREE from 'three';
import { Mesh } from 'three';

import GL from '../GL.js';
import gsap from 'gsap'

export default class Slider {
    constructor() {
        this.gl = new GL();
        this.sizes = this.gl.sizes;
        this.scene = this.gl.scene;
        this.textureLoader = this.gl.textureLoader;
        this.geometry = this.gl.geometry;
        this.material = this.gl.material;
        this.allMaterials = this.gl.allMaterials;
        this.defaultState = false;
        this.slideValue = null;
        this.actualSlide = 0;
        this.isItem = false;
    }

    createProjectSlider(domElements) {
        this.store = domElements.map(img => {
            let bounds = img.getBoundingClientRect();
            let texture = this.textureLoader.load(img.src);
            let clonedMaterial = this.material.clone()

            clonedMaterial.uniforms.uTexture.value = texture;
            clonedMaterial.uniforms.uSlider.value = 1.0;
            clonedMaterial.uniforms.uQuadSize.value.x = bounds.width;
            clonedMaterial.uniforms.uQuadSize.value.y = bounds.height;
            clonedMaterial.transparent = true;
            this.allMaterials.push(clonedMaterial);

            let mesh = new Mesh(this.geometry, clonedMaterial);
            mesh.scale.set(bounds.width, bounds.height, 0);
            this.scene.add(mesh);
            mesh.position.x = (bounds.left - this.sizes.width / 2 + bounds.width / 2);
            mesh.position.y = -(this.sizes.height / 2 + bounds.height / 2) - 10;
            return {
                img: img,
                mesh: mesh,
                top: bounds.top,
                left: bounds.left,
                width: bounds.width,
                height: bounds.height,
                isClicked: false,
                isHovered: false,
            }
        });
    }

    setPosition(scroll) {
        if (!this.store) { return; }
        this.store.forEach((object) => {
            object.mesh.position.x = -scroll + object.left - this.sizes.width / 2 + object.width / 2;
        });
        if (this.defaultState && !this.uniformsReset) {
            this.uniformsReset = true;
            this.store.forEach((object) => {
                gsap.to(object.mesh.material.uniforms.uSliderProgress, {
                    value: 0,
                    duration: 1.5,
                    ease: 'expo.out'
                })
                gsap.to(object.mesh.material.uniforms.uScreenProgress, {
                    value: 0,
                    duration: 1.4,
                    ease: 'expo.out',
                })
                gsap.set(object.mesh.material.uniforms.uScrollProgress, { value: 0 });
            });
        } else if (!this.defaultState) {
            this.uniformsReset = false;
        }
    }

    syncLabels() {
        if (!this.store) { return; }
        for (let i = 0; i < this.store.length; i++) {
            const object = this.store[i];
            if (!object.label) { continue; }
            const x = this.sizes.width / 2 + object.mesh.position.x;
            const y = this.sizes.height / 2 - object.mesh.position.y;
            object.label.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
        }
    }

    resize() {
        if (this.lenis)
            this.lenis.scrollTo(0, { immediate: true });

        if (this.isItem == false) {
            this.store.forEach(object => {
                let bounds = object.img.getBoundingClientRect();
                object.mesh.scale.set(bounds.width, bounds.height, 0);
                object.top = bounds.top;
                object.left = bounds.left;
                object.width = bounds.width;
                object.height = bounds.height;
                object.mesh.position.x = object.left - this.sizes.width / 2 + object.width / 2;
                if (this.defaultState) {
                    object.mesh.position.y = -object.top + this.sizes.height / 2 - object.height / 2;
                }
                else {
                    object.mesh.position.y = (this.sizes.height / 2 + object.height / 2);
                }
            });
        } else {
            this.store.forEach((object, index) => {
                let bounds = object.img.getBoundingClientRect();
                object.mesh.scale.set(bounds.width, bounds.height, 0);
                object.top = bounds.top;
                object.left = bounds.left;
                object.width = bounds.width;
                object.height = bounds.height;
                if (index !== this.actualSlide) {
                    object.mesh.position.x = (this.sizes.width / 2 + object.width / 2);
                    object.mesh.position.y = -object.top + this.sizes.height / 2 - object.height / 2;
                }
            });
        }
    }

    destroy() {
        this.store.forEach(object => {
            this.scene.remove(object.mesh);
            object.mesh.geometry.dispose();
            object.mesh.material.dispose();
            object.mesh = undefined;
        });
    }
}
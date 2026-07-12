import gsap from 'gsap';
import HomeSlider from '../Elements/HomeSlider';

export async function initHomeSlider(useGL, sliderItemPlaceholder) {
    const domElements = [...document.querySelectorAll('.home__thumb__src')];
    useGL.value.homeSlider = new HomeSlider(domElements, sliderItemPlaceholder.value);
    gsap.to(useGL.value.camera.instance.position, {
        z: 590
    })
	updateGLSizes(useGL, sliderItemPlaceholder);
}

export async function addToScene(useGL) {
    const promises = [];
    for (const element of useGL.value.homeSlider.store) {
        promises.push(useGL.value.scene.add(element.mesh));
    }
    await Promise.all(promises);
}

export function moveToRight(clicked, index, useGL) {
    if (clicked > index && index !== clicked) {
        gsap.to(useGL.value.homeSlider.store[index].mesh.material.uniforms.uSliderProgress, {
            value: 1.0,
            duration: 1.5,
            ease: 'expo.out',
        })
        gsap.fromTo(useGL.value.homeSlider.store[clicked].mesh.material.uniforms.uSliderProgress, {
            value: -1.25,
        }, {
            value: 1.0,
            duration: 1.5,
            ease: 'expo.out',
        })
    } else {
        gsap.to(useGL.value.homeSlider.store[index].mesh.material.uniforms.uSliderProgress, {
            value: 0.0,
            duration: 1.5,
            ease: 'expo.out',
        })
    }
}

export function moveToLeft(clicked, index, actualSlide, useGL) {
    if (clicked < index && index !== clicked) {
        gsap.to(useGL.value.homeSlider.store[actualSlide].mesh.material.uniforms.uSliderProgress, {
            value: -1.25,
            duration: 1.5,
            ease: 'expo.out',
        })
        gsap.fromTo(useGL.value.homeSlider.store[clicked].mesh.material.uniforms.uSliderProgress, {
            value: 1.0,
        }, {
            value: 0.0,
            duration: 1.5,
            ease: 'expo.out',
        })
    } else {
        gsap.to(useGL.value.homeSlider.store[index].mesh.material.uniforms.uSliderProgress, {
            value: 1.25,
            duration: 1.5,
            ease: 'expo.out',
        })
    }
}

export function updateGLSizes(useGL, sliderItemPlaceholder) {
    let bounds = sliderItemPlaceholder.value.getBoundingClientRect();
    useGL.value.allMaterials.forEach(object => {
        object.uniforms.uResolution.value.x = window.innerWidth;
        object.uniforms.uResolution.value.y = window.innerHeight;
    });
    useGL.value.homeSlider.store.forEach((element, index) => {
        element.mesh.scale.x = bounds.width;
        element.mesh.scale.y = bounds.height;
        element.mesh.material.uniforms.uQuadSize.value.x = bounds.width;
        element.mesh.material.uniforms.uQuadSize.value.y = bounds.height;
    });
    useGL.value.homeSlider.overlayShader.scale.x = bounds.width;
    useGL.value.homeSlider.overlayShader.scale.y = bounds.height;
}
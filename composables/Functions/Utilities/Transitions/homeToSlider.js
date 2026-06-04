import gsap from 'gsap'

export function startHomeToSlider(useGL, homeToSlider, actualSlide, next) {
    gsap.to(".svg__mail", {
        y: -100,
        duration: 1.,
        ease: 'expo.inOut'
    });
    useGL.value.homeSlider.store.forEach((element, index) => {
        if (actualSlide != index) {
            useGL.value.scene.remove(element.mesh);
        } else {
            homeToSlider.to(element.mesh.position, {
                z: 0,
                duration: 1,
                ease: 'expo.out',
            }, 0)
            homeToSlider.to(element.mesh.material.uniforms.uScreenProgress, {
                value: 0,
                duration: 1.7,
                ease: 'expo.inOut',
            }, 0)
        }
    });

    homeToSlider.to('.footer__thumb__img', {
        yPercent: -130,
        duration: 1.6,
        stagger: 0.045,
        ease: 'expo.out',
    }, 0.4)
    homeToSlider.to(useGL.value.homeSlider.overlayShader.material.uniforms.uScreenProgress, {
        value: 0.0,
        duration: 1.7,
        ease: 'expo.inOut',
        onComplete: () => {
            next();
        }
    }, 0)
    homeToSlider.to(useGL.value.homeSlider.overlayShader.material.uniforms.uOpacity, {
        value: 0.0,
        duration: 1.2,
        ease: 'expo.inOut',
    }, 0)
}

export function endHomeToSlider(useGL, domElement) {
    const bound = domElement.getBoundingClientRect();
    useGL.value.homeSlider.store.forEach((element) => {
        gsap.to(element.mesh.position, {
            y: (window.innerHeight / 2) + (bound.height / 2),
            duration: 1.1,
            ease: 'expo.inOut',
            onComplete: () => {
                if (useGL.value.homeSlider) {
                    useGL.value.homeSlider.destroy();
                    useGL.value.homeSlider = null;
                }
            }
        })
    });
}
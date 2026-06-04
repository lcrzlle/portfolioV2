import gsap from 'gsap'

export function sliderToItem(useGL, pagePreviewRef, next, previewDOM) {
    const toItemTransition = gsap.timeline();
    let clickedMesh = null;
    useGL.value.ASlider.store.forEach(element => {
        if (element.isClicked) {
            clickedMesh = element;
        }
    });
    toItemTransition.to(clickedMesh.mesh.material.uniforms.uSliderProgress, {
        value: 1,
        duration: 1.1,
        ease: 'expo.inOut',
        onComplete: () => {
            previewDOM.value = false;
            next();
        }
    }, 0.1)
    toItemTransition.to(pagePreviewRef.value, {
        autoAlpha: 0,
        duration: 0.5,
        ease: 'expo.out'
    }, 0.5)
}

export function itemToSlider(useGL, route) {
    const toSlideTransition = gsap.timeline();
    showNavProject(route);
    let clickedMesh = null;
    useGL.value.ASlider.store.forEach(element => {
        if (element.isClicked) {
            clickedMesh = element;
        }
    });
    toSlideTransition.to(useGL.value.overlay, {
        opacity: 0,
        duration: 1,
        ease: 'expo.inOut',
    })
    if (clickedMesh) {
        toSlideTransition.to(clickedMesh.mesh.material.uniforms.uSliderProgress, {
            value: 0,
            duration: 1.1,
            ease: 'expo.inOut',
        }, 0)
    }
    toSlideTransition.set('#crossHeader', {
        autoAlpha: 1,
        onComplete: () => {
            gsap.to('.cross__wrapper__header', {
                y: '0%',
                duration: 1.2,
                stagger: 0.055,
                ease: 'expo.out',
            })
            useGL.value.ASlider.store.forEach((element, index) => {
                gsap.to(element.mesh.position, {
                    y: 0,
                    duration: 1,
                    delay: 0.05 * index,
                    ease: "expo.out",
                });
            })
            gsap.fromTo('.footer__thumb__img',
                {
                    y: '130%'
                }, {
                y: '0%',
                duration: 1.2,
                stagger: 0.055,
                delay: 0.3,
                ease: 'expo.out',
            })
            splitReveal('.reveal', false);
            textReveal('.reveal-text', false);
            useGL.value.ASlider.defaultState = true;
        }
    }, 0.7)
    toSlideTransition.to('.cross__wrapper', {
        y: '0%',
        duration: 0.5,
    }, 0.3)
}
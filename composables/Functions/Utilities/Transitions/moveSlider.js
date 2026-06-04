import gsap from 'gsap';

export function moveSliderMiddle(useGL) {
    for (let index = 0; index < useGL.value.ASlider.store.length; index++) {
        const element = useGL.value.ASlider.store[index];
        const timeline = gsap.timeline();
        timeline.to(element.mesh.position, {
            y: (-element.top + useGL.value.sizes.height / 2 - element.height / 2),
            duration: 1.2,
            ease: "expo.inOut",
            delay: 0.07 * index,
        })
    }
}

export function setSliderMiddle(useGL) {
    useGL.value.ASlider.store.forEach(element => {
        gsap.set(element.mesh.position, {
            y: (-element.top + useGL.value.sizes.height / 2 - element.height / 2),
        })
    });
}

export function moveSliderUp(useGL, isTransition) {
    let expoType = isTransition ? "expo.inOut" : "expo.out";
    useGL.value.ASlider.store.forEach((element, index) => {
        gsap.to(element.mesh.position, {
            y: (useGL.value.sizes.height / 2 + element.height / 2),
            duration: 1,
            delay: 0.02 * index,
            ease: expoType,
        });
    })
}

export function setSliderUp(useGL) {
    useGL.value.ASlider.store.forEach(element => {
        gsap.set(element.mesh.position, {
            y: (useGL.value.sizes.height / 2 + element.height / 2),
        })
    });
}
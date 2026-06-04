import gsap from 'gsap';
import Lenis from '@studio-freight/lenis';

export function initSliderUID(useGL, route) {
    useGL.value.itemSlider = new Slider();
    useGL.value.itemSlider.isItem = true;
    const domElement = [...document.querySelectorAll('.item__project__img')];
    useGL.value.itemSlider.createProjectSlider(domElement);
    setSliderSizesUID(useGL);
    useGL.value.itemSlider.defaultState = true;
    addClickEventUID(useGL.value, route);
}

export function enterSliderUID(useGL) {
    let delayValue = useGL.value.firstLoadApp ? 3700 : 0;

    setTimeout(() => {
        gsap.to(useGL.value.itemSlider.store[0].mesh.position, {
            y: -useGL.value.itemSlider.store[0].top + useGL.value.sizes.height / 2 - useGL.value.itemSlider.store[0].height / 2,
            duration: 1.2,
            ease: 'expo.out',
            onComplete: () => {
                useGL.value.itemSlider.defaultState = true;
            }
        })
    }, delayValue);
}

export function initLenisUID(thumbWrapper, useGL) {
    return new Promise((resolve) => {
        useGL.value.lenisUID = new Lenis({
            wrapper: thumbWrapper.value,
            content: thumbWrapper.value,
            autoResize: true,
            horizontal: true,
        });
        useGL.value.lenisUID.scrollTo(0, { immediate: true });
        const raf = (time) => {
            useGL.value.lenisUID.raf(time);
            requestAnimationFrame(raf);
        };
        raf(useGL.value.time.elapsed);
        resolve();
    });
}

export function setSliderSizesUID(useGL) {
    useGL.value.itemSlider.store.forEach((element, index) => {
        if (index > 0) {
            gsap.set(element.mesh.position, {
                y: -element.top + useGL.value.sizes.height / 2 - element.height / 2,
                x: (useGL.value.sizes.width / 2 + element.width / 2),
            })
        }
        if (element.width > element.height) {
            element.mesh.material.uniforms.uTextureRatio.value.x = 3;
            element.mesh.material.uniforms.uTextureRatio.value.y = 2;
        } else {
            element.mesh.material.uniforms.uTextureRatio.value.x = 67;
            element.mesh.material.uniforms.uTextureRatio.value.y = 100;
        }
    });
}

function moveToLeftUID(useGL, index, element) {
    gsap.to(useGL.itemSlider.store[useGL.itemSlider.actualSlide].mesh.position, {
        x: (useGL.sizes.width / 2 + useGL.itemSlider.store[useGL.itemSlider.actualSlide].width / 2),
        duration: 1.2,
        ease: 'expo.out',
    })
    gsap.fromTo(useGL.itemSlider.store[index].mesh.position, {
        x: -(useGL.sizes.width / 2 + element.width / 2),
    }, {
        x: useGL.itemSlider.store[index].left - useGL.sizes.width / 2
            + useGL.itemSlider.store[index].width / 2,
        duration: 1.2,
        ease: 'expo.out',
    })
}

function moveToRightUID(useGL, index) {
    gsap.to(useGL.itemSlider.store[useGL.itemSlider.actualSlide].mesh.position, {
        x: -(useGL.sizes.width / 2 + useGL.itemSlider.store[useGL.itemSlider.actualSlide].width / 2),
        duration: 1.2,
        ease: 'expo.out',
    })
    gsap.fromTo(useGL.itemSlider.store[index].mesh.position, {
        x: useGL.sizes.width / 2 + useGL.itemSlider.store[index].width / 2,
    }, {
        x: useGL.itemSlider.store[index].left - useGL.sizes.width / 2
            + useGL.itemSlider.store[index].width / 2,
        duration: 1.2,
        ease: 'expo.out',
    })
}

let isScrolling = false;

export function handleWheelUID(event) {
    event.stopPropagation();
    const domElement = [...document.querySelectorAll('.footer__thumb__project')];
    let itemSlide = event.currentTarget.useGL.itemSlider;
    if (event.currentTarget.useGL.indexMenuOpen) return;
    if (event.deltaY > 0 && itemSlide.actualSlide !== itemSlide.store.length - 1) {
        if (isScrolling) return;
        isScrolling = true;
        if (itemSlide.actualSlide < itemSlide.store.length - 1) {
            removeAllSelectedThumbnails('.footer__thumb__project');
            gsap.to(itemSlide.store[itemSlide.actualSlide].mesh.position, {
                x: -(event.currentTarget.useGL.sizes.width / 2 + itemSlide.store[itemSlide.actualSlide].width / 2),
                duration: 1.2,
                ease: 'expo.out',
            })
            itemSlide.actualSlide++;
            domElement[itemSlide.actualSlide].classList.add('is__selected');
            moveToRightUID(event.currentTarget.useGL, itemSlide.actualSlide);
            setTimeout(() => {
                isScrolling = false;
            }, 1000);
        }
    }
    else if (event.deltaY < 0) {
        if (itemSlide.actualSlide > 0) {
            if (isScrolling) return;
            isScrolling = true;
            removeAllSelectedThumbnails('.footer__thumb__project');
            gsap.to(itemSlide.store[itemSlide.actualSlide].mesh.position, {
                x: (event.currentTarget.useGL.sizes.width / 2 + itemSlide.store[itemSlide.actualSlide].width / 2),
                duration: 1.2,
                ease: 'expo.out',
            })
            itemSlide.actualSlide--;
            domElement[itemSlide.actualSlide].classList.add('is__selected');
            itemSlide.store.forEach((element, index) => {
                moveToLeftUID(event.currentTarget.useGL, itemSlide.actualSlide, element);
            })
            setTimeout(() => {
                isScrolling = false;
            }, 1000);
        }
    }
}

export function lockKeys(event) {
    if (event.key === 'ArrowRight') {
        event.preventDefault();
    }
    if (event.key === 'ArrowLeft') {
        event.preventDefault();
    }
}

export function addClickEventUID(useGL, route) {
    const domElement = [...document.querySelectorAll('.footer__thumb__project')];
    removeAllSelectedThumbnails('.footer__thumb__project');
    domElement[0].classList.add('is__selected');
    domElement.forEach((element, index) => {
        element.addEventListener('click', () => {
            if (index == useGL.itemSlider.actualSlide) return;
            removeAllSelectedThumbnails('.footer__thumb__project');
            element.classList.add('is__selected');
            useGL.itemSlider.store.forEach((element, i) => {
                if (index > useGL.itemSlider.actualSlide) {
                    moveToRightUID(useGL, index);
                }
                else {
                    moveToLeftUID(useGL, index, element);
                }
            })
            useGL.itemSlider.actualSlide = index;
        })
    });

    document.addEventListener('keydown', lockKeys, true);
    document.addEventListener('wheel', handleWheelUID, true);
    document.useGL = useGL;
}

export function onMountedUID(useGL, isTouchDevice, route) {
    isTouchDevice.value = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    let delayValue = useGL.value.firstLoadApp ? 3500 : 0;
    if (useGL.value.ASlider) {
        useGL.value.ASlider.lenis.stop();
    }
    setTimeout(() => {
        headerProjectActive();
        useGL.value.firstLoadProject = true;
        setAutoAlpha('#pageContent', 0);
        setAutoAlpha('#crossHeader', 0);
        gsap.to('#container', {
            autoAlpha: 1,
            duration: 2,
            delay: 0.5,
            ease: 'expo.out',
        })
        showFooter('.footer__thumb__project');
        gsap.to('.item__back__icon', {
            y: '0%',
            duration: 1.2,
            delay: 0.5,
            ease: 'expo.out',
        })
        textReveal('.reveal-text-project', false);
        useGL.value.firstLoadApp = false;
    }, delayValue);
}

export function onBeforeLeaveUID(to, from, next, useGL, category) {
    document.removeEventListener("wheel", handleWheelUID, true);
    document.removeEventListener("keydown", lockKeys, true);
    if (to.name == category) {
        textReveal('.reveal-text-project', true);
        const timeline = gsap.timeline();
        timeline.to('.item__back__wrapper', {
            height: '0px',
            duration: 0.5,
            ease: 'expo.inOut'
        }, 0.5)
        timeline.to('.footer__thumb__project', {
            y: '130%',
            duration: 1.2,
            stagger: 0.025,
            ease: 'expo.out',
        }, 0.1)
        timeline.to('.item__back__icon', {
            y: '110%',
            duration: 0.5,
            delay: 0.1,
            ease: 'expo.out',
            onComplete: () => {
                next();
            }
        }, 0.1)
        if (useGL.value.itemSlider) {
            useGL.value.itemSlider.store.forEach((element) => {
                gsap.to(element.mesh.position, {
                    y: -(useGL.value.sizes.height / 2 + element.height / 2),
                    duration: 1,
                    ease: 'expo.inOut',
                    onComplete: () => {
                        if (useGL.value.itemSlider) {
                            useGL.value.itemSlider.destroy();
                            useGL.value.itemSlider = null;
                        }
                    }
                })
            })
        }
    } else {
        next();
    }
}
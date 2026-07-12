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
        if (useGL.value.lenisUID) {
            useGL.value.lenisUID.destroy();
        }
        const lenisInstance = new Lenis({
            wrapper: thumbWrapper.value,
            content: thumbWrapper.value,
            autoResize: true,
            horizontal: true,
        });
        useGL.value.lenisUID = lenisInstance;
        lenisInstance.scrollTo(0, { immediate: true });
        const raf = (time) => {
            lenisInstance.raf(time);
            lenisInstance.rafId = requestAnimationFrame(raf);
        };
        const destroy = lenisInstance.destroy.bind(lenisInstance);
        lenisInstance.destroy = () => {
            cancelAnimationFrame(lenisInstance.rafId);
            destroy();
        };
        lenisInstance.rafId = requestAnimationFrame(raf);
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

// Position "centrée" d'une photo (mesh) — 0 pour un élément DOM centré
function centeredX(useGL, i) {
    const el = useGL.itemSlider.store[i];
    return el.left - useGL.sizes.width / 2 + el.width / 2;
}
function offRightX(useGL, i) {
    return useGL.sizes.width / 2 + useGL.itemSlider.store[i].width / 2;
}
function offLeftX(useGL, i) {
    return -(useGL.sizes.width / 2 + useGL.itemSlider.store[i].width / 2);
}

function selectThumbUID(target) {
    removeAllSelectedThumbnails('.footer__thumb__project');
    if (target >= 0) {
        const thumbs = document.querySelectorAll('.footer__thumb__project');
        if (thumbs[target]) thumbs[target].classList.add('is__selected');
    }
}

let navLock = false;
let uidSwipeCleanup = null;

// Navigation unifiée (molette, flèches, vignettes, mosaïque).
// target : -1 = mosaïque (à gauche de la photo 1), 0..N-1 = photos.
export function navigateUID(useGL, target) {
    const slider = useGL.itemSlider;
    if (!slider || !slider.store) return;
    const N = slider.store.length;
    target = Math.max(-1, Math.min(N - 1, target));
    const current = slider.actualSlide;
    if (target === current || navLock) return;
    navLock = true;

    const forward = target > current;
    const dur = 0.85;
    const ease = 'expo.out';
    const mosaic = document.getElementById('viewItemMosaic');

    // Sortie de l'élément courant
    if (current === -1) {
        if (mosaic) mosaic.classList.remove('is-open'); // la mosaïque ressort par la gauche (transition CSS)
    } else {
        const m = slider.store[current].mesh.position;
        gsap.killTweensOf(m);
        gsap.to(m, { x: forward ? offLeftX(useGL, current) : offRightX(useGL, current), duration: dur, ease });
    }

    // Entrée de la cible
    if (target === -1) {
        if (mosaic) mosaic.classList.add('is-open'); // la mosaïque entre par la gauche (transition CSS)
    } else {
        const m = slider.store[target].mesh.position;
        gsap.killTweensOf(m);
        gsap.fromTo(m,
            { x: forward ? offRightX(useGL, target) : offLeftX(useGL, target) },
            { x: centeredX(useGL, target), duration: dur, ease });
    }

    selectThumbUID(target);
    slider.actualSlide = target;
    setTimeout(() => { navLock = false; }, dur * 650);
}

export function handleWheelUID(event) {
    event.stopPropagation();
    const useGL = event.currentTarget.useGL;
    if (!useGL || useGL.indexMenuOpen || !useGL.itemSlider) return;
    // prend l'axe dominant : bas/droite => photo suivante, haut/gauche => précédente
    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    if (Math.abs(delta) < 4) return;
    navigateUID(useGL, useGL.itemSlider.actualSlide + (delta > 0 ? 1 : -1));
}

export function handleKeysUID(event) {
    const useGL = document.useGL;
    if (!useGL || useGL.indexMenuOpen || !useGL.itemSlider) return;
    if (event.key === 'ArrowRight') {
        event.preventDefault();
        navigateUID(useGL, useGL.itemSlider.actualSlide + 1);
    } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        navigateUID(useGL, useGL.itemSlider.actualSlide - 1);
    }
}

export function addClickEventUID(useGL, route) {
    const domElement = [...document.querySelectorAll('.footer__thumb__project')];
    removeAllSelectedThumbnails('.footer__thumb__project');
    if (domElement[0]) domElement[0].classList.add('is__selected');
    domElement.forEach((element, index) => {
        element.addEventListener('click', () => {
            navigateUID(useGL, index);
        });
    });

    document.addEventListener('keydown', handleKeysUID, true);
    document.addEventListener('wheel', handleWheelUID, true);
    if (uidSwipeCleanup) uidSwipeCleanup();
    uidSwipeCleanup = addSwipeNav((dir) => navigateUID(useGL, useGL.itemSlider.actualSlide + dir));
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
    document.removeEventListener("keydown", handleKeysUID, true);
    if (uidSwipeCleanup) { uidSwipeCleanup(); uidSwipeCleanup = null; }
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
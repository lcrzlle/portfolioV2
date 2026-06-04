import gsap from 'gsap';

export function initProjectPage(useGL, pagePreviewRef, route, isOnPreview, category) {
    initLenis(useGL.value).then((lenisInstance) => {
        initSlider(lenisInstance, useGL.value);
        const domElements = [...document.querySelectorAll('.slider__item')];

        if (useGL.value.homeSlider) {
            endHomeToSlider(useGL, domElements[0]);
        }

        if (route.name == category + '-uid') {
            setSliderUp(useGL);
            useGL.value.ASlider.lenis.scrollTo(useGL.value.ASlider.slideValue, {
                immediate: true,
                force: true,
                lock: true
            });
        } else {
            let delayValue = useGL.value.firstLoadApp ? 3500 : 0;
            setTimeout(() => {
                moveSliderMiddle(useGL);
            }, delayValue);
            useGL.value.ASlider.defaultState = true;
        }
        addClickEvents(useGL, domElements[0], pagePreviewRef, route, isOnPreview);
    });
    enterOpacity(useGL.value.container, 1);
}

export function headerProjectActive() {
    const links = document.querySelectorAll('.button-link');
    if (!links[0] || !links[1]) return;
    if ((links[0].classList.contains('is-active')) || (links[2] && links[2].classList.contains('is-active'))) {
        links.forEach((link) => { link.classList.remove('is-active'); });
    }
    setTimeout(() => { if (links[1]) links[1].classList.add('is-active'); }, 1000);
}

export function addClickEvents(useGL, domElement, pagePreviewRef, route, previewDOM) {
    const itemWidth = domElement.getBoundingClientRect().width;
    useGL.value.ASlider.store.forEach((element, i) => {
        element.img.addEventListener('click', () => {
            useGL.value.ASlider.slideValue = (itemWidth * i) + (20 * i);
            useGL.value.ASlider.defaultState = false;
            element.isClicked = true;
            useGL.value.ASlider.lenis.stop();
            useGL.value.ASlider.lenis.scrollTo(useGL.value.ASlider.slideValue, {
                force: true,
                lock: true
            });
            previewFullscreen(useGL, pagePreviewRef, route, previewDOM);
        });
    });
}

export function previewFullscreen(useGL, pagePreviewRef, route, previewDOM) {
    lockUI();
    setAutoAlpha(pagePreviewRef.value, 1);
    uiSliderToPreview(useGL.value, pagePreviewRef);
    meshSliderToPreview(useGL.value);

    gsap.fromTo('.cross__wrapper__close', {
        y: '130%',
        x: '130%',
    }, {
        y: '0%',
        x: '0%',
        duration: 1,
        delay: 0.2,
        stagger: 0.055,
        ease: 'expo.out',
        onComplete: () => {
            unlockUI();
        }
    })
    gsap.fromTo('.cross__wrapper__line', {
        y: '130%',
    }, {
        y: '0%',
        duration: 1.2,
        delay: 0.2,
        ease: 'expo.out',
        onComplete: () => {
            const pageCrossClose = document.getElementById('pageCrossClose');
            pageCrossClose.addEventListener('click', () => {
                lockUI();
                previewBack(useGL, pagePreviewRef, route, previewDOM);
            })
        }
    })
}

export function previewBack(useGL, pagePreviewRef, route, previewDOM) {
    useGL.value.defaultState = true;
    useGL.value.ASlider.lenis.start();
    splitReveal('.reveal-preview', true);
    textReveal('.reveal-text-preview', true);
    useGL.value.ASlider.lenis.scrollTo(useGL.value.ASlider.slideValue, {
        immediate: true,
        force: true,
        lock: true
    });
    useGL.value.ASlider.slideValue = null;
    itemToSlider(useGL, route);
    meshPreviewToSlider(useGL.value, 1.2, 'expo.inOut');
    gsap.to('.cross__wrapper__close', {
        y: '130%',
        x: '130%',
        duration: 1.2,
        ease: 'expo.out',
        onComplete: () => {
            pagePreviewRef.value.style.visibility = 'hidden';
            previewDOM.value = false;
            unlockUI();
        }
    })
    gsap.to('.cross__wrapper__line', {
        y: '130%',
        duration: 1.2,
        ease: 'expo.out',
    })
}

export function onBeforeLeaveProject(useGL, to, next) {
    lockUI();
    if (to.name !== 'photos'
        && to.name !== 'videos') {
        gsap.to(useGL.value.container, {
            opacity: 0,
            duration: 0.5,
            ease: 'expo.inOut',
            onComplete: () => {
                setAutoAlpha(useGL.value.overlay, 0);
                resetNavProject();
                if (useGL.value.ASlider) {
                    useGL.value.ASlider.destroy();
                    useGL.value.ASlider.lenis.destroy();
                    useGL.value.ASlider.lenis = null;
                    useGL.value.ASlider = null;
                }
                if (useGL.value.itemSlider) {
                    useGL.value.itemSlider.destroy();
                    useGL.value.itemSlider = null;
                }
                next();
            }
        })
    } else {
        lockUI();
        splitReveal('.reveal', true);
        gsap.to('.footer__thumb__img', {
            y: '-130%',
            duration: 0.6,
            stagger: 0.045,
            ease: 'expo.inOut',
            onComplete: () => {
                if (useGL.value.ASlider) {
                    useGL.value.ASlider.destroy();
                    useGL.value.ASlider.lenis.destroy();
                    useGL.value.ASlider.lenis = null;
                    useGL.value.ASlider = null;
                    if (useGL.value.itemSlider) {
                        useGL.value.itemSlider.destroy();
                        useGL.value.itemSlider = null;
                    }
                }
                next();
            }
        })
        moveSliderUp(useGL, true);
    }
}

export function onMountedProject(useGL, route, routeName, isTouchDevice) {

    const cross = document.getElementById('pageCross');
    cross.style.pointerEvents = 'none';
    isTouchDevice.value = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    let delayValue = useGL.value.firstLoadApp ? 3500 : 0;

    setTimeout(() => {
        if (route.name !== (routeName + '-uid')) {
            headerProjectActive();
            splitReveal('.reveal', false);
            showFooter('.footer__thumb__img');
            showCrossHeader();
            showCrossPage();
            if (useGL.value.firstLoadProject) {
                showNavProject(route);
                useGL.value.firstLoadProject = false;
            }
        }
        if (route.name == (routeName + '-uid')) {
            setAutoAlpha('.footer__thumb__inner', 0);
            setAutoAlpha('.cross__wrapper', 0);
        }
        useGL.value.firstLoadApp = false;
    }, delayValue);
}

export function onBeforeUpdateProject(to, from, next, useGL, pagePreviewRef, routeName, route, previewDOM) {
    if (to.name == (routeName + '-uid') && (useGL.value.ASlider.slideValue !== null)) {
        beforeUpdateToUID(useGL, pagePreviewRef, next, previewDOM);
    }
    else if (from.name == (routeName + '-uid') && (useGL.value.ASlider.slideValue !== null)) {
        beforeUpdateFromUID(useGL, next, route);
    }
    else if (to.name == (routeName + '-uid') && (useGL.value.ASlider.slideValue == null)) {
        beforeUpdateToNull(useGL, next);
    }
    else if (from.name == (routeName + '-uid') && (useGL.value.ASlider.slideValue == null)) {
        onBeforeUpdateFromNull(useGL, next, route);
    }
}

function beforeUpdateToUID(useGL, pagePreviewRef, next, previewDOM) {
    hideNavProject();
    gsap.to('.preview__item__infos', {
        height: '-10px',
        duration: 1,
        ease: 'power2.inOut'
    })
    gsap.to('#overlay', {
        opacity: 0,
        duration: 1,
        delay: 0.5,
    })
    splitReveal('.reveal-preview', true);
    textReveal('.reveal-text-preview', true);
    sliderToItem(useGL, pagePreviewRef, next, previewDOM);
    hideCrossClose();
}

function beforeUpdateFromUID(useGL, next, route) {
    useGL.value.ASlider.lenis.start();
    useGL.value.ASlider.lenis.scrollTo(useGL.value.ASlider.slideValue, {
        immediate: true,
        force: true,
        lock: true
    });
    setAutoAlpha('#pageContent', 1);
    itemToSlider(useGL, route);
    meshPreviewToSlider(useGL.value, 1.25, 'expo.inOut');
    next();
    unlockUI();
    useGL.value.ASlider.slideValue = null;
    if (useGL.value.firstLoadProject) {
        showNavProject(route);
        useGL.value.firstLoadProject = false;
    }
    // showNavProject(route);
}

function beforeUpdateToNull(useGL, next) {
    hideNavProject();
    useGL.value.ASlider.defaultState = false;
    useGL.value.ASlider.lenis.stop();
    splitReveal('.reveal', true);
    if (document.querySelector('.reveal-text')) {
        textReveal('.reveal-text', true);
    }
    moveSliderUp(useGL, false);
    hideCrossHeader();
    hideCrossPage();
    gsap.to('.footer__thumb__img', {
        y: '-130%',
        duration: 1,
        stagger: 0.045,
        ease: 'expo.out',
        onComplete: () => {
            next();
            unlockUI();
        }
    })
}

function onBeforeUpdateFromNull(useGL, next, route) {
    if (useGL.value.firstLoadProject) {
        showNavProject(route);
        useGL.value.firstLoadProject = false;
    }
    setAutoAlpha('#pageContent', 1);
    setAutoAlpha('.footer__thumb__inner', 1);
    itemToSlider(useGL, route);
    showCrossPage();
    useGL.value.ASlider.store.forEach((element, index) => {
        gsap.to(element.mesh.position, {
            z: 0,
            duration: 1,
            delay: 0.02 * index,
            ease: "expo.out",
        });
    });
    meshPreviewToSlider(useGL.value, 1.5, 'expo.inOut');
    next();
    unlockUI();
    useGL.value.ASlider.lenis.start();
    useGL.value.ASlider.defaultState = true;
    useGL.value.ASlider.slideValue = null;
}

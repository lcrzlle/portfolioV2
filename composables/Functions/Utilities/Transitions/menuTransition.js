import gsap from 'gsap';

export function menuOpenState(useGL, opacityValue, scaleValue, durationValue, delayValue) {
    gsap.to(useGL.value.menuOverlay, {
        opacity: opacityValue,
        delay: delayValue * 2,
        duration: 0.5 + (delayValue * 2),
        ease: 'expo.out',
    })

    gsap.to('#pageTitle', {
        y: scaleValue,
        ease: 'expo.out',
        duration: durationValue,
        delay: delayValue,
    })

    gsap.to('#pageHeader', {
        y: scaleValue,
        ease: 'expo.out',
        duration: durationValue,
        delay: delayValue,
    })

    gsap.to('#gl', {
        y: -scaleValue,
        ease: 'expo.out',
        duration: durationValue,
        delay: delayValue,
    })

    if (useGL.value.ASlider) {
        useGL.value.ASlider.store.forEach((element, index) => {
            gsap.to(element.mesh.position, {
                y: (-scaleValue * 4),
                ease: 'expo.out',
                duration: durationValue,
                delay: (index + 1) * (delayValue / 4),
            })
        });
    }
}

export function menuCloseState(useGL, route) {
    gsap.set(useGL.value.menuOverlay, {
        opacity: 0,
    })
    if (!route.name.includes('uid')) {
        gsap.set('#pageTitle', {
            y: 0,
        })
    }
    gsap.set('#pageHeader', {
        y: 0,
    })
    gsap.set('#gl', {
        y: 0,
    })
    if (useGL.value.ASlider && !route.name.includes('uid')) {
        setSliderMiddle(useGL);
    }
}

export function openMenu(useGL) {
    if (useGL.value.indexMenuOpen) return;
    useGL.value.indexMenuOpen = true;
    useGL.value.lenisMenu.scrollTo(0, { immediate: true });

    menuOpenState(useGL, 1, 100, 1.3, 0);
    textReveal('.reveal-text-menu');
    splitReveal('.reveal-menu');

    const timeline = gsap.timeline();
    let widthSeparator = window.innerWidth > 900 ? '240%' : '100%';

    timeline.set("#indexMenu", {
        autoAlpha: 1,
    }, 0)
    timeline.fromTo('#indexMenu', {
        height: '0vh',
    }, {
        height: '100vh',
        duration: 0.5,
        ease: 'expo.out',
    }, 0)
    timeline.fromTo('.index__content__separator', {
        width: '0%',
    }, {
        width: widthSeparator,
        duration: 1,
        ease: 'expo.out',
    }, 0.5)
    timeline.fromTo('.index__card__img', {
        y: '110%',
    }, {
        y: '0%',
        duration: 1.2,
        stagger: 0.055,
        delay: 0.3,
        ease: 'expo.out',
    }, 0);
}

export function closeMenu(useGL, route, clicked) {
    lockElement('closeMenu');
    textReveal('.reveal-text-menu', true);
    textReveal('.reveal-text', false);
    splitReveal('.reveal-menu', true);
    const timeline = gsap.timeline();
    timeline.fromTo('.index__card__img', {
        y: '0%',
    }, {
        y: '110%',
        duration: 0.7,
        stagger: 0.015,
        ease: 'expo.out',
    }, 0);
    timeline.to('#indexMenu', {
        height: '0vh',
        duration: 1,
        ease: 'expo.out',
    }, 0.4)
    timeline.to('.index__content__separator', {
        width: '0%',
        duration: 0.5,
        ease: 'expo.out',
    }, 0)
    timeline.set("#indexMenu", {
        autoAlpha: 0,
        onComplete: () => {
            useGL.value.indexMenuOpen = false;
            unlockElement('closeMenu');
        }
    }, 1.2)
    if (!clicked) {
        menuOpenState(useGL, 0, 0, 1.3, 0.3);
    }
}
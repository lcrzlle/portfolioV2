import gsap from 'gsap';

function slideToItem(useGL, clicked) {
    useGL.value.homeSlider.store.forEach((element, index) => {
        if (clicked > useGL.value.homeSlider.actualSlide) {
            moveToRight(clicked, index, useGL);
        } else {
            moveToLeft(clicked, index, useGL.value.homeSlider.actualSlide, useGL);
        }
    });
    useGL.value.homeSlider.actualSlide = clicked;
    useGL.value.currentCategory = useGL.value.allTypesProject[clicked];
}

function addClickEvents(useGL) {
    const thumbnails = document.querySelectorAll('.footer__thumb__img');
    const itemHandler = document.querySelectorAll('.cross__handler__item');
    thumbnails[0].classList.add('is__selected');
    thumbnails.forEach((element, index) => {
        element.addEventListener('click', () => {
            removeAllSelectedThumbnails('.footer__thumb__img');
            element.classList.add('is__selected');
            if (index != useGL.value.homeSlider.actualSlide)
                slideToItem(useGL, index);
            if (itemHandler[index] !== undefined) {
                itemHandler[index].style.transform = `translateY(${index * 100}%)`;
                itemHandler.forEach((el) => {
                    el.style.transform = `translateY(${index * 100}%)`;
                });
            }
        })
    });
    useGL.value.homeSlider.isScrolling = false;
    document.addEventListener('wheel', eventSlideScrolling, true);
    document.useGL = useGL;
}

let isScrolling = false;

function eventSlideScrolling(event) {
    if (event.currentTarget.useGL.value.indexMenuOpen) return;
    const thumbnails = document.querySelectorAll('.footer__thumb__img');
    const itemHandler = document.querySelectorAll('.cross__handler__item');
    let homeSlider = event.currentTarget.useGL.value.homeSlider;
    // axe dominant : bas/droite => section suivante, haut/gauche => précédente
    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    if (Math.abs(delta) < 4) return;
    if (delta > 0 && homeSlider.actualSlide !== homeSlider.store.length - 1) {
        if (isScrolling) return;
        isScrolling = true;
        if (homeSlider.actualSlide < homeSlider.store.length - 1) {
            removeAllSelectedThumbnails('.footer__thumb__img');
            thumbnails[homeSlider.actualSlide + 1].classList.add('is__selected');
            slideToItem(event.currentTarget.useGL, homeSlider.actualSlide + 1);
            itemHandler.forEach((el) => {
                el.style.transform = `translateY(${(homeSlider.actualSlide) * 100}%)`;
            });
            setTimeout(() => {
                isScrolling = false;
            }, 1000);
        }
    } else if (delta < 0) {
        if (homeSlider.actualSlide > 0) {
            if (isScrolling) return;
            isScrolling = true;
            removeAllSelectedThumbnails('.footer__thumb__img');
            thumbnails[homeSlider.actualSlide - 1].classList.add('is__selected');
            slideToItem(event.currentTarget.useGL, homeSlider.actualSlide - 1);
            itemHandler.forEach((el) => {
                el.style.transform = `translateY(${(homeSlider.actualSlide) * 100}%)`;
            });
            setTimeout(() => {
                isScrolling = false;
            }, 1000);
        }
    }
};

export function onMountedIndex(useGL, sliderItemPlaceholder, route) {
    let delayValue = useGL.value.firstLoadApp ? 3800 : 0;
    setTimeout(() => {
        useGL.value.firstLoadProject = true;
        useGL.value.currentCategory = 'photos';
        initHomeSlider(useGL, sliderItemPlaceholder);
        addClickEvents(useGL);
        addToScene(useGL);
        splitReveal('.reveal', false);
        textReveal('.reveal-text', false);
        showFooter('.footer__thumb__img');
        enterOpacity(useGL.value.container, 1);
        gsap.from('#gl', {
            scale: 1.4,
            duration: 2,
            delay: 0.1,
            ease: 'expo.out',
        })
        showCrossHeader();
        if (route.name == 'index') {
            showCrossPage();
        }
        useGL.value.firstLoadApp = false;
    }, delayValue);
}

export function onBeforeLeaveIndex(to, from, next, useGL) {
    document.removeEventListener("wheel", eventSlideScrolling, true);
    if (to.name == 'photos' || to.name == 'videos') {
        const homeToSlider = gsap.timeline();
        splitReveal('.reveal', true);
        textReveal('.reveal-text', true);
        removeAllSelectedThumbnails('.footer__thumb__img');
        startHomeToSlider(useGL, homeToSlider, useGL.value.homeSlider.actualSlide, next);
    }
    else {
        gsap.to('#gl', {
            scale: 1.2,
            duration: 0.5,
            ease: 'ease.out',
        });
        gsap.to(useGL.value.container, {
            opacity: 0,
            duration: 0.7,
            ease: 'expo.out',
            onComplete: () => {
                gsap.set('#gl', { scale: 1 });
                if (useGL.value.homeSlider) {
                    useGL.value.homeSlider.destroy();
                    useGL.value.homeSlider = null;
                }
                next();
            }
        });
    }
}
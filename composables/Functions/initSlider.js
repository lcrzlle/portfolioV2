export function initSlider(lenisInstance, useGL) {
    const domElements = [...document.querySelectorAll('.slider__item')];
    const cross = document.getElementById('pageCrossSelect');
    const items = document.querySelectorAll('.slider__item');
    const selector = document.getElementById('pageFooterSelector');
    const thumbnails = document.querySelectorAll('.footer__thumb__img');
    if (thumbnails[0]) {
        thumbnails[0].classList.add('is__selected');
    }
    useGL.ASlider = new Slider();
    useGL.ASlider.createProjectSlider(domElements);
    useGL.ASlider.lenis = lenisInstance;

    updateScrollSlider(cross, items, thumbnails, selector, useGL);
    updateNavigation(thumbnails, items, useGL);
}

function updateNavigation(thumbnails, items, useGL) {
    thumbnails.forEach((element, index) => {
        element.addEventListener('click', () => {
            if (items[index]) {
                const itemWidth = items[index].getBoundingClientRect().width;
                useGL.ASlider.lenis.scrollTo((itemWidth * index) + (20 * index));
            }
        })
    });
}

function removeAllSelected(thumbnails) {
    thumbnails.forEach((element) => {
        if (thumbnails) {
            element.classList.remove('is__selected');
        }
    });
}

function updateScrollSlider(cross, items, thumbnails, selector, useGL) {
    useGL.ASlider.lenis.on('scroll', () => {
        if (!useGL.ASlider) { return; }
        useGL.ASlider.setPosition(useGL.ASlider.lenis.animatedScroll);
        const crossRect = cross.getBoundingClientRect();

        items.forEach((trigger, index) => {
            const triggerRect = trigger.getBoundingClientRect();

            if (crossRect.left < triggerRect.right && crossRect.right > triggerRect.left) {
                removeAllSelected(thumbnails);
                thumbnails[index].classList.add('is__selected');
            }
        });
    });
}
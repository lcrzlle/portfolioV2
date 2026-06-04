import gsap from 'gsap';

export function removeAllSelectedThumbnails(selector) {
    const thumbs = document.querySelectorAll(selector)
    thumbs.forEach((element) => {
        element.classList.remove('is__selected');
    });
}

export function setAutoAlpha(selector, value) {
    gsap.set(selector, {
        autoAlpha: value
    });
}

export function transparentActiveCategory() {
    let activeLink = document.querySelector('.category-link.is-active');
    if (activeLink) {
        activeLink.style.backgroundColor = 'rgba(255, 255, 255, 0)';
        activeLink.style.color = 'white';
    }
}

export function hideNavProject() {
    const timeline = gsap.timeline();
    transparentActiveCategory();
    splitReveal('.reveal-nav-project', true);
    timeline.to('.project-link-line', {
        width: '0%',
        duration: 0.8,
        stagger: 0.045,
        ease: 'expo.out',
    }, 0)
    timeline.to('.nav__project__wrapper', {
        autoAlpha: 0,
        duration: 0.8,
        ease: 'expo.out',
        onComplete: () => {
            let categoryLink = document.querySelectorAll('.category-link');
            transparentActiveCategory();
            categoryLink.forEach(element => {
                element.classList.remove('is-active');
            });
        }
    }, 0.5);
}

export function resetNavProject() {
    gsap.set('.project-link-line', {
        width: '0%',
    })

    gsap.set('.nav__project__wrapper', {
        autoAlpha: 0,
        onComplete: () => {
            let categoryLink = document.querySelectorAll('.category-link');
            transparentActiveCategory();
            categoryLink.forEach(element => {
                element.classList.remove('is-active');
            });
        }
    })
}

export function hideCrossHeader() {
    gsap.set('#crossHeader', {
        autoAlpha: 1,
        onComplete: () => {
            gsap.to('.cross__wrapper__header', {
                y: '-130%',
                duration: 1,
                stagger: 0.055,
                ease: 'expo.out',
            })
        }
    })
}

export function hideCrossPage() {
    gsap.set('.cross__wrapper', {
        autoAlpha: 1,
        onComplete: () => {
            gsap.to('.cross__wrapper', {
                y: '130%',
                duration: 1,
                ease: 'expo.out'
            })
        }
    })
}

export function hideCrossClose() {
    gsap.to('.cross__wrapper__close', {
        y: '130%',
        x: '130%',
        duration: 1.2,
        ease: 'expo.out',
    })
    gsap.to('.cross__wrapper__line', {
        y: '130%',
        duration: 1.2,
        ease: 'expo.out',
    })
}
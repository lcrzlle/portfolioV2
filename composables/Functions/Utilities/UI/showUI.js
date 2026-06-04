import gsap from 'gsap';

export function showFooter(selector) {
    if (document.querySelector(selector) == undefined) { return;}
    gsap.set(selector, {
        autoAlpha: 1,
        onComplete: () => {
            gsap.to(selector, {
                y: '0%',
                duration: 1.2,
                stagger: 0.055,
                delay: 0.3,
                ease: 'expo.out',
            });
        }
    })
}

export function showNavProject(route) {
    const timeline = gsap.timeline();
    gsap.set('.nav__project__wrapper', {
        autoAlpha: 1,
    })
    splitReveal('.reveal-nav-project', false);
    timeline.to('.project-link-line', {
        width: '100%',
        duration: 0.8,
        stagger: 0.045,
        ease: 'expo.out',
    }, 0.8);
    let categoryLink = document.querySelectorAll('.category-link');
    if (route.name == 'photos' || route.name == 'photos-uid') {
        categoryLink = categoryLink[0];
    }
    else if (route.name == 'videos' || route.name == 'videos-uid') {
        categoryLink = categoryLink[1];
    }
    else if (route.name == 'contact') {
        categoryLink = categoryLink[2];
    }
    else {
        return;
    }
    setTimeout(() => {
        categoryLink.classList.add('is-active');
        let activeLink = document.querySelector('.category-link.is-active');
        activeLink.style.backgroundColor = 'rgba(255, 255, 255, 1)';
        activeLink.style.color = 'black';
    }, 1200);
}

export function showCrossHeader() {
    gsap.set('#crossHeader', {
        autoAlpha: 1,
        onComplete: () => {
            gsap.to('.cross__wrapper__header', {
                y: '0%',
                duration: 1.2,
                delay: 0.3,
                ease: 'expo.out',
            })
        }
    })
}

export function showCrossPage() {
    gsap.set('.cross__wrapper', {
        autoAlpha: 1,
        onComplete: () => {
            gsap.to('.cross__wrapper', {
                y: '0%',
                duration: 1.3,
                delay: 0.5,
                ease: 'expo.out'
            })
        }
    })
}
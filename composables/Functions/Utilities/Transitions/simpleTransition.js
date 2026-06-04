import gsap from 'gsap'

export function opacityNext(element, duration, next) {
    gsap.to(element, {
        opacity: 0,
        duration: duration,
        ease: 'expo.inOut',
        onComplete: () => {
            next();
        }
    });
}

export function leaveOpacity(element, duration) {
    gsap.to(element, {
        opacity: 0,
        duration: duration,
        ease: 'expo.inOut'
    });
}

export function enterOpacity(element, duration) {
    gsap.to(element, {
        opacity: 1,
        duration: duration,
        ease: 'expo.inOut'
    });
}
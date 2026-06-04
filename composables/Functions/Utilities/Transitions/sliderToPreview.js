import gsap from 'gsap'

export function uiSliderToPreview(useGL, pagePreviewRef) {
	splitReveal('.reveal', true);
	hideNavProject();
	const timeline = gsap.timeline();
	timeline.to(useGL.overlay, {
		autoAlpha: 1,
		delay: 0.5
	}, 0)

	timeline.to('.cross__wrapper__header', {
		y: '-110%',
		duration: 1.2,
		ease: 'expo.out',
		onComplete: () => {
			gsap.set('#crossHeader', {
				autoAlpha: 0,
			})
		}
	}, 0)

	timeline.to('.cross__wrapper', {
		y: '-110%',
		duration: 1.3,
		ease: 'expo.out'
	}, 0)

	timeline.to('.footer__thumb__img', {
		y: '-130%',
		duration: 1.6,
		stagger: 0.045,
		ease: 'expo.out',
	}, 0)

	timeline.set(pagePreviewRef.value, {
		autoAlpha: 1,
		onComplete: () => {
			splitReveal('.reveal-preview', false);
			textReveal('.reveal-text-preview', false);
		}
	}, 0)
}

export function meshSliderToPreview(useGL) {
	for (let index = 0; index < useGL.ASlider.store.length; index++) {
		const element = useGL.ASlider.store[index];
		if (!element.isClicked) {
			element.isHovered = false;
			gsap.to(element.mesh.position, {
				y: (useGL.sizes.height / 2 + element.height / 2),
				duration: 1,
				delay: 0.02 * index,
				ease: "expo.out",
			});
		} else {
			gsap.to(element.mesh.material.uniforms.uScreenProgress, {
				value: 1,
				duration: 1.5,
				ease: 'expo.inOut',
			});
			gsap.to(element.mesh.material.uniforms.uScrollProgress, {
				value: 0.0,
				duration: 2,
				ease: 'expo.out',
			});
		}
	}
}

export function meshPreviewToSlider(useGL, duration, expo) {
	for (let index = 0; index < useGL.ASlider.store.length; index++) {
		const element = useGL.ASlider.store[index];
		const timeline = gsap.timeline();
		element.isClicked = false;
		element.isHovered = false;
		timeline.to(element.mesh.position, {
			z: 0,
			duration: 0.5,
			ease: 'expo.out',
		}, 0.1);
		timeline.to(element.mesh.material.uniforms.uScreenProgress, {
			value: 0.0,
			duration: duration,
			ease: expo,
		}, 0);
		timeline.to(element.mesh.material.uniforms.uScrollProgress, {
			value: 0.0,
			duration: 2,
			ease: 'expo.out',
		}, 0);
	}
}
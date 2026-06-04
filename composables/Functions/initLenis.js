import Lenis from '@studio-freight/lenis'

export function initLenis(useGL) {
	return new Promise((resolve) => {
		const lenisInstance = new Lenis({ 
			orientation: 'horizontal',
			autoResize: true,
		});
		lenisInstance.scrollTo(0, { immediate: true });
		const raf = (time) => {
			lenisInstance.raf(time);
			requestAnimationFrame(raf);
		};

		raf(useGL.time.elapsed);
		resolve(lenisInstance);
	});
}
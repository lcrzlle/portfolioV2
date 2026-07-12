import Lenis from '@studio-freight/lenis'

export function initLenis(useGL) {
	return new Promise((resolve) => {
		const lenisInstance = new Lenis({
			orientation: 'horizontal',
			gestureOrientation: 'both',
			autoResize: true,
		});
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
		resolve(lenisInstance);
	});
}
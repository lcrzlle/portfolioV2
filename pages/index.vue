<template>
	<main id="pageContent">
		<span id="crossHandler">
			<span class="cross__handler__title ">
				<span class="cross__handler__item " @click="selectedLink('contact')">
					<span :class="buttonLinkClass" style="visibility: hidden;">Contact</span>
				</span>
				<span class="cross__handler__item " @click="selectedLink('videos')">
					<span :class="buttonLinkClass" style="visibility: hidden;">Vidéos</span>
				</span>
				<span class="cross__handler__item" @click="selectedLink('photos')">
					<span :class="buttonLinkClass" style="visibility: hidden;">Photos</span>
				</span>
			</span>
		</span>
		<div id="pageTitle">
			<LayoutPageTitle :homeTitle="useHomeData.acf.page_title" :subtitleOne="useHomeData.acf.page_subtitle_1"
				:subtitleTwo="useHomeData.acf.page_subtitle_2" :subtitleThree="useHomeData.acf.page_subtitle_3" />
		</div>
		<div id="paragraphWrapper">
			<h3 class="reveal-text" style="visibility: hidden;">{{ useHomeData.acf.page_paragraph }}</h3>
		</div>
		<div id="pageSlider">
			<div class="slider__item__wrapper" id="sliderPlaceholder" ref="sliderItemPlaceholder">
			</div>
		</div>
	</main>
	<LayoutFooter>
		<ul class="footer__thumb__inner">
			<li v-if="homeSlider" v-for="images in homeSlider">
				<NuxtImg class="footer__thumb__img" :src="images.image.url" :alt="images.image.alt" />
			</li>
		</ul>
	</LayoutFooter>
</template>

<script setup>
import gsap from 'gsap';
const route = useRoute();
const useGL = useState('gl');
const useHomeData = useState('home');
const homeSlider = ref(useHomeData.value.acf.home_slider);
const sliderItemPlaceholder = ref(null);
const router = useRouter();
const isChrome = ref(false);

const buttonLinkClass = computed(() => ({
	'button-link': isChrome.value,
	'reveal-text': true,
	'visible': isChrome.value
}));

function selectedLink(event) {
	useGL.value.currentCategory = event;
	gsap.to('.cross__handler__title', {
		y: '100',
		duration: 1.3,
		ease: 'ease.out',
	});
	const navLinks = document.querySelectorAll('.nav-link');
	navLinks.forEach((link) => {
		link.querySelector('.button-link').classList.remove('is-active');
	});
	navLinks[1].querySelector('.button-link').classList.add('is-active');
	router.push(useGL.value.currentCategory);
}

onBeforeRouteUpdate(() => {
	window.location.reload();
})

onBeforeRouteLeave((to, from, next) => {
	lockUI();
	const cross = document.getElementById('pageCross');
	cross.style.pointerEvents = 'none';
	updateGLSizes(useGL, sliderItemPlaceholder);
	onBeforeLeaveIndex(to, from, next, useGL);
})

onMounted(async () => {
	await nextTick();
	const cross = document.getElementById('pageCross');
	cross.style.pointerEvents = 'auto';
	cross.style.cursor = 'pointer';
	isChrome.value = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
	await nextTick();
	await ensureImagesLoaded('.footer__thumb__img');
	if (!useGL.value.firstLoadApp) {
		resetNavHeader();
	}
	onMountedIndex(useGL, sliderItemPlaceholder, route);
	unlockUI();
});
</script>

<style lang="scss">
#crossHandler {
	@extend %fixed-center;
	@extend %flex-justify-center;
	align-items: flex-end;
	z-index: 10;
	height: calc(clamp(2.5rem, 2.1798780487804876rem + 1.8292682926829267vw, 4.375rem) * 2.2);
	width: calc(clamp(2.5rem, 2.1798780487804876rem + 1.8292682926829267vw, 4.375rem) * 2.5);
	overflow: hidden;

	.cross__handler__title {
		@extend %flex-column;
		justify-content: flex-end;
		align-items: center;
		overflow: hidden;
		height: $font-size-link;
		font-size: $font-size-link;
		text-decoration: underline;
		text-decoration-thickness: 1px;
		text-underline-offset: 2px;
		font-weight: 300;

		.cross__handler__item {
			cursor: pointer;
			transform: translateY(0%);
			transition: transform 0.5s ease-in-out;
		}
	}

	#crossHandler>span>span {
		@extend %flex-justify-center;
	}
}

#sliderPlaceholder {
	pointer-events: none;
}

#pageTitle {
	display: flex;
	position: fixed;
	left: $space-s;
	min-width: 300px;

	@media (max-width: 800px) {
		top: 70px
	}

	@media (min-width: 801px) {
		top: 80px
	}
}

#paragraphWrapper {
	position: fixed;

	h3 {
		word-spacing: 0.1rem;
		font-weight: 350;
		margin-bottom: 2rem;
	}

	@media (max-width: 359px) {
		h3 {
			font-size: $font-size-link;
			width: calc(300px - calc($space-s * 2));
		}

		bottom: calc(22%);
		left: calc(50%);
		transform: translateX(-50%);
	}

	@media (max-width: 320px) {
		h3 {
			font-size: $font-size-link;
			width: calc(300px - calc($space-s * 2));
		}

		bottom: calc(22%);
		left: calc(50%);
		transform: translateX(-50%);
	}

	@media (min-width: 360px) {
		h3 {
			font-size: $font-size-link;
			width: calc(370px - calc($space-s * 2));
		}

		bottom: calc(22%);
		right: unset;
		left: $space-s;
	}

	@media (min-width: 460px) {
		h3 {
			font-size: $font-size-link;
			width: calc(400px - calc($space-s * 2));
			text-align: left;
		}

		bottom: calc(22%);
		right: $space-s;
		left: unset;
	}

	@media (min-width: 968px) {
		h3 {
			font-size: $font-size-link;
			width: calc(clamp(22.5rem, 15.789209115281501rem + 13.404825737265416vw, 31.875rem) * 0.9);
			text-align: left;
		}

		bottom: calc(22%);
		right: calc(15%);
	}
}
</style>

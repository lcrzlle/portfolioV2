<template>
	<main id="pageContent" class="layout-alt-page">
		<div id="pageTitle">
			<LayoutPageTitle :homeTitle="useCreditsData.acf.page_title" pageTitle=""
				:subtitleOne="useCreditsData.acf.page_subtitle_1" :subtitleTwo="useCreditsData.acf.page_subtitle_2"
				:subtitleThree="useCreditsData.acf.page_subtitle_3" />
		</div>
		<div id="creditsWrapper">
			<h2>
				<span class="reveal">{{ useCreditsData.acf.page_credit_1.title }}</span>
			</h2>
			<div class="credit__link__wrapper">
				<a :href="useCreditsData.acf.page_credit_1.url" target="blank" class="footer__email__link button-link">
					<span class="footer__email__inner reveal">
						{{ useCreditsData.acf.page_credit_1.text }}
					</span>
				</a>
			</div>
			<h2>
				<span class="reveal">{{ useCreditsData.acf.page_credit_2.title }}</span>
			</h2>
			<div class="credit__link__wrapper">
				<a :href="useCreditsData.acf.page_credit_2.url" target="blank" class="footer__email__link button-link">
					<span class="footer__email__inner reveal">
						{{ useCreditsData.acf.page_credit_2.text }}
					</span>
				</a>
			</div>
			<h2>
				<span class="reveal">{{ useCreditsData.acf.page_credit_3.title }}</span>
			</h2>
			<div class="credit__link__wrapper">
				<a :href="useCreditsData.acf.page_credit_3.url_1" target="blank"
					class="footer__email__link button-link">
					<span class="footer__email__inner reveal">
						{{ useCreditsData.acf.page_credit_3.text_1 }}
					</span>
				</a>
			</div>
			<div class="credit__link__wrapper" style="margin-top: 0.1rem;">
				<a :href="useCreditsData.acf.page_credit_3.url_2" target="blank"
					class="footer__email__link button-link">
					<span class="footer__email__inner reveal">
						{{ useCreditsData.acf.page_credit_3.text_2 }}
					</span>
				</a>
			</div>
		</div>
		<div id="pageSlider">
			<div class="placeholder__item__slider" ref="sliderItemPlaceholder">
				<NuxtImg class="placeholder__item" :src="useCreditsData.acf.credits_slider.credits_slider_1.image.url"
					:alt="useCreditsData.acf.credits_slider.credits_slider_1.image.alt" width="180" />
			</div>
		</div>
	</main>
	<LayoutFooter>
		<ul class="footer__thumb__inner">
			<li v-if="creditsSlider" v-for="images in creditsSlider">
				<NuxtImg class="footer__thumb__img" :src="images.image.url" :alt="images.image.alt" />
			</li>
		</ul>
	</LayoutFooter>
</template>

<script setup>
const route = useRoute();
const useGL = useState('gl');
const useCreditsData = useState('credits');
const creditsSlider = ref(useCreditsData.value.acf.credits_slider);
const sliderItemPlaceholder = ref(null);
const isLargeScreen = ref(true);

onBeforeRouteLeave((to, from, next) => {
	lockUI();
	updateGLSizes(useGL, sliderItemPlaceholder);
	onBeforeLeaveIndex(to, from, next, useGL);
})

onMounted(async () => {
	await ensureImagesLoaded('.placeholder__item');
	isLargeScreen.value = window.innerWidth > 800 ? true : false;
	hideCrossPage();
	onMountedIndex(useGL, sliderItemPlaceholder, route);
	if (!useGL.value.firstLoadApp) {
		resetNavHeader();
	}
	setTimeout(() => {
		unlockUI();
	}, 1000);
})
</script>

<style lang="scss" scoped>
.credit__link__wrapper {
	overflow: hidden;
}

#creditsWrapper {
	@extend %fixed-center;
	text-align: center;
	z-index: 99;
}

.footer__email__inner {
	font-weight: 350;
	font-size: $font-size-link;
}

h2 {
	font-size: calc(clamp(2.3125rem, 1.3541666666666665rem + 5.476190476190477vw, 3.75rem) * 0.45);
	font-weight: 420;
	line-height: calc(clamp(2.3125rem, 1.3541666666666665rem + 5.476190476190477vw, 3.75rem) * 0.46);
	margin-top: 2rem;
	margin-bottom: 0.5rem;
	overflow: hidden;
}
</style>
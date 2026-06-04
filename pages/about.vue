<template>
	<main id="pageContent" class="layout-alt-page">
		<div id="pageTitle">
			<LayoutPageTitle :homeTitle="useAboutData.acf.page_title" pageTitle=""
				:subtitleOne="useAboutData.acf.page_subtitle_1" :subtitleTwo="useAboutData.acf.page_subtitle_2"
				:subtitleThree="useAboutData.acf.page_subtitle_3" />
		</div>
		<div id="headlineWrapper">
			<h2 class="page__title__headline">
				<span class="reveal-text"> {{ useAboutData.acf.page_headline.line_1 }}</span>
				<span class="reveal-text">{{ useAboutData.acf.page_headline.line_2 }}</span>
				<span class="reveal-text">{{ useAboutData.acf.page_headline.line_3 }}</span>
			</h2>
		</div>
		<div id="paragraphWrapper">
			<h3>
				<div class="reveal-text"> {{ useAboutData.acf.page_paragraph_1 }}</div>
			</h3>
			<h3>
				<div class="reveal-text">{{ useAboutData.acf.page_paragraph_2 }}</div>
			</h3>
			<div id="creditsLinkWrapper">
				<NuxtLink to="/credits" class="footer__email__link button-link">
					<span class="footer__email__inner reveal">
						Crédits
					</span>
					<span class="footer__link__icon ">
						<svg class="svg__mail" width="13" height="13" viewBox="0 0 13 13" fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path class="svg__mail__path"
								d="M1.18213 1.05518H12.0721M12.0721 1.05518V11.9452M12.0721 1.05518L1.18213 11.9452"
								stroke="#F5F0E8" stroke-width="1" pathLength="1" />
							<path class="svg__mail__filled"
								d="M1.18213 1.05518H12.0721M12.0721 1.05518V11.9452M12.0721 1.05518L1.18213 11.9452"
								stroke="#F5F0E8" stroke-width="1" pathLength="1" />
						</svg>
					</span>
				</NuxtLink>
			</div>
		</div>
		<div id="pageSlider">
			<div class="placeholder__item__slider" ref="sliderItemPlaceholder">
				<NuxtImg class="placeholder__item" :src="useAboutData.acf.about_slider.about_slider_1.image.url"
					:alt="useAboutData.acf.about_slider.about_slider_1.image.alt" width="180" />
			</div>
		</div>
	</main>
	<LayoutFooter>
		<ul class="footer__thumb__inner">
			<li v-if="aboutSlider" v-for="images in aboutSlider">
				<NuxtImg class="footer__thumb__img" :src="images.image.url" :alt="images.image.alt" />
			</li>
		</ul>
	</LayoutFooter>
</template>

<script setup>
const route = useRoute();
const useGL = useState('gl');
const useAboutData = useState('about');
const aboutSlider = ref(useAboutData.value.acf.about_slider);
const sliderItemPlaceholder = ref(null);
const isLargeScreen = ref(true);

onBeforeRouteLeave((to, from, next) => {
	lockUI();
	updateGLSizes(useGL, sliderItemPlaceholder);
	onBeforeLeaveIndex(to, from, next, useGL);
})

onMounted(async () => {
	await nextTick();
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

<style lang="scss">
.layout-alt-page {
	#pageSlider {
		z-index: -1;
	}

	#creditsLinkWrapper {
		overflow: hidden;
		font-weight: 350;
		font-size: $font-size-link;
	}

	.footer__link__icon {
		svg {
			margin-left: 4px;
			width: calc($font-size-link / 1.5);
			height: calc($font-size-link / 1.5);
			transform: translateY(1px);
		}
	}

	.placeholder__item__slider {
		pointer-events: none;
		position: relative;
		width: clamp(11.25rem, 6.25rem + 7.8125vw, 15.625rem);
		aspect-ratio: 1/1.3;

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			opacity: 0;
		}
	}

	.page__title__headline {
		@extend %flex-column;
		position: fixed;
		font-size: calc(clamp(2.3125rem, 1.3541666666666665rem + 5.476190476190477vw, 3.75rem) * 0.45);
		font-weight: 400;
		letter-spacing: -0.1rem;
		line-height: calc(clamp(2.3125rem, 1.3541666666666665rem + 5.476190476190477vw, 3.75rem) * 0.46);

		@media (max-width: 900px) {
			top: 30%;
			left: $space-s;
		}

		@media (min-width: 901px) {
			top: 30%;
			right: 30%;
		}
	}
}

#socialFooter {
	@media (max-width: 800px) {
		ul {
			display: flex;
			flex-direction: column;
			position: fixed;
			text-align: right;
			right: 0;
			bottom: calc($space-s * 2.5);
			gap: calc($space-s / 2);
			padding-bottom: calc($space-s / 2);

			li {
				overflow: hidden;
			}
		}
	}

	@media (min-width: 801px) {
		display: none;
	}
}
</style>
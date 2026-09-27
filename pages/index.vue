<template>
	<main id="pageContent">
		<span id="crossHandler">
			<span class="cross__handler__title ">
				<span class="cross__handler__item" @click="selectedLink('photos')">
					<span :class="buttonLinkClass" style="visibility: hidden;">Photos</span>
				</span>
				<span class="cross__handler__item " @click="selectedLink('videos')">
					<span :class="buttonLinkClass" style="visibility: hidden;">Vidéos</span>
				</span>
			</span>
		</span>
		<span id="homeContact" class="cross__handler__item" @click="selectedLink('contact')">
			<span :class="buttonLinkClass" style="visibility: hidden;">Contact</span>
		</span>
		<div id="pageTitle">
			<LayoutPageTitle :homeTitle="useHomeData.acf.page_title" :subtitleOne="useHomeData.acf.page_subtitle_1"
				:subtitleTwo="useHomeData.acf.page_subtitle_2" :subtitleThree="useHomeData.acf.page_subtitle_3" />
		</div>
		<div id="paragraphWrapper">
			<h3 class="reveal-text" style="visibility: hidden; margin-bottom: 0;">{{ useHomeData.acf.page_paragraph }}</h3>
			<h3 class="reveal-text" style="visibility: hidden;">{{ useHomeData.acf.page_paragraph_2 }}</h3>
		</div>
		<div id="pageSlider">
			<div class="slider__item__wrapper" id="sliderPlaceholder" ref="sliderItemPlaceholder">
			</div>
		</div>
	</main>
	<LayoutFooter>
		<ul class="footer__thumb__inner">
			<li v-for="(images, i) in bgImages" :key="i">
				<img class="home__thumb__src" :src="images.url" :alt="images.alt" />
			</li>
		</ul>
	</LayoutFooter>
</template>

<script setup>
import gsap from 'gsap';
const route = useRoute();
const useGL = useState('gl');
const useHomeData = useState('home');
const useProjectsData = useState('projects');
// Fond de la home : diaporama ambiant des covers de projets, ordre aléatoire.
function shuffle(arr) {
	const a = arr.slice();
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}
const bgImages = ref(shuffle(
	(useProjectsData.value || [])
		.map((p) => ({ url: p.acf?.primary?.url, alt: p.acf?.title || '' }))
		.filter((x) => x.url)
));
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
	// Préchargement forcé des fonds (robuste mobile : le lazy-load ignore les <img> cachés)
	await Promise.all((bgImages.value || []).map((s) => new Promise((res) => {
		const im = new Image();
		im.onload = res;
		im.onerror = res;
		im.src = s.url;
		setTimeout(res, 2500);
	})));
	if (!useGL.value.firstLoadApp) {
		resetNavHeader();
	}
	onMountedIndex(useGL, sliderItemPlaceholder, route);
	unlockUI();
});
</script>

<style lang="scss">
#crossHandler {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translateX(-50%);
	// pousse Photos/Vidéos juste SOUS la croix "+" (centrée) au lieu de la chevaucher
	margin-top: calc(clamp(2.5rem, 2.1798780487804876rem + 1.8292682926829267vw, 4.375rem) * 0.8);
	z-index: 10;
	display: flex;
	justify-content: center;

	.cross__handler__title {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.45rem;
		font-size: $font-size-link;
		text-decoration: underline;
		text-decoration-thickness: 1px;
		text-underline-offset: 2px;
		font-weight: 300;

		.cross__handler__item {
			cursor: pointer;
		}
	}
}

// Lien Contact : bas-gauche, au niveau de "Email" (qui est en bas-droite)
#homeContact {
	position: fixed;
	left: $space-s;
	bottom: calc($space-s + $space-s / 2);
	z-index: 10;
	cursor: pointer;
	font-size: $font-size-link;
	font-weight: 300;
	text-decoration: underline;
	text-decoration-thickness: 1px;
	text-underline-offset: 2px;
	overflow: hidden;
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

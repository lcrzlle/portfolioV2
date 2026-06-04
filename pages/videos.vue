<template>
	<main id="pageContent">
		<div id="pageTitle" ref="pageTitleRef">
			<LayoutPageTitle pageTitle="Vidéos" subtitleOne="Projets" subtitleTwo="Galerie"
				subtitleThree="Portfolio" />
		</div>
		<ul id="pageSlider">
			<li v-for="(item, index) in videosSlider.slice().reverse()" :key="index" class="slider__item__wrapper">
				<div>
					<NuxtImg @click="handleItem" :title="item.acf.title" :preview_line_1="item.acf.title_preview.line_1"
						:preview_line_2="item.acf.title_preview.line_2" :slug="item.slug"
						:location="item.acf.localisation" :src="item.acf.primary.url" class="slider__item"
						:alt="item.acf.primary.alt" draggable="false" />
				</div>
			</li>
		</ul>
	</main>
	<LayoutFooter>
		<ul class="footer__thumb__inner">
			<li v-for="item in videosSlider.slice().reverse()">
				<NuxtImg class="footer__thumb__img" :src="item.acf.primary.url" :alt="item.acf.primary.alt" draggable="false" />
			</li>
		</ul>
	</LayoutFooter>
	<section v-if="isOnPreview" id="pagePreview" ref="pagePreviewRef">
		<div id="pagePreviewWrapper">
			<h3 class="preview__item__title">
				<span v-if="itemTitlePreview[0]" class="reveal-preview">{{ itemTitlePreview[0] }}</span>
				<span v-if="itemTitlePreview[1]" class="reveal-preview">{{ itemTitlePreview[1] }}</span>
			</h3>
			<h4 class="preview__item__title">
				<span v-if="itemLocation" class="reveal-preview">{{ itemLocation }}</span>
			</h4>
			<span class="preview__item__infos">
				<span class="preview__item__wrapper" :class="{ 'button-link': !isTouchDevice }">
					<NuxtLink v-if="itemLink" :to="itemLink" class="preview__item__link reveal-text-preview">
						<span>Entrer dans le projet</span>
					</NuxtLink>
				</span>
			</span>
			<div id="crossCloseWrapper">
				<UtilsCrossClose />
			</div>
		</div>
	</section>
	<NuxtPage />
</template>

<script setup>
const route = useRoute();
const useGL = useState('gl');
const useProjectsData = useState('projects');
const allProjects = useProjectsData.value ?? [];
const videosSlider = ref(allProjects.filter(item => item.acf?.video_url).length > 0
    ? allProjects.filter(item => item.acf?.video_url)
    : allProjects);
const itemTitlePreview = ref([null, null]);
const itemLink = ref(null);
const itemLocation = ref(null);
const pagePreviewRef = ref(null);
const isOnPreview = ref(false);
const isTouchDevice = ref(false);
let category = 'videos';

function handleItem(event) {
	isOnPreview.value = true;
	itemTitlePreview.value = [
		event.target.attributes.preview_line_1.value,
		event.target.attributes.preview_line_2.value
	];
	itemLocation.value = event.target.attributes.location.value;
	itemLink.value = '/videos/' + event.target.attributes.slug.value;
}

onBeforeRouteLeave((to, from, next) => {
	lockUI();
	onBeforeLeaveProject(useGL, to, next);
})

onMounted(async () => {
	await nextTick();
	useGL.value.currentCategory = category;
	await ensureImagesLoaded('.footer__thumb__img');
	initProjectPage(useGL, pagePreviewRef, route, isOnPreview, category);
	onMountedProject(useGL, route, category, isTouchDevice);
	setTimeout(() => {
		unlockUI();
	}, 1000);
})

onBeforeRouteUpdate((to, from, next) => {
	lockUI();
	onBeforeUpdateProject(to, from, next, useGL, pagePreviewRef, category, route, isOnPreview);
})
</script>

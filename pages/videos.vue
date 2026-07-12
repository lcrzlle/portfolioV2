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
	<Teleport to="body">
		<div class="slider__labels" :class="{ 'is-visible': showLabels }">
			<span v-for="(item, index) in videosSlider.slice().reverse()" :key="index" class="slider__item__label">
				<span>{{ item.acf.title }}</span>
			</span>
		</div>
	</Teleport>
	<LayoutFooter>
		<ul class="footer__thumb__inner">
			<li v-for="item in videosSlider.slice().reverse()">
				<span class="footer__thumb__img footer__thumb__dot" aria-hidden="true"></span>
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
			<div v-if="itemContext && itemContext.length" class="preview__context">
				<div v-for="(section, i) in itemContext" :key="i" class="preview__context__section">
					<h5 v-if="section.title" class="preview__context__title">{{ section.title }}</h5>
					<p v-if="section.body" class="preview__context__body">{{ section.body }}</p>
				</div>
			</div>
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
const videosSlider = ref(allProjects.filter(item => item.acf?.videos?.length > 0));
const itemTitlePreview = ref([null, null]);
const itemLink = ref(null);
const itemLocation = ref(null);
const itemContext = ref(null);
const pagePreviewRef = ref(null);
const isOnPreview = ref(false);
const isTouchDevice = ref(false);
const labelsReady = ref(false);
let category = 'videos';

const showLabels = computed(() => labelsReady.value && !isOnPreview.value && route.name === category);

function handleItem(event) {
	isOnPreview.value = true;
	itemTitlePreview.value = [
		event.target.attributes.preview_line_1.value,
		event.target.attributes.preview_line_2.value
	];
	itemLocation.value = event.target.attributes.location.value;
	const slug = event.target.attributes.slug.value;
	itemLink.value = '/videos/' + slug;
	const project = videosSlider.value.find(p => p.slug === slug);
	itemContext.value = project?.acf?.context ?? null;
}

onBeforeRouteLeave((to, from, next) => {
	lockUI();
	onBeforeLeaveProject(useGL, to, next);
})

onMounted(async () => {
	await nextTick();
	useGL.value.currentCategory = category;
	await ensureImagesLoaded('.slider__item');
	initProjectPage(useGL, pagePreviewRef, route, isOnPreview, category);
	const labelsDelay = useGL.value.firstLoadApp ? 4000 : 400;
	onMountedProject(useGL, route, category, isTouchDevice);
	setTimeout(() => {
		labelsReady.value = true;
	}, labelsDelay);
	setTimeout(() => {
		unlockUI();
	}, 1000);
})

onBeforeRouteUpdate((to, from, next) => {
	lockUI();
	onBeforeUpdateProject(to, from, next, useGL, pagePreviewRef, category, route, isOnPreview);
})
</script>

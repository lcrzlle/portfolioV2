<template>
    <section id="projectContent">
        <nav class="item__back__wrapper">
            <NuxtLink to="/videos" class="item__back reveal-text-project" :class="{ 'button-link': !isTouchDevice }">
                <span>Retour</span>
            </NuxtLink>
            <span class="item__back__icon">
                <svg class="svg__back__icon" width="11" height="11" viewBox="0 0 13 13" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path class="svg__mail__path"
                        d="M1.18213 1.05518H12.0721M12.0721 1.05518V11.9452M12.0721 1.05518L1.18213 11.9452"
                        stroke="#F5F0E8" stroke-width="1" pathLength="1" />
                    <path class="svg__mail__filled"
                        d="M1.18213 1.05518H12.0721M12.0721 1.05518V11.9452M12.0721 1.05518L1.18213 11.9452"
                        stroke="#F5F0E8" stroke-width="1" pathLength="1" />
                </svg>
            </span>
        </nav>
        <section id="viewItemVideo">
            <div v-if="currentVideo" class="item__video__wrapper">
                <iframe :src="getEmbedUrl(currentVideo)" class="item__video" frameborder="0" scrolling="no"
                    allow="autoplay; fullscreen; picture-in-picture" allowfullscreen />
            </div>
        </section>
        <LayoutFooter>
            <section id="viewItemInfos">
                <div class="item__title">
                    <p class="page__title__primary">
                        <span v-if="itemData.title" class="reveal-text-project" style="visibility: hidden;">{{
                            itemData.title }}</span>
                    </p>
                    <p class="page__title__secondary">
                        <span v-if="itemData.localisation" class="reveal-text-project" style="visibility: hidden;">{{
                            itemData.localisation }}</span>
                    </p>
                </div>
                <div class="item__toggle__wrapper">
                    <NuxtLink :to="'/photos/' + route.params.uid" class="item__toggle__link"
                        :class="{ 'button-link': !isTouchDevice }">
                        <span class="reveal-text-project" style="visibility: hidden;">Photo</span>
                    </NuxtLink>
                </div>
            </section>
            <ul class="footer__thumb__inner__project" ref="thumbWrapper">
                <li v-for="(video, index) in itemData.videos" :key="index">
                    <span class="footer__thumb__img footer__thumb__project footer__thumb__dot"
                        :class="{ is__selected: index === videoIndex }" @click="videoIndex = index"></span>
                </li>
            </ul>
        </LayoutFooter>
    </section>
</template>

<script setup>
const route = useRoute();
const useGL = useState('gl');
const useProjectsData = useState('projects');
const thumbWrapper = ref(null);
const isTouchDevice = ref(typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0));
let category = 'videos';

const itemData = ref(getItem());
const videoIndex = ref(0);
const currentVideo = computed(() => itemData.value.videos?.[videoIndex.value] ?? null);

function getItem() {
    const item = useProjectsData.value.find(item => item.slug === route.params.uid);
    return item?.acf ?? {};
}

function getEmbedUrl(url) {
    if (!url) return '';
    const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    if (ytMatch) return `https://www.youtube-nocookie.com/embed/${ytMatch[1]}`;
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    const igMatch = url.match(/instagram\.com\/(reel|p|tv)\/([^/?]+)/);
    if (igMatch) return `https://www.instagram.com/${igMatch[1]}/${igMatch[2]}/embed`;
    return url;
}

let navLockVideo = false;
let wheelIdleTimer = null;
function goVideo(dir) {
    const n = itemData.value.videos?.length ?? 0;
    const target = Math.max(0, Math.min(n - 1, videoIndex.value + dir));
    if (target !== videoIndex.value) videoIndex.value = target;
}
function onWheelVideo(event) {
    if (useGL.value.indexMenuOpen) return;
    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    if (Math.abs(delta) < 6) return;
    // 1 vidéo par geste : le verrou reste actif tant que l'inertie du scroll continue
    clearTimeout(wheelIdleTimer);
    wheelIdleTimer = setTimeout(() => { navLockVideo = false; }, 220);
    if (navLockVideo) return;
    navLockVideo = true;
    goVideo(delta > 0 ? 1 : -1);
}
function onKeysVideo(event) {
    if (useGL.value.indexMenuOpen) return;
    if (event.key === 'ArrowRight') { event.preventDefault(); goVideo(1); }
    else if (event.key === 'ArrowLeft') { event.preventDefault(); goVideo(-1); }
}

onBeforeRouteLeave((to, from, next) => {
    lockUI();
    onBeforeLeaveUID(to, from, next, useGL, category);
})

onMounted(async () => {
    await nextTick();
    onMountedUID(useGL, isTouchDevice, route);
    document.addEventListener('wheel', onWheelVideo, { passive: true });
    document.addEventListener('keydown', onKeysVideo);
    unlockUI();
})

onUnmounted(() => {
    clearTimeout(wheelIdleTimer);
    document.removeEventListener('wheel', onWheelVideo);
    document.removeEventListener('keydown', onKeysVideo);
})
</script>

<style lang="scss" scoped>
#projectContent {
    #wrapperFooter {
        height: 200px !important;
    }
}

#viewItemVideo {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
}

.item__video__wrapper {
    position: relative;
    width: min(400px, 92vw);
    height: min(86vh, 720px);

    .item__video {
        width: 100%;
        height: 100%;
        border: none;
    }
}

.item__toggle__wrapper {
    position: fixed;
    right: $space-s;
    bottom: $space-s;
    z-index: 100;
    overflow: hidden;

    .item__toggle__link {
        font-size: $font-size-link;
        font-weight: 350;
        text-decoration: underline;
        text-decoration-thickness: 1px;
        text-underline-offset: 2px;
    }
}
</style>

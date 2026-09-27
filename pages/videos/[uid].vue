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
        <section id="viewItemVideo" ref="videoScroll">
            <div v-for="(video, index) in itemData.videos" :key="index" class="item__video__wrapper">
                <iframe :src="getEmbedUrl(video)" class="item__video" frameborder="0" scrolling="no" loading="lazy"
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
        </LayoutFooter>
    </section>
</template>

<script setup>
const route = useRoute();
const useGL = useState('gl');
const useProjectsData = useState('projects');
const videoScroll = ref(null);
const isTouchDevice = ref(typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0));
let category = 'videos';

const itemData = ref(getItem());

function getItem() {
    const item = useProjectsData.value.find(item => item.slug === route.params.uid);
    return item?.acf ?? {};
}

const _ctx = itemData.value.context?.[0]?.body || '';
const _img = itemData.value.primary?.url || '';
useSeoMeta({
    title: `${itemData.value.title || 'Projet'} — Vidéos ${itemData.value.type || ''} | Léo Crouzille`,
    description: (_ctx || `Vidéos du projet « ${itemData.value.title} » par Léo Crouzille, vidéaste.`).slice(0, 155),
    ogTitle: `${itemData.value.title || 'Projet'} — Vidéos | Léo Crouzille`,
    ogDescription: (_ctx || `Vidéos du projet « ${itemData.value.title} ».`).slice(0, 155),
    ogImage: _img ? (_img.startsWith('http') ? _img : 'https://leocrouzille.com' + _img) : 'https://leocrouzille.com/home/bnf.webp',
});
useHead({ link: [{ rel: 'canonical', href: `https://leocrouzille.com/videos/${route.params.uid}` }] });

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

// Molette verticale (souris) -> défilement horizontal de la rangée de vidéos
function onWheelVideo(event) {
    const el = videoScroll.value;
    if (!el || (useGL.value && useGL.value.indexMenuOpen)) return;
    const delta = Math.abs(event.deltaY) > Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
    if (delta) el.scrollLeft += delta;
}

onBeforeRouteLeave((to, from, next) => {
    lockUI();
    onBeforeLeaveUID(to, from, next, useGL, category);
})

onMounted(async () => {
    await nextTick();
    onMountedUID(useGL, isTouchDevice, route);
    document.addEventListener('wheel', onWheelVideo, { passive: true });
    unlockUI();
})

onUnmounted(() => {
    document.removeEventListener('wheel', onWheelVideo);
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
    flex-direction: row;
    align-items: center;
    gap: calc($space-s * 1.5);
    width: 100%;
    height: 100vh;
    overflow-x: auto;
    overflow-y: hidden;
    padding: 0 $space-s;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none;
    }
}

.item__video__wrapper {
    // fenêtre de rognage : ne montre que la vidéo (9:16) de l'embed Instagram
    position: relative;
    flex: 0 0 auto;
    width: 213px;
    height: 378px;
    overflow: hidden;

    .item__video {
        position: absolute;
        top: -54px; // masque l'en-tête (profil / "voir le profil")
        left: -54px; // masque la bande noire de gauche (pillarbox)
        width: 320px;
        height: 700px; // hauteur naturelle de l'embed ; bas (likes/commentaires) coupé par overflow
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

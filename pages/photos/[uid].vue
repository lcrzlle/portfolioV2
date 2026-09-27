<template>
    <section id="projectContent">
        <nav class="item__back__wrapper">
            <NuxtLink to="/photos" class="item__back reveal-text-project" :class="{ 'button-link': !isTouchDevice }">
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
        <section id="viewItemChain" ref="photoScroll">
            <div v-for="(item, index) in itemData.slides" :key="index"
                :class="item.format === 'horizontal' ? 'chain__item chain__item__h' : 'chain__item chain__item__v'">
                <NuxtImg v-if="item.image" class="chain__img" :src="item.image.url" :alt="item.image.alt" />
            </div>
        </section>
        <LayoutFooter>
            <section id="viewItemInfos">
                <div class="item__title">
                    <p class="page__title__primary">
                        <span v-if="itemData.title" class="reveal-text-project" style="visibility: hidden;">{{
                            itemData.title }}</span>
                    </p>
                    <p v-if="itemData.localisation" class="page__title__secondary">
                        <span class="reveal-text-project" style="visibility: hidden;">{{
                            itemData.localisation }}</span>
                    </p>
                </div>
                <div v-if="itemData.videos && itemData.videos.length" class="item__toggle__wrapper">
                    <NuxtLink :to="'/videos/' + route.params.uid" class="item__toggle__link"
                        :class="{ 'button-link': !isTouchDevice }">
                        <span class="reveal-text-project" style="visibility: hidden;">Vidéos</span>
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
const photoScroll = ref(null);
const isTouchDevice = ref(typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0));
let category = 'photos';

const itemData = ref(getItem());

function getItem() {
    const item = useProjectsData.value.find(item => item.slug === route.params.uid);
    return item?.acf ?? {};
}

const _ctx = itemData.value.context?.[0]?.body || '';
const _img = itemData.value.primary?.url || '';
useSeoMeta({
    title: `${itemData.value.title || 'Projet'} — ${itemData.value.type || 'Photo'} | Léo Crouzille`,
    description: (_ctx || `Projet photo « ${itemData.value.title} » par Léo Crouzille, photographe BTP & architecture.`).slice(0, 155),
    ogTitle: `${itemData.value.title || 'Projet'} | Léo Crouzille`,
    ogDescription: (_ctx || `Projet « ${itemData.value.title} » par Léo Crouzille.`).slice(0, 155),
    ogImage: _img ? (_img.startsWith('http') ? _img : 'https://leocrouzille.com' + _img) : 'https://leocrouzille.com/home/bnf.webp',
});
useHead({ link: [{ rel: 'canonical', href: `https://leocrouzille.com/photos/${route.params.uid}` }] });

// Molette -> défilement horizontal de la rangée de photos.
// Enregistré en CAPTURE sur document (comme l'ancien handleWheelUID) : on intercepte
// l'événement AVANT Lenis (scroll horizontal de la fenêtre hérité de la page liste)
// et on le stoppe (stopPropagation + preventDefault) pour qu'il ne « chasse » pas la
// rangée hors écran ; on scrolle nous-mêmes le conteneur.
function onWheelPhoto(event) {
    const el = photoScroll.value;
    if (!el || (useGL.value && useGL.value.indexMenuOpen)) return;
    event.stopPropagation();
    event.preventDefault();
    const delta = Math.abs(event.deltaY) > Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
    if (delta) el.scrollLeft += delta;
}

// Verrouille tout défilement horizontal de la fenêtre : la page liste (#pageSlider)
// reste montée derrière et rend le document débordant ; une fois Lenis stoppé, le
// scroll natif reprendrait et « chasserait » la rangée. On restaure en quittant.
function lockWindowX() {
    const h = document.documentElement, b = document.body;
    h.dataset.prevOverflowX = h.style.overflowX;
    b.dataset.prevOverflowX = b.style.overflowX;
    window.scrollTo(0, 0);
    h.style.overflowX = 'hidden';
    b.style.overflowX = 'hidden';
}
function unlockWindowX() {
    const h = document.documentElement, b = document.body;
    h.style.overflowX = h.dataset.prevOverflowX || '';
    b.style.overflowX = b.dataset.prevOverflowX || '';
    delete h.dataset.prevOverflowX;
    delete b.dataset.prevOverflowX;
}

onBeforeRouteLeave((to, from, next) => {
    lockUI();
    unlockWindowX();
    onBeforeLeaveUID(to, from, next, useGL, category);
})

onMounted(async () => {
    await nextTick();
    onMountedUID(useGL, isTouchDevice, route);
    lockWindowX();
    // capture sur document pour passer AVANT Lenis (non-passif => preventDefault possible)
    document.addEventListener('wheel', onWheelPhoto, { capture: true, passive: false });
    unlockUI();
})

onUnmounted(() => {
    unlockWindowX();
    document.removeEventListener('wheel', onWheelPhoto, { capture: true });
})
</script>

<style lang="scss" scoped>
#projectContent {
    #wrapperFooter {
        height: 200px !important;
    }
}

#viewItemChain {
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
    touch-action: pan-x;
    overscroll-behavior-x: contain;
    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none;
    }

    // le padding-right d'un conteneur à défilement horizontal n'est pas honoré en fin
    // de scroll (Chrome/Safari) ; un espaceur flex l'est de façon fiable et garantit
    // la marge après la dernière photo
    &::after {
        content: "";
        flex: 0 0 $space-s;
        align-self: stretch;
    }
}

.chain__item {
    position: relative;
    flex: 0 0 auto;
    height: 72vh;

    .chain__img {
        height: 100%;
        width: auto;
        object-fit: contain;
        display: block;
    }
}

@media (max-width: 800px) {
    .chain__item {
        height: 60vh;
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

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
        <section id="viewItem">
            <div v-for="(item, index) in itemData.slides" :key="index"
                :class="item.format === 'horizontal' ? 'item__project__h' : 'item__project__v'">
                <NuxtImg v-if="item.image" class="item__project__img" :src="item.image.url" :alt="item.image.alt" />
            </div>
        </section>
        <section id="viewItemMosaic" ref="mosaicRef">
            <div class="mosaic__grid">
                <button v-for="(item, index) in itemData.slides" :key="index" class="mosaic__cell"
                    type="button" @click="onMosaicClick(index)">
                    <NuxtImg v-if="item.image" class="mosaic__img" :src="item.image.url" :alt="item.image.alt"
                        width="500" />
                </button>
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
                <div v-if="itemData.videos && itemData.videos.length" class="item__toggle__wrapper">
                    <NuxtLink :to="'/videos/' + route.params.uid" class="item__toggle__link"
                        :class="{ 'button-link': !isTouchDevice }">
                        <span class="reveal-text-project" style="visibility: hidden;">Vidéo</span>
                    </NuxtLink>
                </div>
            </section>
            <ul class="footer__thumb__inner__project" ref="thumbWrapper">
                <li v-for="(item, index) in itemData.slides" :key="index">
                    <span class="footer__thumb__img footer__thumb__project footer__thumb__dot" aria-hidden="true"></span>
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
const mosaicRef = ref(null);
const isTouchDevice = ref(false);
let category = 'photos';

function onMosaicClick(index) {
    navigateUID(useGL.value, index);
}

const itemData = ref(getItem());

function getItem() {
    const item = useProjectsData.value.find(item => item.slug === route.params.uid);
    return item?.acf ?? {};
}

async function initUID() {
    await ensureImagesLoaded('.item__project__img');
    initSliderUID(useGL, route);
    enterSliderUID(useGL);
    await initLenisUID(thumbWrapper, useGL);
}

onBeforeRouteLeave((to, from, next) => {
    lockUI();
    onBeforeLeaveUID(to, from, next, useGL, category);
})

onMounted(async () => {
    await nextTick();
    await initUID();
    onMountedUID(useGL, isTouchDevice, route);
    unlockUI();
})
</script>

<style lang="scss" scoped>
#projectContent {
    #wrapperFooter {
        height: 200px !important;
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

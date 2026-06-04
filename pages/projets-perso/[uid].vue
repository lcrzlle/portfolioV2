<template>
    <section id="projectContent">
        <nav class="item__back__wrapper">
            <NuxtLink to="/contact" class="item__back reveal-text-project" :class="{ 'button-link': !isTouchDevice }">
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
            </section>
            <ul class="footer__thumb__inner__project" ref="thumbWrapper">
                <li v-for="(item, index) in itemData.slides" :key="index">
                    <NuxtImg v-if="item.image" class="footer__thumb__img footer__thumb__project" :src="item.image.url"
                        :alt="item.image.alt" ref="addImageRef" width="80" />
                </li>
            </ul>
        </LayoutFooter>
    </section>
</template>

<script setup>
const route = useRoute();
const useGL = useState('gl');
const useProjetsPersData = useState('projets-perso');
const thumbWrapper = ref(null);
const isTouchDevice = ref(false);
let category = 'contact';

const itemData = ref(getItem());

function getItem() {
    const item = useProjetsPersData.value?.find(item => item.slug === route.params.uid);
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
</style>

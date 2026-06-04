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
            <div v-if="itemData.video_url" class="item__video__wrapper">
                <iframe
                    :src="getEmbedUrl(itemData.video_url)"
                    class="item__video"
                    frameborder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowfullscreen
                />
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
                        <span class="reveal-text-project" style="visibility: hidden;">Voir les photos</span>
                    </NuxtLink>
                </div>
            </section>
            <ul class="footer__thumb__inner__project" ref="thumbWrapper">
                <li v-for="(item, index) in itemData.slides" :key="index">
                    <NuxtImg v-if="item.image" class="footer__thumb__img footer__thumb__project" :src="item.image.url"
                        :alt="item.image.alt" width="80" />
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
const isTouchDevice = ref(false);
let category = 'videos';

const itemData = ref(getItem());

function getItem() {
    const item = useProjectsData.value.find(item => item.slug === route.params.uid);
    return item?.acf ?? {};
}

function getEmbedUrl(url) {
    if (!url) return '';
    // YouTube
    const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    if (ytMatch) return `https://www.youtube-nocookie.com/embed/${ytMatch[1]}`;
    // Vimeo
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    return url;
}

onBeforeRouteLeave((to, from, next) => {
    lockUI();
    onBeforeLeaveUID(to, from, next, useGL, category);
})

onMounted(async () => {
    await nextTick();
    isTouchDevice.value = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
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

#viewItemVideo {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
}

.item__video__wrapper {
    position: relative;
    width: clamp(300px, 70vw, 1200px);
    aspect-ratio: 16/9;

    .item__video {
        width: 100%;
        height: 100%;
    }
}

.item__toggle__wrapper {
    overflow: hidden;
    margin-top: 0.5rem;

    .item__toggle__link {
        font-size: $font-size-link;
        font-weight: 350;
        text-decoration: underline;
        text-decoration-thickness: 1px;
        text-underline-offset: 2px;
    }
}
</style>

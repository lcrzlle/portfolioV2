<template>
    <main id="pageContent" class="layout-alt-page">
        <div id="pageTitle">
            <LayoutPageTitle :pageTitle="useMentionsData.acf.page_title"
                :subtitleOne="useMentionsData.acf.page_subtitle_1" :subtitleTwo="useMentionsData.acf.page_subtitle_2"
                :subtitleThree="useMentionsData.acf.page_subtitle_3" />
        </div>
        <div id="creditsWrapper">
            <h2>
                <span class="reveal">{{ useMentionsData.acf.page_mention_1.title }}</span>
            </h2>
            <div class="credit__link__wrapper" style="display: flex; flex-direction: column;">
                <span v-if="useMentionsData.acf.page_mention_1.text_line_1" class="footer__email__inner reveal"
                    style="overflow: hidden;">
                    {{ useMentionsData.acf.page_mention_1.text_line_1 }}
                </span>
                <span v-if="useMentionsData.acf.page_mention_1.text_line_2" class="footer__email__inner reveal"
                    style="overflow: hidden;">
                    {{ useMentionsData.acf.page_mention_1.text_line_2 }}
                </span>
                <span v-if="useMentionsData.acf.page_mention_1.text_line_3" class="footer__email__inner reveal"
                    style="overflow: hidden;">
                    {{ useMentionsData.acf.page_mention_1.text_line_3 }}
                </span>
                <span v-if="useMentionsData.acf.page_mention_1.text_line_4" class="footer__email__inner reveal"
                    style="overflow: hidden;">
                    {{ useMentionsData.acf.page_mention_1.text_line_4 }}
                </span>
                <span v-if="useMentionsData.acf.page_mention_1.text_line_5" class="footer__email__inner reveal"
                    style="overflow: hidden;">
                    {{ useMentionsData.acf.page_mention_1.text_line_5 }}
                </span>
            </div>

            <h2>
                <span class="reveal">{{ useMentionsData.acf.page_mention_2.title }}</span>
            </h2>
            <div class="credit__link__wrapper" style="display: flex; flex-direction: column;">
                <span v-if="useMentionsData.acf.page_mention_2.text_line_1" class="footer__email__inner reveal"
                    style="overflow: hidden;">
                    {{ useMentionsData.acf.page_mention_2.text_line_1 }}
                </span>
                <span v-if="useMentionsData.acf.page_mention_2.text_line_2" class="footer__email__inner reveal"
                    style="overflow: hidden;">
                    {{ useMentionsData.acf.page_mention_2.text_line_2 }}
                </span>
                <span v-if="useMentionsData.acf.page_mention_2.text_line_3" class="footer__email__inner reveal"
                    style="overflow: hidden;">
                    {{ useMentionsData.acf.page_mention_2.text_line_3 }}
                </span>
                <span v-if="useMentionsData.acf.page_mention_2.text_line_4" class="footer__email__inner reveal"
                    style="overflow: hidden;">
                    {{ useMentionsData.acf.page_mention_2.text_line_4 }}
                </span>
                <span v-if="useMentionsData.acf.page_mention_2.text_line_5" class="footer__email__inner reveal"
                    style="overflow: hidden;">
                    {{ useMentionsData.acf.page_mention_2.text_line_5 }}
                </span>
            </div>
        </div>
        <div id="pageSlider">
            <div class="placeholder__item__slider" ref="sliderItemPlaceholder">
                <NuxtImg class="placeholder__item" :src="useMentionsData.acf.mentions_slider.mentions_slider_1.image.url"
                    :alt="useMentionsData.acf.mentions_slider.mentions_slider_1.image.alt" width="180" />
            </div>
        </div>
    </main>
    <LayoutFooter>
        <ul class="footer__thumb__inner">
            <li v-if="mentionsSlider" v-for="images in mentionsSlider">
                <NuxtImg class="footer__thumb__img" :src="images.image.url" :alt="images.image.alt" />
            </li>
        </ul>
    </LayoutFooter>
</template>

<script setup>
const route = useRoute();
const useGL = useState('gl');
const useMentionsData = useState('mentions');
const mentionsSlider = ref(useMentionsData.value.acf.mentions_slider);
const sliderItemPlaceholder = ref(null);
const isLargeScreen = ref(true);

onBeforeRouteLeave((to, from, next) => {
    lockUI();
    updateGLSizes(useGL, sliderItemPlaceholder);
    onBeforeLeaveIndex(to, from, next, useGL);
})

onMounted(async () => {
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

<style lang="scss" scoped>
.credit__link__wrapper {
    overflow: hidden;
}

#creditsWrapper {
    @extend %fixed-center;
    text-align: center;
    z-index: 99;
}

.footer__email__inner {
    font-weight: 350;
    font-size: $font-size-link;
}

h2 {
    font-size: calc(clamp(2.3125rem, 1.3541666666666665rem + 5.476190476190477vw, 3.75rem) * 0.45);
    font-weight: 420;
    line-height: calc(clamp(2.3125rem, 1.3541666666666665rem + 5.476190476190477vw, 3.75rem) * 0.46);
    margin-top: 2rem;
    margin-bottom: 0.5rem;
    overflow: hidden;
}
</style>
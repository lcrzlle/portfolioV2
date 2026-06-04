<template>
    <main id="pageContent" class="layout-alt-page">
        <div id="pageTitle">
            <LayoutPageTitle pageTitle="Contact" subtitleOne="Projets" subtitleTwo="Perso"
                subtitleThree="Portfolio" />
        </div>
        <div id="contactWrapper">
            <div id="contactInfo">
                <a :href="'mailto:' + useSettingsData.acf.email" class="footer__email__link button-link">
                    <span class="footer__email__inner reveal">
                        {{ useSettingsData.acf.email }}
                    </span>
                    <span class="footer__link__icon">
                        <svg class="svg__mail" width="13" height="13" viewBox="0 0 13 13" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path class="svg__mail__path"
                                d="M1.18213 1.05518H12.0721M12.0721 1.05518V11.9452M12.0721 1.05518L1.18213 11.9452"
                                stroke="#F5F0E8" stroke-width="1" pathLength="1" />
                            <path class="svg__mail__filled"
                                d="M1.18213 1.05518H12.0721M12.0721 1.05518V11.9452M12.0721 1.05518L1.18213 11.9452"
                                stroke="#F5F0E8" stroke-width="1" pathLength="1" />
                        </svg>
                    </span>
                </a>
            </div>
            <div v-if="projetsPers.length" id="projetsPersWrapper">
                <h2 class="projets-pers__title">
                    <span class="reveal">Projets personnels</span>
                </h2>
                <ul class="projets-pers__list">
                    <li v-for="item in projetsPers" :key="item.slug">
                        <NuxtLink :to="'/projets-perso/' + item.slug" class="projets-pers__link button-link">
                            <span class="footer__email__inner reveal">{{ item.acf.title }}</span>
                            <span class="footer__link__icon">
                                <svg class="svg__mail" width="13" height="13" viewBox="0 0 13 13" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path class="svg__mail__path"
                                        d="M1.18213 1.05518H12.0721M12.0721 1.05518V11.9452M12.0721 1.05518L1.18213 11.9452"
                                        stroke="#F5F0E8" stroke-width="1" pathLength="1" />
                                    <path class="svg__mail__filled"
                                        d="M1.18213 1.05518H12.0721M12.0721 1.05518V11.9452M12.0721 1.05518L1.18213 11.9452"
                                        stroke="#F5F0E8" stroke-width="1" pathLength="1" />
                                </svg>
                            </span>
                        </NuxtLink>
                    </li>
                </ul>
            </div>
        </div>
        <div id="pageSlider">
            <div class="placeholder__item__slider" ref="sliderItemPlaceholder">
                <NuxtImg v-if="sliderImage"
                    class="placeholder__item"
                    :src="sliderImage.url"
                    :alt="sliderImage.alt"
                    width="180" />
            </div>
        </div>
    </main>
    <LayoutFooter>
        <ul class="footer__thumb__inner">
            <li v-for="item in projetsPers" :key="item.slug">
                <NuxtImg class="footer__thumb__img" :src="item.acf.primary.url" :alt="item.acf.primary.alt" />
            </li>
        </ul>
    </LayoutFooter>
</template>

<script setup>
const route = useRoute();
const useGL = useState('gl');
const useSettingsData = useState('settings');
const useProjetsPersData = useState('projets-perso');
const projetsPers = ref(useProjetsPersData.value ?? []);
const sliderItemPlaceholder = ref(null);
const firstPerso = projetsPers.value[0]?.acf?.primary ?? null;
const sliderImage = useSettingsData.value.acf?.contact_slider_image ?? firstPerso;

onBeforeRouteLeave((to, from, next) => {
    lockUI();
    updateGLSizes(useGL, sliderItemPlaceholder);
    onBeforeLeaveIndex(to, from, next, useGL);
})

onMounted(async () => {
    await nextTick();
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

<style lang="scss">
#contactWrapper {
    @extend %fixed-center;
    z-index: 99;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    text-align: center;
}

#contactInfo {
    overflow: hidden;
    font-weight: 350;
    font-size: $font-size-link;

    .footer__link__icon {
        svg {
            margin-left: 4px;
            width: calc($font-size-link / 1.5);
            height: calc($font-size-link / 1.5);
            transform: translateY(1px);
        }
    }
}

#projetsPersWrapper {
    .projets-pers__title {
        font-size: calc(clamp(2.3125rem, 1.3541666666666665rem + 5.476190476190477vw, 3.75rem) * 0.45);
        font-weight: 420;
        line-height: calc(clamp(2.3125rem, 1.3541666666666665rem + 5.476190476190477vw, 3.75rem) * 0.46);
        margin-bottom: 1rem;
        overflow: hidden;
    }

    .projets-pers__list {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;

        li {
            overflow: hidden;
        }

        .projets-pers__link {
            font-size: $font-size-link;
            font-weight: 350;
            display: flex;
            align-items: center;
            justify-content: center;

            .footer__link__icon {
                svg {
                    margin-left: 4px;
                    width: calc($font-size-link / 1.5);
                    height: calc($font-size-link / 1.5);
                    transform: translateY(1px);
                }
            }
        }
    }
}
</style>

<template>
    <section id="indexMenu" ref="indexMenuRef">
        <span class="close__menu reveal-text-menu" id="closeMenu" :class="{ 'button-link': !isTouchDevice }"
            @click="handleCloseMenu">Fermer</span>
        <span class="mentions__menu reveal-text-menu" id="mentionsMenu" :class="{ 'button-link': !isTouchDevice }"
            @click="handleMentionsMenu">Mentions</span>
        <div class="title__menu__wrapper">
            <LayoutPageTitle menuTitle="Index" subtitleMenu="Projets" />
        </div>
        <div id="indexContentWrapper">
            <nav class="index__content__col">
                <NuxtLink v-for="(item, index) in useProjectsData.slice().reverse()" :key="index"
                    :to="'/photos/' + item.slug" class="index__card" id="item" @click="handleItem">
                    <div class="index__card__img__wrapper">
                        <NuxtImg class="index__card__img" :src="item.acf.primary.url" :alt="item.acf.primary.alt"
                            width="200" />
                    </div>
                    <div class="index__card__info__wrapper">
                        <div>
                            <p class="index__card__number reveal-text-menu">{{ item.acf.project_number }}</p>
                        </div>
                        <div>
                            <p class="index__card__title reveal-text-menu">{{ item.acf.title }}</p>
                            <p class="index__card__subtitle reveal-text-menu">{{ item.acf.category }}</p>
                        </div>
                    </div>
                </NuxtLink>
            </nav>
        </div>
    </section>
</template>

<script setup>
import gsap from 'gsap';
import Lenis from '@studio-freight/lenis';
const indexMenuRef = ref(null);
const useGL = useState('gl');
const useProjectsData = useState('projects');
const isTouchDevice = ref(false);
const route = useRoute();
let clicked = false;

function initLenisMenu() {
    return new Promise((resolve) => {
        useGL.value.lenisMenu = new Lenis({
            wrapper: indexMenuRef.value,
            content: indexMenuRef.value,
            autoResize: true,
        });
        useGL.value.lenisMenu.scrollTo(0, { immediate: true });
        const raf = (time) => {
            useGL.value.lenisMenu.raf(time);
            requestAnimationFrame(raf);
        };
        raf(useGL.value.time.elapsed);
        resolve();
    });
}

function handleCloseMenu(event) {
    closeMenu(useGL, route, false);
}

function handleItem(event) {
    if (clicked) return;
    clicked = true;
    menuCloseState(useGL, route);
    gsap.set('#pageContent', { autoAlpha: 0 });
    gsap.set('.cross__wrapper', { autoAlpha: 1, y: '-130%' });
    if (useGL.value.ASlider) {
        setSliderUp(useGL);
    }
    closeMenu(useGL, route, true);
    setTimeout(() => { clicked = false; }, 300);
}

const router = useRouter();
function handleMentionsMenu(event) {
    closeMenu(useGL, route, false);
    router.push('/mentions');
}

onMounted(async () => {
    await nextTick();
    isTouchDevice.value = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    initLenisMenu().then(() => {
        gsap.set('#indexMenu', { autoAlpha: 0 });
    });
});
</script>

<style lang="scss" scoped>
br {
    overflow: hidden;
}

.index__content__separator {
    height: 1px;
    background-color: #525252;

    @media (min-width: 901px) {
        width: 240%;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    @media (max-width: 900px) {
        width: 100%;
        margin-top: 10px;
        margin-bottom: 10px;
    }
}

#indexMenu {
    position: fixed;
    overflow-y: scroll;
    overflow-x: hidden;
    z-index: 100;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: $darker;
}

.index__card {
    display: flex;
    transition: opacity 0.35s ease-in-out;

    &:hover {
        opacity: 0.5;
        transition: opacity 0.35s ease-in-out;
    }

    .index__card__img__wrapper {
        overflow: hidden;
        width: clamp(9.375rem, 3.125rem + 7.8125vw, 12.5rem);
        aspect-ratio: 1.7 / 1;
        margin-right: calc($space-s);

        .index__card__img {
            transform: translateY(110%);
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .index__card__info__wrapper {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        font-weight: 300;

        @media (max-width: 800px) {
            width: calc(clamp(9.375rem, 3.125rem + 7.8125vw, 12.5rem) * 0.80);
            .index__card__title {
                font-size: calc($font-size-link * 0.9) !important;
            }
        }

        width: calc(clamp(9.375rem, 3.125rem + 7.8125vw, 12.5rem) * 0.95);

        .index__card__title {
            font-size: calc($font-size-link * 1);
            font-weight: 350;
            margin-bottom: calc($space-s / 2);
        }

        .index__card__number {
            color: #AAA9A9;
            font-size: calc($font-size-link * 0.8);
        }

        .index__card__subtitle {
            color: #AAA9A9;
            font-size: calc($font-size-link * 0.8);
        }
    }
}

#indexContentWrapper {
    display: flex;

    @media (min-width: 1280px) {
        justify-content: center;
    }

    @media (max-width: 1279px) {
        padding-left: $space-s;
    }

    .index__content__col {
        @media (max-width: 800px) {
            padding-top: 80px;
            padding-bottom: 80px;
        }

        @media (min-width: 801px) {
            padding-top: 90px;
            padding-bottom: 90px;
        }

        @media (min-width: 1280px) {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-gap: calc($space-s * 8);
            grid-row-gap: calc($space-s * 2);
        }

        @media (max-width: 1279px) {
            padding-top: 20vh;
            padding-bottom: 20vh;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-gap: calc($space-s * 8);
            grid-row-gap: calc($space-s * 2);
        }

        @media (max-width: 900px) {
            padding-top: 20vh;
            padding-bottom: 20vh;
            display: flex;
            flex-direction: column;
            gap: calc($space-s * 2);
        }
    }
}

.title__menu__wrapper {
    display: flex;
    flex-direction: column;
}

.title__menu__wrapper {
    display: flex;

    @media (max-width: 1279px) {
        position: relative;
        margin-top: 10vh;
    }

    @media (min-width: 1280px) {
        position: fixed;
    }

    left: $space-s;

    @media (max-width: 800px) {
        top: 70px
    }

    @media (min-width: 801px) {
        top: 80px
    }
}

.close__menu {
    cursor: pointer;
    position: fixed;
    top: $space-s;
    right: $space-s;
    font-size: $font-size-link;
}

.mentions__menu {
    cursor: pointer;
    position: fixed;
    bottom: $space-s;
    right: $space-s;
    font-size: $font-size-link;
}
</style>

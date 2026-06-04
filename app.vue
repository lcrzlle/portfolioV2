<template>
    <div id="loading-screen" ref="loadingScreen" class="page__title__wrapper"
        style="position: fixed; left: 0; top:0; height: 100vh; width: 100vw; z-index: 1000; background-color:  rgb(31, 31, 31);"
        v-if="loading">
        <div class="page__title__wrapper" style="visibility: hidden; position: fixed; left: 20px; top:70px; font-weight: 200;">
            <span class="page__title__primary loading__count reveal-loading"
                style="visibility: hidden; padding-right: 20px;">0%</span>
            <span class="page__title__secondary reveal-loading"
                style="visibility: hidden; padding-right: 20px; text-transform: uppercase;">Chargement</span>
        </div>
    </div>
    <div id="container" ref="appContainer">
        <LayoutHeader :social_1="useSettingsData.acf.instagram_link" :social_2="useSettingsData.acf.linkedin_link"
            :social_3="useSettingsData.acf.youtube_link" />
        <UtilsCrossPage />
        <NuxtPage />
        <nav class="nav__project__wrapper">
            <ul>
                <li>
                    <UtilsCategoryLink link="/photos" text="Photos" spanClass="reveal-nav-project category-link" />
                </li>
                <li>
                    <UtilsCategoryLink link="/videos" text="Vidéos" spanClass="reveal-nav-project category-link" />
                </li>
                <li>
                    <UtilsCategoryLink link="/contact" text="Contact" spanClass="reveal-nav-project category-link" />
                </li>
            </ul>
        </nav>
        <LayoutIndexMenu />
        <div id="overlay" ref="appOverlay"></div>
        <div id="menuOverlay" ref="menuOverlay"></div>
        <section id="gl">
            <canvas ref="canvas"></canvas>
        </section>
    </div>
</template>

<script setup>
import gsap from 'gsap';
import projectsData from '~/content/projects.json';
import projetsPersData from '~/content/projets-perso.json';
import settingsData from '~/content/settings.json';
import homeData from '~/content/home.json';
import aboutData from '~/content/about.json';
import creditsData from '~/content/credits.json';
import mentionsData from '~/content/mentions.json';

const route = useRoute();
const useSettingsData = useState('settings');
const useHomeData = useState('home');
const useAboutData = useState('about');
const useCreditsData = useState('credits');
const useProjectsData = useState('projects');
const useProjetsPersData = useState('projets-perso');
const useMentionsData = useState('mentions');
const useGL = useState('gl');
const canvas = ref(null);
const appContainer = ref(null);
const appOverlay = ref(null);
const menuOverlay = ref(null);
const loading = ref(true);
const progress = ref(0);
const loadingScreen = ref(null);

callOnce(() => {
    useProjectsData.value = projectsData;
    useProjetsPersData.value = projetsPersData;
    useSettingsData.value = settingsData;
    useHomeData.value = homeData;
    useAboutData.value = aboutData;
    useCreditsData.value = creditsData;
    useMentionsData.value = mentionsData;
})

function firstUIReveal() {
    splitReveal('.reveal-header', false);
    gsap.to('.link-line', {
        x: 0,
        ease: 'expo.inOut',
        duration: 1.2,
        delay: 1,
        stagger: 0.1,
        onComplete: () => {
            handleButtonState(route);
        },
    })
    if (route.name == 'index' || route.name == 'about' || route.name == 'credits' || route.name == 'mentions' || route.name == 'contact') {
        resetNavHeader();
        gsap.fromTo(".svg__mail", {
            y: 100
        },
            {
                y: 0,
                duration: 1.5,
                delay: 0.1,
                ease: 'expo.inOut',
            });
    }
}

onMounted(async () => {
    try {
        useGL.value = new GL(canvas.value,
            appContainer.value,
            appOverlay.value,
            menuOverlay.value);
    }
    catch (error) { console.error(error); }
    await nextTick();
    splitReveal('.reveal-loading', false);
    setTimeout(() => {
        initLoadingScreen(document.querySelector('.loading__count'), 0, 100, 2500, () => {
            try { splitReveal('.reveal-loading', true); } catch(e) {}
            try { firstUIReveal(); } catch(e) { console.error('firstUIReveal:', e); }
            if (loadingScreen.value) {
                gsap.to(loadingScreen.value, {
                    opacity: 0,
                    duration: 0.5,
                    delay: 0.3,
                    ease: 'expo.inOut',
                    onComplete: () => { loading.value = false; }
                });
            } else {
                loading.value = false;
            }
        });
    }, 700);
});
</script>

<style lang="scss">
#pageContent {
    display: flex;
    align-items: center;
}

#overlay {
    position: fixed;
    z-index: -1;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.65);
    opacity: 0;
}

#menuOverlay {
    pointer-events: none;
    position: fixed;
    z-index: 99;
    width: 100%;
    height: 100%;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.70);
    opacity: 0;
}
</style>
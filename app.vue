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
import sanity from '~/composables/sanityClient.js';

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

// Transforme une image Sanity en { url, alt }
function img(sanityImg) {
    if (!sanityImg) return { url: '', alt: '' };
    return { url: sanityImg.asset?.url ?? '', alt: sanityImg.alt ?? '' };
}

// Transforme un slide Sanity en { image: { url, alt }, format }
function slide(s) {
    return { image: img(s.image), format: s.format ?? 'horizontal' };
}

// Transforme un projet Sanity au format attendu par les composants
function normalizeProject(p) {
    return {
        slug: p.slug?.current ?? p.slug ?? '',
        acf: {
            title: p.title ?? '',
            localisation: p.localisation ?? '',
            project_number: p.project_number ?? '',
            category: p.category ?? '',
            title_preview: p.title_preview ?? { line_1: p.title ?? '', line_2: '' },
            primary: img(p.primary),
            slides: (p.slides ?? []).map(slide),
            video_url: p.video_url ?? null,
        },
    };
}

await callOnce(async () => {
    const [
        rawProjects,
        rawProjetsPers,
        rawSettings,
        rawHome,
        rawAbout,
        rawCredits,
        rawMentions,
    ] = await Promise.all([
        sanity.fetch(`*[_type == "project"] | order(order asc) {
            title, slug, localisation, project_number, category,
            title_preview { line_1, line_2 },
            "primary": primary { "asset": asset->{ url }, alt },
            "slides": slides[] { "image": image { "asset": asset->{ url }, alt }, format },
            video_url
        }`),
        sanity.fetch(`*[_type == "projetPerso"] | order(order asc) {
            title, slug, localisation, project_number, category,
            title_preview { line_1, line_2 },
            "primary": primary { "asset": asset->{ url }, alt },
            "slides": slides[] { "image": image { "asset": asset->{ url }, alt }, format }
        }`).catch(() => []),
        sanity.fetch(`*[_type == "settings"][0] {
            email, instagram_link, linkedin_link, youtube_link,
            "contact_slider_image": contact_slider_image { "asset": asset->{ url }, alt }
        }`).catch(() => ({})),
        sanity.fetch(`*[_type == "homePage"][0] {
            page_title, page_subtitle_1, page_subtitle_2, page_subtitle_3, page_paragraph,
            "home_slider": home_slider[] { "image": image { "asset": asset->{ url }, alt } }
        }`).catch(() => ({})),
        sanity.fetch(`*[_type == "aboutPage"][0] {
            page_title, page_subtitle_1, page_subtitle_2, page_subtitle_3,
            page_headline { line_1, line_2, line_3 },
            page_paragraph_1, page_paragraph_2,
            "about_slider": about_slider[] { "image": image { "asset": asset->{ url }, alt } }
        }`).catch(() => ({})),
        sanity.fetch(`*[_type == "creditsPage"][0] {
            page_title, page_subtitle_1, page_subtitle_2, page_subtitle_3,
            page_credit_1 { title, text, url },
            page_credit_2 { title, text, url },
            page_credit_3 { title, text_1, url_1, text_2, url_2 },
            "credits_slider": credits_slider[] { "image": image { "asset": asset->{ url }, alt } }
        }`).catch(() => ({})),
        sanity.fetch(`*[_type == "mentionsPage"][0] {
            page_title, page_subtitle_1, page_subtitle_2, page_subtitle_3,
            page_mention_1 { title, text_line_1, text_line_2, text_line_3, text_line_4, text_line_5 },
            page_mention_2 { title, text_line_1, text_line_2, text_line_3, text_line_4, text_line_5 },
            "mentions_slider": mentions_slider[] { "image": image { "asset": asset->{ url }, alt } }
        }`).catch(() => ({})),
    ]);

    useProjectsData.value = (rawProjects ?? []).map(normalizeProject);
    useProjetsPersData.value = (rawProjetsPers ?? []).map(normalizeProject);

    // Normalise settings → format attendu par les composants
    useSettingsData.value = {
        acf: {
            email: rawSettings?.email ?? '',
            instagram_link: rawSettings?.instagram_link ?? '#',
            linkedin_link: rawSettings?.linkedin_link ?? '#',
            youtube_link: rawSettings?.youtube_link ?? '#',
            contact_slider_image: img(rawSettings?.contact_slider_image),
        },
    };

    // Normalise home → format attendu
    useHomeData.value = {
        acf: {
            page_title: rawHome?.page_title ?? '',
            page_subtitle_1: rawHome?.page_subtitle_1 ?? '',
            page_subtitle_2: rawHome?.page_subtitle_2 ?? '',
            page_subtitle_3: rawHome?.page_subtitle_3 ?? '',
            page_paragraph: rawHome?.page_paragraph ?? '',
            home_slider: (rawHome?.home_slider ?? []).map(s => ({ image: img(s.image) })),
        },
    };

    // Normalise about
    useAboutData.value = {
        acf: {
            page_title: rawAbout?.page_title ?? '',
            page_subtitle_1: rawAbout?.page_subtitle_1 ?? '',
            page_subtitle_2: rawAbout?.page_subtitle_2 ?? '',
            page_subtitle_3: rawAbout?.page_subtitle_3 ?? '',
            page_headline: rawAbout?.page_headline ?? { line_1: '', line_2: '', line_3: '' },
            page_paragraph_1: rawAbout?.page_paragraph_1 ?? '',
            page_paragraph_2: rawAbout?.page_paragraph_2 ?? '',
            about_slider: (rawAbout?.about_slider ?? []).map(s => ({ image: img(s.image) })),
        },
    };

    // Normalise credits
    useCreditsData.value = {
        acf: {
            page_title: rawCredits?.page_title ?? '',
            page_subtitle_1: rawCredits?.page_subtitle_1 ?? '',
            page_subtitle_2: rawCredits?.page_subtitle_2 ?? '',
            page_subtitle_3: rawCredits?.page_subtitle_3 ?? '',
            page_credit_1: rawCredits?.page_credit_1 ?? { title: '', text: '', url: '#' },
            page_credit_2: rawCredits?.page_credit_2 ?? { title: '', text: '', url: '#' },
            page_credit_3: rawCredits?.page_credit_3 ?? { title: '', text_1: '', url_1: '#', text_2: '', url_2: '#' },
            credits_slider: { credits_slider_1: { image: img(rawCredits?.credits_slider?.[0]?.image) } },
        },
    };

    // Normalise mentions
    useMentionsData.value = {
        acf: {
            page_title: rawMentions?.page_title ?? '',
            page_subtitle_1: rawMentions?.page_subtitle_1 ?? '',
            page_subtitle_2: rawMentions?.page_subtitle_2 ?? '',
            page_subtitle_3: rawMentions?.page_subtitle_3 ?? '',
            page_mention_1: rawMentions?.page_mention_1 ?? { title: '', text_line_1: '' },
            page_mention_2: rawMentions?.page_mention_2 ?? { title: '', text_line_1: '' },
            mentions_slider: { mentions_slider_1: { image: img(rawMentions?.mentions_slider?.[0]?.image) } },
        },
    };
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
            splitReveal('.reveal-loading', true);
            firstUIReveal();
            gsap.to(loadingScreen.value, {
                opacity: 0,
                duration: 0.5,
                delay: 0.3,
                ease: 'expo.inOut',
                onComplete: () => {
                    loading.value = false;
                }
            });
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
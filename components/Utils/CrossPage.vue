<template>
    <span @click="handleCategory" id="pageCross">
        <span id="pageCrossSelect"></span>
        <div class="cross__wrapper">
            <span class="cross__content__v"></span>
            <span class="cross__content__h"></span>
        </div>
    </span>
</template>

<script setup>
const route = useRoute();
const router = useRouter();
const useGL = useState('gl');
import gsap from 'gsap';

function handleCategory() {
    if (route.name !== 'index') {
        return;
    }
    const links = document.querySelectorAll('.cross__handler__item');
    // le fond défile désormais en aléatoire (index décorrélé des liens) : la croix
    // renvoie simplement vers Photos par défaut. La nav réelle se fait via les liens.
    const target = links[0] || null;
    if (!target) return;
    useGL.value.currentCategory = target.textContent.toLowerCase();
    gsap.to('.cross__handler__title', {
        y: '100',
        duration: 1.3,
        ease: 'ease.out',
    });
	const navLinks = document.querySelectorAll('.nav-link');
	navLinks.forEach((link) => {
		link.querySelector('.button-link').classList.remove('is-active');
	});
	navLinks[1].querySelector('.button-link').classList.add('is-active');
    router.push(useGL.value.currentCategory);
}
</script>

<style lang="scss" scoped>
#pageCross {
    z-index: 99;
    position: fixed;
    display: flex;
    justify-content: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: clamp(2.5rem, 2.1798780487804876rem + 1.8292682926829267vw, 4.375rem);
    width: calc(clamp(2.5rem, 2.1798780487804876rem + 1.8292682926829267vw, 4.375rem) * 2);
    overflow: hidden;

    span {
        position: absolute;
        height: clamp(2.5rem, 2.1798780487804876rem + 1.8292682926829267vw, 4.375rem);
        width: 1px;
        background-color: $light;
    }

    .cross__wrapper {
        height: 100%;
        transform: translate(50%, 110%);
    }

    #pageCrossSelect {
        position: absolute;
        background: none;
        width: 2px;
        height: 2px;
        top: 50%;
        left: 50%;
    }

    .cross__content__h {
        transform: rotate(90deg);
    }
}
</style>
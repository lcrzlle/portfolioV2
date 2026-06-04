<template>
    <div>
        <NuxtLink :to="link" style="position: relative;" class="nav-link">
            <span @click="isActiveHeader" :class="spanClass" style="visibility: hidden;">{{ text }}
            </span>
            <span class="link-line"></span>
        </NuxtLink>
    </div>
</template>

<script setup>
import gsap from 'gsap';
const route = useRoute();

defineProps({
    link: String,
    text: String,
    spanClass: String,
})

function isActiveHeader(event) {
    const links = document.querySelectorAll('.button-link');
    links.forEach((link) => {
        link.classList.remove('is-active');
    });
    event.target.closest('.button-link').classList.add('is-active');
}

onMounted(() => {
    // gsap.to('.link-line', {
    //     x: 0,
    //     ease: 'expo.inOut',
    //     duration: 1.2,
    //     delay: 1,
    //     stagger: 0.1,
    // })
    // handleButtonState(route);
})
</script>

<style lang="scss">
.button-link {
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;

    &.is-active {
        color: black;
        background-color: rgb(255, 255, 255);
    }
}

.button-link::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 0;
    width: calc(100%);
    background-color: rgb(255, 255, 255);
    transition: height 0.3s ease;
}

.button-link:hover {
    svg {
        filter: invert(100%);
        transition: all 0.3s ease;
    }

    color: black;
    transition: all 0.3s ease;
}

.button-link:hover::before {
    height: 100%;
}

.link-line {
    content: "";
    position: absolute;
    bottom: 1px;
    left: 0;
    width: 100%;
    height: 1px;
    background: currentColor;
    transform: translateX(-120%);
}
</style>
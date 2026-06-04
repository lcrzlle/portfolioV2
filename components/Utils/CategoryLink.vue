<template>
    <div>
        <NuxtLink :to="link" style="position: relative;" @click="isActiveProject" class="project-link">
            <span :class="spanClass">{{ text }}
            </span>
            <span class="project-link-line"></span>
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

function removeActiveProject() {
    const links = document.querySelectorAll('.category-link');
    links.forEach((link) => {
        link.classList.remove('is-active');
        link.style.backgroundColor = 'rgba(255, 255, 255, 0)';
        link.style.color = 'white';
    });
}

function isActiveProject(event) {
    let targetLink = event.target.closest('a');
    let buttonTarget = targetLink.querySelector('.category-link');
    removeActiveProject();
    buttonTarget.classList.add('is-active');
    let activeLink = document.querySelector('.category-link.is-active');
    activeLink.style.backgroundColor = 'rgba(255, 255, 255, 1)';
    activeLink.style.color = 'black';
}
</script>

<style lang="scss">
.category-link {
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;

    &.is-active {
        color: black;
        background-color: rgba(255, 255, 255, 0);
    }
}

.category-link::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 0;
    width: calc(100%);
    background-color: rgb(255, 255, 255);
    transition: height 0.3s ease;
}

.category-link:hover {
    color: black !important;
    transition: all 0.3s ease;
}

.category-link:hover::before {
    height: 100%;
}

.project-link-line {
    content: "";
    position: absolute;
    bottom: 1px;
    left: 0;
    width: 0%;
    height: 1px;
    background: currentColor;
}
</style>
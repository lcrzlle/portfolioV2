<template>
    <main id="errorContent">
        <div id="pageTitle">
            <LayoutPageTitle pageTitle="Error 404" subtitleOne="Page" subtitleTwo="Introuvable" />
        </div>
        <div class="error-button">
            <UtilsButtonLink @click="leaveError" text="Accueil" spanClass="reveal button-link " />
        </div>
    </main>
</template>

<script setup>
const router = useRouter();
import gsap from 'gsap';

function leaveError() {
    splitReveal('.reveal', true);
    gsap.to('#errorContent', {
        opacity: 0,
        duration: 1,
        ease: 'power2.inOut'
    })
    gsap.to('.error-button', {
        height: '-10px',
        duration: 0.3,
        ease: 'power2.inOut'
    })
    setTimeout(() => {
        router.push('/');
    }, 1000);
}

onMounted(() => {
    splitReveal('.reveal', false);
})
</script>

<style lang="scss" scoped>
#errorContent {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-transform: uppercase;
    background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/error.webp');
    background-position: center;
    background-size: cover;
}

.error-button {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow: hidden;
}
</style>
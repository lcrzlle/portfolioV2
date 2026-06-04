<template>
    <div class="page__title__wrapper">
        <h1 v-if="homeTitle" class="page__title__primary reveal">
            {{ homeTitle }}
        </h1>
        <h1 v-else-if="pageTitle" class="page__title__primary__alt reveal">
            {{ pageTitle }}
        </h1>
        <div v-else-if="menuTitle" class="page__title__primary reveal-menu" style="margin-left:-0.3%;">
            {{ menuTitle }}
        </div>
        <h2 v-if="subtitleOne" class="page__title__secondary">
            <span class="reveal" v-if="subtitleOne"> {{ subtitleOne }}</span>
            <span class="reveal" v-if="subtitleTwo"> {{ subtitleTwo }}</span>
            <span class="reveal" v-if="subtitleThree"> {{ subtitleThree }}</span>
            <span class="reveal-menu" v-if="subtitleMenu"> {{ subtitleMenu }}</span>
        </h2>
        <span v-if="subtitleMenu" class="page__title__secondary">
            <span class="reveal-menu" v-if="subtitleMenu"> {{ subtitleMenu }}</span>
            <span class="reveal-menu" v-if="subtitleMenuTwo"> {{ subtitleMenuTwo }}</span>
        </span>
    </div>
</template>

<script setup>

defineProps({
    homeTitle: "",
    pageTitle: "",
    menuTitle: "",
    subtitleOne: "",
    subtitleTwo: "",
    subtitleThree: "",
    subtitleMenu: "",
    subtitleMenuTwo: ""
})
</script>

<style lang="scss" >

.page__title__secondary {
    overflow: hidden;
}

.page__title__wrapper {
    overflow: hidden;
    .page__title__primary,
    .page__title__primary__alt {
        font-weight: 400;
    }

    .page__title__primary,
    .page__title__primary__alt::first-letter {
        margin-left: -1%;
    }

    h2, span {
        font-weight: 350;
        display: flex;
        justify-content: space-between;
        font-size: $font-size-link;
    }

    @media (max-width: 900px) {
        .page__title__primary,
        .page__title__primary__alt {
            letter-spacing: -0.1rem;
            line-height: clamp(2.3125rem, 1.3541666666666665rem + 5.476190476190477vw, 3.75rem);
            font-size: calc( clamp(2.3125rem, 1.3541666666666665rem + 5.476190476190477vw, 3.75rem));
        }
    }

    @media (min-width: 901px) {
        .page__title__primary,
        .page__title__primary__alt {
            letter-spacing: -0.2rem;
            line-height: clamp(3.75rem, 2.6717596390484rem + 2.4610336341263332vw, 5.625rem);
            font-size: calc(clamp(3.75rem, 2.6717596390484rem + 2.4610336341263332vw, 5.625rem) * 0.85);
        }
    }

    @media (min-width: 1280px) {
        .page__title__primary,
        .page__title__primary__alt {
            letter-spacing: -0.2rem;
            line-height: clamp(3.75rem, 2.6717596390484rem + 2.4610336341263332vw, 5.625rem);
            font-size: calc(clamp(3.75rem, 2.6717596390484rem + 2.4610336341263332vw, 5.625rem)* 0.85);
        }
    }

    @media (min-width: 1920px) {
        .page__title__primary,
        .page__title__primary__alt {
            letter-spacing: -0.2rem;
            line-height: clamp(5.625rem, -0.5818965517241379rem + 5.172413793103448vw, 7.5rem);
            font-weight: 400;
            font-size: clamp(5.625rem, -0.5818965517241379rem + 5.172413793103448vw, 7.5rem);
        }
    }
}
</style>
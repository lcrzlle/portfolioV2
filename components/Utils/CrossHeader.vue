<template>
    <span @click="handleOpenMenu" id="crossHeader">
        <div class="cross__wrapper__header">
            <span class="cross__content__v"></span>
            <span class="cross__content__h"></span>
        </div>
    </span>
</template>

<script setup>
const useGL = useState('gl');

function handleOpenMenu(event) {
    lockAllElements('.index__card', true);
    openMenu(useGL);
    setTimeout(() => {
        lockAllElements('.index__card', false);
    }, 1200);
}
</script>

<style lang="scss" scoped>
#crossHeader:hover {
    .cross__content__h {
        transform: rotate(450deg);
        transition: all 0.5s ease-in-out;
    }

    .cross__content__v {
        transform: rotate(180deg);
        transition: all 0.5s ease-in-out;
    }
}


#crossHeader {
    cursor: pointer;
    display: flex;
    justify-self: left;
    padding-left: $space-s;
    overflow: hidden;
    visibility: hidden;

    span {
        position: absolute;
        width: 1px;
        background-color: $light;
    }

    .cross__wrapper__header {
        transform: translateY(110%);
    }

    .cross__content__h {
        transform: rotate(90deg);
    }

    @media (max-width: 1024px) {
        height: 22px;
        width: 22px;

        span {
            height: 22px;
        }
    }

    @media (min-width: 1025px) {
        height: 28px;
        width: 28px;

        span {
            height: 28px;
        }
    }
}
</style>
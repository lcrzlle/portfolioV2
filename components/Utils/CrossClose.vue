<template>
    <span id="pageCrossCloseWrapper">
        <span id="pageCrossClose">
            <span id="pageCrossSelectClose"></span>
            <div class="cross__wrapper__close">
                <span class="cross__content__v"></span>
                <span class="cross__content__h"></span>
            </div>
        </span>
        <!-- <span class="cross__wrapper__button">
            <slot />
        </span> -->
        <span class="cross__wrapper__line">
        </span>
    </span>
</template>

<style lang="scss" scoped>

.cross__wrapper__line {
    height: 10vh;
    width: 1px;
    background-color: white;
    transform: translateY(130%);
}

.cross__wrapper__button {
    margin-bottom: 5rem;
    margin-top: 1rem;
    font-size: $font-size-link;
    font-weight: 350;
    cursor: pointer;
}

#pageCrossCloseWrapper {
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    // @media (min-height: 666px) {
    //     bottom: -10%;
    // }
}
#pageCrossClose {
    cursor: pointer;
    margin-bottom: 5rem;
    @media (max-height: 680px) {
        margin-bottom: 1rem;
    }
    z-index: 99;
    transform: rotate(45deg);
    bottom: 20%;
    height: clamp(2.5rem, 2.1798780487804876rem + 1.8292682926829267vw, 4.375rem);
    width: clamp(2.5rem, 2.1798780487804876rem + 1.8292682926829267vw, 4.375rem);
    overflow: hidden;

    span {
        position: absolute;
        height: clamp(2.5rem, 2.1798780487804876rem + 1.8292682926829267vw, 4.375rem);
        width: 1px;
        background-color: $light;
    }

    .cross__wrapper__close {
        height: 100%;
        transform: translate(130%, 130%)
    }

    #pageCrossSelectClose {
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
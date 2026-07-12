<template>
    <footer id="pageFooter">
        <div id="wrapperFooter">
            <div class="footer__thumb__wrapper">
                <slot></slot>
            </div>
            <nav v-if="route.name == 'index' || route.name == 'about' || route.name == 'credits' || route.name == 'mentions'"
                class="footer__nav__wrapper">
                <div id="socialFooter" v-if="route.name == 'about' || route.name == 'credits' || route.name == 'mentions'">
                    <ul>
                        <li>
                            <a :href="useSettingsData.acf.instagram_link" class="footer__email__link button-link">
                                <span class="footer__email__inner reveal">
                                    Instagram
                                </span>
                            </a>
                        </li>
                        <li>
                            <a :href="useSettingsData.acf.linkedin_link" class="footer__email__link button-link">
                                <span class="footer__email__inner reveal">
                                    LinkedIn
                                </span>
                            </a>
                        </li>
                        <li>
                            <a :href="useSettingsData.acf.youtube_link" class="footer__email__link button-link">
                                <span class="footer__email__inner reveal">
                                    Youtube
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
                <a :href="settingsMail" class="footer__email__link button-link">
                    <span class="footer__email__inner reveal">
                        Email
                    </span>
                    <span class="footer__link__icon ">
                        <svg class="svg__mail" width="13" height="13" viewBox="0 0 13 13" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path class="svg__mail__path"
                                d="M1.18213 1.05518H12.0721M12.0721 1.05518V11.9452M12.0721 1.05518L1.18213 11.9452"
                                stroke="#F5F0E8" stroke-width="1" pathLength="1" />
                            <path class="svg__mail__filled"
                                d="M1.18213 1.05518H12.0721M12.0721 1.05518V11.9452M12.0721 1.05518L1.18213 11.9452"
                                stroke="#F5F0E8" stroke-width="1" pathLength="1" />
                        </svg>
                    </span>
                </a>
            </nav>
        </div>
    </footer>
</template>

<script setup>
import gsap from 'gsap'
const route = useRoute();
const useGL = useState('gl');
const useSettingsData = useState('settings');
const settingsMail = ref("mailto:" + useSettingsData.value.acf.mail);

onMounted(async () => {
    await nextTick();
    if (!useGL.value.firstLoadApp) {
        if (route.name == 'index' || route.name == 'about' || route.name == 'credits' || route.name == 'mentions') {
            gsap.fromTo(".svg__mail", {
                y: 100
            },
                {
                    y: 0,
                    duration: 1.5,
                    delay: 0.2,
                    ease: 'expo.inOut'
                });
        }
    }
    if (useGL.value.firstLoadApp) {
        if (route.name == 'index' || route.name == 'about' || route.name == 'credits' || route.name == 'mentions') {
            gsap.set(".svg__mail", {
                y: 100
            });
        }
    }
})
</script>

<style lang="scss">
.footer__email__link {
    overflow: hidden;
    font-weight: 350;
}

.footer__link__icon {
    overflow: hidden;
}

.footer__nav__wrapper {
    overflow: hidden;
}

#pageFooter {
    position: fixed;
    z-index: 99;
    bottom: $space-s;
    width: 100%;
    font-weight: 350;
    font-size: $font-size-link;

    svg {
        margin-left: 4px;
        width: calc($font-size-link / 1.5);
        height: calc($font-size-link / 1.5);
        transform: translateY(1px);
    }

    ul {
        display: flex;
        padding-left: calc($space-s);
        padding-right: calc($space-s);
    }

    .footer__thumb__img {
        position: relative;
        aspect-ratio: 1.7 / 1;
        object-fit: cover;
        cursor: pointer;
        transform: translateY(110%);
        padding: calc(($space-s / 2));
        outline: 1px solid rgb(178, 178, 178);
        outline-offset: -1px;
        transition: outline-color 0.4s ease-in-out;

        &.is__selected {
            outline: 1px solid rgb(178, 178, 178);
            outline-offset: -1px;
            opacity: 1;
            transition: outline-color 0.4s ease-in-out;
        }

        &:not(.is__selected) {
            outline-color: rgba(0, 0, 0, 0);
            transition: outline-color 0.4s ease-in-out;
        }
    }

    .home__thumb__src {
        position: absolute;
        width: 1px;
        height: 1px;
        opacity: 0;
        pointer-events: none;
    }

    .footer__thumb__img.footer__thumb__dot {
        width: auto;
        aspect-ratio: auto;
        outline: none;
        padding: 6px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        transform: translateY(110%);

        &::before {
            content: "";
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background-color: rgba(245, 240, 232, 0.4);
            transition: background-color 0.4s ease-in-out;
        }

        &.is__selected::before {
            background-color: rgb(245, 240, 232);
        }
    }

    li {
        position: relative;
        display: inline-block;
    }

    @media (max-width : 359px) {

        #pageFooterSelector {
            top: -27%;
            left: calc(($space-s / 2) - 1px);
            width: calc(clamp(3.125rem, 2.9115853658536586rem + 1.2195121951219512vw, 4.375rem) + $space-s);
        }

        .footer__nav__wrapper {
            display: none;
        }

        .footer__thumb__inner {
            display: flex;
            justify-content: space-between;
        }

        .footer__thumb__img {
            width: clamp(3.125rem, -0.8125rem + 22.5vw, 4.25rem);
        }

    }

    @media (min-width: 360px) {

        #pageFooterSelector {
            top: -27%;
            left: calc(($space-s / 2) - 1.5px);
            width: calc(clamp(3.125rem, 2.9115853658536586rem + 1.2195121951219512vw, 4.375rem) + $space-s);
        }

        .footer__thumb__img {
            width: clamp(3.125rem, 2.9115853658536586rem + 1.2195121951219512vw, 4.375rem);
        }
    }


    .footer__nav__wrapper {
        padding-right: $space-s;
        padding-bottom: calc($space-s / 2);
        text-align: right;
    }

    #wrapperFooter {
        z-index: 99;
        @extend %flex-between;
        overflow-x: scroll !important;
        overflow-y: hidden !important;
        touch-action: pan-x !important;
        align-items: end;
    }
}
</style>
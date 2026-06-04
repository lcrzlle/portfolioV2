<template>
    <header id="pageHeader">
        <UtilsCrossHeader />
        <div id="wrapperHeader">
            <div id="socialHeader">
                <ul>
                    <li>
                        <a :href="social_1" target="blank" class="reveal-header" style="visibility: hidden;">Instagram</a>
                    </li>
                    <li>
                        <a :href="social_2" target="blank" class="reveal-header" style="visibility: hidden;">LinkedIn</a>
                    </li>
                    <li>
                        <a :href="social_3" target="blank" class="reveal-header" style="visibility: hidden;">Youtube</a>
                    </li>
                </ul>
            </div>
            <nav id="navHeader">
                <ul>
                    <li>
                        <UtilsButtonLink link="/" text="Accueil" spanClass="reveal-header button-link" />
                    </li>
                    <li>
                        <UtilsButtonLink text="Projets" @click="handleProjectNav"
                            spanClass="reveal-header button-link" />
                    </li>
                    <li>
                        <UtilsButtonLink link="/about" text="À Propos" spanClass="reveal-header button-link" />
                    </li>
                </ul>
            </nav>
        </div>
    </header>
</template>

<script setup>
const router = useRouter();
const route = useRoute();
const useGL = useState('gl');

defineProps({
    social_1: String,
    social_2: String,
    social_3: String,
})

function handleProjectNav() {
    router.push('/' + useGL.value.currentCategory);
}
</script>

<style lang="scss">
#pageHeader {
    @extend %flex-between;
    min-width: 260px;
    z-index: 98;
    position: fixed;
    top: $space-s;
    left: $space-s;
    width: calc(100vw - calc($space-s * 2));

    ul {
        font-weight: 350;
        font-size: $font-size-link;
        display: flex;

        li {
            overflow: hidden;
        }
    }

    #wrapperHeader {
        @extend %flex-between;
        width: 25%;
    }

    #socialHeader {
        ul {
            text-align: left;
            color: $aluminium;
        }
    }

    @media (max-width: 800px) {
        ul {
            letter-spacing: -0.01rem;
            gap: clamp(1rem, 8.065vw - 1.258rem, 7rem);
        }

        #socialHeader {
            display: none;
        }

        #wrapperHeader {
            width: auto;
        }
    }

    @media (min-width: 801px) {
        align-items: start;

        ul {
            padding-top: 0.1rem;
            letter-spacing: -0.02rem;
            text-align: right;
            flex-direction: column;
            gap: 0.2rem;

            li {
                overflow: hidden;
            }
        }
    }
}
</style>
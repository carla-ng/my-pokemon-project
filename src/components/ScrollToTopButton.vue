<template>
    <div v-show="showScrollToTop" class="scroll-to-top" @click="scrollToTop">
        <img :src="arrowSVG" alt="Scroll to top arrow" />
    </div>
</template>


<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';

export default {
    setup() {
        const showScrollToTop = ref(false)


        // show the scroll-to-top button when the user has scrolled down a bit
        const handleScroll = () => {
            showScrollToTop.value = window.scrollY > 300
        }


        // scroll to the top of the page
        const scrollToTop = () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        };


        // add scroll event listener when the component is mounted
        onMounted(() => {
            window.addEventListener('scroll', handleScroll)
        });


        // remove scroll event listener before the component is unmounted
        onBeforeUnmount(() => {
            window.removeEventListener('scroll', handleScroll)
        });


        return {
            showScrollToTop,
            scrollToTop,

            arrowSVG: require('@/assets/svg/back-arrow.svg')
        }
    }
}
</script>


<style lang="scss" scoped>
@import '@/assets/styles/global.scss';

.scroll-to-top {
    background-color: $palette-color-05;
    border-radius: 50%;
    bottom: 20px;
    color: #fff;
    cursor: pointer;
    opacity: 0.9;
    padding: 18px;
    position: fixed;
    right: 20px;

    img {
        height: 30px;
        transform: rotateZ(90deg);
        width: 30px;
    }
}
</style>

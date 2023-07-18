<template>
    <div class="loader">
        <span class="loader__element" :style="{ borderColor: color }"></span>
        <span class="loader__element" :style="{ borderColor: color }"></span>
        <span class="loader__element" :style="{ borderColor: color }"></span>
    </div>
</template>


<script>
export default {
    name: 'Loader',
    props: {
        color: {
            type: String,
            default: '#6366f1', // Default color if not provided by the parent component
        },
    },
    setup() {
        return {};
    },
};
</script>


<style lang="scss" scoped>
.loader {
    align-content: center;
    align-items: center;
    display: flex;
    justify-content: center;
    overflow: hidden;
    z-index: 100000;

    .loader__element {
        border-radius: 100%;
        border: 3px solid; // Remove the hard-coded color value
        margin: 10px;

        &:nth-child(1) { animation: preloader 0.6s ease-in-out alternate infinite; }
        &:nth-child(2) { animation: preloader 0.6s ease-in-out alternate 0.2s infinite; }
        &:nth-child(3) { animation: preloader 0.6s ease-in-out alternate 0.4s infinite; }
    }
}

@keyframes preloader {
    100% { transform: scale(2); }
}
</style>

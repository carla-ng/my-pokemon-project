<template>
    <div id="home" class="max-w-3xl ml-auto mr-auto">
        <h1 class="poketitle">My Pokémon Project</h1>
        <p class="poketext mt-8 ml-auto mr-auto max-w-sm">Here you can find some categories to choose from to learn more about the world of Pokémon!</p>

        <ul class="categories mt-9 ml-auto mr-auto max-w-md">
            <li class="categories__element brand-color-01-background">
                <span class="categories__element__text">Pokédex</span>
                <img class="categories__element__svg" :src="pokeballSVG" alt="Pokeball" />
            </li>
        </ul>
    </div>
</template>


<script>
// @ is an alias to /src

export default {
    name: 'Home',
    components: {

    },
    data(){
        return {
            pokeballSVG: require('@/assets/svg/pokeball.svg')
        }
  }
}
</script>


<style lang="scss">
$breakpoint-max-mobile: 767px;
$breakpoint-min-desktop: 768px;

#home {
    padding: 12px;

    .categories {
        .categories__element {
            border-radius: 16px;
            cursor: pointer;
            overflow: hidden;
            padding: 16px 6px;
            position: relative;

            .categories__element__text {
                font-size: 1.25rem;
                font-weight: 500;
                line-height: 1.75rem;
            }

            .categories__element__svg {
                height: auto;
                left: -286px;
                margin: 0;
                max-width: none;
                padding: 0;
                position: absolute;
                top: -310px;
                width: 735px;
                
                @media (max-width: $breakpoint-max-mobile) {
                    left: -286px;
                    top: -292px;
                    width: 700px;
                }
            }
        }
    }
}
</style>

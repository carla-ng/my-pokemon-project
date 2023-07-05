<template>
    <div id="home" class="p-3 max-w-3xl ml-auto mr-auto">
        <h1 class="poketitle">My Pokémon Project</h1>
        <p class="poketext mt-8 ml-auto mr-auto max-w-sm">Here you can find some categories to choose from to learn more about the world of Pokémon!</p>

        <ul class="categories mt-9 ml-auto mr-auto max-w-md">
            <li class="categories__element overflow-hidden relative rounded-2xl cursor-pointer my-5 px-1.5 py-4" @click="$router.push({name: 'PokemonList'})">
                <span class="categories__element-text text-white text-xl">Pokédex</span>
                <img class="categories__element-svg absolute m-0 h-auto max-w-none" :src="pokeballSVG" alt="Pokeball" />
            </li>

            <li class="categories__element overflow-hidden relative rounded-2xl cursor-pointer my-5 px-1.5 py-4" @click="$router.push({name: 'ItemsList'})">
                <span class="categories__element-text text-white text-xl">Items</span>
                <img class="categories__element-svg absolute m-0 h-auto max-w-none" :src="pokeballSVG" alt="Pokeball" />
            </li>

            <li class="categories__element coming_soon overflow-hidden relative rounded-2xl my-5 px-1.5 py-4">
                <span class="categories__element-text text-white text-xl">Locations</span>
                <img class="categories__element-svg absolute m-0 h-auto max-w-none" :src="pokeballSVG" alt="Pokeball" />
            </li>

            <li class="categories__element coming_soon overflow-hidden relative rounded-2xl my-5 px-1.5 py-4">
                <span class="categories__element-text text-white text-xl">Generations</span>
                <img class="categories__element-svg absolute m-0 h-auto max-w-none" :src="pokeballSVG" alt="Pokeball" />
            </li>
        </ul>
    </div>
</template>


<script>
// @ is an alias to /src

export default {
    name: 'Home',
    components: {},
    setup() {
        return {
            pokeballSVG: require('@/assets/svg/pokeball.svg')
        }
  }
}
</script>


<style lang="scss" scoped>
$breakpoint-max-mobile: 767px;
$breakpoint-min-desktop: 768px;

#home {
    .categories {
        .categories__element {
            &.coming_soon { opacity: 0.4; }

            .categories__element-svg {
                width: 735px;
                @media (max-width: $breakpoint-max-mobile) { width: 700px; }
            }

            &:nth-child(odd) {
                background-color: #42b983;
                
                .categories__element-svg {
                    left: -285px;
                    top: -310px;
                    @media (max-width: $breakpoint-max-mobile) { top: -290px; }
                }
            }

            &:nth-child(even) {
                background-color: #979797;
                
                .categories__element-svg {
                    right: -320px;
                    top: -300px;
                    transform: rotate(40deg);
                    @media (max-width: $breakpoint-max-mobile) { top: -280px; }
                }
            }
        }
    }
}
</style>

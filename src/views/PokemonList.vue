<template>
    <div class="font-bold my-8 mx-5 text-xl">
        Pokédex
    </div>

    <div id="pokemon-list" class="max-w-4xl ml-auto mr-auto my-8 mx-5 flex flex-wrap justify-center">

        <PokemonListElement
            v-for="pokemon in allPokemon"
            :key="pokemon.id"
            :pokemon="pokemon"
        ></PokemonListElement>

        <!-- show a loading spinner while data is being fetched -->
        <div v-if="loading" class="my-8 mx-5 text-lg">
            Loading...
        </div>
    </div>
</template>


<script>
import PokemonListElement from './PokemonListElement.vue';

import { onBeforeUnmount, onMounted, reactive, toRefs } from 'vue'

export default {
    name: 'PokemonList',
    components: {
        PokemonListElement
    },
    setup() {
        const state = reactive({
            allPokemon: [],
            offset: 0,
            loading: false
        })


        const loadPokemon = async () => {
            state.loading = true

            fetch(`https://pokeapi.co/api/v2/pokemon?limit=40&offset=${state.offset}`)
                .then( response => response.json() )
                .then(data => {
                    const promises = data.results.map(pokemon => {
                        return fetch(pokemon.url)
                        .then(response => response.json())
                        .then(data => {
                            state.allPokemon.push(data);
                        })
                    })

                    Promise.all(promises).then(() => {
                        state.allPokemon.sort((a, b) => a.id - b.id);
                        state.offset += 40;
                        state.loading = false;
                    })
            })
        }


        const onScroll = () => {
            // detect when the user has scrolled to the bottom of the page
            const scrollPosition = window.innerHeight + window.pageYOffset;
            const pageHeight = document.documentElement.scrollHeight;
            const isAtBottom = scrollPosition >= pageHeight;

            // if the user has scrolled to the bottom of the page, load more data
            if ( isAtBottom && !state.loading ) {
                loadPokemon();
            }
        }


        onMounted(() => {
            // add an event listener to detect when the user scrolls the page
            window.addEventListener('scroll', onScroll);
        });


        onBeforeUnmount(() => {
            // remove the event listener when the component is destroyed
            window.removeEventListener('scroll', onScroll);
        });



        // Initial fetch for first pokemon
        loadPokemon()

        

        return {
            ...toRefs(state),

            loadPokemon
        }
    }
}
</script>


<style lang="scss" scoped>
    
</style>
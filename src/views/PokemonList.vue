<template>
    
    <div id="pokedex-view" class="fade-in-element">
        
        <h1 class="font-bold my-8 mx-5 text-3xl">
            Pokédex
        </h1>

        <SearchBar :pokemonData="allPokemon" @search-result="setSearchResults" @empty-result="setEmptyResults"></SearchBar>

        <div v-if="emptySearch" class="p-7">No results found, please enter a correct pokémon name or ID.</div>

        <div v-if="searchResults && !emptySearch" id="pokemon-list-search" class="pokemon-list-container max-w-7xl ml-auto mr-auto my-8 mx-5 flex flex-wrap justify-center">
            
            <PokemonListElement
                v-for="pokemon in searchResults"
                :key="pokemon.id"
                :pokemon="pokemon">
            </PokemonListElement>
        </div>

        <div v-else-if="!searchResults && !emptySearch" id="pokemon-list-default" class="pokemon-list-container max-w-7xl ml-auto mr-auto my-8 mx-5 flex flex-wrap justify-center">

            <PokemonListElement
                v-for="pokemon in allPokemon"
                :key="pokemon.id"
                :pokemon="pokemon"
            ></PokemonListElement>
        </div>

         <!-- show a loader while data is being fetched -->
         <div v-if="loading" class="block my-8 mx-5 text-lg w-full">
            <Loader></Loader>
        </div>

        <ScrollToTopButton></ScrollToTopButton>

    </div>

</template>


<script>
import Loader from '@/components/Loader.vue';
import PokemonListElement from '@/components/PokemonListElement.vue';
import ScrollToTopButton from '@/components/ScrollToTopButton.vue';
import SearchBar from '@/components/SearchBar.vue';

import { onBeforeUnmount, onMounted, reactive, ref, toRefs } from 'vue';

export default {
    name: 'PokemonList',
    components: {
        Loader,
        PokemonListElement,
        ScrollToTopButton,
        SearchBar
    },
    setup() {
        const state = reactive({
            allPokemon: [],
            offset: 0,
            loading: false,
            searchResults: null,
        })
        

        // pokemon search with SearchBar
        const emptySearch = ref(false)
        const setSearchResults = ( results ) => {
            state.searchResults = results
            emptySearch.value = false
        }
        const setEmptyResults = () => {
            emptySearch.value = true
        }


        const loadPokemon = async () => {
            state.loading = true

            fetch(`https://pokeapi.co/api/v2/pokemon?limit=40&offset=${state.offset}`)
                .then( response => response.json() )
                .then(data => {
                    const promises = data.results.map(pokemon => {
                        return fetch(pokemon.url)
                        .then(response => response.json())
                        .then(data => {
                            state.allPokemon.push(data)
                        })
                    })

                    Promise.all(promises).then(() => {
                        state.allPokemon.sort((a, b) => a.id - b.id)
                        state.offset += 40
                        state.loading = false
                        emptySearch.value = false
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
                loadPokemon()
            }
        }


        onMounted(() => {
            // add an event listener to detect when the user scrolls the page
            window.addEventListener('scroll', onScroll)
        });


        onBeforeUnmount(() => {
            // remove the event listener when the component is destroyed
            window.removeEventListener('scroll', onScroll)
        });



        // initial fetch for first pokemon
        loadPokemon()

        

        return {
            ...toRefs(state),

            emptySearch,
            loadPokemon,
            setEmptyResults,
            setSearchResults,
        }
    }
}
</script>


<style lang="scss" scoped>
.pokemon-list-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
    grid-gap: 5px;

    @media (min-width: 576px) { grid-template-columns: repeat(auto-fill, minmax(30%, 1fr)); }
    @media (min-width: 992px) { grid-template-columns: repeat(auto-fill, minmax(15%, 1fr)); }
}
</style>
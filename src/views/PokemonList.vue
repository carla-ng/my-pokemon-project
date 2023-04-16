<template>
    <div class="font-bold my-8 mx-5 ml-auto">
        Pokemon List
    </div>

    <div id="pokemon-list" class="max-w-3xl ml-auto mr-auto my-8 mx-5 flex flex-wrap">

        <div v-for="pokemon in allPokemon" :key="pokemon.id" class="pokemon-list-element">

            <img class="pokemon-list-element-image" :src="pokemon.sprites.front_default" alt="{{ pokemon.name }} image"/>

            <div class="pokemon-list-element-name text-lg"> {{ pokemon.name }}</div>

            <div class="pokemon-list-element-number"> {{ pokemon.id.toString().padStart(3, '0') }} </div>

            <div v-for="type in pokemon.types" :key="type.type.name" class="pokemon-list-element-types">
                {{ type.type.name }}
            </div>

        </div>

        <!-- show a loading spinner while data is being fetched -->
        <div v-if="loading" class="my-8 mx-5">
            Loading...
        </div>
    </div>
</template>


<script>
// @ is an alias to /src
import { onBeforeUnmount, onMounted, reactive, toRefs } from 'vue'

export default {
    name: 'PokemonList',
    components: {

    },
    setup() {
        const state = reactive({
            allPokemon: [],
            offset: 0,
            loading: false
        })


        const loadPokemon = async () => {
            state.loading = true

            fetch(`https://pokeapi.co/api/v2/pokemon?limit=40&orderBy=id&offset=${state.offset}`)
                .then( response => response.json() )
                .then(data => {
                    data.results.forEach(pokemon => {
                        fetch(pokemon.url)
                            .then(response => response.json())
                            .then(data => {
                                console.log(data); // The data for each Pokemon

                                state.allPokemon.push(data);
                                console.log(state.allPokemon)

                                
                        })
                    })

                    state.offset += 40;
                    state.loading = false
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
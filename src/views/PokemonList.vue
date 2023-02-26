<template>
    <div id="pokemon-list" class="max-w-3xl ml-auto mr-auto">
        Pokemon List

        <div v-for="(pokemon, index) in allPokemon" :key="index">
            {{ pokemon.name }}
        </div>
    </div>
</template>


<script>
// @ is an alias to /src
import { ref, onMounted } from 'vue'

export default {
    name: 'PokemonList',
    components: {

    },
    setup() {
        let allPokemon = ref([])

        onMounted(() => {
            // Getting all the original 151 pokemon
            fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`)
                .then( response => response.json() )
                .then(data => {
                    allPokemon = data.results
                    console.log(allPokemon)
            })
        })

        

        return {
            allPokemon
        }
  }
}
</script>


<style lang="scss" scoped>

</style>
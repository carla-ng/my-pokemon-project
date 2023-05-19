<template>
    <div>
        <h1>Pokemon Profile</h1>

        <div v-if="loading">Loading...</div>
        <div v-else>
            <h2>{{ pokemon.name }}</h2>
            <img v-if="pokemon.sprites" :src="pokemon.sprites.front_default" :alt="pokemon.name" />
            <!-- display other details of the Pokemon -->
        </div>

    </div>
  </template>
  

  <script>
  import { ref, onMounted, watch } from 'vue';
  import { useRoute } from 'vue-router';
  
  export default {
    name: 'PokemonProfile',
    setup() {
        const route = useRoute()
        const pokemon = ref({
            name: '',
            sprites: null,
            // add more properties for other details
        })
        const loading = ref(false)
  

        // fetch individual pokemon info from pokeapi
        async function fetchPokemon(id) {
            loading.value = true
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
                if ( !response.ok ) {
                    throw new Error('Failed to fetch data from the PokeAPI');
                }

                const data = await response.json()
                pokemon.value.name = data.name
                pokemon.value.sprites = data.sprites
                // assign other properties with the desired details
            } catch (error) {
                console.error(error)
            } finally {
                loading.value = false
            }
        }
  

        // watch for changes in route params
        watch(
            () => route.params.id,
            ( newId ) => {
                fetchPokemon(newId)
            }
        );
  

        // fetch pokemon data on component mount
        onMounted(() => {
            fetchPokemon(route.params.id);
        });

        
        return {
            pokemon,
            loading
        };
    },
  };
  </script>
  

  <style lang="scss" scoped>

  </style>
  
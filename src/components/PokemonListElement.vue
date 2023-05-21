<template>

    <router-link :to="`/pokemon/${pokemon.id}`" v-if="pokemon.sprites.other['official-artwork'].front_default" class="pokemon-list-element p-1.5 m-1.5 rounded-2xl cursor-pointer" :class="pokemon.types.map(type => type.type.name).join(' ')">

        <img class="pokemon-list-element-image mx-auto block" :src="pokemon.sprites.other['official-artwork'].front_default" :alt="'Image of ' + pokemon.name"/>

        <div class="pokemon-list-element-name text-lg capitalize font-semibold text-white truncate">{{ pokemon.name.replace('-', ' ') }}</div>

        <div class="pokemon-list-element-number text-white">{{ formattedId  }}</div>

        <div class="pokemon-list-element-types-container flex flex-row flex-wrap justify-center mt-1">
            <div v-for="type in pokemon.types" :key="type.type.name" class="pokemon-element-types text-white px-1.5 py-0.5 rounded-lg text-sm mx-1">
                {{ type.type.name }}
            </div>
        </div>

    </router-link>

  </template>
  
  
  <script>
  import { computed } from 'vue';

  export default {
    name: 'PokemonListElement',
    props: {
        pokemon: {
            type: Object,
            required: true
        }
    },
    setup( props ) {

        // add zeroes to pokemon id if it is less than 100
        const formattedId = computed(() => {
            const pokemonId = props.pokemon.id
            if ( pokemonId < 100 ) {
                return pokemonId.toString().padStart(3, '0')
            } else {
                return pokemonId.toString()
            }
        })

        return {
            formattedId
        }
    }
  };
  </script>
  
  <style lang="scss" scoped>
  .pokemon-list-element {
    width: 45%;
    @media (min-width: 576px) { width: 30%; }
    @media (min-width: 992px) { width: 15%; }

    background-color: #b9b7b7;
    .pokemon-element-types { background-color: darken(#b9b7b7, 8%); }
}
</style>
  
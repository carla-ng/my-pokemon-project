<template>

    <router-link :to="`/pokemon/${pokemon.id}`" v-if="typeof pokemon === 'object' && pokemon.sprites.other['official-artwork'].front_default" class="pokemon-list-element fade-in-element-fast p-1.5 m-1.5 rounded-2xl cursor-pointer" :class="pokemon.types.map(type => type.type.name).join(' ')">

        <img class="pokemon-list-element__image mx-auto block" :src="pokemon.sprites.other['official-artwork'].front_default" :alt="'Image of ' + pokemon.name"/>

        <div class="pokemon-list-element__name text-lg capitalize font-semibold text-white truncate">{{ pokemon.name.replace('-', ' ') }}</div>

        <div class="pokemon-list-element__number text-white">{{ formattedId }}</div>

        <div class="pokemon-list-element__types-container flex flex-row flex-wrap justify-center mt-1">
            <div v-for="type in pokemon.types" :key="type.type.name" class="pokemon-list-element__types text-white px-1.5 py-0.5 rounded-lg text-sm mx-1">
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
            //console.log('props.pokemon')
            //console.log(props.pokemon)

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
    background-color: #b9b7b7;
    &:hover { opacity: 0.8; }
    .pokemon-list-element__types { background-color: darken(#b9b7b7, 8%); }
}
</style>
  
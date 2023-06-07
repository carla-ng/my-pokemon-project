<template>

    <div id="searchbar">
        <input type="text" v-model="searchTerm" placeholder="Enter a Pokémon name or ID" />
        <button @click="search">Search</button>
    </div>

</template>

<script>
import { ref } from 'vue';

export default {
    name: 'SearchBar',
    props: {
        pokemonData: {
            type: Array,
            required: true,
        },
    },
    setup(props, { emit }) {
        const searchTerm = ref('');

        // search for pokemon by name or ID
        const search = async () => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm.value}`)
                if ( !response.ok ) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`)
                }
                const data = await response.json()

                // emit the search result to the parent component
                emit('search-result', [data])

            } catch ( error ) {
                console.log('Error:', error)
            }
        }

        return {
            searchTerm,
            search,
        }
    },
};
</script>


<style lang="scss" scoped>
    #searchbar {
        input {
            border: 1px solid;
            width: 70%;
            @media (min-width: 992px) { width: 40%; }
        }
        button {
            background: grey;
            color: #fff;
        }
    }
</style>

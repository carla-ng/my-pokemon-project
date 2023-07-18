<template>

    <div id="searchbar" class="flex justify-center">
        <input type="text" v-model="searchTerm" placeholder="Enter a Pokémon name or ID" class="h-10 p-3 rounded-l-xl border border-gray-400 focus:outline-none focus:border-8 focus:border-gray-800" />
        
        <button @click="search" :disabled="isSearchDisabled" class="h-10 px-3 rounded-r-xl text-white flex items-center bg-indigo-500 hover:bg-indigo-400">
            <img class="h-4 w-auto" :src="searchSVG" alt="Search" />
        </button>
    </div>

</template>


<script>
import { computed, ref } from 'vue';

export default {
    name: 'SearchBar',
    props: {
        pokemonData: {
            type: Array,
            required: true,
        },
    },
    setup(props, { emit }) {
        const searchTerm = ref('')

        // computed property to check if the search button should be disabled
        const isSearchDisabled = computed(() => {
            return searchTerm.value === ''
        })

        // search for pokemon by name or ID
        const search = async () => {
            try {
                const term = (searchTerm.value).toLowerCase()
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${term}`)
                if ( !response.ok ) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`)
                }
                const data = await response.json()

                // emit the search result to the parent component
                emit('search-result', [data])

            } catch ( error ) {
                console.log(error)

                // emit the empty search result to the parent component
                emit('empty-result')
            }
        }

        return {
            isSearchDisabled,
            searchTerm,
            search,

            searchSVG: require('@/assets/svg/magnifying-glass.svg')
        }
    },
}
</script>


<style lang="scss" scoped>
@import '@/assets/styles/global.scss';

#searchbar {
    input {
        width: 70%;
        @media (min-width: $breakpoint-min-desktop) { width: 40%; }
    }
}
</style>

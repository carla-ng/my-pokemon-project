<template>

    <div id="pokemon-detail-view" class="fade-in-element mx-3">

        <div @click="$router.push({name: 'PokemonList'})" class="max-w-4xl ml-auto mr-auto mb-8 text-left cursor-pointer">
            <img class="inline-block h-3 w-auto" :src="backArrowSVG" alt="Back arrow" />
            <span class="inline-block ml-2 text-white text-md">Go back</span>
        </div>

        <div v-if="loading" class="block my-8 mx-5 text-lg w-full">
            <Loader color="#fff"></Loader>
        </div>

        <div v-else class="max-w-4xl ml-auto mr-auto pb-10">

            <div id="pokemon-main-info">
                <div class="flex flex-row justify-between items-end">
                    <div id="pokemon-name-and-types">
                        <h2 class="text-3xl text-white text-left capitalize font-semibold mx-1 text-ellipsis" v-if="pokemon.name">{{ pokemon.name.replace('-', ' ') }}</h2>
                        <div class="text-left mt-2 mx-1">
                            <span v-for="type in pokemon.types" :key="type.type.name" class="pokemon__element-types text-white px-2 py-1 rounded-lg text-sm mx-1">
                                {{ type.type.name }}
                            </span>
                        </div>
                    </div>

                    <div id="pokemon-id" class="text-2xl text-white mx-1">
                        <span>#{{ pokemon.id }}</span>
                    </div>
                </div>
                
                <img v-if="pokemon.sprites" :src="pokemon.sprites.other['official-artwork'].front_default" :alt="pokemon.name" class="ml-auto mr-auto" />
            </div>
            
            <div id="pokemon-detailed-info" class="bg-white rounded-3xl px-8 pb-8 pt-16">
                <ul class="flex flex-row items-start justify-between pb-4">
                    <li @click="activeTab = 'about'" :class="{ 'active': activeTab === 'about' }">About</li>
                    <li @click="activeTab = 'base-stats'" :class="{ 'active': activeTab === 'base-stats' }">Base Stats</li>
                    <li @click="activeTab = 'evolution'" :class="{ 'active': activeTab === 'evolution' }">Evolution</li>
                    <li @click="activeTab = 'moves'" :class="{ 'active': activeTab === 'moves' }">Moves</li>
                </ul>

                <!-- ABOUT -->
                <div id="about" v-if="activeTab === 'about'" class="fade-in-element-fast">
                    <table>
                        <tr v-if="pokemon.species">
                            <td>Species</td>
                            <td class="capitalize">{{ pokemon.species.name }}</td>
                        </tr>
                        <tr>
                            <td v-if="speciesInfo" class="flex">Info</td>
                            <td>{{ speciesInfo }}</td>
                        </tr>
                        <tr>
                            <td>Height</td>
                            <td>{{ pokemon.height }} cm</td>
                        </tr>
                        <tr>
                            <td>Weight</td>
                            <td>{{ pokemon.weight }} kg</td>
                        </tr>
                        <tr>
                            <td>Abilities</td>
                            <td>
                                <span v-for="(ability, index) in pokemon.abilities" :key="ability.ability.name" class="capitalize">
                                    <span v-if="index !== 0">,</span>
                                    {{ ability.ability.name.replace('-', ' ') }}
                                </span>
                            </td>
                        </tr>
                    </table>
                </div>

                <!-- BASE STATS -->
                <div id="base-stats" v-if="activeTab === 'base-stats'" class="fade-in-element-fast">
                    <table>
                        <tr>
                            <td>HP</td>
                            <td class="capitalize">{{ pokemon.stats[0].base_stat }}</td>
                        </tr>
                        <tr>
                            <td>Attack</td>
                            <td class="capitalize">{{ pokemon.stats[1].base_stat }}</td>
                        </tr>
                        <tr>
                            <td>Defense</td>
                            <td class="capitalize">{{ pokemon.stats[2].base_stat }}</td>
                        </tr>
                        <tr>
                            <td>Sp. Atk</td>
                            <td class="capitalize">{{ pokemon.stats[3].base_stat }}</td>
                        </tr>
                        <tr>
                            <td>Sp. Def</td>
                            <td class="capitalize">{{ pokemon.stats[4].base_stat }}</td>
                        </tr>
                        <tr>
                            <td>Speed</td>
                            <td class="capitalize">{{ pokemon.stats[5].base_stat }}</td>
                        </tr>
                    </table>
                </div>

                <!-- EVOLUTION -->
                <div id="evolution" v-if="activeTab === 'evolution'" class="fade-in-element-fast flex flex-column justify-center flex-wrap max-w-lg mx-auto my-0">
                    <div v-for="(evolution, index) in evolutionChain " :key="evolution.id" class="evolution__element mx-6 my-4">
                        <router-link :to="`/pokemon/${evolution.id}`" class="flex flex-nowrap items-center" :class="[pokemon.originalPokemonId == evolution.id ? 'evolution__element-current-pokemon' : '']">
                            <img :src="evolution.image" :alt="evolution.name" class="mx-4">

                            <div>
                                <table>
                                    <tr>
                                        <td>Name</td>
                                        <td class="capitalize">{{ evolution.name }}</td>
                                    </tr>

                                    <template v-if="evolution.evolutionDetails && evolution.evolutionDetails.trigger && evolution.evolutionDetails.trigger.name">
                                        <tr>
                                            <td>Trigger</td>
                                            <td class="capitalize">{{ evolution.evolutionDetails.trigger.name.replace('-', ' ') }}</td>
                                        </tr>

                                        <!-- TURN UPSIDE DOWN -->
                                        <template v-if="evolution.evolutionDetails.turn_upside_down">
                                            <tr>
                                                <td>Turn Upside Down</td>
                                                <td class="capitalize">{{ evolution.evolutionDetails.turn_upside_down }}</td>
                                            </tr>
                                        </template>

                                        <!-- LOCATION -->
                                        <template v-if="evolution.evolutionDetails.location && evolution.evolutionDetails.location.name">
                                            <tr>
                                                <td>Location</td>
                                                <td class="capitalize">{{ evolution.evolutionDetails.location.name.replace('-', ' ') }}</td>
                                            </tr>
                                        </template>

                                        <!-- LEVEL UP MIN LEVEL -->
                                        <template v-if="evolution.evolutionDetails.min_level">
                                            <tr>
                                                <td>Min. level</td>
                                                <td class="capitalize">{{ evolution.evolutionDetails.min_level }}</td>
                                            </tr>
                                        </template>

                                        <!-- LEVEL UP MIN HAPPINESS -->
                                        <template v-if="evolution.evolutionDetails.min_happiness">
                                            <tr>
                                                <td>Min. happiness</td>
                                                <td class="capitalize">{{ evolution.evolutionDetails.min_happiness }}</td>
                                            </tr>
                                        </template>

                                        <!-- LEVEL UP MIN BEAUTY -->
                                        <template v-if="evolution.evolutionDetails.min_beauty">
                                            <tr>
                                                <td>Min. beauty</td>
                                                <td class="capitalize">{{ evolution.evolutionDetails.min_beauty }}</td>
                                            </tr>
                                        </template>

                                        <!-- LEVEL UP MIN AFFECTION -->
                                        <template v-if="evolution.evolutionDetails.min_affection">
                                            <tr>
                                                <td>Min. affection</td>
                                                <td class="capitalize">{{ evolution.evolutionDetails.min_affection }}</td>
                                            </tr>
                                        </template>

                                        <!-- ITEM -->
                                        <template v-if="evolution.evolutionDetails.item">
                                            <tr>
                                                <td>Item</td>
                                                <td class="capitalize">{{ evolution.evolutionDetails.item.name.replace('-', ' ') }}</td>
                                            </tr>
                                        </template>

                                        <!-- LEVEL UP MIN AFFECTION -->
                                        <template v-if="evolution.evolutionDetails.relative_physical_stats">
                                            <tr>
                                                <td>Relative Physical Stats</td>
                                                <td class="capitalize">{{ evolution.evolutionDetails.relative_physical_stats }}</td>
                                            </tr>
                                        </template>

                                    </template>
                                </table>
                            </div>
                            
                        </router-link>
                    </div>
                </div>

                <!-- MOVES -->
                <div id="moves" v-if="activeTab === 'moves'" class="fade-in-element-fast">
                    <table>
                        <tr class="text-left">
                            <th>Move</th>
                            <th>Level</th>
                            <th>Effect</th>
                        </tr>
                        <tr v-for="(move, index) in pokemon.moves" :key="move.name" class="align-top">
                            <td class="capitalize">{{ move.move.name.replace('-', ' ') }}</td>
                            <td class="capitalize text-center">{{ move.version_group_details[0].level_learned_at }}</td>
                            <td>{{ move.move.info }}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>

    </div>
</template>
  

<script>
  import Loader from '@/components/Loader.vue';

  import { ref, onBeforeUnmount, onMounted, watch } from 'vue';
  import { useRoute } from 'vue-router';
  
  export default {
    name: 'PokemonProfile',
    components: {
        Loader
    },
    setup() {
        const route = useRoute()          // needed to get current pokemon id

        const loading = ref(false)       // loader while waiting to receive pokemon info
        const pokemon = ref({})          // where current pokemon info is stored

        const activeTab = ref('about')   // sets the initial active tab

        let pokemonTypes = ref()
        const evolutionChain  = ref([])  // current pokemon evolutions
        const speciesInfo = ref()        // pokemon species info

        let evolutionDataCache = null    // evolution info cache
        let movesFetched = false         // check if moves info has been already obtained
  

        // fetch individual pokemon info from pokeapi
        async function fetchPokemon( id ) {
            loading.value = true
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
                if ( !response.ok ) {
                    throw new Error('Failed to fetch data from the PokeAPI')
                }
                const data = await response.json()
                console.log(data)

                // adding types as classes to body tag to add type color
                const pokemonTypeNames = data.types.map(type => type.type.name)
                document.body.classList.add(...pokemonTypeNames)
                pokemonTypes = pokemonTypeNames

                data.originalPokemonId = data.id

                // add zeroes to pokemon id if it is less than 100
                if ( data.id < 100 ) {
                    data.id = data.id.toString().padStart(3, '0')
                } else {
                    data.id = data.id.toString()
                }

                // height - transform from decimeters to centimeters
                data.height = data.height * 10

                // weight - transform from hectograms to kilograms
                data.weight = data.weight / 10

                // sort moves in ascending order based on level_learned_at (and removed if level is zero)
                data.moves = data.moves.filter(move => move.version_group_details[0].level_learned_at !== 0)
                data.moves.sort((a, b) => {
                    const levelA = a.version_group_details[0].level_learned_at
                    const levelB = b.version_group_details[0].level_learned_at
                    return levelA - levelB
                })
                for ( const move of data.moves ) {
                    move.move.info = ''  // move info initialized
                }
        
                // pokemon object
                Object.assign(pokemon.value, data)
            } catch (error) {
                console.error(error)
            } finally {
                loading.value = false
            }
        }


        // fetch evolution chain
        const fetchEvolutionInfo = async ( pokemonId ) => {
            try {
                const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`)
                const speciesData = await speciesResponse.json()

                // find the flavor_text entry with "en" as the "language"
                const enFlavorTextEntry = speciesData.flavor_text_entries.find((entry) => entry.language.name === 'en');

                if ( enFlavorTextEntry ) {
                    const flavorText = String(enFlavorTextEntry.flavor_text);

                    // remove special characters that are returned from the API
                    const cleanedFlavorText = flavorText
                        .replace(/\f/g, '\n')
                        .replace(/\u00ad\n/g, '')
                        .replace(/\u00ad/g, '')
                        .replace(/ -\n/g, ' - ')
                        .replace(/-\n/g, '-')
                        .replace(/\n/g, ' ');

                    speciesInfo.value = cleanedFlavorText;
                }

                const evolutionChainUrl = speciesData.evolution_chain.url
                const evolutionChainResponse = await fetch(evolutionChainUrl)
                const evolutionChainData = await evolutionChainResponse.json()                

                const parsedEvolutionChain = parseEvolutionChain(evolutionChainData.chain)
                evolutionChain.value = parsedEvolutionChain

                return parsedEvolutionChain
            } catch ( error ) {
                console.error('Error fetching evolution info:', error)
            }
        }


        // get evolution chain relevant info to show later in DOM
        const parseEvolutionChain = ( chain ) => {
            const evolutionsData = []
            const { species, evolves_to } = chain

            evolutionsData.push({
                id: species.url.split('/').slice(-2, -1)[0],
                name: species.name,
                image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${species.url.split('/').slice(-2, -1)[0]}.png`,
                evolutionDetails: evolves_to[0]?.evolution_details[0] || null
            })

            if ( evolves_to.length ) {
                evolves_to.forEach((evolution) => {
                    const subEvolutions = parseEvolutionChain(evolution)
                    evolutionsData.push(...subEvolutions)
                })
            }

            return evolutionsData
        }
        

        // fetch pokemon moves info
        const fetchMovesInfo = async ( moveUrl ) => {
            let moveInfo = ''

            try {
                const response = await fetch(`${moveUrl}`)
                if ( !response.ok ) {
                    throw new Error('Failed to fetch move information from the PokéAPI')
                }

                const data = await response.json()
                if ( data.effect_entries.length ) {
                    moveInfo = data.effect_entries[0].short_effect
                    moveInfo = moveInfo.replace(/\$.*?%/g, '')
                } else {
                    return 'No move information available'
                }
                
            } catch (error) {
                console.error(error)
                return 'Error fetching move information'
            }

            return moveInfo
        }

        const fetchMovesInfoForMoves = async () => {
            try {
                const movesWithInfo = await Promise.all(
                    pokemon.value.moves.map(async (move) => {
                        const info = await fetchMovesInfo(move.move.url);
                        return {
                            ...move,
                            move: {
                                ...move.move,
                                info: info,
                            },
                        }
                    })
                )

                movesFetched = true
                pokemon.value.moves = movesWithInfo

            } catch ( error ) {
                console.error('Error fetching move info for moves:', error)
            }
        }

  

        // watch for changes in route params
        watch(
            () => route.params.id,
            ( newId, oldId ) => {
                if ( newId !== undefined && newId !== oldId ) {
                    fetchPokemon(newId)
                }
            }
        )

        // fetch additional data when tab changes
        watch( activeTab, async( newTab ) => {
            if ( newTab === 'evolution' ) {
                if ( !evolutionDataCache ) {
                    evolutionDataCache = await fetchEvolutionInfo(route.params.id)
                }
            } else if ( newTab === 'moves' ) {
                if ( !movesFetched ) {
                    fetchMovesInfoForMoves()
                }
            }
        })
  

        // fetch information on component mount
        onMounted(() => {
            // fetch pokemon data
            fetchPokemon(route.params.id)
        })


        // remove pokemon types classes from body tag before leaving view
        onBeforeUnmount(() => {
            document.body.classList.remove(...pokemonTypes)
        })


        return {
            activeTab,
            evolutionChain,
            loading,
            pokemon,
            pokemonTypes,
            speciesInfo,

            backArrowSVG: require('@/assets/svg/back-arrow.svg')
        }
    },
  };
</script>
  

<style lang="scss" scoped>
#pokemon-detail-view {

    #pokemon-main-info {
        img {
            max-width: 90%;
            @media (min-width: 576px) { width: 40%; }
            @media (min-width: $breakpoint-min-desktop) { max-width: 35%; }
        }
    }

    #pokemon-detailed-info {
        margin-top: -60px;

        ul {
            li {
                color: grey;
                cursor: pointer;
                letter-spacing: 1px;
                &.active {
                    color: #000;
                    font-weight: bold;

                    &::after {
                        content: "";
                        background-color: grey;
                        display: block;
                        height: 2px;
                        margin-top: 4px;
                    }

                }
            }
        }

        table {
            tr {
                th {
                    letter-spacing: 1px;
                    padding: 3px 12px;
                }
                
                td {
                    padding: 2px 12px;
                    text-align: left;

                    &.text-center { text-align: center !important; }

                    &:first-child { color: grey; }
                }
            }
        }

        #moves {
            table tr td { padding: 6px 12px; }
        }

        #evolution {
            .evolution__element {
                
                a {
                    flex-direction: column;
                    @media (min-width: $breakpoint-min-desktop) { flex-direction: row; }

                    img {
                        width: 75%;
                        @media (min-width: $breakpoint-min-desktop) { width: 20%; }
                    }
                }
                & > .evolution__element-current-pokemon {
                    cursor: auto;
                    opacity: 0.5;
                }
            }
        }
    }
}
</style>
  
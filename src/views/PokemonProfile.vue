<template>

    <div id="pokemon-detail-view" class="mx-3">

        <div @click="$router.push({name: 'PokemonList'})" class="max-w-4xl ml-auto mr-auto mb-5 text-white text-md text-left cursor-pointer">
            Go back
        </div>

        <div v-if="loading">Loading...</div>

        <div v-else class="max-w-4xl ml-auto mr-auto pb-10">

            <div id="pokemon-main-info">
                <div class="flex flex-row justify-between items-end">
                    <div id="pokemon-name-and-types">
                        <h2 class="text-3xl text-white text-left capitalize font-semibold mx-1 text-ellipsis" v-if="pokemon.name">{{ pokemon.name.replace('-', ' ') }}</h2>
                        <div class="text-left mt-2 mx-1">
                            <span v-for="type in pokemon.types" :key="type.type.name" class="pokemon-element-types text-white px-2 py-1 rounded-lg text-sm mx-1">
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
                <div id="about" v-if="activeTab === 'about'">
                    <table>
                        <tr v-if="pokemon.species">
                            <td>Species</td>
                            <td class="capitalize">{{ pokemon.species.name }}</td>
                        </tr>
                        <tr>
                            <td>Height</td>
                            <td>{{ pokemon.height }}cm</td>
                        </tr>
                        <tr>
                            <td>Weight</td>
                            <td>{{ pokemon.weight }}kg</td>
                        </tr>
                        <tr>
                            <td>Abilities</td>
                            <td>
                                <span v-for="(ability, index) in pokemon.abilities" :key="ability.ability.name" class="custom-capitalize capitalize">
                                    <span v-if="index !== 0">,</span>
                                    {{ ability.ability.name.replace('-', ' ') }}
                                </span>
                            </td>
                        </tr>
                    </table>
                </div>

                <!-- BASE STATS -->
                <div id="base-stats" v-if="activeTab === 'base-stats'">
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
                <div id="evolution" v-if="activeTab === 'evolution'" class="flex flex-column justify-center flex-wrap max-w-lg mx-auto my-0">
                    <div v-for="(evolution, index) in evolutions" :key="evolution.name" class="evolution-element mx-6 my-4">
                        <router-link :to="`/pokemon/${evolution.id}`" class="flex flex-row flex-nowrap items-center" :class="[pokemon.originalPokemonId == evolution.id ? 'current-pokemon' : '']">
                            <img :src="evolution.image" :alt="evolution.name" class="mx-4">
                            <div>
                                <table>
                                    <tr>
                                        <td>Name</td>
                                        <td class="capitalize">{{ evolution.name }}</td>
                                    </tr>

                                    <template v-for="(evolutionDetail, i) in evolutions[index-1].evolutionDetails"
                                              v-if="evolutions[index-1] && evolutions[index-1].evolutionDetails"
                                    >
                                        <tr>
                                            <td>Trigger #{{ i+1 }}</td>
                                            <td class="capitalize">{{ evolutionDetail.trigger.name.replace('-', ' ') }}</td>
                                        </tr>
                                        
                                        <!-- Level up -->
                                        <tr v-if="evolutionDetail.trigger.name== 'level-up'">
                                            <template v-if="evolutionDetail.min_level">
                                                <td>Min. level</td>
                                                <td class="capitalize">{{ evolutionDetail.min_level }}</td>
                                            </template>
                                            <template v-if="evolutionDetail.min_happiness">
                                                <td>Min. happiness</td>
                                                <td class="capitalize">{{ evolutionDetail.min_happiness }}</td>
                                            </template>
                                        </tr>

                                        <!-- Use item -->
                                        <tr v-if="evolutionDetail.trigger.name== 'use-item'">
                                            <template v-if="evolutionDetail.item.name">
                                                <td>Item</td>
                                                <td class="capitalize">{{ evolutionDetail.item.name.replace('-', ' ') }}</td>
                                            </template>
                                        </tr>
                                    </template>
                                </table>
                            </div>
                        </router-link>
                    </div>
                </div>

                <!-- MOVES -->
                <div id="moves" v-if="activeTab === 'moves'">
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
  import { ref, onBeforeUnmount, onMounted, watch } from 'vue';
  import { useRoute } from 'vue-router';
  
  export default {
    name: 'PokemonProfile',
    setup() {
        const route = useRoute()          // needed to get current pokemon id

        const loading = ref(false)       // loader while waiting to receive pokemon info
        const pokemon = ref({})          // where current pokemon info is stored

        const activeTab = ref('about')  // sets the initial active tab

        let pokemonTypes = ref()
        const evolutions = ref([])      // current pokemon evolutions
  

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
                    move.move.info = await fetchMovesInfo(move.move.url)
                }
        
                // pokemon object
                Object.assign(pokemon.value, data)
            } catch (error) {
                console.error(error)
            } finally {
                loading.value = false
            }
        }


        // fetch pokemon evolutions
        const fetchEvolutions = async ( id ) => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
                if ( !response.ok ) {
                    throw new Error('Failed to fetch evolutions data from the PokéAPI')
                }

                const data = await response.json()
                const evolutionChainResponse = await fetch(data.evolution_chain.url)
                if ( !evolutionChainResponse.ok ) {
                    throw new Error('Failed to fetch evolution chain data from the PokéAPI')
                }

                const evolutionChainData = await evolutionChainResponse.json()
                const evolutionsData = await parseEvolutionChain(evolutionChainData.chain)
                evolutions.value = evolutionsData

                // console.log('evolutions.value')
                // console.log(evolutions.value)
            } catch (error) {
                console.error(error)
            }
        }


        // parse the evolution chain data recursively to extract the evolution names
        const parseEvolutionChain = async ( chain ) => {
            const evolutionsData = []
            const { species, evolves_to } = chain

            const id = species.url.split('/').slice(-2, -1)[0]
            const name = species.name

            console.log('chain')
            console.log(chain)


            let evolutionDetails = ''
            if ( chain.evolves_to.length > 0 && chain.evolves_to[0].evolution_details.length > 0 ) {
                evolutionDetails = chain.evolves_to[0].evolution_details
            }

            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
                if ( !response.ok ) {
                    throw new Error('Failed to fetch evolution image from the PokéAPI')
                }
                const data = await response.json()
                const image = data.sprites.other['official-artwork'].front_default

                evolutionsData.push({
                    id,
                    name,
                    image,
                    evolutionDetails
                })

                if ( evolves_to.length ) {
                    for ( const evolution of evolves_to ) {
                        const subEvolutions = await parseEvolutionChain(evolution)
                        evolutionsData.push(...subEvolutions)
                    }
                }
            } catch ( error ) {
                console.error(error)
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
                }
                
            } catch (error) {
                console.error(error)
            }

            return moveInfo
        }
  

        // watch for changes in route params
        watch(
            () => route.params.id,
            ( newId ) => {
                fetchPokemon(newId)
            }
        );
  

        // fetch information on component mount
        onMounted(() => {
            fetchPokemon(route.params.id);      // fetch pokemon data
            fetchEvolutions(route.params.id);   // fetch pokemon evolutions
        })


        // remove pokemon types classes from body tag before leaving view
        onBeforeUnmount(() => {
            document.body.classList.remove(...pokemonTypes)
        })


        return {
            activeTab,
            evolutions,
            loading,
            pokemon,
            pokemonTypes,
        };
    },
  };
  </script>
  

  <style lang="scss" scoped>
    #pokemon-detail-view {
        #pokemon-main-info {
            img {
                max-width: 90%;
                @media (min-width: 576px) { width: 40%; }
                @media (min-width: 992px) { max-width: 35%; }
            }
        }

        #pokemon-detailed-info {
            margin-top: -60px;

            ul {
                li {
                    color: grey;
                    cursor: pointer;
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
                .evolution-element {
                    img {
                        width: 45%;
                        @media (min-width: 992px) { width: 20%; }
                    }
                    & > .current-pokemon {
                        opacity: 0.6;
                    }
                }
            }
        }
    }

    .custom-capitalize {
        text-transform: capitalize;
        &:not(:first-word) { text-transform: lowercase; }
    }
  </style>
  
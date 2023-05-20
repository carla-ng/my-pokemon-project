<template>
    <div id="pokemon-detail-view">
        <div v-if="loading">Loading...</div>
        <div v-else class="max-w-4xl ml-auto mr-auto pb-10">
            <div id="pokemon-main-info">
                <div class="flex flex-row justify-between">
                    <div>
                        <h2 class="text-3xl text-white text-left capitalize font-semibold mx-2" v-if="pokemon.name">{{ pokemon.name.replace('-', ' ') }}</h2>
                        <div class="text-left mt-2 mx-1">
                            <span v-for="type in pokemon.types" :key="type.type.name" class="pokemon-element-types text-white capitalize px-2 py-1 rounded-lg text-sm mx-1">
                                {{ type.type.name }}
                            </span>
                        </div>
                    </div>
                    <div class="text-3xl text-white mx-2">
                        <span>#{{ pokemon.id }}</span>
                    </div>
                </div>
                

                <img v-if="pokemon.sprites" :src="pokemon.sprites.other['official-artwork'].front_default" :alt="pokemon.name" class="ml-auto mr-auto" />
            </div>            
            
            <div id="pokemon-detailed-info" class="bg-white rounded-3xl px-8 pb-8 pt-16 mx-3">
                <ul class="flex flex-row items-start justify-between pb-4">
                    <li @click="activeTab = 'about'" :class="{ 'active': activeTab === 'about' }">About</li>
                    <li @click="activeTab = 'base-stats'" :class="{ 'active': activeTab === 'base-stats' }">Base Stats</li>
                    <li @click="activeTab = 'evolution'" :class="{ 'active': activeTab === 'evolution' }">Evolution</li>
                    <li @click="activeTab = 'moves'" :class="{ 'active': activeTab === 'moves' }">Moves</li>
                </ul>

                <div id="about" v-if="activeTab === 'about'">
                    <table>
                        <tr v-if="pokemon.species">
                            <td>Species</td>
                            <td class="capitalize">{{ pokemon.species.name }}</td>
                        </tr>
                        <tr>
                            <td>Height</td>
                            <td>{{ pokemon.height }}</td>
                        </tr>
                        <tr>
                            <td>Weight</td>
                            <td>{{ pokemon.weight }}</td>
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

                <div id="evolution" v-if="activeTab === 'evolution'">
                    <span v-for="(evolution, index) in evolutions" :key="evolution.name" class="capitalize">
                        <span v-if="index !== 0">,</span>
                        {{ evolution.name }}
                    </span>
                </div>

                <div id="moves" v-if="activeTab === 'moves'">
                    <table>
                        <tr>
                            <th class="text-left">Move</th>
                            <th>Level learned at</th>
                        </tr>
                        <tr v-for="(move, index) in pokemon.moves" :key="move.name" class="capitalize">
                            <td>{{ move.move.name.replace('-', ' ') }}</td>
                            <td>{{ move.version_group_details[0].level_learned_at }}</td>
                        </tr>
                    </table>
                </div>
            </div>
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
        const loading = ref(false)
        const pokemon = ref({})

        const activeTab = ref('about')  // sets the initial active tab

        const pokemonTypes = ref()
        const evolutions = ref([])
  

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

                // adding types as classes to body element to add type color
                const pokemonTypeNames = data.types.map(type => type.type.name)
                document.body.classList.add(...pokemonTypeNames)

                // add zeroes to pokemon id if it is less than 100
                if ( data.id < 100 ) {
                    data.id = data.id.toString().padStart(3, '0')
                } else {
                    data.id = data.id.toString()
                }
        
                // Pokemon object
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
                const evolutionsData = parseEvolutionChain(evolutionChainData.chain)
                evolutions.value = evolutionsData

            } catch (error) {
                console.error(error)
            }
        }


        // parse the evolution chain data recursively to extract the evolution names
        const parseEvolutionChain = (chain) => {
            const evolutionsData = []
            const { species, evolves_to } = chain

            evolutionsData.push({
                id: species.url.split('/').slice(-2, -1)[0],
                name: species.name
            })

            if (evolves_to.length) {
                evolves_to.forEach((evolution) => {
                    const subEvolutions = parseEvolutionChain(evolution)
                    evolutionsData.push(...subEvolutions)
                })
            }

            return evolutionsData
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
            fetchPokemon(route.params.id); // fetch pokemon data
            fetchEvolutions(route.params.id);  // fetch pokemon evolutions
        })


        return {
            pokemon,
            loading,
            activeTab,
            pokemonTypes,
            evolutions
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
            margin-top: -70px;

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
                    td {
                        text-align: left;
                        &:first-child {
                            color: grey;
                        }
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
  
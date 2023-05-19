<template>
    <div id="pokemon-detail-view" class="max-w-4xl ml-auto mr-auto">
        <div v-if="loading">Loading...</div>
        <div v-else>
            <div id="pokemon-main-info">
                <div>
                    <h2 class="text-lg capitalize font-semibold" v-if="pokemon.name">{{ pokemon.name.replace('-', ' ') }}</h2>
                    <div v-for="type in pokemon.types" :key="type.type.name" class="px-1.5 py-0.5 rounded-lg text-sm mx-1">
                        {{ type.type.name }}
                    </div>
                </div>
                <div>
                    <span>{{ pokemon.id }}</span>
                </div>

                <img v-if="pokemon.sprites" :src="pokemon.sprites.other['official-artwork'].front_default" :alt="pokemon.name" class="ml-auto mr-auto" />
            </div>

            
            
            <div id="pokemon-detailed-info">
                <ul class="flex flex-row items-center justify-between">
                    <li @click="activeTab = 'about'" :class="{ 'active': activeTab === 'about' }">About</li>
                    <li @click="activeTab = 'base-stats'" :class="{ 'active': activeTab === 'base-stats' }">Base Stats</li>
                    <li @click="activeTab = 'evolution'" :class="{ 'active': activeTab === 'evolution' }">Evolution</li>
                    <li @click="activeTab = 'moves'" :class="{ 'active': activeTab === 'moves' }">Moves</li>
                </ul>

                <div v-if="activeTab === 'about'" id="about">
                    <table>
                        <tbody>
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
                        </tbody>
                    </table>
                </div>

                <div v-if="activeTab === 'base-stats'" id="base-stats">
                    <table>
                        <tbody>
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
                        </tbody>
                    </table>
                </div>

                <div v-if="activeTab === 'evolution'" id="evolution">
                    <span v-for="(evolution, index) in evolutions" :key="evolution.name" class="capitalize">
                        <span v-if="index !== 0">,</span>
                        {{ evolution.name }}
                    </span>
                </div>

                <div v-if="activeTab === 'moves'" id="moves">Moves Tab Content</div>
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

                console.log(evolutions.value)

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
        };
  

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
        });


        return {
            pokemon,
            loading,
            activeTab,
            evolutions
        };
    },
  };
  </script>
  

  <style lang="scss" scoped>
    #pokemon-detail-view {
        #pokemon-main-info {
            img {
                @media (min-width: 992px) { max-width: 35%; }
            }
        }

        #pokemon-detailed-info {
            ul {
                li {
                    cursor: pointer;
                    &.active {
                        font-weight: bold;
                    }
                }
            }

            table {
                tbody {
                    tr {
                        td {
                            text-align: left;
                        }
                    }
                }
            }
        }
    }

    .custom-capitalize { text-transform: capitalize; }
    .custom-capitalize:not(:first-word) { text-transform: lowercase; }
  </style>
  
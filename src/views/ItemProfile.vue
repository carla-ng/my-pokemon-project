<template>

    <div id="item-detail-view" class="fade-in-element mx-3">

        <div @click="$router.push({name: 'ItemsList'})" class="max-w-4xl ml-auto mr-auto mb-8 text-left cursor-pointer">
            <img class="inline-block h-3 w-auto" :src="backArrowSVG" alt="Back arrow" />
            <span class="inline-block ml-2 text-white text-md">Go back</span>
        </div>

        <div v-if="loading" class="block my-8 mx-5 text-lg w-full">
            <Loader color="#fff"></Loader>
        </div>

        <div v-else class="max-w-4xl ml-auto mr-auto pb-10">

            <div id="item-main-info">
                <div class="flex flex-row justify-between items-end">
                    <div id="item-name-and-types">
                        <h2 class="text-3xl text-white text-left capitalize font-semibold mx-1 text-ellipsis" v-if="item.name">{{ item.name.replace('-', ' ') }}</h2>
                    </div>

                    <div id="item-id" class="text-2xl text-white mx-1">
                        <span>#{{ item.id }}</span>
                    </div>
                </div>
            </div>
            
            <div id="item-detailed-info" class="bg-white rounded-3xl px-8 py-4 my-4">
                <img v-if="item.sprites" :src="item.sprites.default" :alt="item.name" class="ml-auto mr-auto py-4" />

                <ul class="flex flex-row items-start pb-4">
                    <li @click="activeTab = 'about'" :class="{ 'active': activeTab === 'about' }" class="w-3/6">About</li>
                    <li @click="activeTab = 'effects'" :class="{ 'active': activeTab === 'effects' }" class="w-3/6">Effects</li>
                </ul>

                <!-- ABOUT -->
                <div id="about" v-if="activeTab === 'about'" class="fade-in-element-fast">
                    <table>
                        <tr v-if="item.flavor_text_entries">
                            <td>Information</td>
                            <td>{{ getFlavorText(item.flavor_text_entries) }}</td>
                        </tr>
                        <tr v-if="item.category">
                            <td>Category</td>
                            <td class="custom-capitalize">{{ item.category.name.replace('-', ' ') }}</td>
                        </tr>
                        <tr v-if="item.attributes && item.attributes[0]">
                            <td class="flex">Attributes</td>
                            <td>
                                <span v-for="(attribute, index) in item.attributes" :key="attribute.name" class="capitalize">
                                    <span v-if="index !== 0">,</span>
                                    {{ attribute.name.replace('-', ' ') }}
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td>Cost</td>
                            <td>{{ item.cost }} ₽</td>
                        </tr>

                        <tr v-if="item.fling_power">
                            <td>Fling Power</td>
                            <td>{{ item.fling_power }}</td>
                        </tr>

                        <tr v-if="item.held_by_pokemon && item.held_by_pokemon[0]">
                            <td class="flex">Held by Pokémon</td>
                            <td>
                                <span v-for="(pokemon, index) in item.held_by_pokemon" :key="pokemon.pokemon.name" class="capitalize">
                                    <span v-if="index !== 0">,</span>
                                    {{ pokemon.pokemon.name.replace('-', ' ') }}
                                </span>
                            </td>
                        </tr>

                    </table>
                </div>

                <!-- EFFECTS -->
                <div id="effects" v-if="activeTab === 'effects'" class="fade-in-element-fast">
                    <p class="text-left mx-8 my-1">{{ item.effect_entries[0].effect }}</p>
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
    name: 'itemProfile',
    components: {
        Loader
    },
    setup() {
        const route = useRoute()          // needed to get current item id

        const loading = ref(false)       // loader while waiting to receive item info
        const item = ref({})          // where current item info is stored

        const activeTab = ref('about')   // sets the initial active tab


        // fetch individual item info from pokeapi
        async function fetchitem( id ) {
            loading.value = true
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/item/${id}`)
                if ( !response.ok ) {
                    throw new Error('Failed to fetch data from the PokeAPI')
                }
                const data = await response.json()
                console.log(data)

                // item object
                Object.assign(item.value, data)
            } catch (error) {
                console.error(error)
            } finally {
                loading.value = false
            }
        }

        // get the "text" from the first element with "en" as "language" value
        const getFlavorText = ( flavorTextEntries ) => {
            const entry = flavorTextEntries.find((entry) => entry.language.name === 'en')

            //return the text if found, otherwise an empty string
            return entry ? entry.text : ''
        };


        // watch for changes in route params
        watch(
            () => route.params.id,
            ( newId ) => {
                fetchitem(newId)
            }
        );
  

        // fetch information on component mount
        onMounted(() => {
            document.body.classList.add('item-bg-color')

            // fetch item data
            fetchitem(route.params.id)
        })


        // remove item types classes from body tag before leaving view
        onBeforeUnmount(() => {
            document.body.classList.remove('item-bg-color')
        })


        return {
            activeTab,
            getFlavorText,
            item,
            loading,

            backArrowSVG: require('@/assets/svg/back-arrow.svg')
        };
    },
  };
  </script>
  

<style lang="scss" scoped>
#item-detail-view {

    #item-detailed-info {
        img {
            max-width: 20%;
            width: 20%;
            @media (min-width: $breakpoint-min-desktop) {
                max-width: 7%;
                width: 7%;
            }
        }

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
                th { padding: 3px 12px; }
                
                td {
                    padding: 2px 12px;
                    text-align: left;
                    vertical-align: top;

                    &.text-center { text-align: center !important; }

                    &:first-child {
                        color: grey;
                        min-width: 120px;
                    }
                }
            }
        }
    }
}
</style>
  
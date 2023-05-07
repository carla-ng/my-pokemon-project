<template>
    <div class="font-bold my-8 mx-5 ml-auto">
        Pokemon List
    </div>

    <div id="pokemon-list" class="max-w-4xl ml-auto mr-auto my-8 mx-5 flex flex-wrap justify-center">

        <div v-for="pokemon in allPokemon" :key="pokemon.id" class="pokemon-list-element p-1.5 m-1.5 rounded-2xl cursor-pointer" :class="pokemon.types.map(type => type.type.name).join(' ')">

            <img class="pokemon-list-element-image mx-auto block" :src="pokemon.sprites.front_default" :alt="'Image of ' + pokemon.name"/>

            <div class="pokemon-list-element-name text-lg capitalize font-semibold text-white"> {{ pokemon.name }}</div>

            <div class="pokemon-list-element-number text-white"> {{ pokemon.id.toString().padStart(3, '0') }} </div>

            <div class="pokemon-list-element-types-container flex flex-row flex-wrap justify-center mt-1">
                <div v-for="type in pokemon.types" :key="type.type.name" class="pokemon-list-element-types text-white px-1.5 py-0.5 rounded-lg text-sm mx-1">
                    {{ type.type.name }}
                </div>
            </div>

        </div>

        <!-- show a loading spinner while data is being fetched -->
        <div v-if="loading" class="my-8 mx-5">
            Loading...
        </div>
    </div>
</template>


<script>
// @ is an alias to /src
import { computed, onBeforeUnmount, onMounted, reactive, toRefs } from 'vue'

export default {
    name: 'PokemonList',
    components: {

    },
    setup() {
        const state = reactive({
            allPokemon: [],
            offset: 0,
            loading: false
        })


        const loadPokemon = async () => {
            state.loading = true

            fetch(`https://pokeapi.co/api/v2/pokemon?limit=40&offset=${state.offset}`)
                .then( response => response.json() )
                .then(data => {
                    const promises = data.results.map(pokemon => {
                        return fetch(pokemon.url)
                        .then(response => response.json())
                        .then(data => {
                            state.allPokemon.push(data);
                        })
                    })

                    Promise.all(promises).then(() => {
                        state.allPokemon.sort((a, b) => a.id - b.id);
                        state.offset += 40;
                        state.loading = false;
                    })
            })
        }


        const onScroll = () => {
            // detect when the user has scrolled to the bottom of the page
            const scrollPosition = window.innerHeight + window.pageYOffset;
            const pageHeight = document.documentElement.scrollHeight;
            const isAtBottom = scrollPosition >= pageHeight;

            // if the user has scrolled to the bottom of the page, load more data
            if ( isAtBottom && !state.loading ) {
                loadPokemon();
            }
        }


        onMounted(() => {
            // add an event listener to detect when the user scrolls the page
            window.addEventListener('scroll', onScroll);
        });


        onBeforeUnmount(() => {
            // remove the event listener when the component is destroyed
            window.removeEventListener('scroll', onScroll);
        });



        // Initial fetch for first pokemon
        loadPokemon()

        

        return {
            ...toRefs(state),

            loadPokemon
        }
  }
}
</script>


<style lang="scss" scoped>
    #pokemon-list {
        .pokemon-list-element {
            min-width: 150px;

            background-color: #b9b7b7;
            .pokemon-list-element-types {
                    background-color: darken(#b9b7b7, 8%);
                }

            .pokemon-list-element-types {
                height: fit-content;
                width: fit-content;
            }

            &.poison {
                background-color: #d296ed;
                .pokemon-list-element-types {
                    background-color: darken(#d296ed, 8%);
                }
            }
            &.bug {
                background-color: #b3d374;
                .pokemon-list-element-types {
                    background-color: darken(#b3d374, 8%);
                }
            }
            &.ground {
                background-color: #ff8054;
                .pokemon-list-element-types {
                    background-color: darken(#ff8054, 8%);
                }
            }
            &.flying {
                background-color: #a2b3cb;
                .pokemon-list-element-types {
                    background-color: darken(#a2b3cb, 8%);
                }
            }
            &.fairy {
                background-color: lightpink;
                .pokemon-list-element-types {
                    background-color: darken(lightpink, 8%);
                }
            }
            &.fighting {
                background-color: #ff7272;
                .pokemon-list-element-types {
                    background-color: darken(#ff7272, 8%);
                }
            }
            &.psychic {
                background-color: plum;
                .pokemon-list-element-types {
                    background-color: darken(plum, 8%);
                }
            }
            &.dragon {
                background-color: silver;
                .pokemon-list-element-types {
                    background-color: darken(silver, 8%);
                }
            }
            &.dark {
                background-color: #7c7c7c;
                .pokemon-list-element-types {
                    background-color: darken(#7c7c7c, 8%);
                }
            }
            &.ghost {
                background-color: #a0cad1;
                .pokemon-list-element-types {
                    background-color: darken(#a0cad1, 8%);
                }
            }
            &.steel, &.rock {
                background-color: #a1a2a3;
                .pokemon-list-element-types {
                    background-color: darken(#a1a2a3, 8%);
                }
            }
            &.ice {
                background-color: #89DCEB;
                .pokemon-list-element-types {
                    background-color: darken(#89DCEB, 8%);
                }
            }
            &.electric {
                background-color: #ffe965;
                .pokemon-list-element-types {
                    background-color: darken(#ffe965, 8%);
                }
            }
            &.grass {
                background-color: #62d5b4;
                .pokemon-list-element-types {
                    background-color: darken(#62d5b4, 8%);
                }
            }
            &.fire {
                background-color: #ffa761;
                .pokemon-list-element-types {
                    background-color: darken(#ffa761, 8%);
                }
            }
            &.water {
                background-color: #8bacf6;
                .pokemon-list-element-types {
                    background-color: darken(#8bacf6, 8%);
                }
            }
        }
    }
</style>
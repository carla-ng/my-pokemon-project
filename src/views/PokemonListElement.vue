<template>

    <router-link :to="`/pokemon/${pokemon.id}`" class="pokemon-list-element p-1.5 m-1.5 rounded-2xl cursor-pointer" :class="pokemon.types.map(type => type.type.name).join(' ')">

        <img class="pokemon-list-element-image mx-auto block" :src="pokemon.sprites.front_default" :alt="'Image of ' + pokemon.name"/>

        <div class="pokemon-list-element-name text-lg capitalize font-semibold text-white truncate">{{ pokemon.name }}</div>

        <div class="pokemon-list-element-number text-white">{{ pokemon.id.toString().padStart(3, '0') }}</div>

        <div class="pokemon-list-element-types-container flex flex-row flex-wrap justify-center mt-1">
            <div v-for="type in pokemon.types" :key="type.type.name" class="pokemon-list-element-types text-white px-1.5 py-0.5 rounded-lg text-sm mx-1">
                {{ type.type.name }}
            </div>
        </div>

    </router-link>

  </template>
  
  
  <script>
  export default {
    name: 'PokemonListElement',
    props: {
        pokemon: Object,
    },
    setup() {
        
    }
  };
  </script>
  
  <style lang="scss" scoped>
  .pokemon-list-element {
    min-width: 150px;

    @media (min-width: 992px) { max-width: 150px; }

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
</style>
  
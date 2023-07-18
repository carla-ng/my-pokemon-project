<template>

    <router-link :to="`/item/${item.id}`" v-if="item.sprites.default" class="fade-in-element item-list-element px-2 py-4 m-1.5 rounded-2xl cursor-pointer flex">

        <div class="item-list-element__number text-white text-lg px-2">{{ formattedId }}</div>

        <img class="item-list-element__image block px-2" :src="item.sprites.default" :alt="'Image of ' + item.name"/>

        <div class="item-list-element__name text-lg capitalize font-semibold text-white truncate px-2">{{ item.name.replace('-', ' ') }}</div>
        
    </router-link>

</template>
  
  
<script>
  import { computed } from 'vue';

  export default {
    name: 'ItemListElement',
    props: {
        item: {
            type: Object,
            required: true
        }
    },
    setup( props ) {

        // add zeroes to item id if it is less than 100
        const formattedId = computed(() => {
            const itemId = props.item.id
            if ( itemId < 100 ) {
                return itemId.toString().padStart(3, '0')
            } else {
                return itemId.toString()
            }
        })

        return {
            formattedId
        }
    }
  };
</script>
  
<style lang="scss" scoped>
@import '@/assets/styles/global.scss';

.item-list-element {
    width: 100%;
    @media (min-width: $breakpoint-min-desktop) { width: 30%; }

    &:nth-child(odd) { background-color: $palette-color-03; }
    &:nth-child(even) { background-color: $palette-color-04; }

    &:hover { opacity: 0.8; }
}
</style>
  
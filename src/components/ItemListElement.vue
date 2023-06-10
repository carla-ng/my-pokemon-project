<template>

    <div v-if="item.sprites.default" class="item__list__element px-2 py-4 m-1.5 rounded-2xl cursor-pointer flex">

        <div class="item__list__element-number text-white text-lg px-2">{{ formattedId }}</div>

        <img class="item__list__element-image block px-2" :src="item.sprites.default" :alt="'Image of ' + item.name"/>

        <div class="item__list__element-name text-lg capitalize font-semibold text-white truncate px-2">{{ item.name.replace('-', ' ') }}</div>
        
    </div>

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
.item__list__element {
    width: 100%;
    @media (min-width: 768px) { width: 30%; }

    &:nth-child(odd) { background-color: rgb(134 239 172); }
    &:nth-child(even) { background-color: rgb(167 139 250); }
}
</style>
  
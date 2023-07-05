<template>
    <div class="font-bold my-8 mx-5 text-xl">
        Items
    </div>

    <div id="items-list-page" class="max-w-7xl ml-auto mr-auto my-8 mx-5 flex flex-wrap justify-center">
        <ItemListElement
            v-for="item in allItems"
            :key="item.id"
            :item="item"
        ></ItemListElement>

        <!-- show a loader while data is being fetched -->
        <div v-if="loading" class="my-8 mx-5 text-lg">
            Loading...
        </div>
    </div>
</template>


<script>
import ItemListElement from '@/components/ItemListElement.vue';

import { onBeforeUnmount, onMounted, reactive, ref, toRefs } from 'vue';

export default {
    name: 'ItemsList',
    components: {
        ItemListElement
    },
    setup() {
        const state = reactive({
            allItems: [],
            offset: 0,
            loading: false,
        })
        

        // load items
        const loadItems = async () => {
            state.loading = true

            fetch(`https://pokeapi.co/api/v2/item?limit=40&offset=${state.offset}`)
                .then( response => response.json() )
                .then(data => {

                    const promises = data.results.map(item => {
                        return fetch(item.url)
                        .then(response => response.json())
                        .then(data => {
                            state.allItems.push(data)

                            console.log(data)
                        })
                    })

                    Promise.all(promises).then(() => {
                        state.allItems.sort((a, b) => a.id - b.id)
                        state.offset += 40
                        state.loading = false
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
                loadItems()
            }
        }


        onMounted(() => {
            // add an event listener to detect when the user scrolls the page
            window.addEventListener('scroll', onScroll)
        });


        onBeforeUnmount(() => {
            // remove the event listener when the component is destroyed
            window.removeEventListener('scroll', onScroll)
        });



        // initial fetch for first items
        loadItems()

        

        return {
            ...toRefs(state),
        }
    }
}
</script>


<style lang="scss" scoped> </style>
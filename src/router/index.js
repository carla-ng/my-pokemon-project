import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import PokemonList from '../views/PokemonList.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/pokedex',
    name: 'PokemonList',
    component: PokemonList
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

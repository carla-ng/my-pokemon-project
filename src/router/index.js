import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import PokemonList from '../views/PokemonList.vue'
import PokemonProfile from '../views/PokemonProfile.vue'

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
  },
  {
    path: '/pokemon/:id',
    name: 'PokemonProfile',
    component: PokemonProfile
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

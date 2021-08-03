import Vue from 'vue'
import VueRouter from 'vue-router'
import CharacterListPage from '../views/CharacterListPage.vue'
import CharacterDetailPage from '../views/CharacterDetailPage.vue'
import CharacterFavouriteListPage from '../views/CharacterFavouriteListPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/characters'
  },
  {
    path: '/characters',
    name: 'CharacterListPage',
    component: CharacterListPage
  },
  {
    path: '/characters/:id',
    name: 'CharacterDetailPage',
    component: CharacterDetailPage,
    props: ({ params }) => params
  },
  {
    path: '/favourites',
    name: 'Favourites',
    component: CharacterFavouriteListPage
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

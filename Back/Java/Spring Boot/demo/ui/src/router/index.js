import Vue from 'vue'
import VueRouter from 'vue-router'
import TopPage from '../components/TopPage.vue'
import WebPage from '../components/WebPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'トップページ',
    component: TopPage
  },
  {
    path: '/web',
    name: 'Web',
    component: WebPage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

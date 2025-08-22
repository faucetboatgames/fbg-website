import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import PressReleases from '@/views/PressReleases.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/press-releases',
    name: 'PressReleases',
    component: PressReleases
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router
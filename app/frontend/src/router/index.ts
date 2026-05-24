import { createRouter, createWebHistory } from 'vue-router'
import TopView from '../views/TopView.vue'

const routes = [
  {
    path: '/',
    name: 'top',
    component: TopView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
import { createRouter, createWebHistory } from 'vue-router'
import TopView from '../views/TopView.vue'
import CameraView from '../views/CameraView.vue'
import HistoryView from '../views/HistoryView.vue'
import SettingsView from '../views/SettingsView.vue'

const routes = [
  {
    path: '/',
    name: 'top',
    component: TopView
  },
  {
    path: '/camera',
    name: 'camera',
    component: CameraView
  },
  {
    path: '/history',
    name: 'history',
    component: HistoryView
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingsView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
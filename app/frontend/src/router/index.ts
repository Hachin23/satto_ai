import { createRouter, createWebHistory } from 'vue-router'
import TopView from '../views/TopView.vue'
import CameraView from '../views/CameraView.vue'
import HistoryView from '../views/HistoryView.vue'
import SettingsView from '../views/SettingsView.vue'
import ResultPreviewView from '../views/ResultPreviewView.vue'

const routes = [
  {
    path: '/',
    name: 'top',
    component: TopView
  },
  {
    path: '/camera',
    name: 'camera',
    component: CameraView,
    meta: { hideFooter: true }
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
  },
  {
    path: '/result-preview',
    name: 'result-preview',
    component: ResultPreviewView,
    meta: { title: "撮影結果プレビュー", hideFooter: true }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
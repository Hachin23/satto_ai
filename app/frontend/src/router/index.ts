import { createRouter, createWebHistory } from 'vue-router'
import TopView from '../views/TopView.vue'
import CameraView from '../views/CameraView.vue'
import HistoriesView from '../views/HistoriesView.vue'
import SettingsView from '../views/SettingsView.vue'
import ResultPreviewView from '../views/ResultPreviewView.vue'
import HistoryDetailView from '@/views/HistoryDetailView.vue'

const routes = [
  {
    path: '/',
    name: 'top',
    component: TopView,
    meta: {
      headerTitle: '',
      backIcon: 'none'
    }
  },
  {
    path: '/camera',
    name: 'camera',
    component: CameraView,
    meta: {
      headerTitle: '',
      backIcon: 'close',
      backPath: '/',
      hideFooter: true
    }
  },
  {
    path: '/result-preview',
    name: 'result-preview',
    component: ResultPreviewView,
    meta: {
      headerTitle: "撮影結果プレビュー",
      backIcon: 'arrow',
      backPath: '/camera',
      hideFooter: true
    }
  },
  {
    path: '/histories',
    name: 'histories',
    component: HistoriesView,
    meta: {
      headerTitle: "撮影履歴一覧",
      backIcon: 'close',
      backPath: '/'
    }
  },
  {
    path: '/history/:id',
    name: 'history-detail',
    component: HistoryDetailView,
    // props: true を設定すると、URLの :id が画面側に Props として自動で渡される
    props: true, 
    meta: { 
      headerTitle: '撮影履歴詳細', 
      backIcon: 'arrow',
      backPath: '/histories'
    }
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingsView,
    meta: {
      headerTitle: "設定",
      backIcon: 'close',
      backPath: '/'
    }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
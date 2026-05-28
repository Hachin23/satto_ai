import { defineStore } from 'pinia'
import { ref } from 'vue'

interface CurrentCaptureData {
  blob: Blob //写真データ
  createdAt: number // 撮影日時
  status: number // 0: OK, 1: 改善あり などのステータス
  actionText: string //画面に表示される1アクションの指示
}

export const usePhotoStore = defineStore('photo', () => {
  const currentCapture = ref<CurrentCaptureData | null>(null)

  const clearCapture = () => {
    currentCapture.value = null
  }

  return { 
    currentCapture,
    clearCapture
  }
})
<script setup lang="ts">
import { computed, onUnmounted } from 'vue'
import { usePhotoStore } from '@/stores/photo'
import { useRouter, useRoute } from 'vue-router'
import { RefreshCw, Check } from 'lucide-vue-next'

import AppHeader from '@/components/AppHeader.vue'
import ResultPhotoCard from '@/components/ResultPhotoCard.vue'

const photoStore = usePhotoStore()
const router = useRouter()
const route = useRoute()
const captureData = computed(() => photoStore.currentCapture)

// ストアからBlobを取り出して、画面表示用のURLに変換する
const previewUrl = computed(() => {
  return photoStore.currentCapture?.blob ? URL.createObjectURL(photoStore.currentCapture.blob) : ''
})

// 画面から離れたら、生成した一時的なURLを破棄してメモリを解放する
onUnmounted(() => {
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value)
  }
})

// タイトルを取得
const pageTitle = computed(() => {
  return (route.meta?.title as string) || 'タイトル未定義'
})

const handleBack = () => {
  // 撮り直すので、ストアデータをクリアする
  photoStore.clearCapture() 
  router.push('/camera') 
}

const saveCapture = () => {
  // TODO: 保存処理

  router.push('/camera')
}
</script>

<template>
  <div class="w-full h-full bg-[#F2F2F5] flex flex-col items-center px-2">
    <AppHeader
      bgColor="bg-[#F2F2F5]" 
      borderClass="border-none"
    />
    
    <h1 class="text-lg font-bold mb-2">{{ pageTitle }}</h1>

    <!-- TODO:リアルタイム撮影ガイドを実装するまでは直書き(action-detail) -->
    <ResultPhotoCard 
      :image-url="previewUrl"
      :status="captureData?.status"
      :action="captureData?.actionText"
      action-detail="ナイスショット！光の入り方がとてもきれいです。"
    />

    <div class="w-full flex justify-center gap-4 py-4">
      <button 
        class="px-6 py-4 bg-slate-800 text-white flex items-center justify-center rounded-full active:scale-95 transition-transform"
        @click="handleBack"
      >
        <RefreshCw :size="20" />
        <div class="text-left pl-2">
          <p class="font-bold leading-none">
            撮り直し
          </p>
        </div>
      </button>
      <button
        class="px-6 py-4 bg-[#197649] text-white font-bold flex items-center justify-center rounded-full active:scale-95 transition-transform"
        @click="saveCapture"
      >
        <Check :size="20" />
        <div class="text-left pl-2">
          <p class="font-bold leading-none">
            この写真でOK!
          </p>
        </div>
      </button>
    </div>

  </div>
</template>
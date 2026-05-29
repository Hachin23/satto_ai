<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePhotoStore } from '@/stores/photo'
import { CircleX } from 'lucide-vue-next'

import AppHeader from '@/components/AppHeader.vue'
import CameraModule from '@/components/CameraModule.vue'

import { useCamera } from '@/composables/useCamera'

const router = useRouter()
const photoStore = usePhotoStore()

const cameraRefs = {
  video: ref<HTMLVideoElement | null>(null),
  canvas: ref<HTMLCanvasElement | null>(null)
}

const { 
  isFlashOn, startCamera, stopCamera, toggleFlash, capture 
} = useCamera(cameraRefs)

onMounted(() => {
  startCamera()
})

onUnmounted(() => {
  stopCamera()
})

const isProcessing = ref(false) // 処理中フラグを定義

const handleCapture = async () => {
  try {
    isProcessing.value = true // 処理開始
    const capturedBlob = await capture()
    
    if (capturedBlob) {
      console.log("📸 撮影成功:", capturedBlob)
      // 撮影データをストアに保存
      // TODO: statusとactionTextはリアルタイム撮影ガイド機能実装時に修正必要
      photoStore.currentCapture = {
        blob: capturedBlob,
        createdAt: Date.now(), 
        status: 0,
        actionText: "そのまま撮影してOK!"
      }
      // 撮影結果プレビュー画面へ遷移
      router.push('/result-preview')
    }
  } catch(error) {
    console.error("撮影失敗:", error)
  } finally {
    isProcessing.value = false // 処理終了
  }
}
</script>

<template>
  <div class="flex flex-col h-screen w-full bg-black text-white pt-4">
    <AppHeader bgColor="bg-black" borderClass="border-none" textColor="text-white" >
      <button @click="toggleFlash" :class="{ 'text-yellow-400': isFlashOn }">
        {{ isFlashOn ? '⚡️ ON' : '⚡️ OFF' }}
      </button>
    </AppHeader>

    <main class="flex-1">
      <CameraModule
        :video-ref="cameraRefs.video" 
        :is-processing="isProcessing"
        @shutter="handleCapture" />
    </main>

    <canvas :ref="(el) => cameraRefs.canvas.value = el as HTMLCanvasElement" class="hidden"></canvas>
  </div>
</template>

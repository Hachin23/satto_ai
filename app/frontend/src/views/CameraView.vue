<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import AppHeader from '@/components/AppHeader.vue'
import CameraModule from '@/components/CameraModule.vue'

import { useCamera } from '@/composables/useCamera'

const router = useRouter()

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
      // 撮影画像を次の画面に渡す
    }
  } catch(error) {
    console.error("撮影失敗:", error)
  } finally {
    isProcessing.value = false // 処理終了
  }
}
</script>

<template>
  <div class="flex flex-col h-screen w-full bg-black text-white p-4">
    <AppHeader
      bgColor="bg-black" 
      borderClass="border-none"
    >
      <button @click="router.back()">✕</button>
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

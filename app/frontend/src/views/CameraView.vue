<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePhotoStore } from '@/stores/photo'
import { useCamera } from '@/composables/useCamera'
import { useFaceLandmarker } from '@/composables/useFaceLandmarker'
import { useFaceAnalysis } from '@/composables/useFaceAnalysis'
import { useFaceJudge } from '@/composables/useFaceJudge'
import { useFaceDetection } from '@/composables/useFaceDetection'
import { FaceJudgeResult, FACE_DETECT_STATUS_LIST } from '@/types/faceAnalysisTypes'

import AppHeader from '@/components/AppHeader.vue'
import CameraModule from '@/components/CameraModule.vue'

const router = useRouter()
const photoStore = usePhotoStore()
const { initFaceAi, analyzeFrame } = useFaceLandmarker()
const { analyzeFaceData } = useFaceAnalysis()
const { judgeFaceStatus } = useFaceJudge()
const { faceStatus, handleFaceDetection, throttledUpdateUI } = useFaceDetection()
let animationFrameId: number | null = null
let currentSnapshotJudgeResult: FaceJudgeResult | null = null

const cameraRefs = {
  video: ref<HTMLVideoElement | null>(null),
  canvas: ref<HTMLCanvasElement | null>(null)
}

const { 
  isFlashOn, startCamera, stopCamera, toggleFlash, capture
} = useCamera(cameraRefs)

onMounted(async () => {
  // 直接撮影画面を開くのを考慮して、ここでも呼んでおく
  await initFaceAi()
  // カメラ起動
  await startCamera()
  startAnalyzeLoop()
})

onBeforeUnmount(() => {
  // カメラのストリームを停止（DOMが消える前に安全に処理）
  stopCamera()
  // 解析ループを完全に停止させてゾンビプロセスを防ぐ
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }
  console.log('CameraView: クリーンアップ完了')
})

const startAnalyzeLoop = () => {
  try {
    if (cameraRefs.video.value) {
      const result = analyzeFrame(cameraRefs.video.value)
      currentSnapshotJudgeResult = handleFaceDetection(result, analyzeFaceData, judgeFaceStatus)
      // console.log(currentSnapshotJudgeResult)
    }
  } catch (error) {
    console.error('detectForVideo エラー', error)
  }
  animationFrameId = requestAnimationFrame(startAnalyzeLoop)
}

const isProcessing = ref(false) // 処理中フラグを定義

const handleCapture = async () => {
  try {
    isProcessing.value = true // 処理開始

    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId)
      animationFrameId = null
      console.log("📸 撮影のため、リアルタイム解析ループを停止しました")
    }
    throttledUpdateUI.cancel()

    const capturedBlob = await capture()
    
    if (capturedBlob) {
      console.log("📸 撮影成功:", capturedBlob)
      const currentStatus = FACE_DETECT_STATUS_LIST.indexOf(faceStatus.value.status)
      // 撮影データをストアに保存
      photoStore.currentCapture = {
        blob: capturedBlob,
        createdAt: Date.now(), 
        status: currentStatus,
        actionText: faceStatus.value.message,
        judgeResult: currentSnapshotJudgeResult
      }
      // 撮影結果プレビュー画面へ遷移
      router.push('/result-preview')
    }
  } catch(error) {
    console.error("撮影失敗:", error)
    startAnalyzeLoop()
  } finally {
    isProcessing.value = false // 処理終了
  }
}
</script>

<template>
  <div class="flex flex-col h-full bg-black text-white pt-4">
    <AppHeader bgColor="bg-black" borderClass="border-none" textColor="text-white" >
      <button @click="toggleFlash" :class="{ 'text-yellow-400': isFlashOn }">
        {{ isFlashOn ? '⚡️ ON' : '⚡️ OFF' }}
      </button>
    </AppHeader>

    <main class="flex-1">
      <CameraModule
        :video-ref="cameraRefs.video" 
        :is-processing="isProcessing"
        :face-status="faceStatus"
        @shutter="handleCapture" />
    </main>

    <canvas :ref="(el) => cameraRefs.canvas.value = el as HTMLCanvasElement" class="hidden"></canvas>
  </div>
</template>

<script setup lang="ts">
import { computed, onUnmounted, onMounted, ref } from 'vue'
import { usePhotoStore } from '@/stores/photo'
import { useRouter } from 'vue-router'
import { RefreshCw, Check } from 'lucide-vue-next'
import { db, type PhotoRecord } from '@/database/db'
import { createThumbnail } from '@/utils/imageUtils'
import { FACE_STATUS_INDEX } from '@/types/faceAnalysisTypes'
import { fetchAiDetailAction } from '@/services/detailActionService'

import AppHeader from '@/components/AppHeader.vue'
import ResultPhotoCard from '@/components/ResultPhotoCard.vue'

const photoStore = usePhotoStore()
const router = useRouter()
const captureData = computed(() => photoStore.currentCapture)
const isLoading = ref(false)
const aiDetailActionText = ref('')
const previewUrl = ref('')

onMounted(async () => {
  if (photoStore.currentCapture?.blob) {
    previewUrl.value = URL.createObjectURL(photoStore.currentCapture.blob)
  }

  // 顔なしの場合は、そもそもAPIを叩かずに即終了
  if (photoStore.currentCapture?.status === FACE_STATUS_INDEX.NOT_DETECTED) {
    return
  }
  if (photoStore.currentCapture?.judgeResult === null || photoStore.currentCapture?.judgeResult === undefined) {
    return
  }

  // 顔がある場合はAPIを叩きにいく
  try {
    isLoading.value = true
    // ストア等に保持しておいた撮影瞬間の judgeResult を渡す
    const result = await fetchAiDetailAction(
      photoStore.currentCapture?.status,
      photoStore.currentCapture?.judgeResult
    )

    aiDetailActionText.value = result
  } catch (err) {
    aiDetailActionText.value = '通信エラーが発生しました。もう一度お試しください。'
  } finally {
    isLoading.value = false
  }
})

// 画面から離れたら、生成した一時的なURLを破棄してメモリを解放する
onUnmounted(() => {
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value)
  }
})

const handleBack = () => {
  // 撮り直すので、ストアデータをクリアする
  photoStore.clearCapture() 
  router.push('/camera') 
}


const saveCapture = async () => {

  const captureInfo = photoStore.currentCapture

  if (!captureInfo || !captureInfo.blob) {
    console.error('保存する撮影データがありません')
    return
  }

  try {
    const photoBlob = captureInfo.blob
    // 2. 一覧画面用のサムネイルを生成 (軽量化のため)
    const thumbBlob = await createThumbnail(photoBlob, 300);
    // 3. 保存用データの構築
    const now = Date.now();
    const newRecord: PhotoRecord = {
      photo: photoBlob,
      thumbnailImage: thumbBlob,
      resultStatus: captureInfo.status,
      actionText: captureInfo.actionText,
      aiActionDetail: aiDetailActionText.value,
      isFavorite: false,
      createdAt: now,
      updatedAt: now
    };

    // IndexedDB へ追加
    const newId = await db.photo_records.add(newRecord);
      console.log(`保存成功! ID: ${newId}`);
    
    // 撮影画面に遷移
    router.push('/camera')

  } catch (error) {
    console.error("保存失敗:", error);
  }
}
</script>

<template>
  <div class="w-full h-full bg-[#F2F2F5] flex flex-col px-2">
    <AppHeader bgColor="bg-[#F2F2F5]" borderClass="border-none" />
    
    <main class="flex-1 flex flex-col items-center">
      <ResultPhotoCard 
        :photo-url="previewUrl"
        :status="captureData?.status"
        :action-text="captureData?.actionText"
        :ai-action-detail="aiDetailActionText"
        :is-loading="isLoading"
      />
  
      <div class="w-full flex justify-center gap-4 py-4">
        <button 
          class="px-6 py-4 bg-slate-800 text-white flex items-center justify-center rounded-full active:scale-95 transition-transform"
          @click="handleBack"
          :disabled="isLoading"
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
          :disabled="isLoading"
        >
          <Check :size="20" />
          <div class="text-left pl-2">
            <p class="font-bold leading-none">
              この写真でOK!
            </p>
          </div>
        </button>
      </div>
    </main>

  </div>
</template>
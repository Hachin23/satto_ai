<script setup lang="ts">
import { computed, onUnmounted } from 'vue'
import { usePhotoStore } from '@/stores/photo'
import { useRouter } from 'vue-router'
import { RefreshCw, Check } from 'lucide-vue-next'
import { db, type PhotoRecord } from '@/database/db'
import { createThumbnail } from '@/utils/imageUtils'

import AppHeader from '@/components/AppHeader.vue'
import ResultPhotoCard from '@/components/ResultPhotoCard.vue'

const photoStore = usePhotoStore()
const router = useRouter()
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

const handleBack = () => {
  // 撮り直すので、ストアデータをクリアする
  photoStore.clearCapture() 
  router.push('/camera') 
}


const dummyAiActionDetailText = "バランスが最高ですね！センスあるね～"
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
      // TODO: 1アクション詳細説明生成機能の結果を格納
      aiActionDetail: dummyAiActionDetailText,
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
  <div class="w-full h-full bg-[#F2F2F5] flex flex-col items-center px-2">
    <AppHeader bgColor="bg-[#F2F2F5]" borderClass="border-none" />
    
    <!-- TODO:リアルタイム撮影ガイドを実装するまでは直書き(action-detail) -->
    <ResultPhotoCard 
      :photo-url="previewUrl"
      :status="captureData?.status"
      :action-text="captureData?.actionText"
      :ai-action-detail="dummyAiActionDetailText"
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
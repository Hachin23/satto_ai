<script setup lang="ts">
import { computed, onUnmounted } from 'vue'
import { usePhotoStore } from '@/stores/photo'
import { useRouter } from 'vue-router'
import { ChevronLeftIcon } from 'lucide-vue-next'

import AppHeader from '@/components/AppHeader.vue'

const photoStore = usePhotoStore()
const router = useRouter()

// ストアからBlobを取り出して、画面表示用のURLに変換する
const previewUrl = computed(() => {
  return photoStore.capturedBlob ? URL.createObjectURL(photoStore.capturedBlob) : ''
})

// 画面から離れたら、生成した一時的なURLを破棄してメモリを解放する
onUnmounted(() => {
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value)
  }
})

</script>

<template>
  <div class="min-h-screen w-full bg-[#F2F2F5] flex flex-col">
    <AppHeader
      bgColor="bg-[#F2F2F5]" 
      borderClass="border-none"
    >
      <ChevronLeftIcon @click="router.back()" :size="24"/>
    </AppHeader>
    
    <img 
      v-if="previewUrl" 
      :src="previewUrl" 
      alt="撮影した画像" 
      class="max-w-full max-h-[70vh] object-contain"
    />
  </div>
</template>
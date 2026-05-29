<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useHistoryStore } from '@/stores/history'

import AppHeader from '@/components/AppHeader.vue'
import PhotoThumbnailCard from '@/components/PhotoThumbnailCard.vue'

const router = useRouter()
const historyStore = useHistoryStore()

onMounted(async () => {
  await historyStore.fetchHistory()
})

const handleCardClick = (id: number) => {
  router.push(`/history/${id}`)
}

</script>

<template>
  <div class="min-h-screen w-full flex flex-col bg-[#F2F2F5] px-2">
    
    <AppHeader bgColor="bg-[#F2F2F5]" borderClass="border-none" />

    <p class="text-xs text-slate-400 text-center mb-6">
      過去に撮影した写真とAIのアドバイスを確認できます。
    </p>

    <main class="flex-1 overflow-y-auto">
      <div v-if="historyStore.historyList.length === 0" class="text-center py-12 text-slate-400 text-sm">
        撮影履歴がありません。
      </div>

      <div v-else class="grid grid-cols-2 gap-3">
        <PhotoThumbnailCard 
          v-for="item in historyStore.historyList" 
          :key="item.id"
          :thumbnail-url="item.thumbnailUrl"
          :createdAt="item.createdAt"
          :status="item.status"
          @click="handleCardClick(item.id!)"
        />
      </div>
    </main>

  </div>
</template>

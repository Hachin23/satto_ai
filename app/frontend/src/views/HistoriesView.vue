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
  <div class="h-full w-full flex flex-col bg-[#F2F2F5] px-2">
    
    <AppHeader bgColor="bg-[#F2F2F5]" borderClass="border-none" />

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

    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="translate-y-2 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-if="historyStore.toastMessage" 
        class="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-black/50 text-white/80 px-4 py-2.5 shadow-lg flex items-center gap-2 text-sm font-medium min-w-[280px]"
      >
        <span>{{ historyStore.toastMessage }}</span>
      </div>
    </Transition>

  </div>
</template>

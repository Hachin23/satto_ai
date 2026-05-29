<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useHistoryStore } from '@/stores/history'
import AppHeader from '@/components/AppHeader.vue'
import ResultPhotoCard from '@/components/ResultPhotoCard.vue'

const props = defineProps<{
  id: string 
}>()

const historyStore = useHistoryStore()
const detailData = ref<any>(null)
const photoId = Number(props.id)

onMounted(async () => {
  const data = await historyStore.fetchDetailHistory(photoId)
  if (data) {
    detailData.value = data
  }
})

onUnmounted(() => {
  if (detailData.value?.photoUrl) {
    URL.revokeObjectURL(detailData.value.photoUrl)
  }
})
</script>

<template>
  <div class="h-full w-full bg-[#F2F2F5] flex flex-col overflow-hidden">
    <AppHeader bgColor="bg-transparent" borderClass="border-none" />

    <main class="flex-1 p-2 flex flex-col items-center">
      <ResultPhotoCard 
        v-if="detailData"
        :photo-url="detailData.photoUrl"
        :created-at="detailData.createdAt"
        :show-delete="true"
        :status="detailData.status"
        :action-text="detailData.actionText"
        :ai-action-detail="detailData.aiActionDetail"
        />
      
      <div v-else class="text-slate-400 text-sm mt-12">
        データを読み込み中、またはデータが見つかりません。
      </div>
    </main>
  </div>
</template>
<script setup lang="ts">
import { Sparkles, CircleCheck } from 'lucide-vue-next'
import { FACE_STATUS_INDEX } from '@/types/faceAnalysisTypes'

defineProps<{
  id?: number
  thumbnailUrl: string
  createdAt: string
  status: number
}>()

</script>

<template>
  <div class="bg-white rounded-lg p-1 shadow-sm flex flex-col gap-1 text-left">
    
    <div class="text-[10px] text-black truncate">
      {{ createdAt }}
    </div>

    <div class="w-full aspect-[4/3] rounded-lg overflow-hidden bg-slate-100">
      <img :src="thumbnailUrl" alt="撮影履歴サムネイル画像" class="w-full h-full object-cover" />
    </div>

    <div>

    <span v-if="status === FACE_STATUS_INDEX.NOT_DETECTED" 
      class="w-fit text-xs font-bold text-white bg-[#11c2f870] px-2 py-1 rounded-md text-left"
    >
      風景・その他
    </span>
    
    <span v-else-if="status === FACE_STATUS_INDEX.VERIFYING"
    class="inline-flex items-center gap-1 text-xs font-bold text-white bg-yellow-400 px-2 py-1 rounded-md"
    >
      <Sparkles :size="14" />
      改善あり
    </span>

    <span v-else-if="status === FACE_STATUS_INDEX.DETECTED" 
      class="w-fit flex items-center gap-1 text-xs font-bold text-white bg-[#2fd47c] px-2 py-1 rounded-md text-left"
    >
      <CircleCheck :size="12" />
      OK
    </span>
    </div>

  </div>
</template>
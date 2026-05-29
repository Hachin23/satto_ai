<script setup lang="ts">
import { Sparkles, CircleCheck } from 'lucide-vue-next'

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
      <span v-if="status === 0" 
        class="w-fit flex items-center gap-1 text-xs font-bold text-white bg-[#2fd47c] px-2 py-1 rounded-full text-left"
      >
      
        <CircleCheck :size="12" />
        OK
      </span>

      <span v-else 
        class="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-1 rounded-md"
      >
        <Sparkles :size="14" />
        改善あり
      </span>
    </div>

  </div>
</template>
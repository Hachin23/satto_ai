<script setup lang="ts">
import { Sparkles, CircleCheck } from 'lucide-vue-next'

defineProps<{
  imageUrl: string
  date?: string        // 撮影日時（オプション）
  showDelete?: boolean   // ゴミ箱アイコンを出すかどうか（オプション）
  status?: number    // 「OK! この写真で大丈夫です」などのテキスト
  action?: string   // 「一歩下がって撮ろう」など
  actionDetail?: string,    // 「もう少し距離をとると…」など
}>()

// イベントの定義（ゴミ箱ボタンが押されたとき用）
const emit = defineEmits<{
  (e: 'delete'): void
}>()
</script>

<template>
  <div class="w-full bg-white rounded-2xl p-1 shadow-sm flex flex-col gap-1 text-slate-800 text-left mb-2">
    
    <div v-if="date || showDelete" class="flex justify-between items-center text-xs text-slate-400">
      <span>{{ date }}</span>
      <button v-if="showDelete" @click="emit('delete')" class="text-slate-400 hover:text-red-500 transition-colors">
        🗑️
      </button>
    </div>

    <div class="w-full overflow-hidden rounded-xl bg-slate-100 aspect-[4/3] flex items-center justify-center">
      <img :src="imageUrl" alt="撮影画像" class="w-full h-full object-cover" />
    </div>

    <div v-if="status == 0" class="w-fit flex items-center gap-1.5 text-xs font-bold text-white bg-[#1B7243] px-3 py-1 rounded-full text-left">
      <CircleCheck :size="14" />
      <span>OK</span>
    </div>
    <div v-else class="w-fit flex items-center gap-1.5 text-sm font-bold text-white bg-yellow-400 p-1 rounded-lg text-left">
      <Sparkles :size="14" />
      <span>改善あり</span>
    </div>    
  </div>

  <div v-if="status == 0" class="w-full bg-white rounded-xl p-2 border border-slate-100">
    <div class="flex items-center gap-1 text-xs font-bold text-pink-500 mb-1">
      <span>✨</span>
      <span>AIグッジョブ！</span>
    </div>
    <h4 class="text-sm font-bold text-slate-800 mb-1">{{ action }}</h4>
    <p class="text-xs text-slate-500 leading-relaxed">{{ actionDetail }}</p>
  </div>
  <div v-else class="w-full bg-white rounded-xl p-2 border border-slate-100">
    <div class="flex items-center gap-2 text-xs font-bold text-pink-500 mb-1">
      <span>💬</span>
      <span>AIアドバイス</span>
    </div>
    <h4 class="text-sm font-bold text-slate-800 mb-1">{{ action }}</h4>
    <p class="text-xs text-slate-500 leading-relaxed">{{ actionDetail }}</p>
  </div>

</template>
<script setup lang="ts">
import { Sparkles, CircleCheck, Trash2 } from 'lucide-vue-next'
import { FACE_STATUS_INDEX } from '@/types/faceAnalysisTypes'

defineProps<{
  photoUrl: string
  // 撮影日時（オプション）
  createdAt?: string
  // ゴミ箱アイコンを出すかどうか（オプション）
  showDelete?: boolean
  // 「OK! この写真で大丈夫です」などのテキスト
  status?: number
  // 「一歩下がって撮ろう」など
  actionText?: string
  // 「もう少し距離をとると…」など
  aiActionDetail?: string
}>()

// イベントの定義（ゴミ箱ボタンが押されたとき用）
const emit = defineEmits<{
  (e: 'confirm'): void
}>()
</script>

<template>
  <div class="w-full bg-white rounded-xl p-1 shadow-sm flex flex-col gap-1 text-slate-800 text-left mb-2">
    
    <div v-if="createdAt || showDelete" class="flex justify-between items-center text-xs text-slate-400">
      <div class="w-12"></div>

      <span class="flex-1 text-center">
        {{ createdAt }}
      </span>
      
      <div class="w-12 flex items-center justify-end gap-1">
        <button v-if="showDelete" 
          @click="emit('confirm')" 
          class="text-slate-400 hover:text-red-500 transition-colors p-1"
        >
          <Trash2 :size="16" />
        </button>
      </div>
    </div>

    <div class="w-full overflow-hidden rounded-xl bg-slate-100 aspect-[8/7] flex items-center justify-center">
      <img 
        :src="photoUrl" 
        alt="撮影画像" 
        class="w-full h-full object-cover" 
      />
    </div>

    <div v-if="status === FACE_STATUS_INDEX.NOT_DETECTED"
      class="w-fit flex items-center gap-1.5 text-xs font-bold text-white bg-[#11c2f870] px-3 py-1 rounded-full text-left">
      <span>風景・その他</span>
    </div>
    <div v-else-if="status == FACE_STATUS_INDEX.VERIFYING"
      class="w-fit flex items-center gap-1.5 text-sm font-bold text-white bg-yellow-400 p-1 rounded-lg text-left">
      <Sparkles :size="14" />
      <span>改善あり</span>
    </div>
    <div v-else-if="status == FACE_STATUS_INDEX.DETECTED" 
      class="w-fit flex items-center gap-1.5 text-xs font-bold text-white bg-[#2fd47c] px-3 py-1 rounded-full text-left">
      <CircleCheck :size="14" />
      <span>OK</span>
    </div>
  </div>

  <div v-if="status == FACE_STATUS_INDEX.VERIFYING || status == FACE_STATUS_INDEX.DETECTED" 
    class="w-full bg-white rounded-xl p-2 border border-slate-100">
    <div v-if="status == FACE_STATUS_INDEX.VERIFYING" 
      class="flex items-center gap-1 text-xs font-bold text-pink-500 mb-1">
      <span>💬</span>
      <span>AIアドバイス</span>
    </div>
    <div v-else class="flex items-center gap-2 text-xs font-bold text-pink-500 mb-1">
      <span>✨</span>
      <span>AIグッジョブ！</span>
    </div>
    <h4 class="text-sm font-bold text-slate-800 mb-1">{{ actionText }}</h4>
    <p class="text-xs text-slate-500 leading-relaxed">{{ aiActionDetail }}</p>
  </div>
  <div v-else class="text-center py-4 px-4 bg-neutral-600/30 rounded-xl">
    <p class="text-sm text-neutral-500 font-medium">
        ⚠️ 人が写っていないため、アドバイスは非表示になります。
    </p>
  </div>

</template>
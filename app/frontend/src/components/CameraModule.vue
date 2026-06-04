<script setup lang="ts">
import { Camera } from 'lucide-vue-next'
import { FaceStatusState } from '@/types/faceAnalysisTypes'

const props = defineProps<{
  videoRef: any
  isProcessing: boolean
  faceStatus: FaceStatusState
}>()

defineEmits(['shutter'])
</script>

<template>
  <div class="w-full h-full flex flex-col bg-black overflow-hidden border-slate-700">
    
    <div class="flex-1 relative">
      <video
        :ref="(el) => videoRef.value = el" 
        autoplay 
        playsinline
        muted
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div class="absolute bottom-6 left-0 right-0 mx-auto px-4 w-full max-w-md z-50">
        <div 
          class="flex items-center justify-center gap-3 px-5 py-4 rounded-2xl border backdrop-blur-md shadow-2xl transition-all duration-300 transform"
          :class="{
          'bg-rose-500/20 border-rose-500/40 text-rose-200': faceStatus.status === 'NOT_DETECTED',
          'bg-amber-500/20 border-amber-500/40 text-amber-200 animate-pulse': faceStatus.status === 'VERIFYING',
          'bg-emerald-500/20 border-emerald-500/40 text-emerald-200 ring-2 ring-emerald-500/50': faceStatus.status === 'DETECTED'
          }"
        >
          <div class="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full text-base">
            {{ faceStatus.icon }}
          </div>

          <p class="text-base font-bold tracking-wide text-center drop-shadow-sm">
            {{ faceStatus.message }}
          </p>
        </div>
      </div>
    </div>

    <div class="h-24 flex justify-center items-center shrink-0">
      <button 
        @click="$emit('shutter')"
        :disabled="isProcessing"
        class="bg-white w-16 h-16 rounded-full flex items-center justify-center active:scale-90 transition-transform disabled:opacity-50"
      >
        <Camera v-if="!isProcessing" :size="28" class="text-[#FF6366]" />
        <div v-else class="animate-spin rounded-full h-8 w-8 border-t-2 border-white"></div>
      </button>
    </div>
  </div>
</template>
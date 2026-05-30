<script setup lang="ts">
import { Camera } from 'lucide-vue-next'

const props = defineProps<{
  videoRef: any
  isProcessing: boolean
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
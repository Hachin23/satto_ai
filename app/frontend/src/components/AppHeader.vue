<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ChevronLeftIcon, CircleX } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()

// ルーターのmetaから値を取得
const title = computed(() => route.meta.headerTitle as string || '')
const backIcon = computed(() => route.meta.backIcon as 'none' | 'close' | 'arrow' || 'none')
const backPath = computed(() => route.meta.backPath as string || '')

defineProps({
  bgColor: { type: String, default: 'bg-white' },
  borderClass: { type: String, default: 'border-b border-gray-200' },  
  textColor: { type: String, default: 'text-gray-800' }
})

const handleBack = () => {
  if (backPath.value) {
    router.push(backPath.value)
  } else {
    router.back()
  }
}

</script>

<template>  
  <header 
    class="w-full flex items-end justify-between px-4 pb-3 z-50 shrink-0 sticky top-0
           pt-[env(safe-area-inset-top)] h-[calc(56px+env(safe-area-inset-top))]"
    :class="[bgColor, borderClass, textColor]"
  >
    <div class="w-10 h-8 flex items-center justify-start">
      <button 
        v-if="backIcon !== 'none'" 
        @click="handleBack" 
        class="text-xl font-light p-1 active:opacity-50"
      >
      <CircleX v-if="backIcon === 'close'" :size="24"/>
      <ChevronLeftIcon v-else-if="backIcon === 'arrow'" :size="24" />
      </button>
    </div>

    <div class="absolute left-1/2 bottom-3 -translate-x-1/2 flex items-center justify-center">
      <h1 v-if="title" class="text-base font-bold tracking-wide">
        {{ title }}
      </h1>
    </div>

    <div class="w-fit flex items-center justify-end">
      <slot />
    </div>
  </header>
</template>
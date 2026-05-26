<script setup>
// 各画面で背景色・ボーダー・文字色を変更可能
defineProps({
  bgColor: { type: String, default: 'bg-white' },
  borderClass: { type: String, default: 'border-b border-gray-200' },  
  textColor: { type: String, default: 'text-gray-800' }
})
</script>

<template>  
  <header 
    class="w-full flex items-end justify-between px-4 pb-3 z-50 shrink-0
           pt-[env(safe-area-inset-top)] h-[calc(56px+env(safe-area-inset-top))]"
    :class="[bgColor, borderClass, textColor]"
  >
    <slot />
  </header>
</template>
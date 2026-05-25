<script setup>
  import AppHeader from '@/components/AppHeader.vue'
  import { ChevronLeftIcon } from 'lucide-vue-next'
</script>

<template>
  <div class="flex flex-col h-full w-full">
    <AppHeader>
      <button @click="$router.back()" class="p-1 text-gray-600 hover:bg-gray-100 rounded-full">
        <ChevronLeftIcon class="w-6 h-6" />
      </button>
    </AppHeader>

    <div class="flex-1 p-6 flex flex-col items-center justify-center bg-gray-50">
      <p class="text-gray-500 font-medium">📷 カメラ画面（検証用）</p>
    </div>
  </div>
</template>

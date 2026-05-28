<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { CircleX } from 'lucide-vue-next'

import AppHeader from '@/components/AppHeader.vue'

const router = useRouter()
const route = useRoute()

// タイトルを取得
const pageTitle = computed(() => {
  return (route.meta?.title as string) || 'タイトル未定義'
})

</script>

<template>
  <div class="flex flex-col items-center h-full w-full">
    <AppHeader
      bgColor="bg-[#F2F2F5]" 
      borderClass="border-none" 
    >
      <button
        class="p-1 text-gray-600 hover:bg-gray-100 rounded-full"
        @click="router.push('/')"
      >
        <CircleX class="w-6 h-6" />
      </button>
    </AppHeader>

    <h1 class="text-xl font-bold mb-2">{{ pageTitle }}</h1>

    <div class="w-full flex-1 p-6 flex flex-col">
      <a
        href="https://satto-photo-docs.pages.dev/legal/terms"
        target="_blank"
        rel="noopener noreferrer"
        class="w-full bg-white py-4 rounded-2xl border border-black text-lg font-medium hover:bg-gray-50 transition shadow-sm mb-4 text-center block"
      >
        利用規約
      </a>
      
      <a
        href="https://satto-photo-docs.pages.dev/legal/privacy"
        target="_blank"
        rel="noopener noreferrer"
        class="w-full bg-white py-4 rounded-2xl border border-black text-lg font-medium hover:bg-gray-50 transition shadow-sm text-center block"
      >
        プライバシーポリシー
      </a>
    </div>
  </div>
</template>
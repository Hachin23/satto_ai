<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
</script>

<template>
  <div class="flex flex-col items-center h-full w-full">

    <AppHeader bgColor="bg-[#F2F2F5]" borderClass="border-none" />

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
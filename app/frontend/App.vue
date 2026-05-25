<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import AppFooter from '@/components/AppFooter.vue'
</script>

<template>
  <div class="h-screen bg-[#F2F2F5] text-slate-900 flex flex-col max-w-md mx-auto shadow-sm overflow-hidden">
    <main class="flex-1 w-full overflow-y-auto">
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>
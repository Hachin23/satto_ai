<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import AppFooter from '@/components/AppFooter.vue'

const route = useRoute()  
</script>

<template>
  <div class="h-screen bg-[#F2F2F5] text-slate-900 flex flex-col max-w-md mx-auto shadow-sm overflow-hidden">
    <div class="flex-1 w-full overflow-y-auto">
      <RouterView />
    </div>
    <AppFooter v-if="!route.meta.hideFooter"/>
  </div>
</template>
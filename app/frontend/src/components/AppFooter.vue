<script setup>
  import { SettingsIcon, HouseIcon } from 'lucide-vue-next'
</script>

<template>
  <footer class="w-full bg-white border-t border-slate-200 py-2 flex justify-around text-xs">
    <button
      class="flex flex-col items-center gap-1 text-slate-900" 
      @click="$router.push('/')"
    >
      <HouseIcon class="text-lg" />
      <span>ホーム</span>
    </button>
    <button
      class="flex flex-col items-center gap-1 text-slate-900" 
      @click="$router.push('/settings')"
    >
      <SettingsIcon class="text-lg" />
      <span>設定</span>
    </button>
  </footer>
</template>

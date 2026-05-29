<script setup lang="ts">
const props = defineProps<{
  id: string 
}>()
</script>

<template>
  <h1>撮影履歴詳細 履歴ID: {{ props.id }}</h1>
</template>
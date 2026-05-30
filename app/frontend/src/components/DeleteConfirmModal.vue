<script setup lang="ts">

defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'delete'): void
}>()

</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-if="show" 
        class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        @click.self="emit('close')"
      >
        <div class="bg-white w-full max-w-xs rounded-2xl p-6 shadow-xl transform transition-all flex flex-col items-center text-center">
          
          <h3 class="text-base font-bold text-slate-800 mb-2">
            履歴を削除しますか？
          </h3>
          <p class="text-xs text-slate-500 leading-relaxed mb-6">
            この操作は取り消せません。<br>
            この撮影履歴は完全に削除されます。
          </p>

          <div class="w-full flex flex-col gap-2">
            <button 
              @click="emit('delete')" 
              class="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-medium text-sm rounded-xl active:scale-[0.98] transition-all"
            >
              はい、削除します
            </button>
            
            <button 
              @click="emit('close')" 
              class="w-full py-3 text-white bg-slate-200 hover:bg-slate-400 font-medium text-sm rounded-xl transition-colors"
            >
              キャンセル
            </button>
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>
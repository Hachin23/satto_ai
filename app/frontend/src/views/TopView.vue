<script setup>
  import { CameraIcon, HistoryIcon } from 'lucide-vue-next'
</script>

<template>
  <div class="flex flex-col items-center justify-between h-full w-full px-6 py-6">

    <div class="relative flex flex-col items-center w-full mt-6">
      <div class="absolute -top-1 w-32 h-32 opacity-30 z-0">
        <img src="@/../assets/images/bg-lens-aperture.png" alt="" class="w-full h-full object-contain">
      </div>

      <div class="relative z-10 text-center mt-6">
        <h1 class="text-5xl font-bold text-gray-900 tracking-tight">Satto Photo</h1>
        <p class="text-lg text-gray-500 mt-1 font-medium">〜 迷わない一枚へ 〜</p>
      </div>

      <div class="w-full bg-[#E5E7FF] rounded-2xl px-6 py-2 text-center mb-4 mt-4 shadow-sm">
        <p class="text-sm font-bold text-indigo-900 leading-relaxed">
          あなたの写真をナビゲート！<br>
          指示通りに動くだけで、迷わない一枚へ。
        </p>
      </div>
      <div class="flex-1 w-full flex flex-col justify-center items-center py-2">
        <img 
          src="@/../assets/images/app_landscape_explanation.webp" 
          class="w-full max-w-[340px] h-auto object-contain transition-all duration-300"
          alt="使い方の手順" 
        />

      </div>
    </div>

    <div class="flex-1 min-h-[16px]"></div>

    <div class="w-full space-y-3">
      <button 
        @click="$router.push('/camera')"
        class="w-full bg-[#FF6B6B] hover:bg-[#FF5252] text-white py-2 rounded-[2rem] flex items-center justify-center shadow-lg transition-transform active:scale-95"
      >
        <CameraIcon class="w-12 h-12 mr-4" />
        <div class="text-left">
          <p class="text-2xl font-bold leading-none">写真を撮る</p>
          <p class="text-[10px] opacity-90 tracking-wider">Let's take a picture!</p>
        </div>
      </button>

      <button 
        @click="$router.push('/history')"
        class="w-full bg-white hover:bg-gray-50 text-gray-800 py-2 rounded-[2rem] flex items-center justify-center shadow-md border border-gray-100 transition-transform active:scale-95"
      >
        <HistoryIcon class="w-10 h-10 text-blue-500 mr-4" />
        <div class="text-left">
          <p class="text-lg font-bold leading-none text-gray-700">撮影履歴を見る</p>
          <p class="text-[10px] text-gray-400">show history</p>
        </div>
      </button>
    </div>

  </div>
</template>
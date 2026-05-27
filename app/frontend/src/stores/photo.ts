import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePhotoStore = defineStore('photo', () => {
  const capturedBlob = ref<Blob | null>(null)

  return { capturedBlob }
})
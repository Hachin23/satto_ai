import { defineStore } from 'pinia'
import { ref } from 'vue'
import { db } from '@/database/db'
import { formatDate } from '@/utils/dateUtils'

interface DisplayPhotoRecord {
  id?: number
  thumbnailUrl: string
  createdAt: string
  status: number
}

export const useHistoryStore = defineStore('history', () => {
  const historyList = ref<DisplayPhotoRecord[]>([])

  // DBから全履歴を取得する処理
  const fetchHistory = async () => {
    
    const records = await db.photo_records.orderBy('createdAt').reverse().toArray()

    historyList.value = records.map(record => {
      return {
        id: record.id,
        thumbnailUrl: URL.createObjectURL(record.thumbnailImage),
        createdAt: formatDate(new Date(record.createdAt)),
        status: record.resultStatus
      }
    })
  }

  return { historyList, fetchHistory }
})
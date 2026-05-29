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

interface DetailPhotoRecord {
  id?: number
  photoUrl: string
  createdAt: string
  status: number
  actionText: string
  aiActionDetail: string 
}

export const useHistoryStore = defineStore('history', () => {
  const historyList = ref<DisplayPhotoRecord[]>([])

  // DBから全履歴を取得する処理
  const fetchHistory = async (): Promise<void> => {
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
  
  // 
  const fetchDetailHistory = async (id: number): Promise<DetailPhotoRecord | null> => {
    const record = await db.photo_records.get(id)
    if (!record) return null

    // 日付（number）を Date オブジェクトにしてから文字列に変換
    const formattedDate = formatDate(new Date(record.createdAt))

    // Blobを画面表示用のURLに変換 TODO:本リリース時に内部ファイルに差し替え
    let imageUrl = 'https://placehold.jp/24272c/ffffff/400x300.png?text=No+Image'
    if (record.photo) {
      imageUrl = URL.createObjectURL(record.photo)
    }

    return {
      id: record.id!,
      photoUrl: imageUrl,
      createdAt: formattedDate,
      status: record.resultStatus,
      actionText: record.actionText,
      aiActionDetail: record.aiActionDetail
    }
  }

  return { historyList, fetchHistory, fetchDetailHistory }
})
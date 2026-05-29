import Dexie, { type Table } from 'dexie'

// データベースに保存する「写真履歴」の型定義
export interface PhotoRecord {
  // 自動連番のプライマリーキー
  id?: number
  // 撮影写真データ
  photo: Blob
  // 撮影一覧表示用サムネイル
  thumbnailImage: Blob
  // 0: OK, 1: 改善あり
  resultStatus: number
  // AIアドバイスのタイトル
  actionText: string
  // お気に入りかどうか(MVPでは使用しないのでコメントアウト)
  isFavorite: boolean
  // AIアドバイスの詳細本文
  aiActionDetail: string
  // 撮影日時
  createdAt: number
  // 更新日時
  updatedAt: number
}

//　設定を保持するテーブル
export interface Setting {
  key: string;
  value: any;
}

// Dexieクラスを継承してカスタムDBを作成
class SattoPhotoDatabase extends Dexie {
  photo_records!: Table<PhotoRecord>
  settings!: Table<Setting>;

  constructor() {
    super('SattoPhotoDatabase')
    
    // テーブルとインデックス（検索対象にするキー）の定義
    this.version(1).stores({
      photo_records: '++id, createdAt, resultStatus, isFavorite',
      settings: 'key'
    })
  }
}

// アプリ全体で使い回すためにインスタンスをエクスポート
export const db = new SattoPhotoDatabase()
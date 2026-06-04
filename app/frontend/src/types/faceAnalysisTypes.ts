// 距離の判定ステータス
export type DistanceStatus =
  | 'too_far'   
  | 'too_close' 
  | 'good'

export type DistanceActionKey = {
  [key in DistanceStatus]: { text: string; icon: string};
};

// 顔の位置の判定ステータス
export type PositionStatus =
  | 'too_left'
  | 'too_right'
  | 'center'

export type PositionActionKey = {
  [key in PositionStatus]: { text: string; icon: string};
};

// 傾きの判定ステータス
export type TiltStatus =
  | 'tilted_left' 
  | 'tilted_right' 
  | 'level'

export type TiltActionKey = {
  [key in TiltStatus]: { text: string; icon: string};
};

// 頭上の余白（ヘッドルーム）の判定ステータス
export type HeadRoomStatus =
  | 'too_tight'
  | 'too_loose'
  | 'good'

export type HeadRoomActionKey = {
  [key in HeadRoomStatus]: { text: string; icon: string};
};

// 判定データ取得の型
export interface FaceAnalysisResult {
  boundingBox: { minX: number; minY: number; maxX: number; maxY: number }
  faceCenter: { x: number; y: number }
  angle: number
  areaRatio: number
  headroomRatio: number
}

// 閾値判定結果の型
export interface FaceJudgeResult {
  isAllOk: boolean
  distance: {
    status: DistanceStatus,
    areaRatio: number
  }
  position: {
    status: PositionStatus,
    offsetFromCenterX: number
  }
  tilt: {
    status: TiltStatus,
    angle: number
  }
  headroom: {
    status: HeadRoomStatus,
    headroomRatio: number
  }
}

// 顔の検出ステータス
export const FACE_DETECT_STATUS_LIST = ['NOT_DETECTED', 'VERIFYING', 'DETECTED'] as const
export type FaceDetectStatus = typeof FACE_DETECT_STATUS_LIST[number]
export const FACE_STATUS_INDEX = {
  NOT_DETECTED: FACE_DETECT_STATUS_LIST.indexOf('NOT_DETECTED'), // 0
  VERIFYING:    FACE_DETECT_STATUS_LIST.indexOf('VERIFYING'),     // 1
  DETECTED:     FACE_DETECT_STATUS_LIST.indexOf('DETECTED')       // 2
} as const

// 顔検出状態の管理用オブジェクトの型
export interface FaceStatusState {
  status: FaceDetectStatus
  message: string
  icon: string
  isValid: boolean // すべての閾値をクリアして撮影可能かどうか
}
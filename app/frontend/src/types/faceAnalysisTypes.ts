// 距離の判定ステータス
export type DistanceStatus =
  | 'too_far'   
  | 'too_close' 
  | 'good'

export type DistanceActionKey = {
  [key in DistanceStatus]: string;
};

// 顔の位置の判定ステータス
export type PositionStatus =
  | 'too_left'
  | 'too_right'
  | 'center'

export type PositionActionKey = {
  [key in PositionStatus]: string;
};

// 傾きの判定ステータス
export type TiltStatus =
  | 'tilted_left' 
  | 'tilted_right' 
  | 'level'

export type TiltActionKey = {
  [key in TiltStatus]: string;
};

// 頭上の余白（ヘッドルーム）の判定ステータス
export type HeadRoomStatus =
  | 'too_tight'
  | 'too_loose'
  | 'good'

export type HeadRoomActionKey = {
  [key in HeadRoomStatus]: string;
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
export type FaceDetectStatus = 'NOT_DETECTED' | 'VERIFYING' | 'DETECTED'

// 顔検出状態の管理用オブジェクトの型
export interface FaceStatusState {
  status: FaceDetectStatus
  message: string
  isValid: boolean // すべての閾値をクリアして撮影可能かどうか
}
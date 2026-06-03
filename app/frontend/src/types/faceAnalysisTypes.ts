// 距離の判定ステータス
export type DistanceStatus =
  | 'too_far'   
  | 'too_close' 
  | 'good'

// 顔の位置の判定ステータス
export type PositionStatus =
  | 'too_left'
  | 'too_right'
  | 'center'

// 傾きの判定ステータス
export type TiltStatus =
  | 'tilted_left' 
  | 'tilted_right' 
  | 'level'

// 頭上の余白（ヘッドルーム）の判定ステータス
export type HeadRoomStatus =
  | 'too_tight'
  | 'too_loose'
  | 'good'


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
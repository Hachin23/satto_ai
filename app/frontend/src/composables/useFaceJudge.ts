import { FACE_THRESHOLDS } from '@/config/faceAnalysisConfig'
import type { 
  FaceAnalysisResult, 
  FaceJudgeResult, 
  DistanceStatus, 
  PositionStatus, 
  TiltStatus, 
  HeadRoomStatus 
} from '@/types/faceAnalysisTypes'

export const useFaceJudge = () => {
  
  // 1. 距離（サイズ）の判定
  const judgeDistance = (areaRatio: number): DistanceStatus => {
    if (areaRatio < FACE_THRESHOLDS.AREA.MIN) return 'too_far'
    if (areaRatio > FACE_THRESHOLDS.AREA.MAX) return 'too_close'
    return 'good'
  }

  // 2. 位置（中央構図）の判定
  const judgePosition = (faceCenter: FaceAnalysisResult['faceCenter']): PositionStatus => {
    const offsetFromCenterX = faceCenter.x - 0.5 
    // 0.5（真ん中）から左にズレすぎているか
    if (offsetFromCenterX < -FACE_THRESHOLDS.CENTER.LIMIT_X) return 'too_left'
    // 0.5（真ん中）から右にズレすぎているか
    if (offsetFromCenterX > FACE_THRESHOLDS.CENTER.LIMIT_X) return 'too_right'
    return 'center'
  }

  // 3. 傾き（水平）の判定
  const judgeTilt = (angle: number): TiltStatus => {
    if (angle > FACE_THRESHOLDS.TILT.LIMIT) return 'tilted_left'
    if (angle < -FACE_THRESHOLDS.TILT.LIMIT) return 'tilted_right'
    return 'level'
  }

  // 4. 頭上の空間（ヘッドルーム）の判定
  const judgeHeadroom = (headroomRatio: FaceAnalysisResult['headroomRatio']): HeadRoomStatus => {
    if (headroomRatio < FACE_THRESHOLDS.TOP_MARGIN.MIN) return 'too_tight'
    if (headroomRatio > FACE_THRESHOLDS.TOP_MARGIN.MAX) return 'too_loose'
    return 'good'
  }

  // 総合ジャッジするメイン関数
  const judgeFaceStatus = (analysis: FaceAnalysisResult): FaceJudgeResult => {
    const distanceStatus = judgeDistance(analysis.areaRatio)
    const positionStatus = judgePosition(analysis.faceCenter)
    const tiltStatus = judgeTilt(analysis.angle)
    const headroomStatus = judgeHeadroom(analysis.headroomRatio)

    // すべてのステータスが適正（good / center / level）なら撮影OK！
    const isAllOk = 
      distanceStatus === 'good' &&
      positionStatus === 'center' &&
      tiltStatus === 'level' &&
      headroomStatus === 'good'

    return {
      isAllOk,
      distance: {
        status: distanceStatus,
        areaRatio: analysis.areaRatio
      },
      position: {
        status: positionStatus,
        offsetFromCenterX: analysis.faceCenter.x - 0.5
      },
      tilt: {
        status: tiltStatus,
        angle: analysis.angle
      },
      headroom: {
        status: headroomStatus,
        headroomRatio: analysis.headroomRatio
      }
    }
  }

  return {
    judgeFaceStatus
  }
}
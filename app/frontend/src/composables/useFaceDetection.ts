import { ref } from 'vue'
import type { FaceStatusState, FaceAnalysisResult, FaceJudgeResult } from '@/types/faceAnalysisTypes'
import { useActionMapping } from '@/composables/useActionMapping'
import type { FaceLandmarkerResult, NormalizedLandmark } from '@mediapipe/tasks-vision'

const NOT_DETECTED_TEXT = "画面に顔を映してください"

export const useFaceDetection = () => {
  const { decideOneAction } = useActionMapping()

  // リアクティブな状態管理
  const faceStatus = ref<FaceStatusState>({
    status: 'NOT_DETECTED', 
    message: NOT_DETECTED_TEXT,
    isValid: false
  })

  /**
   * MediaPipe の毎フレームの結果を受けて、ステータスを更新する
   */
  const handleFaceDetection = (
    result: FaceLandmarkerResult | null,
    analyzeFaceData: (landmarks: NormalizedLandmark[]) => FaceAnalysisResult | null,
    judgeFaceStatus: (analysis: FaceAnalysisResult) => FaceJudgeResult
  ) => {
    // 顔が検出されている場合
    if (result && result.faceLandmarks && result.faceLandmarks.length > 0) {
      const landmarks = result.faceLandmarks[0]
      const analysis = analyzeFaceData(landmarks)
      
      if (analysis) {
        const judgeResult = judgeFaceStatus(analysis)
        const actionText = decideOneAction(judgeResult)
        
        if (judgeResult.isAllOk) {
          // 撮影可能！
          faceStatus.value = {
            status: 'DETECTED',
            message: actionText,
            isValid: true
          }
        } else {
          // 位置や傾きを調整中（検証中）
          faceStatus.value = {
            status: 'VERIFYING',
            message: actionText,
            isValid: false
          }
        }
      }
    } 
    // 顔が映っていない場合
    else {
      faceStatus.value = {
        status: 'NOT_DETECTED',
        message: NOT_DETECTED_TEXT,
        isValid: false
      }
    }
  }

  return {
    faceStatus,
    handleFaceDetection
  }
}
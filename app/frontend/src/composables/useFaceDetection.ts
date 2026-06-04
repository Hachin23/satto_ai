import { ref } from 'vue'
import type { FaceStatusState, FaceAnalysisResult, FaceJudgeResult, FaceDetectStatus } from '@/types/faceAnalysisTypes'
import { useActionMapping } from '@/composables/useActionMapping'
import type { FaceLandmarkerResult, NormalizedLandmark } from '@mediapipe/tasks-vision'
import { throttle } from 'es-toolkit'

const NOT_DETECTED_TEXT = "画面に顔を映してください"

export const useFaceDetection = () => {
  const { decideOneAction } = useActionMapping()

  // リアクティブな状態管理
  const faceStatus = ref<FaceStatusState>({
    status: 'NOT_DETECTED',
    message: NOT_DETECTED_TEXT,
    icon: "",
    isValid: false
  })

  const throttledUpdateUI = throttle((action: { text: string; icon: string} , isAllOK: boolean) => {
    let currentStatus: FaceDetectStatus = isAllOK ? 'DETECTED' : 'VERIFYING'

    faceStatus.value = {
      status: currentStatus,
      message: action.text,
      icon: action.icon,
      isValid: currentStatus === 'DETECTED'
    }
  }, 150)

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
        const action = decideOneAction(judgeResult)
        throttledUpdateUI(action, judgeResult.isAllOk)
        return judgeResult
      }
    }

    // 顔が映っていない場合
    throttledUpdateUI.cancel()
    faceStatus.value = {
      status: 'NOT_DETECTED',
      message: NOT_DETECTED_TEXT,
      icon: "👤",
      isValid: false
    }
    return null
  }

  return {
    faceStatus,
    handleFaceDetection,
    throttledUpdateUI
  }
}
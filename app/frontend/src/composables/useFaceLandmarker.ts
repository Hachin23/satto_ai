
import { ref } from 'vue'
import { FilesetResolver, FaceLandmarker } from '@mediapipe/tasks-vision'

const isAiLoading = ref(false)
let sharedFaceLandmarker: FaceLandmarker | null = null

export const useFaceLandmarker = () => {

  const initFaceAi = async () => {  
    
    if (sharedFaceLandmarker || isAiLoading.value) {
      console.log('初期化済みまたは初期化中です')
      return
    }
    
    isAiLoading.value = true
    try {
      //Wasm(WebAssembly)の読み込み
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );
  
      sharedFaceLandmarker = await FaceLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: '/face_landmarker.task', //public直下に配置
          delegate: 'GPU'
        },
        runningMode: "VIDEO", // カメラ映像のリアルタイム解析用
        outputFaceBlendshapes: true, // 笑顔などの判定用
        numFaces: 1 // 検出できる顔の最大数
      });
      
      console.log('FaceLandmarker 初期化成功')
    } catch (error) {
      console.error('AIの初期化に失敗しました:', error)
    } finally {
      isAiLoading.value = false
    }
  }

  const analyzeFrame = (videoElement: HTMLVideoElement) => {
    if (!sharedFaceLandmarker || videoElement.readyState < videoElement.HAVE_CURRENT_DATA) return null
    return sharedFaceLandmarker.detectForVideo(videoElement, performance.now())
  }

  return {
    isAiLoading,
    initFaceAi,
    analyzeFrame
  }
}

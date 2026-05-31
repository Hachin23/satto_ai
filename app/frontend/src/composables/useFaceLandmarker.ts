
import { ref } from 'vue'
import { FilesetResolver, FaceLandmarker } from '@mediapipe/tasks-vision'

const isAiLoading = ref(true)
let sharedFaceLandmarker: FaceLandmarker | null = null

export const useFaceLandmarker = () => {

  const initFaceAi = async () => {  
    
    if (sharedFaceLandmarker) {
      console.log('既存の FaceLandmarker を再利用します')
      return
    }
  
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
      
      isAiLoading.value = false
      console.log('FaceLandmarker 初期化成功')
    } catch (error) {
      console.error('AIの初期化に失敗しました:', error)
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

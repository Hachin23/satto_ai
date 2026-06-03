import type { NormalizedLandmark } from '@mediapipe/tasks-vision'
import type { FaceAnalysisResult } from '@/types/faceAnalysisTypes'

// 顔ランドマークのインデックス
const LEFT_IRIS_CENTER_INDEX = 468 
const RIGHT_IRIS_CENTER_INDEX = 473
const TOP_HEAD_INDEX = 10

export const useFaceAnalysis = () => {

  // 1.boundingBoxの算出
  const calculateBoundingBox = (faceLandmarks: NormalizedLandmark[])=> {
    let minX = Infinity
    let maxX = -Infinity
    let minY = Infinity
    let maxY = -Infinity

    for (let i = 0; i < faceLandmarks.length; i++) {
      const l = faceLandmarks [i]
      if (l.x < minX) minX = l.x
      if (l.x > maxX) maxX = l.x
      if (l.y < minY) minY = l.y
      if (l.y > maxY) maxY = l.y
    }
    return { minX, minY, maxX, maxY }
  }

  // 2.顔の位置を算出
  const calculateFaceCenter = (boundingBox: FaceAnalysisResult['boundingBox']) => {
    const bboxCenterX = (boundingBox.minX + boundingBox.maxX) / 2
    const bboxCenterY = (boundingBox.minY + boundingBox.maxY) / 2
    return {
      x: bboxCenterX,
      y: bboxCenterY
    }
  }

  // 3.傾きを算出
  const calculateAngle = (faceLandmarks: NormalizedLandmark[]) => {
    // 左右の黒目の中心の座標を取得
    const leftEye = faceLandmarks[LEFT_IRIS_CENTER_INDEX]
    const rightEye = faceLandmarks[RIGHT_IRIS_CENTER_INDEX]

    // 2点間の y の差と x の差を計算
    const dy = leftEye.y - rightEye.y
    const dx = leftEye.x - rightEye.x

    // Math.atan2 を使って角度（ラジアン）を求め、度数法（°）に変換
    const radians = Math.atan2(dy, dx)
    const angle = radians * (180 / Math.PI)

    return angle
  }

  // 4.距離を算出
  const calculateAreaRatio = (boundingBox: FaceAnalysisResult['boundingBox']) => {
    const areaRatio = (boundingBox.maxX - boundingBox.minX) * (boundingBox.maxY - boundingBox.minY)
    return areaRatio
  }
  
  // 5. 上の余白を算出
  const calculateHeadroomRatio = (faceLandmarks: NormalizedLandmark[]) => {
    // 頭のてっぺん（10番）のY座標を使用
    const topHeadY = faceLandmarks[TOP_HEAD_INDEX].y
    const headroomRatio = topHeadY
    return headroomRatio
  }

  const analyzeFaceData = (faceLandmarks: NormalizedLandmark[]): FaceAnalysisResult | null => {
    if (!faceLandmarks || faceLandmarks.length === 0) return null

    const boundingBox = calculateBoundingBox(faceLandmarks)
    const faceCenter = calculateFaceCenter(boundingBox)
    const angle = calculateAngle(faceLandmarks)
    const areaRatio = calculateAreaRatio(boundingBox)
    const headroomRatio = calculateHeadroomRatio(faceLandmarks)

    return {
      boundingBox,
      faceCenter,
      angle,
      areaRatio,
      headroomRatio
    }
  }
  return {
    analyzeFaceData
  }
}
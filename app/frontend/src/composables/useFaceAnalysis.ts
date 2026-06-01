import type { NormalizedLandmark } from '@mediapipe/tasks-vision'

export interface FaceAnalysisResult {
  boundingBox: { minX: number; minY: number; maxX: number; maxY: number }
  centerOffset: { x: number; y: number }
  angle: number
  areaRatio: number
  margins: { top: number; bottom: number; left: number; right: number }
}

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
  const calculateCenterOffset = (boundingBox: FaceAnalysisResult['boundingBox']) => {
    const bboxCenterX = (boundingBox.minX + boundingBox.maxX) / 2
    const bboxCenterY = (boundingBox.minY + boundingBox.maxY) / 2
    return { x:bboxCenterX, y: bboxCenterY }
  }

  // 3.傾きを算出
  const calculateAngle = (faceLandmarks: NormalizedLandmark[]) => {
    // 左右の黒目の中心の座標を取得
    const leftEye = faceLandmarks[468]  // 画面の右側（本人の左目）
    const rightEye = faceLandmarks[473] // 画面の左側（本人の右目）

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
  
  // 5. 上下左右の余白を算出
  const calculateMargins = (boundingBox: FaceAnalysisResult['boundingBox'], faceLandmarks: NormalizedLandmark[]) => {
    // 頭のてっぺん（10番）のY座標を使用
    const topHeadY = faceLandmarks[10].y

    // 画面上端（0.0）から頭頂までの距離
    const top = topHeadY
     // 画面下端（1.0）からアゴの下までの距離
    const bottom = 1.0 - boundingBox.maxY
    // 画面左端（0.0）から顔の左端までの距離
    const left = boundingBox.minX
     // 画面右端（1.0）から顔の右端までの距離
    const right = 1.0 - boundingBox.maxX

    return { top, bottom, left, right }
  }

  const analyzeFaceData = (faceLandmarks: NormalizedLandmark[]): FaceAnalysisResult | null => {
    if (!faceLandmarks || faceLandmarks.length === 0) return null

    const boundingBox = calculateBoundingBox(faceLandmarks)
    const centerOffset = calculateCenterOffset(boundingBox)
    const angle = calculateAngle(faceLandmarks)
    const areaRatio = calculateAreaRatio(boundingBox)
    const margins = calculateMargins(boundingBox, faceLandmarks)

    return {
      boundingBox,
      centerOffset,
      angle,
      areaRatio,
      margins
    }
  }
  return {
    analyzeFaceData
  }
}
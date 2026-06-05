import type { 
  DistanceActionKey, 
  PositionActionKey, 
  TiltActionKey, 
  HeadRoomActionKey, 
} from '@/types/faceAnalysisTypes'


// 閾値（Thresholds）の定義（風景 + 人物）
export const FACE_THRESHOLDS = {
  // 距離（顔の面積比率）：グッと小さくして、引きで撮れるようにする
  AREA: { MIN: 0.005, MAX: 0.018 }, 
  // 顔の位置：引きの写真（全身・半身）になるため、中心の判定は少し広げてあげる
  CENTER: { LIMIT_X: 0.12, LIMIT_Y: 0.12 },
  // 傾き：風景の地平線や建造物が斜めになるとダサいので、ここは5度前後で死守
  TILT: { LIMIT: 5.0 },
  // 頭上の余白：引きの写真になるので、頭上の空間は「写真全体の半分以下」くらいに
  TOP_MARGIN: { MIN: 0.25, MAX: 0.50 }
} as const

// 1アクション決定の優先順位（1.距離、2.顔の位置、3.傾き、4.頭上の余白）
export const ACTION_MAPPING_PRIORITY = ["distance", "position", "tilt", "headroom"] as const

export const DISTANCE_ACTION: DistanceActionKey = {
  too_far: { text: "遠いかも！もう少し近づこう", icon: "🔍"} ,
  too_close: { text: "近いかも！少し離れてみよう", icon: "💨"},
  good: { text: "", icon: ""}
} as const

export const POSITION_ACTION: PositionActionKey = {
  too_left: { text: "左に寄ってるかも！少し左へ", icon: "⬅️"},    
  too_right: { text: "右に寄ってるかも！少し右へ", icon: "➡️"},
  center: { text: "", icon: ""}
} as const

export const TILT_ACTION: TiltActionKey = {
  tilted_left: { text: "少し傾いてるかも！右を上げよう", icon: "📐"},
  tilted_right: { text: "少し傾いてるかも！左を上げよう", icon: "📐"},
  level: { text: "", icon: ""}
} as const

export const HEADROOM_ACTION: HeadRoomActionKey = {
  too_tight: { text: "頭が切れそう！少し下げよう", icon: "🔽"},
  too_loose: { text: "頭上の余白が広いかも！", icon: "🔼"},
  good: { text: "", icon:""}
} as const

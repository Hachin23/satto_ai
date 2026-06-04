import type { FaceJudgeResult } from '@/types/faceAnalysisTypes'
import {
  DISTANCE_ACTION,
  POSITION_ACTION,
  TILT_ACTION,
  HEADROOM_ACTION,
  ACTION_MAPPING_PRIORITY
} from '@/config/faceAnalysisConfig'
type PriorityKey = typeof ACTION_MAPPING_PRIORITY[number]

const OK_ACTION_TEXT = { text: "このまま撮影してOK!", icon: ""} 

export const useActionMapping = () => {

  const mappingJudgeResult = (faceJudgeResult: FaceJudgeResult) => {
    return {
      distance: DISTANCE_ACTION[faceJudgeResult.distance.status],
      position: POSITION_ACTION[faceJudgeResult.position.status],
      tilt: TILT_ACTION[faceJudgeResult.tilt.status],
      headroom: HEADROOM_ACTION[faceJudgeResult.headroom.status]
    } as Record<PriorityKey, { text: string; icon: string }>
  }

  const decideOneAction = (faceJudgeResult: FaceJudgeResult) => {
    if (faceJudgeResult.isAllOk) return OK_ACTION_TEXT

    const mappingResult = mappingJudgeResult(faceJudgeResult)
    for (let i = 0; i < ACTION_MAPPING_PRIORITY.length; i++) {
      const priority = ACTION_MAPPING_PRIORITY[i] as PriorityKey
      const target = mappingResult[priority]
      if (target && target.text !== "") {
        return target
      }
    }
    return OK_ACTION_TEXT
  }

  return {
    decideOneAction
  }
}
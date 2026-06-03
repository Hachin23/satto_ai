import type { FaceJudgeResult } from '@/types/faceAnalysisTypes'
import {
  DISTANCE_ACTION,
  POSITION_ACTION,
  TILT_ACTION,
  HEADROOM_ACTION,
  ACTION_MAPPING_PRIORITY
} from '@/config/faceAnalysisConfig'
type PriorityKey = typeof ACTION_MAPPING_PRIORITY[number]

const OK_ACTION_TEXT = "このまま撮影してOK!"

export const useActionMapping = () => {

  const mappingJudgeResult = (faceJudgeResult: FaceJudgeResult) => {
    const distanceAction = DISTANCE_ACTION[faceJudgeResult.distance.status]
    const positionAction = POSITION_ACTION[faceJudgeResult.position.status]
    const tiltAction = TILT_ACTION[faceJudgeResult.tilt.status]
    const headRoomAction = HEADROOM_ACTION[faceJudgeResult.headroom.status]

    return {
      distance: { action: distanceAction },
      position: { action: positionAction },
      tilt: {action: tiltAction},
      headroom: { action: headRoomAction }
    } as Record<PriorityKey, { action: string }>
  }

  const decideOneAction = (faceJudgeResult: FaceJudgeResult) => {
    if (faceJudgeResult.isAllOk) return OK_ACTION_TEXT

    const mappingResult = mappingJudgeResult(faceJudgeResult)
    let actionText = ""
    for (let i = 0; i < ACTION_MAPPING_PRIORITY.length; i++) {
      const priority = ACTION_MAPPING_PRIORITY[i] as PriorityKey
      const target = mappingResult[priority]
      if (target && target.action !== "") {
        actionText = target.action
        break
      }
    }
    return actionText
  }

  return {
    decideOneAction
  }
}
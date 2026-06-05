import axios from 'axios'
import type { FaceJudgeResult } from '@/types/faceAnalysisTypes'

export const fetchAiDetailAction = async (statusIndex: number, judgeResult: FaceJudgeResult) => {
  // Railsのコントローラーに向けてデータをポストする
  const response = await axios.post('/api/v1/detail_actions', {
    status: statusIndex,
    judge_result: {
      distance: judgeResult.distance,
      position: judgeResult.position,
      tilt: judgeResult.tilt,
      headroom: judgeResult.headroom
    }
  })
  
  return response.data.advice // Railsから返ってきたアドバイス文
}
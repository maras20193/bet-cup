import type { PhaseId } from "./phase"

export type ScorePrediction = {
  matchId: string
  home: number
  away: number
}

export type PhasePredictions = {
  userId: string
  displayName: string
  phaseId: PhaseId
  submittedAt: string
  predictions: ScorePrediction[]
}

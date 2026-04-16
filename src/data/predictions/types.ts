export type ScorePrediction = {
  matchId: string
  home: number
  away: number
}

export type PhasePredictionsFile = {
  userId: string
  displayName: string
  phaseId: string
  submittedAt: string
  predictions: ScorePrediction[]
}

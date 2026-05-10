import type { PhaseId } from "./phase"

export type ScoreInputFields = { home: string; away: string }

export type PhasePredictionFormValues = {
  displayName: string
  email: string
  matchScores: { matchId: string; home: string; away: string }[]
}

export type ScorePrediction = {
  matchId: string
  home: number
  away: number
}

export type PhasePredictions = {
  userId: string
  displayName: string

  contactEmail?: string
  phaseId: PhaseId
  submittedAt: string
  predictions: ScorePrediction[]
}

export type PlayerPredictionBundleInput = {
  userId: string
  displayName: string
  phaseFiles: readonly PhasePredictions[]
}

import type { PhaseId } from "./phase"

export type ScoreInputFields = { home: string; away: string }

export type PhasePredictionFormValues = {
  displayName: string
  matchScores: { matchId: string; home: string; away: string }[]
}

export type ScorePrediction = {
  matchId: string
  home: number
  away: number
}

export type PhasePredictions = {
  predictionId: string
  displayName: string
  phaseId: PhaseId
  submittedAt: string
  predictions: ScorePrediction[]
}

export type PlayerPredictionBundleInput = {
  /** Folder slug under `src/data/predictions/` — stable key for results columns. */
  playerId: string
  displayName: string
  phaseFiles: readonly PhasePredictions[]
}

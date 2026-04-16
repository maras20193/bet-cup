import type { PhasePredictionsFile } from "./types"
import olaGroupStage from "./ola-w/group-stage.json"
import olaRoundOf4 from "./ola-w/round-of-4.json"
import tomekGroupStage from "./tomek-k/group-stage.json"
import tomekRoundOf4 from "./tomek-k/round-of-4.json"

export type { PhasePredictionsFile, ScorePrediction } from "./types"

export const olaWPredictions = {
  groupStage: olaGroupStage satisfies PhasePredictionsFile,
  roundOf4: olaRoundOf4 satisfies PhasePredictionsFile,
} as const

export const tomekKPredictions = {
  groupStage: tomekGroupStage satisfies PhasePredictionsFile,
  roundOf4: tomekRoundOf4 satisfies PhasePredictionsFile,
} as const

export const demoPlayersPredictions = [olaWPredictions, tomekKPredictions] as const

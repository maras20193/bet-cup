import type { PhasePredictions } from "@/types/predictions"
import olaGroupStageJson from "./ola-w/group-stage.json"
import olaRoundOf4Json from "./ola-w/round-of-4.json"
import tomekGroupStageJson from "./tomek-k/group-stage.json"
import tomekRoundOf4Json from "./tomek-k/round-of-4.json"

export type { PhasePredictions, ScorePrediction } from "@/types/predictions"

export const olaGroupStage = olaGroupStageJson as PhasePredictions
export const olaRoundOf4 = olaRoundOf4Json as PhasePredictions
export const tomekGroupStage = tomekGroupStageJson as PhasePredictions
export const tomekRoundOf4 = tomekRoundOf4Json as PhasePredictions

export const olaWPredictionPhaseFiles = [
  olaGroupStage,
  olaRoundOf4,
] as const satisfies readonly PhasePredictions[]

export const tomekKPredictionPhaseFiles = [
  tomekGroupStage,
  tomekRoundOf4,
] as const satisfies readonly PhasePredictions[]

export type PlayerPredictionBundleInput = {
  userId: string
  displayName: string
  phaseFiles: readonly PhasePredictions[]
}

export const demoPlayerPredictionBundles = [
  {
    userId: "ola-w",
    displayName: "Ola",
    phaseFiles: olaWPredictionPhaseFiles,
  },
  {
    userId: "tomek-k",
    displayName: "Tomek",
    phaseFiles: tomekKPredictionPhaseFiles,
  },
] as const satisfies readonly PlayerPredictionBundleInput[]

if (import.meta.env.DEV) {
  const summarizePhases = (files: readonly PhasePredictions[]) =>
    files.map((f) => ({
      phaseId: f.phaseId,
      predictions: f.predictions.length,
    }))

  console.group("[predictions/index] snapshot (ładowanie modułu / HMR)")
  console.log("JSON === obiekt po cast?", {
    olaGroupStageSameRef: olaGroupStageJson === olaGroupStage,
  })
  console.log("Ola — pliki faz", summarizePhases(olaWPredictionPhaseFiles))
  console.log("Tomek — pliki faz", summarizePhases(tomekKPredictionPhaseFiles))
  console.log("Gracze (`demoPlayerPredictionBundles`)", {
    bundles: demoPlayerPredictionBundles.map((b) => ({
      userId: b.userId,
      displayName: b.displayName,
      phases: summarizePhases(b.phaseFiles),
    })),
  })
  console.groupEnd()
}

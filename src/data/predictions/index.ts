import type { PhasePredictions } from "@/types/predictions"

import { demoPlayerPredictionBundles } from "./mock-player-bundles"

export type {
  PhasePredictions,
  PlayerPredictionBundleInput,
  ScorePrediction,
} from "@/types/predictions"

export { demoPlayerPredictionBundles }

if (import.meta.env.DEV) {
  const summarizePhases = (files: readonly PhasePredictions[]) =>
    files.map((f) => ({
      phaseId: f.phaseId,
      predictions: f.predictions.length,
    }))

  console.group("[predictions/index] snapshot (ładowanie modułu / HMR)")
  console.log("Gracze (`demoPlayerPredictionBundles`)", {
    count: demoPlayerPredictionBundles.length,
    bundles: demoPlayerPredictionBundles.map((b) => ({
      userId: b.userId,
      displayName: b.displayName,
      phases: summarizePhases(b.phaseFiles),
    })),
  })
  console.groupEnd()
}

import type { PhasePredictions } from "@/types/predictions"
import { phaseIds, type PhaseId } from "@/types/phase"

const allowedPhaseIds = new Set<string>(phaseIds)

function isPhaseId(value: string): value is PhaseId {
  return allowedPhaseIds.has(value)
}

type PhasePredictionsFileRaw = PhasePredictions & {
  userId?: string
}

export function parsePhasePredictionsFile(
  file: PhasePredictionsFileRaw,
): PhasePredictions {
  if (!isPhaseId(file.phaseId)) {
    throw new Error(
      `Invalid phaseId on predictions file: "${file.phaseId}" (predictionId=${file.predictionId ?? file.userId})`,
    )
  }

  const predictionId = file.predictionId ?? file.userId
  if (!predictionId) {
    throw new Error(
      `Missing predictionId on predictions file for phase "${file.phaseId}"`,
    )
  }

  return {
    predictionId,
    displayName: file.displayName,
    phaseId: file.phaseId,
    submittedAt: file.submittedAt,
    predictions: file.predictions,
  }
}

export function parsePlayerPhaseFiles(
  files: readonly PhasePredictionsFileRaw[],
): PhasePredictions[] {
  return files.map(parsePhasePredictionsFile)
}

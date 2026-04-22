import type { PhasePredictions } from "@/types/predictions"
import { phaseIds, type PhaseId } from "@/types/phase"

const allowedPhaseIds = new Set<string>(phaseIds)

function isPhaseId(value: string): value is PhaseId {
  return allowedPhaseIds.has(value)
}

export function parsePhasePredictionsFile(
  file: PhasePredictions
): PhasePredictions {
  if (!isPhaseId(file.phaseId)) {
    throw new Error(
      `Invalid phaseId on predictions file: "${file.phaseId}" (userId=${file.userId})`
    )
  }
  return file
}

export function parsePlayerPhaseFiles(
  files: readonly PhasePredictions[]
): PhasePredictions[] {
  return files.map(parsePhasePredictionsFile)
}

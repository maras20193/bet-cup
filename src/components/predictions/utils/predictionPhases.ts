import type { AppConfig } from "@/types/app-config"
import type { PhaseId } from "@/types/phase"

export const getPhaseIdsWithPredictionFormOpen = (
  config: AppConfig
): PhaseId[] => {
  return config.phaseOrder.filter(
    (phaseId) => config.phases[phaseId].formVisible
  )
}

export const isPredictionFormOpenForAnyPhase = (config: AppConfig): boolean => {
  return getPhaseIdsWithPredictionFormOpen(config).length > 0
}

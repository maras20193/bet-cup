import type { AppConfig } from "@/types/app-config"
import type { Match } from "@/types/match"
import type { PhaseId } from "@/types/phase"
import type { ResultsTablePhaseSection } from "@/components/results/results-table/utils/buildResultsTableModel"

export const buildResultsPhaseSections = (
  config: AppConfig,
  matchesByPhase: Record<PhaseId, { matches: readonly Match[] }>,
): ResultsTablePhaseSection[] => {
  return config.phaseOrder.map((phaseId) => ({
    phaseId,
    phaseLabel: config.phases[phaseId].label,
    matches: matchesByPhase[phaseId].matches,
  }))
}

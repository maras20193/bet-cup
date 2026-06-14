import { applyMatchSchedule } from "@/data/matches/schedule"
import type { PhaseId } from "@/types/phase"
import type { PhaseMatchBundle } from "@/types/phase-matches"

export function mergeMatchSchedule(
  bundles: Record<PhaseId, PhaseMatchBundle>,
): Record<PhaseId, PhaseMatchBundle> {
  const merged = {} as Record<PhaseId, PhaseMatchBundle>

  for (const phaseId of Object.keys(bundles) as PhaseId[]) {
    const bundle = bundles[phaseId]
    merged[phaseId] = {
      ...bundle,
      matches: bundle.matches.map((match) => applyMatchSchedule(match)),
    }
  }

  return merged
}

import type { PhaseId } from "@/types/phase"
import type {
  MergedPhaseMatchBundle,
  PhaseMatchBundle,
} from "@/types/phase-matches"

import { rowToMatchResult } from "./rowToMatchResult"
import type { MatchResultRow } from "./types"

export function mergeMatchResults(
  bundles: Record<PhaseId, PhaseMatchBundle>,
  resultsByMatchId: ReadonlyMap<string, MatchResultRow>,
): Record<PhaseId, MergedPhaseMatchBundle> {
  const merged = {} as Record<PhaseId, MergedPhaseMatchBundle>

  for (const phaseId of Object.keys(bundles) as PhaseId[]) {
    const bundle = bundles[phaseId]
    merged[phaseId] = {
      ...bundle,
      matches: bundle.matches.map((match) => ({
        ...match,
        kickoffAt: match.kickoffAt!,
        result: rowToMatchResult(resultsByMatchId.get(match.id)),
      })),
    }
  }

  return merged
}

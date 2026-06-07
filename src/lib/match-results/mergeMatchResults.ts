import type { PhaseId } from "@/types/phase"
import type { PhaseMatchBundle } from "@/types/phase-matches"

import { rowToMatchResult } from "./rowToMatchResult"
import type { MatchResultRow } from "./types"

export function mergeMatchResults<T extends Record<PhaseId, PhaseMatchBundle>>(
  bundles: T,
  resultsByMatchId: ReadonlyMap<string, MatchResultRow>,
): T {
  const merged = {} as T

  for (const phaseId of Object.keys(bundles) as PhaseId[]) {
    const bundle = bundles[phaseId]
    merged[phaseId] = {
      ...bundle,
      matches: bundle.matches.map((match) => ({
        ...match,
        result: rowToMatchResult(resultsByMatchId.get(match.id)),
      })),
    }
  }

  return merged
}

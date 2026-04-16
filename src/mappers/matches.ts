import type { PhaseId } from "@/config/app.config"
import { groupStageMatches } from "@/data/matches/group-stage"
import { roundOf4Matches } from "@/data/matches/round-of-4"
import type { Match } from "@/data/types"

export type MatchWithPhase = Match & { phaseId: PhaseId }

const matchPhaseBlocks = [groupStageMatches, roundOf4Matches] as const

export function buildAllMatches(): MatchWithPhase[] {
  return matchPhaseBlocks.flatMap((block) =>
    block.matches.map((match) => ({ ...match, phaseId: block.phaseId })),
  )
}

export function filterMatchesByPhases(
  matches: readonly MatchWithPhase[],
  phaseIds: readonly PhaseId[],
): MatchWithPhase[] {
  const allowed = new Set(phaseIds)
  return matches.filter((m) => allowed.has(m.phaseId))
}

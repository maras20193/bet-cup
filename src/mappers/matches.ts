import { groupStageMatches } from "@/data/matches/group-stage"
import { roundOf4Matches } from "@/data/matches/round-of-4"
import type { Match } from "@/types/match"
import type { PhaseId } from "@/types/phase"

export type MatchWithPhase = Match & { phaseId: PhaseId }

const matchPhaseBlocks = [groupStageMatches, roundOf4Matches] as const

export function buildAllMatches(): MatchWithPhase[] {
  return matchPhaseBlocks.flatMap((block) =>
    block.matches.map((match) => ({ ...match, phaseId: block.phaseId }))
  )
}

export function filterMatchesByPhases(
  matches: readonly MatchWithPhase[],
  phaseIds: readonly PhaseId[]
): MatchWithPhase[] {
  const allowed = new Set(phaseIds)
  return matches.filter((m) => allowed.has(m.phaseId))
}

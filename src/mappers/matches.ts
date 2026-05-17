import { groupStageMatches } from "@/data/matches/group-stage"
import { finalMatch } from "@/data/matches/knockout/final"
import { roundOf16Matches } from "@/data/matches/knockout/round-of-16"
import { roundOf32Matches } from "@/data/matches/knockout/round-of-32"
import { roundOf4Matches } from "@/data/matches/knockout/round-of-4"
import { roundOf8Matches } from "@/data/matches/knockout/round-of-8"
import { thirdPlaceMatch } from "@/data/matches/knockout/third-place"
import type { Match } from "@/types/match"
import type { PhaseId } from "@/types/phase"

export type MatchWithPhase = Match & { phaseId: PhaseId }

const matchPhaseBlocks = [
  groupStageMatches,
  roundOf32Matches,
  roundOf16Matches,
  roundOf8Matches,
  roundOf4Matches,
  thirdPlaceMatch,
  finalMatch,
] as const

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

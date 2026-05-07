import type { PhaseMatchBundle } from "@/types/phase-matches"
import type { PhaseId } from "@/types/phase"
import { groupStageMatches } from "@/data/matches/group-stage"
import { roundOf32Matches } from "@/data/matches/knockout/round-of-32"
import { roundOf16Matches } from "@/data/matches/knockout/round-of-16"
import { roundOf8Matches } from "@/data/matches/knockout/round-of-8"
import { roundOf4Matches } from "@/data/matches/knockout/round-of-4"
import { thirdPlaceMatch } from "@/data/matches/knockout/third-place"
import { finalMatch } from "@/data/matches/knockout/final"

export const phaseMatchBundles = {
  "group-stage": groupStageMatches,
  "round-of-32": roundOf32Matches,
  "round-of-16": roundOf16Matches,
  "round-of-8": roundOf8Matches,
  "round-of-4": roundOf4Matches,
  "third-place": thirdPlaceMatch,
  final: finalMatch,
} satisfies Record<PhaseId, PhaseMatchBundle>

export function getPhaseMatchBundle(phaseId: PhaseId): PhaseMatchBundle {
  return phaseMatchBundles[phaseId]
}

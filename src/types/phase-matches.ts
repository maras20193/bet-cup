import type { Match, MatchDefinition } from "@/types/match"
import type { PhaseId } from "@/types/phase"

export type PhaseMatchBundle = {
  phaseId: PhaseId
  matches: readonly MatchDefinition[]
}

export type MergedPhaseMatchBundle = {
  phaseId: PhaseId
  matches: readonly Match[]
}

export type PhaseMatchData = PhaseMatchBundle

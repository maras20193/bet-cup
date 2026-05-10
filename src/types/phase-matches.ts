import type { Match } from "@/types/match"
import type { PhaseId } from "@/types/phase"

export type PhaseMatchBundle = {
  phaseId: PhaseId
  matches: readonly Match[]
}

/** Alias semantyczny — mecze jednej fazy turnieju (np. do formularza typowania). */
export type PhaseMatchData = PhaseMatchBundle

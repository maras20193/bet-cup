import type { Match } from "@/types/match"
import type { PhaseId } from "@/types/phase"

export type PhaseMatchBundle = {
  phaseId: PhaseId
  matches: readonly Match[]
}

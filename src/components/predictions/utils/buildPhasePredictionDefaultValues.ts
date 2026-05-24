import type {
  PhasePredictionFormValues,
  ScoreInputFields,
} from "@/types/predictions"
import type { PhaseMatchBundle } from "@/types/phase-matches"

export const buildPhasePredictionDefaultValues = (
  phaseMatches: PhaseMatchBundle,
  initialScores?: Partial<Record<string, ScoreInputFields>>
): PhasePredictionFormValues => {
  return {
    displayName: "",
    matchScores: phaseMatches.matches.map((m) => ({
      matchId: m.id,
      home: initialScores?.[m.id]?.home ?? "",
      away: initialScores?.[m.id]?.away ?? "",
    })),
  }
}

export type MatchOutcome = "1" | "X" | "2"

export type ScoreTier = "exact" | "outcome" | "miss"

export type ScoringRules = {
  exactScorePoints: number
  outcomePoints: number
}

export type ScoreResult = {
  tier: ScoreTier
  points: number
}

export function getMatchOutcome(score: {
  home: number
  away: number
}): MatchOutcome {
  if (score.home > score.away) return "1"
  if (score.home < score.away) return "2"
  return "X"
}

export function scorePrediction(
  actual: { home: number; away: number } | null,
  prediction: { home: number; away: number } | null,
  rules: ScoringRules,
): ScoreResult {
  if (!actual || !prediction) {
    return { tier: "miss", points: 0 }
  }

  if (actual.home === prediction.home && actual.away === prediction.away) {
    return { tier: "exact", points: rules.exactScorePoints }
  }

  if (getMatchOutcome(actual) === getMatchOutcome(prediction)) {
    return { tier: "outcome", points: rules.outcomePoints }
  }

  return { tier: "miss", points: 0 }
}

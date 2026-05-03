import { scorePrediction } from "@/lib/scoring"
import type { Match } from "@/types/match"
import type { PhaseId } from "@/types/phase"
import type { ScorePrediction } from "@/types/predictions"
import type { PlayerPredictionBundleInput } from "@/data/predictions"

export type PlayerMatchCell = {
  prediction: { home: number; away: number } | null
  tier: "exact" | "outcome" | "miss"
  points: number
  hasOfficialResult: boolean
}

export type ResultsTableGroupRow = {
  kind: "group"
  groupLabel: string
}

export type ResultsTableMatchRow = {
  kind: "match"
  match: Match
  cellsByPlayerId: Record<string, PlayerMatchCell>
}

export type ResultsTableRow = ResultsTableGroupRow | ResultsTableMatchRow

export type ResultsTableModel = {
  rows: ResultsTableRow[]
  playerTotals: Record<string, number>
}

function predictionsByMatchId(
  predictions: readonly ScorePrediction[],
): Map<string, { home: number; away: number }> {
  const map = new Map<string, { home: number; away: number }>()
  for (const p of predictions) {
    map.set(p.matchId, { home: p.home, away: p.away })
  }
  return map
}

export function buildResultsTableModel(
  matches: readonly Match[],
  bundles: readonly PlayerPredictionBundleInput[],
  phaseId: PhaseId,
  scoring: { exactScorePoints: number; outcomePoints: number },
): ResultsTableModel {
  const perPlayerMaps = bundles.map((b) => {
    const file = b.phaseFiles.find((f) => f.phaseId === phaseId)
    return {
      userId: b.userId,
      byMatchId: file
        ? predictionsByMatchId(file.predictions)
        : new Map<string, { home: number; away: number }>(),
    }
  })

  const playerTotals: Record<string, number> = {}
  for (const b of bundles) {
    playerTotals[b.userId] = 0
  }

  const rows: ResultsTableRow[] = []
  let lastGroupKey: string | null = null

  for (const match of matches) {
    const groupKey = match.groupId ?? "_ungrouped"
    if (groupKey !== lastGroupKey) {
      if (match.groupId !== null) {
        rows.push({
          kind: "group",
          groupLabel: `Grupa ${match.groupId}`,
        })
      }
      lastGroupKey = groupKey
    }

    const cellsByPlayerId: Record<string, PlayerMatchCell> = {}
    const hasOfficialResult = match.result !== null

    for (const { userId, byMatchId } of perPlayerMaps) {
      const prediction = byMatchId.get(match.id) ?? null
      const scored = scorePrediction(match.result, prediction, scoring)
      cellsByPlayerId[userId] = {
        prediction,
        tier: scored.tier,
        points: scored.points,
        hasOfficialResult,
      }
      playerTotals[userId] += scored.points
    }

    rows.push({ kind: "match", match, cellsByPlayerId })
  }

  return { rows, playerTotals }
}

import { scorePrediction } from "@/lib/scoring"
import type { Match } from "@/types/match"
import type { PhaseId } from "@/types/phase"
import type { ScorePrediction } from "@/types/predictions"
import type { PlayerPredictionBundleInput } from "@/types/predictions"

export type PlayerMatchCell = {
  prediction: { home: number; away: number } | null
  tier: "exact" | "outcome" | "miss"
  points: number
  hasOfficialResult: boolean
}

export type ResultsTableGroupRow = {
  kind: "group"
  sectionKey: string
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

export type ResultsTablePhaseSection = {
  phaseId: PhaseId
  phaseLabel: string
  matches: readonly Match[]
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

function buildPerPlayerMaps(
  bundles: readonly PlayerPredictionBundleInput[],
  phaseId: PhaseId,
) {
  return bundles.map((b) => {
    const file = b.phaseFiles.find((f) => f.phaseId === phaseId)
    return {
      playerId: b.playerId,
      byMatchId: file
        ? predictionsByMatchId(file.predictions)
        : new Map<string, { home: number; away: number }>(),
    }
  })
}

function initPlayerTotals(
  bundles: readonly PlayerPredictionBundleInput[],
): Record<string, number> {
  const playerTotals: Record<string, number> = {}
  for (const b of bundles) {
    playerTotals[b.playerId] = 0
  }
  return playerTotals
}

function appendMatchRow(
  match: Match,
  perPlayerMaps: ReturnType<typeof buildPerPlayerMaps>,
  scoring: { exactScorePoints: number; outcomePoints: number },
  playerTotals: Record<string, number>,
): ResultsTableMatchRow {
  const cellsByPlayerId: Record<string, PlayerMatchCell> = {}
  const hasOfficialResult = match.result !== null

  for (const { playerId, byMatchId } of perPlayerMaps) {
    const prediction = byMatchId.get(match.id) ?? null
    const scored = scorePrediction(match.result, prediction, scoring)
    cellsByPlayerId[playerId] = {
      prediction,
      tier: scored.tier,
      points: scored.points,
      hasOfficialResult,
    }
    playerTotals[playerId] += scored.points
  }

  return { kind: "match", match, cellsByPlayerId }
}

function appendGroupStageRows(
  phaseId: PhaseId,
  matches: readonly Match[],
  perPlayerMaps: ReturnType<typeof buildPerPlayerMaps>,
  scoring: { exactScorePoints: number; outcomePoints: number },
  playerTotals: Record<string, number>,
): ResultsTableRow[] {
  const rows: ResultsTableRow[] = []
  let lastGroupKey: string | null = null

  for (const match of matches) {
    const groupKey = match.groupId ?? "_ungrouped"
    if (groupKey !== lastGroupKey) {
      if (match.groupId !== null) {
        rows.push({
          kind: "group",
          sectionKey: `${phaseId}-${match.groupId}`,
          groupLabel: `Grupa ${match.groupId}`,
        })
      }
      lastGroupKey = groupKey
    }

    rows.push(appendMatchRow(match, perPlayerMaps, scoring, playerTotals))
  }

  return rows
}

function appendKnockoutPhaseRows(
  phaseId: PhaseId,
  phaseLabel: string,
  matches: readonly Match[],
  perPlayerMaps: ReturnType<typeof buildPerPlayerMaps>,
  scoring: { exactScorePoints: number; outcomePoints: number },
  playerTotals: Record<string, number>,
): ResultsTableRow[] {
  const rows: ResultsTableRow[] = [
    {
      kind: "group",
      sectionKey: phaseId,
      groupLabel: phaseLabel,
    },
  ]

  for (const match of matches) {
    rows.push(appendMatchRow(match, perPlayerMaps, scoring, playerTotals))
  }

  return rows
}

export function buildResultsTableModel(
  matches: readonly Match[],
  bundles: readonly PlayerPredictionBundleInput[],
  phaseId: PhaseId,
  scoring: { exactScorePoints: number; outcomePoints: number },
): ResultsTableModel {
  const perPlayerMaps = buildPerPlayerMaps(bundles, phaseId)
  const playerTotals = initPlayerTotals(bundles)

  const rows: ResultsTableRow[] =
    phaseId === "group-stage"
      ? appendGroupStageRows(
          phaseId,
          matches,
          perPlayerMaps,
          scoring,
          playerTotals,
        )
      : matches.map((match) =>
          appendMatchRow(match, perPlayerMaps, scoring, playerTotals),
        )

  return { rows, playerTotals }
}

export function buildMultiPhaseResultsTableModel(
  sections: readonly ResultsTablePhaseSection[],
  bundles: readonly PlayerPredictionBundleInput[],
  scoring: { exactScorePoints: number; outcomePoints: number },
): ResultsTableModel {
  const playerTotals = initPlayerTotals(bundles)
  const rows: ResultsTableRow[] = []

  for (const { phaseId, phaseLabel, matches } of sections) {
    if (matches.length === 0) continue

    const perPlayerMaps = buildPerPlayerMaps(bundles, phaseId)

    if (phaseId === "group-stage") {
      rows.push(
        ...appendGroupStageRows(
          phaseId,
          matches,
          perPlayerMaps,
          scoring,
          playerTotals,
        ),
      )
    } else {
      rows.push(
        ...appendKnockoutPhaseRows(
          phaseId,
          phaseLabel,
          matches,
          perPlayerMaps,
          scoring,
          playerTotals,
        ),
      )
    }
  }

  return { rows, playerTotals }
}

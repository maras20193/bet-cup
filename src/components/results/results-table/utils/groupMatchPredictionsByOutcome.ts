import { getMatchOutcome } from "@/lib/scoring"
import type { PlayerPredictionBundleInput } from "@/types/predictions"

import type {
  PlayerMatchCell,
  ResultsTableMatchRow,
} from "@/components/results/results-table/utils/buildResultsTableModel"

export type OutcomePredictionEntry = {
  playerId: string
  displayName: string
  prediction: { home: number; away: number }
  cell: PlayerMatchCell
}

export type MatchPredictionsByOutcome = {
  home: OutcomePredictionEntry[]
  draw: OutcomePredictionEntry[]
  away: OutcomePredictionEntry[]
}

function sortByDisplayName(entries: OutcomePredictionEntry[]) {
  return [...entries].sort((a, b) =>
    a.displayName.localeCompare(b.displayName, "pl"),
  )
}

export function groupMatchPredictionsByOutcome(
  row: ResultsTableMatchRow,
  bundles: readonly PlayerPredictionBundleInput[],
): MatchPredictionsByOutcome {
  const home: OutcomePredictionEntry[] = []
  const draw: OutcomePredictionEntry[] = []
  const away: OutcomePredictionEntry[] = []

  for (const bundle of bundles) {
    const cell = row.cellsByPlayerId[bundle.playerId]
    if (!cell?.prediction) continue

    const entry: OutcomePredictionEntry = {
      playerId: bundle.playerId,
      displayName: bundle.displayName,
      prediction: cell.prediction,
      cell,
    }

    switch (getMatchOutcome(cell.prediction)) {
      case "1":
        home.push(entry)
        break
      case "X":
        draw.push(entry)
        break
      case "2":
        away.push(entry)
        break
    }
  }

  return {
    home: sortByDisplayName(home),
    draw: sortByDisplayName(draw),
    away: sortByDisplayName(away),
  }
}

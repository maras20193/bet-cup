import type { CSSProperties } from "react"

import { appConfig } from "@/config/app.config"
import type { PlayerMatchCell } from "@/components/results/results-table/utils/buildResultsTableModel"

export type PlayerPredictionCellProps = {
  cell: PlayerMatchCell
}

function formatPrediction(cell: PlayerMatchCell): string {
  if (!cell.prediction) return "—"
  return `${cell.prediction.home}-${cell.prediction.away}`
}

function predictionPillClassName(cell: PlayerMatchCell): string {
  if (!cell.hasOfficialResult) {
    return "rounded-full border border-foreground/20 bg-transparent px-3 py-1 text-xs font-semibold tabular-nums text-foreground dark:border-white/40"
  }
  switch (cell.tier) {
    case "exact":
    case "outcome":
      return "rounded-full px-3 py-1 text-xs font-semibold tabular-nums text-white"
    default:
      return "rounded-full border border-muted-foreground/20 bg-muted/55 px-3 py-1 text-xs font-semibold tabular-nums text-muted-foreground dark:border-white/15 dark:bg-muted/35"
  }
}

function predictionPillStyle(cell: PlayerMatchCell): CSSProperties | undefined {
  if (!cell.hasOfficialResult) return undefined

  const { exactScorePoints, outcomePoints } = appConfig.ui.colors.scores

  switch (cell.tier) {
    case "exact":
      return { backgroundColor: exactScorePoints }
    case "outcome":
      return { backgroundColor: outcomePoints }
    default:
      return undefined
  }
}

export function PlayerPredictionCell({ cell }: PlayerPredictionCellProps) {
  return (
    <div className="flex justify-center items-center py-0.5">
      <span
        className={predictionPillClassName(cell)}
        style={predictionPillStyle(cell)}
      >
        {formatPrediction(cell)}
      </span>
    </div>
  )
}

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
      return "rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold tabular-nums text-white dark:bg-emerald-500"
    case "outcome":
      return "rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold tabular-nums text-white dark:bg-blue-500"
    default:
      return "rounded-full border border-muted-foreground/20 bg-muted/55 px-3 py-1 text-xs font-semibold tabular-nums text-muted-foreground dark:border-white/15 dark:bg-muted/35"
  }
}

export function PlayerPredictionCell({ cell }: PlayerPredictionCellProps) {
  return (
    <div className="flex justify-center items-center py-0.5">
      <span className={predictionPillClassName(cell)}>
        {formatPrediction(cell)}
      </span>
    </div>
  )
}

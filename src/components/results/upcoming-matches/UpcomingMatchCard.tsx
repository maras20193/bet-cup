import { MatchDetailModal } from "@/components/results/results-table/parts/MatchDetailModal"
import { MatchLabel } from "@/components/results/results-table/parts/MatchLabel"
import { resolveMatchTeamLabels } from "@/components/results/results-table/utils/resolveMatchTeamLabels"
import type { ResultsTableMatchRow } from "@/components/results/results-table/utils/buildResultsTableModel"
import {
  getMatchScheduleAriaLabel,
  MatchSchedulePrimaryLabel,
} from "@/components/results/upcoming-matches/MatchSchedulePrimaryLabel"
import { getMatchScheduleStatus } from "@/lib/match-schedule/getMatchScheduleStatus"
import { cn } from "@/lib/utils"
import type { PlayerPredictionBundleInput } from "@/types/predictions"

export type UpcomingMatchCardProps = {
  row: ResultsTableMatchRow
  bundles: readonly PlayerPredictionBundleInput[]
}

export function UpcomingMatchCard({ row, bundles }: UpcomingMatchCardProps) {
  const status = getMatchScheduleStatus(row.match)
  const { homeName, awayName } = resolveMatchTeamLabels(row.match)
  const result = row.match.result

  return (
    <MatchDetailModal row={row} bundles={bundles}>
      <button
        type="button"
        aria-label={getMatchScheduleAriaLabel(
          status,
          row.match.kickoffAt,
          homeName,
          awayName,
        )}
        className={cn(
          "flex flex-col gap-1.5 border border-border/60 rounded-lg snap-start shrink-0",
          "font-inherit w-44 px-2 py-3 text-left text-inherit sm:w-50",
          "bg-card transition-colors hover:bg-muted/50",
          "outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        )}
      >
        <div className="flex justify-between items-center gap-2 min-w-0">
          <MatchSchedulePrimaryLabel
            status={status}
            kickoffAt={row.match.kickoffAt}
          />
          {result !== null ? (
            <span className="shrink-0 font-semibold tabular-nums text-foreground text-xs">
              {result.home}-{result.away}
            </span>
          ) : null}
        </div>

        <MatchLabel match={row.match} />
      </button>
    </MatchDetailModal>
  )
}

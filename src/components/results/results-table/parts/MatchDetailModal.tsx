import { useMemo, type ReactNode } from "react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import { MatchLabel } from "@/components/results/results-table/parts/MatchLabel"
import { PlayerPredictionCell } from "@/components/results/results-table/parts/PlayerPredictionCell"
import type { ResultsTableMatchRow } from "@/components/results/results-table/utils/buildResultsTableModel"
import {
  groupMatchPredictionsByOutcome,
  type OutcomePredictionEntry,
} from "@/components/results/results-table/utils/groupMatchPredictionsByOutcome"
import { resolveMatchTeamLabels } from "@/components/results/results-table/utils/resolveMatchTeamLabels"
import { OfficialResultPill } from "@/components/results/results-table/ui/OfficialResultPill"
import { cn } from "@/lib/utils"
import type { PlayerPredictionBundleInput } from "@/types/predictions"

const columnTitleClass =
  "min-w-0 truncate px-1 text-center text-[0.65rem] font-semibold uppercase tracking-wide text-muted-foreground"

function OutcomeColumnList({ entries }: { entries: OutcomePredictionEntry[] }) {
  return (
    <ul className="flex flex-col gap-2 min-w-0">
      {entries.length === 0 ? (
        <li className="py-1 text-muted-foreground text-xs text-center">—</li>
      ) : (
        entries.map((entry) => (
          <li
            key={entry.playerId}
            className="flex flex-col items-center gap-0.5 px-0.5 w-full min-w-0 text-center"
          >
            <span
              className="block w-full min-w-0 font-medium text-xs truncate leading-tight"
              title={entry.displayName}
            >
              {entry.displayName}
            </span>
            <PlayerPredictionCell cell={entry.cell} />
          </li>
        ))
      )}
    </ul>
  )
}

type MatchDetailModalBodyProps = {
  row: ResultsTableMatchRow
  bundles: readonly PlayerPredictionBundleInput[]
  homeName: string
  awayName: string
}

function MatchDetailModalBody({
  row,
  bundles,
  homeName,
  awayName,
}: MatchDetailModalBodyProps) {
  const groups = useMemo(
    () => groupMatchPredictionsByOutcome(row, bundles),
    [row, bundles]
  )

  return (
    <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
      <DialogHeader className="items-center px-10 py-4 border-border/60 dark:border-white/10 border-b shrink-0">
        <div className="flex flex-col items-center gap-3 ma3-w-72 w-full">
          <MatchLabel match={row.match} fullNames />
          <OfficialResultPill match={row.match} />
        </div>
      </DialogHeader>

      <div className="gap-2 grid grid-cols-3 px-3 py-2 border-border/60 dark:border-white/10 border-b shrink-0">
        <p className={columnTitleClass} title={homeName}>
          {homeName}
        </p>
        <p className={columnTitleClass}>Remis</p>
        <p className={columnTitleClass} title={awayName}>
          {awayName}
        </p>
      </div>

      <div className="flex-1 px-3 py-2 min-h-0 overflow-y-auto overscroll-contain">
        <div className="gap-2 grid grid-cols-3 min-w-0">
          <OutcomeColumnList entries={groups.home} />
          <OutcomeColumnList entries={groups.draw} />
          <OutcomeColumnList entries={groups.away} />
        </div>
      </div>
    </div>
  )
}

export type MatchDetailModalProps = {
  row: ResultsTableMatchRow
  bundles: readonly PlayerPredictionBundleInput[]
  children: ReactNode
}

export function MatchDetailModal({
  row,
  bundles,
  children,
}: MatchDetailModalProps) {
  const { homeName, awayName } = resolveMatchTeamLabels(row.match)

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className={cn(
          "flex flex-col gap-0 p-0 w-[min(calc(100vw-1.5rem),26rem)] sm:max-w-104 max-h-[min(85dvh,28rem)] overflow-hidden"
        )}
      >
        <MatchDetailModalBody
          row={row}
          bundles={bundles}
          homeName={homeName}
          awayName={awayName}
        />
      </DialogContent>
    </Dialog>
  )
}

import {
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table"
import { useMemo } from "react"

import { appConfig } from "@/config/app.config"
import {
  demoPlayerPredictionBundles,
  type PlayerPredictionBundleInput,
} from "@/data/predictions"
import { groupStageMatchesWithDemoResults } from "@/data/matches/mock-official-results"
import type { Match } from "@/types/match"
import type { PhaseId } from "@/types/phase"
import { MatchLabel } from "@/components/results/results-table/parts/MatchLabel"
import { PlayerPredictionCell } from "@/components/results/results-table/parts/PlayerPredictionCell"
import {
  buildResultsTableModel,
  type ResultsTableRow,
} from "@/components/results/results-table/utils/buildResultsTableModel"
import { MatchColumnHeader } from "@/components/results/results-table/ui/MatchColumnHeader"
import { OfficialResultPill } from "@/components/results/results-table/ui/OfficialResultPill"
import { PlayerColumnHeader } from "@/components/results/results-table/ui/PlayerColumnHeader"
import { ResultColumnHeader } from "@/components/results/results-table/ui/ResultColumnHeader"

export type UseResultsTableArgs = {
  phaseId: PhaseId
  matches: readonly Match[]
  bundles: readonly PlayerPredictionBundleInput[]
}

export function useResultsTable({
  phaseId,
  matches,
  bundles,
}: UseResultsTableArgs) {
  const scoring = appConfig.scoring

  const { rows, playerTotals } = useMemo(
    () => buildResultsTableModel(matches, bundles, phaseId, scoring),
    [matches, bundles, phaseId, scoring],
  )

  const columns = useMemo<ColumnDef<ResultsTableRow>[]>(() => {
    const playerCols: ColumnDef<ResultsTableRow>[] = bundles.map((b) => ({
      id: `player-${b.userId}`,
      header: () => (
        <PlayerColumnHeader
          displayName={b.displayName}
          points={playerTotals[b.userId] ?? 0}
        />
      ),
      cell: ({ row }) => {
        const r = row.original
        if (r.kind !== "match") return null
        const cell = r.cellsByPlayerId[b.userId]
        if (!cell) return null
        return <PlayerPredictionCell cell={cell} />
      },
    }))

    return [
      {
        id: "match",
        header: () => <MatchColumnHeader />,
        cell: ({ row }) => {
          const r = row.original
          if (r.kind !== "match") return null
          return <MatchLabel match={r.match} />
        },
      },
      {
        id: "result",
        header: () => <ResultColumnHeader />,
        cell: ({ row }) => {
          const r = row.original
          if (r.kind !== "match") return null
          return (
            <div className="flex justify-center">
              <OfficialResultPill match={r.match} />
            </div>
          )
        },
      },
      ...playerCols,
    ]
  }, [bundles, playerTotals])

  /* eslint-disable-next-line react-hooks/incompatible-library -- useReactTable is the supported API */
  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row, index) =>
      row.kind === "group" ? `group-${index}-${row.groupLabel}` : row.match.id,
  })

  const colCount = table.getAllColumns().length

  return { table, colCount }
}

export const resultsTableDefaultMatches = groupStageMatchesWithDemoResults
export const resultsTableDefaultBundles = demoPlayerPredictionBundles

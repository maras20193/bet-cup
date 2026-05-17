import {
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table"
import { useMemo } from "react"

import { appConfig } from "@/config/app.config"
import {
  playerPredictionBundles,
  type PlayerPredictionBundleInput,
} from "@/data/predictions"
import { phaseMatchBundles } from "@/data/matches/phase-bundles"
import { buildResultsPhaseSections } from "@/components/results/utils/resultsPhases"
import { MatchLabel } from "@/components/results/results-table/parts/MatchLabel"
import { PlayerPredictionCell } from "@/components/results/results-table/parts/PlayerPredictionCell"
import {
  buildMultiPhaseResultsTableModel,
  type ResultsTableRow,
} from "@/components/results/results-table/utils/buildResultsTableModel"
import { MatchColumnHeader } from "@/components/results/results-table/ui/MatchColumnHeader"
import { OfficialResultPill } from "@/components/results/results-table/ui/OfficialResultPill"
import { PlayerColumnHeader } from "@/components/results/results-table/ui/PlayerColumnHeader"
import { ResultColumnHeader } from "@/components/results/results-table/ui/ResultColumnHeader"

export type UseResultsTableArgs = {
  bundles?: readonly PlayerPredictionBundleInput[]
}

export function useResultsTable({
  bundles = resultsTableDefaultBundles,
}: UseResultsTableArgs = {}) {
  const scoring = appConfig.scoring

  const sections = useMemo(
    () => buildResultsPhaseSections(appConfig, phaseMatchBundles),
    [],
  )

  const { rows, playerTotals } = useMemo(
    () => buildMultiPhaseResultsTableModel(sections, bundles, scoring),
    [sections, bundles, scoring],
  )

  const columns = useMemo<ColumnDef<ResultsTableRow>[]>(() => {
    const playerCols: ColumnDef<ResultsTableRow>[] = bundles.map((b) => ({
      id: `player-${b.playerId}`,
      header: () => (
        <PlayerColumnHeader
          displayName={b.displayName}
          points={playerTotals[b.playerId] ?? 0}
        />
      ),
      cell: ({ row }) => {
        const r = row.original
        if (r.kind !== "match") return null
        const cell = r.cellsByPlayerId[b.playerId]
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
    getRowId: (row) =>
      row.kind === "group" ? `section-${row.sectionKey}` : row.match.id,
  })

  const colCount = table.getAllColumns().length

  return { table, colCount }
}

export const resultsTableDefaultBundles = playerPredictionBundles

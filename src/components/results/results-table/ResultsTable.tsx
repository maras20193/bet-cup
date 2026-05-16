import type { PhaseId } from "@/types/phase"
import type { Match } from "@/types/match"
import type { PlayerPredictionBundleInput } from "@/data/predictions"

import { DataGrid } from "@/components/results/results-table/parts/DataGrid"
import {
  useResultsTable,
  resultsTableDefaultBundles,
  resultsTableDefaultMatches,
} from "@/components/results/results-table/hooks/useResultsTable"

export type ResultsTableProps = {
  phaseId?: PhaseId
  matches?: readonly Match[]
  bundles?: readonly PlayerPredictionBundleInput[]
}

export function ResultsTable({
  phaseId = "group-stage",
  matches = resultsTableDefaultMatches,
  bundles = resultsTableDefaultBundles,
}: ResultsTableProps) {
  const { table, colCount } = useResultsTable({ phaseId, matches, bundles })

  return (
    <DataGrid
      table={table}
      colCount={colCount}
      scrollContainerClass="overscroll-x-contain"
    />
  )
}

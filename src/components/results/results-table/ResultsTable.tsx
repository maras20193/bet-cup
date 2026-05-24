import type { PlayerPredictionBundleInput } from "@/types/predictions"

import { DataGrid } from "@/components/results/results-table/parts/DataGrid"
import {
  useResultsTable,
  resultsTableDefaultBundles,
} from "@/components/results/results-table/hooks/useResultsTable"

export type ResultsTableProps = {
  bundles?: readonly PlayerPredictionBundleInput[]
  fillHeight?: boolean
}

export function ResultsTable({
  bundles = resultsTableDefaultBundles,
  fillHeight = false,
}: ResultsTableProps) {
  const { table, colCount } = useResultsTable({ bundles })

  return <DataGrid table={table} colCount={colCount} fillHeight={fillHeight} />
}

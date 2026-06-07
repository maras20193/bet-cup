import type { PlayerPredictionBundleInput } from "@/types/predictions"

import { Alert, AlertDescription } from "@/components/ui/alert"
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
  const { table, colCount, error } = useResultsTable({ bundles })

  return (
    <div className="flex flex-col flex-1 gap-2 min-h-0">
      {error ? (
        <Alert variant="destructive">
          <AlertDescription>
            Nie udało się pobrać wyników meczów. Tabela pokazuje dane bez
            oficjalnych wyników.
          </AlertDescription>
        </Alert>
      ) : null}
      <DataGrid table={table} colCount={colCount} fillHeight={fillHeight} />
    </div>
  )
}

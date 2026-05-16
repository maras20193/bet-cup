import { cn } from "@/lib/utils"
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
  /** `fill` — tabela wypełnia rodzica; scroll tylko wewnątrz siatki (np. dashboard). */
  layout?: "default" | "fill"
}

function scrollContainerClass(layout: "default" | "fill"): string {
  return layout === "fill"
    ? "h-full min-h-0 flex-1 overflow-auto overscroll-x-contain"
    : "max-h-[min(70dvh,44rem)] overflow-auto overscroll-x-contain"
}

export function ResultsTable({
  phaseId = "group-stage",
  matches = resultsTableDefaultMatches,
  bundles = resultsTableDefaultBundles,
  layout = "default",
}: ResultsTableProps) {
  const { table, colCount } = useResultsTable({ phaseId, matches, bundles })

  return (
    <div className={cn(layout === "fill" && "flex min-h-0 flex-1 flex-col")}>
      <DataGrid
        table={table}
        colCount={colCount}
        scrollContainerClass={scrollContainerClass(layout)}
        layout={layout}
      />
    </div>
  )
}

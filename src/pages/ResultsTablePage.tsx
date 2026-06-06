import { ResultsTable } from "@/components/results/results-table"
import { PointsLegend } from "@/components/results/results-table/ui/PointsLegend"

export function ResultsTablePage() {
  return (
    <div className="flex flex-col flex-1 gap-4 px-2 min-h-0 overflow-hidden">
      <div className="px-2 sm:px-6 lg:px-8 shrink-0">
        <PointsLegend />
      </div>
      <ResultsTable fillHeight />
    </div>
  )
}

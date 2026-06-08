import { ResultsTable } from "@/components/results/results-table"
import { PointsLegend } from "@/components/results/results-table/ui/PointsLegend"

export function ResultsTablePage() {
  return (
    <div className="flex flex-col flex-1 gap-4 min-h-0 overflow-hidden">
      <div className="shrink-0">
        <PointsLegend />
      </div>
      <ResultsTable fillHeight />
    </div>
  )
}

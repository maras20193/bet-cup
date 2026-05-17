import { ResultsTable } from "@/components/results/results-table"
import { TitleAndPointsLegend } from "@/components/results/results-table/ui/TitleAndPointsLegend"

export function ResultsTablePage() {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden">
      <TitleAndPointsLegend />
      <ResultsTable fillHeight />
    </div>
  )
}

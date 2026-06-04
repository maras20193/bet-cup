import { ResultsPointsChart } from "@/components/results/results-points-chart"

export function ResultsChartPage() {
  return (
    <div className="flex flex-col flex-1 gap-4 min-h-0 overflow-hidden">
      <div className="space-y-1 shrink-0">
        <h1 className="font-heading font-semibold text-foreground text-lg tracking-tight">
          Wykres punktów
        </h1>
      </div>
      <ResultsPointsChart />
    </div>
  )
}

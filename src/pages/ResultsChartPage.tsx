import { ResultsPointsChart } from "@/components/results/results-points-chart"

export function ResultsChartPage() {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden">
      <div className="shrink-0 space-y-1">
        <h1 className="font-heading text-lg font-semibold tracking-tight text-foreground">
          Wykres punktów
        </h1>
        <p className="text-muted-foreground text-sm">
          Suma punktów ze wszystkich faz turnieju
        </p>
      </div>
      <ResultsPointsChart fillHeight />
    </div>
  )
}

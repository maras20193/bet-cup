import { ResultsPointsChart } from "@/components/results/results-points-chart"
import { appConfig } from "@/config/app.config"

const resultsPhaseId = "group-stage" as const

export function ResultsChartPage() {
  const tableVisible = appConfig.phases[resultsPhaseId].tableVisible

  if (!tableVisible) {
    return (
      <p className="shrink-0 text-muted-foreground">
        Wyniki dla tej fazy są obecnie ukryte przez organizatora.
      </p>
    )
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden">
      <div className="shrink-0 space-y-1">
        <h1 className="font-heading text-lg font-semibold tracking-tight text-foreground">
          Wykres punktów
        </h1>
        <p className="text-muted-foreground text-sm">
          Suma punktów w fazie grupowej według gracza
        </p>
      </div>
      <ResultsPointsChart fillHeight phaseId={resultsPhaseId} />
    </div>
  )
}

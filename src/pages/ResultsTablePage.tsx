import { ResultsTable } from "@/components/results/results-table"
import { TitleAndPointsLegend } from "@/components/results/results-table/ui/TitleAndPointsLegend"
import { appConfig } from "@/config/app.config"

const resultsPhaseId = "group-stage" as const

export function ResultsTablePage() {
  const tableVisible = appConfig.phases[resultsPhaseId].tableVisible

  if (!tableVisible) {
    return (
      <p className="shrink-0 text-muted-foreground">
        Tabela dla tej fazy jest obecnie ukryta przez organizatora.
      </p>
    )
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden">
      <TitleAndPointsLegend />
      <ResultsTable fillHeight phaseId={resultsPhaseId} />
    </div>
  )
}

import { ResultsPointsChart } from "@/components/results/results-points-chart"
import { ResultsTable } from "@/components/results/results-table"
import { appConfig } from "@/config/app.config"

const dashboardPhaseId = "group-stage" as const

export function DashboardPage() {
  const tableVisible = appConfig.phases[dashboardPhaseId].tableVisible

  return (
    <div className="space-y-6">
      <p className="text-muted-foreground">
        Podsumowanie fazy grupowej — wykres punktów i szczegółowa tabela.
      </p>
      {tableVisible ? (
        <div className="space-y-6">
          <ResultsPointsChart phaseId={dashboardPhaseId} />
          <ResultsTable phaseId={dashboardPhaseId} />
        </div>
      ) : (
        <p className="text-muted-foreground">
          Tabela dla tej fazy jest obecnie ukryta przez organizatora.
        </p>
      )}
    </div>
  )
}

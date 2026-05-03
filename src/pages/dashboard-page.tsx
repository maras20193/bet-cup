import { ResultsTable } from "@/components/results/results-table"
import { appConfig } from "@/config/app.config"

const dashboardPhaseId = "group-stage" as const

export function DashboardPage() {
  const tableVisible = appConfig.phases[dashboardPhaseId].tableVisible

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
          Dashboard
        </h1>
        <p className="text-muted-foreground">
          Podsumowanie fazy grupowej; wykres punktów wkrótce.
        </p>
      </div>
      {tableVisible ? (
        <ResultsTable phaseId={dashboardPhaseId} />
      ) : (
        <p className="text-muted-foreground">
          Tabela dla tej fazy jest obecnie ukryta przez organizatora.
        </p>
      )}
    </div>
  )
}

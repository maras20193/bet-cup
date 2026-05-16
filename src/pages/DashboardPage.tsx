import { ResultsTable } from "@/components/results/results-table"
import { appConfig } from "@/config/app.config"

const dashboardPhaseId = "group-stage" as const

export function DashboardPage() {
  const tableVisible = appConfig.phases[dashboardPhaseId].tableVisible

  if (!tableVisible) {
    return (
      <p className="text-muted-foreground shrink-0">
        Tabela dla tej fazy jest obecnie ukryta przez organizatora.
      </p>
    )
  }

  return (
    <div className="flex flex-col flex-1 gap-6 w-full min-h-0 overflow-hidden">
      {/* <ResultsViewSwitcher value={view} onChange={setView} /> */}

      <div
        role="tabpanel"
        className="flex flex-col flex-1 gap-4 min-h-0 overflow-hidden"
      >
        {/* <TitleAndPointsLegend /> */}
        <ResultsTable fillHeight phaseId={dashboardPhaseId} />
      </div>
    </div>
  )
}

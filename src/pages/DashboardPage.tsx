import { useState } from "react"

import { ResultsPointsChart } from "@/components/results/results-points-chart"
import {
  ResultsTable,
  TitleAndPointsLegend,
} from "@/components/results/results-table"
import {
  ResultsViewSwitcher,
  type ResultsView,
} from "@/components/results/ResultsViewSwitcher"
import { appConfig } from "@/config/app.config"

const dashboardPhaseId = "group-stage" as const

export function DashboardPage() {
  const tableVisible = appConfig.phases[dashboardPhaseId].tableVisible
  const [view, setView] = useState<ResultsView>("table")

  if (!tableVisible) {
    return (
      <p className="text-muted-foreground shrink-0">
        Tabela dla tej fazy jest obecnie ukryta przez organizatora.
      </p>
    )
  }

  return (
    <div className="flex flex-col flex-1 gap-6 min-h-0 overflow-hidden">
      <ResultsViewSwitcher value={view} onChange={setView} />

      {view === "chart" && (
        <div
          role="tabpanel"
          className="flex flex-col flex-1 min-h-0 overflow-hidden"
        >
          <ResultsPointsChart fillHeight phaseId={dashboardPhaseId} />
        </div>
      )}

      {view === "table" && (
        <div
          role="tabpanel"
          className="flex flex-col flex-1 gap-4 min-h-0 overflow-hidden"
        >
          <TitleAndPointsLegend />
          <ResultsTable layout="fill" phaseId={dashboardPhaseId} />
        </div>
      )}
    </div>
  )
}

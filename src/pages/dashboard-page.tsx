import { useState } from "react"

import { ResultsPointsChart } from "@/components/results/results-points-chart"
import {
  ResultsTable,
  Section,
  TitleAndPointsLegend,
} from "@/components/results/results-table"
import { appConfig } from "@/config/app.config"
import { cn } from "@/lib/utils"

const dashboardPhaseId = "group-stage" as const

type DashboardView = "chart" | "table"

export function DashboardPage() {
  const tableVisible = appConfig.phases[dashboardPhaseId].tableVisible
  const [view, setView] = useState<DashboardView>("table")

  return (
    <div className="flex flex-col flex-1 gap-3 min-h-0 overflow-hidden">
      {tableVisible ? (
        <>
          <div
            role="tablist"
            aria-label="Widok podsumowania fazy"
            className="inline-flex bg-muted/30 dark:bg-white/5 p-1 border border-border/60 dark:border-white/10 rounded-lg max-w-md shrink-0"
          >
            <button
              type="button"
              role="tab"
              aria-selected={view === "chart"}
              className={cn(
                "flex-1 px-3 py-2 rounded-md min-w-0 font-medium text-sm text-center transition-colors",
                view === "chart"
                  ? "bg-background text-foreground shadow-sm ring-1 ring-border/50 dark:bg-zinc-950 dark:ring-white/10"
                  : "text-muted-foreground hover:text-foreground"
              )}
              onClick={() => setView("chart")}
            >
              Wykres punktów
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={view === "table"}
              className={cn(
                "flex-1 px-3 py-2 rounded-md min-w-0 font-medium text-sm text-center transition-colors",
                view === "table"
                  ? "bg-background text-foreground shadow-sm ring-1 ring-border/50 dark:bg-zinc-950 dark:ring-white/10"
                  : "text-muted-foreground hover:text-foreground"
              )}
              onClick={() => setView("table")}
            >
              Tabela wyników
            </button>
          </div>

          {view === "chart" ? (
            <div
              role="tabpanel"
              className="flex flex-col flex-1 min-h-0 overflow-hidden"
            >
              <ResultsPointsChart fillHeight phaseId={dashboardPhaseId} />
            </div>
          ) : (
            <div
              role="tabpanel"
              className="flex flex-col flex-1 min-h-0 overflow-hidden"
            >
              <Section layout="fill">
                <TitleAndPointsLegend />
                <ResultsTable layout="fill" phaseId={dashboardPhaseId} />
              </Section>
            </div>
          )}
        </>
      ) : (
        <p className="text-muted-foreground shrink-0">
          Tabela dla tej fazy jest obecnie ukryta przez organizatora.
        </p>
      )}
    </div>
  )
}

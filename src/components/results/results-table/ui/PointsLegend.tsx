import { appConfig } from "@/config/app.config"

export function PointsLegend() {
  const { exactScorePoints, outcomePoints } = appConfig.scoring
  return (
    <div className="flex flex-wrap gap-2">
      <span className="inline-flex items-center bg-emerald-600 dark:bg-emerald-500 px-3 py-1.5 rounded-full font-medium text-white text-xs">
        Dokładny wynik ({exactScorePoints} pkt)
      </span>
      <span className="inline-flex items-center bg-blue-600 dark:bg-blue-500 px-3 py-1.5 rounded-full font-medium text-white text-xs">
        Trafiony typ ({outcomePoints} pkt)
      </span>
      <span className="inline-flex items-center px-3 py-1.5 border border-foreground/25 dark:border-white/40 rounded-full font-medium text-muted-foreground text-xs">
        Oczekuje na wynik
      </span>
      <span className="inline-flex items-center bg-muted/55 dark:bg-muted/35 px-3 py-1.5 border border-muted-foreground/20 dark:border-white/15 rounded-full font-medium text-muted-foreground text-xs">
        Błędny typ (0 pkt)
      </span>
    </div>
  )
}

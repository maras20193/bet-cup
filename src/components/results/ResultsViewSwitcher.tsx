import { cn } from "@/lib/utils"

export type ResultsView = "chart" | "table"

type ResultsViewSwitcherProps = {
  value: ResultsView
  onChange: (view: ResultsView) => void
}

export function ResultsViewSwitcher({ value, onChange }: ResultsViewSwitcherProps) {
  return (
    <div
      role="tablist"
      aria-label="Widok podsumowania fazy"
      className="inline-flex bg-muted/30 dark:bg-white/5 p-1 border border-border/60 dark:border-white/10 rounded-lg max-w-md shrink-0"
    >
      <button
        type="button"
        role="tab"
        aria-selected={value === "chart"}
        className={cn(
          "flex-1 px-3 py-2 rounded-md min-w-0 font-medium text-sm text-center transition-colors",
          value === "chart"
            ? "bg-background text-foreground shadow-sm ring-1 ring-border/50 dark:bg-zinc-950 dark:ring-white/10"
            : "text-muted-foreground hover:text-foreground"
        )}
        onClick={() => onChange("chart")}
      >
        Wykres punktów
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={value === "table"}
        className={cn(
          "flex-1 px-3 py-2 rounded-md min-w-0 font-medium text-sm text-center transition-colors",
          value === "table"
            ? "bg-background text-foreground shadow-sm ring-1 ring-border/50 dark:bg-zinc-950 dark:ring-white/10"
            : "text-muted-foreground hover:text-foreground"
        )}
        onClick={() => onChange("table")}
      >
        Tabela wyników
      </button>
    </div>
  )
}

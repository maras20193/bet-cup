import { cn } from "@/lib/utils"

import { PointsLegend } from "@/components/results/results-table/ui/PointsLegend"

export type TitleAndPointsLegendProps = {
  className?: string
}

export function TitleAndPointsLegend({ className }: TitleAndPointsLegendProps) {
  return (
    <div className={cn("space-y-2 shrink-0", className)}>
      <h2 className="font-heading font-semibold text-foreground text-lg tracking-tight">
        Tabela wyników
      </h2>
      <PointsLegend />
    </div>
  )
}

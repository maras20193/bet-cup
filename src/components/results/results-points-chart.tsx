import { useMemo } from "react"
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts"

import { groupStageMatches } from "@/data/matches/group-stage"
import {
  playerPredictionBundles,
  type PlayerPredictionBundleInput,
} from "@/data/predictions"
import { appConfig } from "@/config/app.config"
import type { Match } from "@/types/match"
import type { PhaseId } from "@/types/phase"
import { buildResultsTableModel } from "@/components/results/results-table"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { cn } from "@/lib/utils"

/** Naprzemienne kolory słupków — jak paleta typów w tabeli (zieleń, niebieski, czerwień). */
const BAR_FILLS = ["#059669", "#2563eb", "#dc2626"] as const

const chartConfig = {
  points: {
    label: "Punkty",
  },
} satisfies ChartConfig

export type ResultsPointsChartProps = {
  phaseId?: PhaseId
  matches?: readonly Match[]
  bundles?: readonly PlayerPredictionBundleInput[]
  className?: string
  /** Wypełnia dostępną wysokość rodzica (np. dashboard bez scrolla strony). */
  fillHeight?: boolean
}

export function ResultsPointsChart({
  phaseId = "group-stage",
  matches = groupStageMatches.matches,
  bundles = playerPredictionBundles,
  className,
  fillHeight = false,
}: ResultsPointsChartProps) {
  const scoring = appConfig.scoring

  const playerTotals = useMemo(
    () =>
      buildResultsTableModel(matches, bundles, phaseId, scoring).playerTotals,
    [matches, bundles, phaseId, scoring],
  )

  const data = useMemo(
    () =>
      bundles.map((b, i) => ({
        name: b.displayName,
        points: playerTotals[b.userId] ?? 0,
        fill: BAR_FILLS[i % BAR_FILLS.length],
      })),
    [bundles, playerTotals],
  )

  const hasPlayers = bundles.length > 0

  return (
    <Card
      className={cn(
        "border-border/60 bg-muted/15 py-3 shadow-none ring-1 ring-border/40 dark:bg-white/3 dark:ring-white/10",
        fillHeight && "min-h-0 flex-1",
        className,
      )}
      size="sm"
    >
      <CardHeader className="shrink-0 px-4 pb-0 group-data-[size=sm]/card:px-3">
        <CardTitle className="text-sm">Punkty według gracza</CardTitle>
        <CardDescription className="text-xs">
          Suma punktów w tej fazie — każdy słupek to jedna osoba
        </CardDescription>
      </CardHeader>
      <CardContent
        className={cn(
          "px-2 pt-2 pb-0 sm:px-3",
          fillHeight && "flex min-h-0 flex-1 flex-col overflow-hidden pb-3"
        )}
      >
        {!hasPlayers ? (
          <p className="flex min-h-[200px] flex-1 items-center justify-center px-4 text-center text-sm text-muted-foreground">
            Brak złożonych typów — wykres pojawi się po pierwszych predykcjach
            graczy.
          </p>
        ) : (
        <ChartContainer
          config={chartConfig}
          className={cn(
            "aspect-auto w-full max-w-full",
            fillHeight
              ? "min-h-[200px] flex-1 min-w-0 basis-0"
              : "h-[min(280px,45vh)] min-h-[200px]"
          )}
        >
          <BarChart
            data={data}
            margin={{ left: 4, right: 8, top: 8, bottom: 4 }}
            barCategoryGap="18%"
          >
            <CartesianGrid vertical={false} strokeDasharray="4 4" />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              interval={0}
              className="text-[11px]"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              width={36}
              allowDecimals={false}
              className="text-[11px] tabular-nums"
            />
            <ChartTooltip
              cursor={{ fill: "var(--muted)", fillOpacity: 0.45 }}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="points" radius={[4, 4, 0, 0]} maxBarSize={56}>
              {data.map((d, i) => (
                <Cell key={`${d.name}-${i}`} fill={d.fill} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}

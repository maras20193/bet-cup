import { useMemo } from "react"
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts"

import {
  demoPlayerPredictionBundles,
  type PlayerPredictionBundleInput,
} from "@/data/predictions"
import { groupStageMatches } from "@/data/matches/group-stage"
import { appConfig } from "@/config/app.config"
import type { Match } from "@/types/match"
import type { PhaseId } from "@/types/phase"
import { buildResultsTableModel } from "@/components/results/build-results-table-data"
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

const BAR_FILLS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
] as const

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
}

export function ResultsPointsChart({
  phaseId = "group-stage",
  matches = groupStageMatches.matches,
  bundles = demoPlayerPredictionBundles,
  className,
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

  return (
    <Card
      className={cn(
        "border-border/60 bg-muted/15 py-3 shadow-none ring-1 ring-border/40 dark:bg-white/3 dark:ring-white/10",
        className,
      )}
      size="sm"
    >
      <CardHeader className="px-4 pb-0 group-data-[size=sm]/card:px-3">
        <CardTitle className="text-sm">Punkty według gracza</CardTitle>
        <CardDescription className="text-xs">
          Suma punktów w tej fazie — każdy słupek to jedna osoba
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 pt-2 pb-0 sm:px-3">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[min(280px,45vh)] w-full min-h-[200px] max-w-full"
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
      </CardContent>
    </Card>
  )
}

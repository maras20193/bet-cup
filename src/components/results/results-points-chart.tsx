import { useMemo } from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  XAxis,
  YAxis,
} from "recharts"

import { appConfig } from "@/config/app.config"
import { playerPredictionBundles } from "@/data/player-bundles"
import type { PlayerPredictionBundleInput } from "@/types/predictions"
import { phaseMatchBundles } from "@/data/matches/phase-bundles"
import { buildResultsPhaseSections } from "@/components/results/utils/resultsPhases"
import { buildMultiPhaseResultsTableModel } from "@/components/results/results-table"
import { Card, CardContent } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { cn } from "@/lib/utils"

/** Naprzemienne kolory słupków — jak paleta typów w tabeli (zieleń, niebieski, czerwień). */
const BAR_FILLS = ["#059669", "#2563eb", "#dc2626"] as const

const BAR_WIDTH = 40
const BAR_GAP = 8
const CHART_PADDING = 48

function getChartWidth(barCount: number): number {
  if (barCount === 0) return 200
  return barCount * (BAR_WIDTH + BAR_GAP) + CHART_PADDING
}

const chartConfig = {
  points: {
    label: "Punkty",
  },
} satisfies ChartConfig

type ChartBarData = {
  name: string
  points: number
  fill: string
}

type PointsBarChartInnerProps = {
  data: ChartBarData[]
}

function PointsBarChartInner({ data }: PointsBarChartInnerProps) {
  return (
    <BarChart
      data={data}
      margin={{ left: 4, right: 8, top: 32, bottom: 4 }}
      barCategoryGap={BAR_GAP}
    >
      <CartesianGrid vertical={false} strokeDasharray="4 4" />
      <XAxis
        dataKey="name"
        tickLine={false}
        tickMargin={4}
        axisLine={false}
        interval={0}
        angle={-90}
        textAnchor="end"
        height={80}
        tick={{
          fill: "var(--foreground)",
          fontSize: 14,
          fontWeight: 400,
        }}
      />
      <YAxis
        tickLine={false}
        axisLine={false}
        tickMargin={8}
        width={36}
        allowDecimals={false}
        className="tabular-nums text-[13px]"
      />
      <ChartTooltip
        shared={false}
        cursor={false}
        content={<ChartTooltipContent hideLabel />}
      />
      <Bar
        dataKey="points"
        radius={[4, 4, 0, 0]}
        maxBarSize={BAR_WIDTH}
        activeBar={{
          fillOpacity: 0.85,
          stroke: "var(--foreground)",
          strokeWidth: 2,
        }}
      >
        <LabelList
          dataKey="points"
          position="top"
          offset={8}
          className="fill-foreground font-bold tabular-nums pointer-events-none"
          style={{ fontSize: 18 }}
        />
        {data.map((d, i) => (
          <Cell key={`${d.name}-${i}`} fill={d.fill} />
        ))}
      </Bar>
    </BarChart>
  )
}

export type ResultsPointsChartProps = {
  bundles?: readonly PlayerPredictionBundleInput[]
  className?: string
}

export function ResultsPointsChart({
  bundles = playerPredictionBundles,
  className,
}: ResultsPointsChartProps) {
  const scoring = appConfig.scoring

  const sections = useMemo(
    () => buildResultsPhaseSections(appConfig, phaseMatchBundles),
    []
  )

  const playerTotals = useMemo(
    () =>
      buildMultiPhaseResultsTableModel(sections, bundles, scoring).playerTotals,
    [sections, bundles, scoring]
  )

  const data = useMemo(
    () =>
      bundles.map((b, i) => ({
        name: b.displayName,
        points: playerTotals[b.playerId] ?? 0,
        fill: BAR_FILLS[i % BAR_FILLS.length],
      })),
    [bundles, playerTotals]
  )

  const hasPlayers = bundles.length > 0
  const chartWidth = getChartWidth(bundles.length)

  return (
    <Card
      className={cn(
        "flex flex-col flex-1 gap-0 bg-muted/15 dark:bg-white/3 shadow-none py-2 ring-border/40 border-border/60 ring-1 dark:ring-white/10 min-h-0",
        className
      )}
      size="sm"
    >
      <CardContent className="flex flex-col flex-1 px-2 sm:px-3 py-0 min-h-0 overflow-hidden">
        {!hasPlayers ? (
          <p className="flex flex-1 justify-center items-center px-4 text-muted-foreground text-sm text-center">
            Brak złożonych typów — wykres pojawi się po pierwszych predykcjach
            graczy.
          </p>
        ) : (
          <div className="flex-1 min-h-0 [-webkit-overflow-scrolling:touch] overflow-x-auto">
            <ChartContainer
              config={chartConfig}
              className="[&_.recharts-xAxis_.recharts-cartesian-axis-tick_text]:fill-foreground h-full min-h-0 aspect-auto"
              style={{
                width: chartWidth,
                minWidth: chartWidth,
              }}
            >
              <PointsBarChartInner data={data} />
            </ChartContainer>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

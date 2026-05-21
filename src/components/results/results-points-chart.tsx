import { useMemo } from "react"
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts"

import { appConfig } from "@/config/app.config"
import {
  playerPredictionBundles,
  type PlayerPredictionBundleInput,
} from "@/data/predictions"
import { phaseMatchBundles } from "@/data/matches/phase-bundles"
import { buildResultsPhaseSections } from "@/components/results/utils/resultsPhases"
import { buildMultiPhaseResultsTableModel } from "@/components/results/results-table"
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

type ChartBarData = {
  name: string
  points: number
  fill: string
}

type PointsBarChartInnerProps = {
  data: ChartBarData[]
  horizontal: boolean
}

function PointsBarChartInner({ data, horizontal }: PointsBarChartInnerProps) {
  return (
    <BarChart
      data={data}
      layout={horizontal ? "vertical" : undefined}
      margin={
        horizontal
          ? { left: 4, right: 12, top: 8, bottom: 4 }
          : { left: 4, right: 8, top: 8, bottom: 4 }
      }
      barCategoryGap="18%"
    >
      <CartesianGrid
        vertical={!horizontal}
        horizontal={!horizontal}
        strokeDasharray="4 4"
      />
      {horizontal ? (
        <>
          <XAxis
            type="number"
            tickLine={false}
            tickMargin={8}
            axisLine={false}
            allowDecimals={false}
            className="tabular-nums text-[11px]"
          />
          <YAxis
            type="category"
            dataKey="name"
            tickLine={false}
            tickMargin={8}
            axisLine={false}
            width={80}
            interval={0}
            className="text-[11px]"
          />
        </>
      ) : (
        <>
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
            className="tabular-nums text-[11px]"
          />
        </>
      )}
      <ChartTooltip
        cursor={{ fill: "var(--muted)", fillOpacity: 0.45 }}
        content={<ChartTooltipContent hideLabel />}
      />
      <Bar
        dataKey="points"
        radius={horizontal ? [0, 4, 4, 0] : [4, 4, 0, 0]}
        maxBarSize={horizontal ? 40 : 56}
      >
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
  /** Wypełnia dostępną wysokość rodzica (np. dashboard bez scrolla strony). */
  fillHeight?: boolean
}

export function ResultsPointsChart({
  bundles = playerPredictionBundles,
  className,
  fillHeight = false,
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
  const mobileChartMinHeight = Math.max(200, bundles.length * 52 + 40)

  return (
    <Card
      className={cn(
        "bg-muted/15 dark:bg-white/3 shadow-none py-3 ring-border/40 border-border/60 ring-1 dark:ring-white/10",
        fillHeight && "min-h-0 flex-1",
        className
      )}
      size="sm"
    >
      <CardHeader className="px-4 group-data-[size=sm]/card:px-3 pb-0 shrink-0">
        <CardTitle className="text-sm">Wykres punktów</CardTitle>
        <CardDescription className="text-xs">
          Suma punktów ze wszystkich faz — każdy słupek to jedna osoba
        </CardDescription>
      </CardHeader>
      <CardContent
        className={cn(
          "px-2 sm:px-3 pt-2 pb-0",
          fillHeight && "flex min-h-0 flex-1 flex-col overflow-hidden pb-3"
        )}
      >
        {!hasPlayers ? (
          <p className="flex flex-1 justify-center items-center px-4 min-h-[200px] text-muted-foreground text-sm text-center">
            Brak złożonych typów — wykres pojawi się po pierwszych predykcjach
            graczy.
          </p>
        ) : (
          <>
            <ChartContainer
              config={chartConfig}
              className={cn(
                "w-full max-w-full aspect-auto md:hidden",
                fillHeight
                  ? "min-h-[200px] min-w-0 flex-1 basis-0"
                  : "min-h-[200px]"
              )}
              style={
                fillHeight ? undefined : { height: mobileChartMinHeight }
              }
            >
              <PointsBarChartInner data={data} horizontal />
            </ChartContainer>
            <ChartContainer
              config={chartConfig}
              className={cn(
                "hidden w-full max-w-full aspect-auto md:flex",
                fillHeight
                  ? "min-h-[200px] min-w-0 flex-1 basis-0"
                  : "h-[min(280px,45vh)] min-h-[200px]"
              )}
            >
              <PointsBarChartInner data={data} horizontal={false} />
            </ChartContainer>
          </>
        )}
      </CardContent>
    </Card>
  )
}

"use client"

import { useMemo } from "react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { CustomLabel } from "@/components/results/chart/CustomLabel"
import { useChartBarLayout } from "@/components/results/chart/useChartBarLayout"
import { useCompetitionResults } from "@/components/results/hooks/useCompetitionResults"
import { appConfig } from "@/config/app.config"

type ChartBarData = {
  name: string
  points: number
  fill: string
}

const chartConfig = {
  points: {
    label: "Punkty",
  },
} satisfies ChartConfig

export const ResultsChart = () => {
  const { playerScores } = useCompetitionResults()

  const chartData = useMemo<ChartBarData[]>(
    () =>
      playerScores.map((row, i) => ({
        name: row.name,
        points: row.points,
        fill: appConfig.ui.colors.chart[i % appConfig.ui.colors.chart.length],
      })),
    [playerScores]
  )

  const { containerRef, chartWidth, barSize, barGap } = useChartBarLayout(
    chartData.length
  )

  return (
    <div
      ref={containerRef}
      className="flex flex-col flex-1 min-h-0 [-webkit-overflow-scrolling:touch] overflow-x-auto"
    >
      <div
        className="mx-auto h-full shrink-0"
        style={{ width: chartWidth, minWidth: chartWidth }}
      >
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-surface]:outline-none [&_.recharts-wrapper]:outline-none [&_*:focus]:outline-none [&_svg]:outline-none h-full min-h-0 aspect-auto"
          style={{
            width: chartWidth,
            minWidth: chartWidth,
          }}
        >
          <BarChart
            accessibilityLayer={false}
            data={chartData}
            margin={{
              top: 70,
              bottom: 20,
            }}
            barCategoryGap={barGap}
          >
            <CartesianGrid vertical={false} horizontal={true} />
            <XAxis
              dataKey="name"
              tickLine={false}
              // tickMargin={10}
              axisLine={false}
              interval={0}
              angle={-90}
              textAnchor="start"
              // height={10}
              tick={{
                fill: "var(--foreground)",
                fontSize: 16,
                fontWeight: 400,
                dy: -12,
                dx: -6,
              }}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar
              dataKey="points"
              radius={[4, 4, 0, 0]}
              maxBarSize={barSize}
              activeBar={{
                fillOpacity: 0.85,
                stroke: "var(--foreground)",
                strokeWidth: 1,
              }}
            >
              <LabelList
                position="top"
                content={(props) => (
                  <CustomLabel
                    {...props}
                    name={chartData[props.index ?? 0]?.name ?? ""}
                  />
                )}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  )
}

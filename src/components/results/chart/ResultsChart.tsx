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
import { chartDataSource } from "@/components/results/chart/chartDataSource"
import { useChartBarLayout } from "@/components/results/chart/useChartBarLayout"

const BAR_FILLS = ["#3CAC3B", "#2A398D", "#E61D25"] as const

type ChartBarData = {
  month: string
  points: number
  fill: string
}

const chartConfig = {
  points: {
    label: "Punkty",
  },
} satisfies ChartConfig

export const ResultsChart = () => {
  const chartData = useMemo<ChartBarData[]>(
    () =>
      chartDataSource.map((row, i) => ({
        ...row,
        fill: BAR_FILLS[i % BAR_FILLS.length],
      })),
    []
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
              top: 50,
              bottom: 20,
            }}
            barCategoryGap={barGap}
          >
            <CartesianGrid vertical={false} horizontal={true} />
            <XAxis
              dataKey="month"
              tickLine={false}
              // tickMargin={10}
              axisLine={false}
              interval={0}
              angle={-90}
              textAnchor="end"
              height={100}
              tick={{
                fill: "var(--foreground)",
                fontSize: 16,
                fontWeight: 400,
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
                // dataKey="points"
                position="top"
                // offset={8}
                // className="fill-foreground"
                // style={{ fontSize: 14, fontWeight: 600 }}
                content={CustomLabel}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  )
}

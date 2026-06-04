"use client"

import { useMemo } from "react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { useChartBarLayout } from "@/components/results/chart/useChartBarLayout"

const BAR_FILLS = ["#3CAC3B", "#2A398D", "#E61D25"] as const

type ChartBarData = {
  month: string
  points: number
  fill: string
}

const chartDataSource = [
  { month: "Kasia", points: 186 },
  { month: "KKrzys", points: 305 },
  { month: "Lukasz M", points: 237 },
  { month: "Dlugie nazwisko", points: 73 },
  { month: "May", points: 209 },
  { month: "June", points: 214 },
  { month: "111January", points: 186 },
  { month: "111February", points: 305 },
  { month: "111March", points: 237 },
  { month: "111April", points: 73 },
  { month: "111May", points: 209 },
  { month: "111June", points: 214 },
  { month: "22January", points: 186 },
  { month: "22February", points: 305 },
  { month: "22March", points: 237 },
  { month: "22April", points: 73 },
  { month: "22May", points: 209 },
  { month: "22June", points: 214 },
  { month: "3322January", points: 186 },
  { month: "3322February", points: 305 },
  { month: "3322March", points: 237 },
  { month: "3322April", points: 73 },
  { month: "3322May", points: 209 },
  { month: "3322June", points: 214 },
] as const

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

  const { containerRef, minChartWidth, barSize, barGap } = useChartBarLayout(
    chartData.length
  )

  return (
    <div
      ref={containerRef}
      className="flex flex-col flex-1 min-h-0 [-webkit-overflow-scrolling:touch] overflow-x-auto"
    >
      <ChartContainer
        config={chartConfig}
        className="[&_.recharts-surface]:outline-none [&_.recharts-wrapper]:outline-none [&_*:focus]:outline-none [&_svg]:outline-none h-full min-h-0 aspect-auto"
        style={{
          minWidth: minChartWidth,
        }}
      >
        <BarChart
          accessibilityLayer={false}
          data={chartData}
          margin={{
            top: 20,
            bottom: 20,
          }}
          height={200}
          barCategoryGap={barGap}
        >
          <CartesianGrid vertical={false} horizontal={true} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            interval={0}
            angle={-90}
            textAnchor="end"
            height={100}
            tick={{
              fill: "var(--foreground)",
              fontSize: 14,
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
              dataKey="points"
              position="top"
              offset={8}
              className="fill-foreground"
              style={{ fontSize: 14, fontWeight: 600 }}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  )
}

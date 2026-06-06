"use client"

import { useLayoutEffect, useMemo, useRef, useState } from "react"

const BAR_WIDTH_MIN = 40
const BAR_WIDTH_MAX = 60
const BAR_GAP_MIN = 6
const BAR_GAP_MAX = 10
const CHART_PADDING = 48

const FIXED_BAR_LAYOUT = {
  barSize: BAR_WIDTH_MIN,
  barGap: BAR_GAP_MIN,
} as const

const DESKTOP_BAR_LAYOUT = {
  barSize: BAR_WIDTH_MAX,
  barGap: BAR_GAP_MAX,
} as const

const getMinChartWidth = (barCount: number): number => {
  if (barCount === 0) return 200
  return barCount * (BAR_WIDTH_MIN + BAR_GAP_MIN) + CHART_PADDING
}

const getMaxChartWidth = (barCount: number): number => {
  if (barCount === 0) return 200
  return barCount * (BAR_WIDTH_MAX + BAR_GAP_MAX) + CHART_PADDING
}

/** Layout width must match the SVG width Recharts uses, or bar positions jump. */
const getBarLayout = (layoutWidth: number, barCount: number) => {
  if (barCount === 0) {
    return FIXED_BAR_LAYOUT
  }

  const minWidth = getMinChartWidth(barCount)
  const maxWidth = getMaxChartWidth(barCount)

  if (layoutWidth <= minWidth) {
    return FIXED_BAR_LAYOUT
  }

  if (layoutWidth >= maxWidth) {
    return DESKTOP_BAR_LAYOUT
  }

  const plotWidth = layoutWidth - CHART_PADDING
  const slot = plotWidth / barCount
  const barSize = Math.floor(
    Math.min(BAR_WIDTH_MAX, Math.max(BAR_WIDTH_MIN, slot - BAR_GAP_MIN))
  )
  const barGap = Math.floor(
    Math.min(BAR_GAP_MAX, Math.max(BAR_GAP_MIN, slot - barSize))
  )

  return { barSize, barGap }
}

export const useChartBarLayout = (barCount: number) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState<number | null>(null)

  const minChartWidth = useMemo(() => getMinChartWidth(barCount), [barCount])
  const maxChartWidth = useMemo(() => getMaxChartWidth(barCount), [barCount])

  useLayoutEffect(() => {
    const el = containerRef.current
    if (!el) return

    let raf = 0
    const updateWidth = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        setContainerWidth(el.clientWidth)
      })
    }

    updateWidth()
    const ro = new ResizeObserver(updateWidth)
    ro.observe(el)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [])

  const chartWidth = useMemo(() => {
    if (containerWidth == null) return minChartWidth
    return Math.min(Math.max(minChartWidth, containerWidth), maxChartWidth)
  }, [containerWidth, minChartWidth, maxChartWidth])

  const { barSize, barGap } = useMemo(
    () => getBarLayout(chartWidth, barCount),
    [chartWidth, barCount]
  )

  return {
    containerRef,
    chartWidth,
    barSize,
    barGap,
  }
}
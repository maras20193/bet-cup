"use client"

import { useEffect, useMemo, useRef, useState } from "react"

const BAR_WIDTH_MIN = 40
const BAR_WIDTH_MAX = 60
const BAR_GAP_MIN = 6
const BAR_GAP_MAX = 10
const CHART_PADDING = 48

const getMinChartWidth = (barCount: number): number => {
  if (barCount === 0) return 200
  return barCount * (BAR_WIDTH_MIN + BAR_GAP_MIN) + CHART_PADDING
}

const getBarLayout = (containerWidth: number, barCount: number) => {
  if (barCount === 0) {
    return { barSize: BAR_WIDTH_MIN, barGap: BAR_GAP_MIN }
  }

  const plotWidth = containerWidth - CHART_PADDING
  const slot = plotWidth / barCount
  const barSize = Math.round(
    Math.min(BAR_WIDTH_MAX, Math.max(BAR_WIDTH_MIN, slot - BAR_GAP_MIN))
  )
  const barGap = Math.round(
    Math.min(BAR_GAP_MAX, Math.max(BAR_GAP_MIN, slot - barSize))
  )

  return { barSize, barGap }
}

export const useChartBarLayout = (barCount: number) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)

  const minChartWidth = useMemo(() => getMinChartWidth(barCount), [barCount])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const updateWidth = () => setContainerWidth(el.clientWidth)

    updateWidth()
    const ro = new ResizeObserver(() => updateWidth())
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const { barSize, barGap } = useMemo(
    () => getBarLayout(containerWidth || minChartWidth, barCount),
    [containerWidth, minChartWidth, barCount]
  )

  return {
    containerRef,
    minChartWidth,
    barSize,
    barGap,
  }
}

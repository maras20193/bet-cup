import { useLayoutEffect, useRef, useState, type ReactNode } from "react"

import { cn } from "@/lib/utils"

export type EllipsisWithTooltipProps = {
  titleText: string
  className?: string
  children: ReactNode
}

export const EllipsisWithTooltip = ({
  titleText,
  className,
  children,
}: EllipsisWithTooltipProps) => {
  const ref = useRef<HTMLSpanElement>(null)
  const [overflowing, setOverflowing] = useState(false)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const measure = () => {
      const node = ref.current
      if (!node) return
      setOverflowing(node.scrollWidth > node.clientWidth + 1)
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [children, titleText])

  return (
    <span
      ref={ref}
      className={cn("block w-full min-w-0 truncate", className)}
      title={overflowing ? titleText : undefined}
    >
      {children}
    </span>
  )
}

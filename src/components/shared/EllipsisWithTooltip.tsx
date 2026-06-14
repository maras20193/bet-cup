import { useLayoutEffect, useRef, useState, type ReactNode } from "react"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

const touchTapMediaQuery = "(hover: none), (pointer: coarse)"

function useTouchTapUi() {
  const [enabled, setEnabled] = useState(false)

  useLayoutEffect(() => {
    const mq = window.matchMedia(touchTapMediaQuery)
    const update = () => setEnabled(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  return enabled
}

const tapTriggerClass =
  "block w-full min-w-0 cursor-pointer border-0 bg-transparent p-0 font-inherit text-inherit shadow-none outline-none " +
  "rounded-sm active:opacity-80 " +
  "focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"

export type EllipsisWithTooltipProps = {
  titleText: string
  className?: string
  /** On touch devices, always open a popover on tap (not only when truncated). */
  tapToReveal?: boolean
  children: ReactNode
}

const truncatedTextClass = "block w-full min-w-0 truncate"

export const EllipsisWithTooltip = ({
  titleText,
  className,
  tapToReveal = false,
  children,
}: EllipsisWithTooltipProps) => {
  const touchUi = useTouchTapUi()
  const textRef = useRef<HTMLSpanElement>(null)
  const [overflowing, setOverflowing] = useState(false)

  useLayoutEffect(() => {
    const el = textRef.current
    if (!el) return

    const measure = () => {
      const node = textRef.current
      if (!node) return
      setOverflowing(node.scrollWidth > node.clientWidth + 1)
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [touchUi, children, titleText])

  const truncatedLabel = (
    <span
      ref={textRef}
      className={cn(truncatedTextClass, className)}
      aria-hidden
    >
      {children}
    </span>
  )

  if (touchUi && (overflowing || tapToReveal)) {
    return (
      <Popover>
        <PopoverTrigger
          type="button"
          className={tapTriggerClass}
          aria-label={titleText}
        >
          {truncatedLabel}
        </PopoverTrigger>
        <PopoverContent
          side="top"
          align="center"
          className="px-3 py-2 w-max max-w-[min(20rem,calc(100vw-2rem))] font-medium text-sm"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          {titleText}
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <span
      ref={textRef}
      className={cn(truncatedTextClass, className)}
      title={!touchUi && (overflowing || tapToReveal) ? titleText : undefined}
    >
      {children}
    </span>
  )
}

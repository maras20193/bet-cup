import { cn } from "@/lib/utils"

import { EllipsisWithTooltip } from "@/components/shared/EllipsisWithTooltip"
import { TeamFlag } from "@/components/shared/TeamFlag"

export type TeamLabelWithFlagLayout = "label-flag" | "flag-label"

export type TeamLabelWithFlagProps = {
  label: string
  titleText: string
  flagCode?: string | null
  /** `label-flag`: nazwa, potem flaga (np. gospodarz w formularzu). `flag-label`: flaga, potem nazwa (np. gość). */
  layout: TeamLabelWithFlagLayout
  /** Znana drużyna — pełny kolor tekstu; slot TBD — stonowany. */
  teamResolved: boolean
  className?: string
  ellipsisClassName?: string
}

const FlagSlot = ({ flagCode }: { flagCode?: string | null }) => (
  <span className="flex justify-center justify-self-center items-center w-7 h-[18px] shrink-0">
    {flagCode ? <TeamFlag code={flagCode} /> : null}
  </span>
)

export const TeamLabelWithFlag = ({
  label,
  titleText,
  flagCode,
  layout,
  teamResolved,
  className,
  ellipsisClassName,
}: TeamLabelWithFlagProps) => {
  const textTone = teamResolved ? "text-foreground" : "text-muted-foreground"
  const align =
    layout === "label-flag"
      ? "justify-self-end font-medium text-right"
      : "justify-self-start font-medium text-left"

  const ellipsis = (
    <EllipsisWithTooltip
      titleText={titleText}
      className={cn(align, textTone, ellipsisClassName)}
    >
      {label}
    </EllipsisWithTooltip>
  )

  const flag = <FlagSlot flagCode={flagCode} />

  if (layout === "label-flag") {
    return (
      <div className={cn("contents min-w-0 *:min-w-0", className)}>
        {ellipsis}
        {flag}
      </div>
    )
  }

  return (
    <div className={cn("contents min-w-0 *:min-w-0", className)}>
      {flag}
      {ellipsis}
    </div>
  )
}

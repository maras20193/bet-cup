import { cn } from "@/lib/utils"

import { EllipsisWithTooltip } from "@/components/shared/EllipsisWithTooltip"
import { TeamFlag } from "@/components/shared/TeamFlag"

export type TeamLabelWithFlagLayout = "label-flag" | "flag-label"

export type TeamLabelWithFlagProps = {
  label: string
  titleText: string
  compactLabel?: string
  flagCode?: string | null
  layout: TeamLabelWithFlagLayout
  teamResolved: boolean
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
  compactLabel,
  flagCode,
  layout,
  teamResolved,
  ellipsisClassName,
}: TeamLabelWithFlagProps) => {
  const textTone = teamResolved ? "text-foreground" : "text-muted-foreground"
  const align =
    layout === "label-flag"
      ? "justify-self-end font-medium text-right"
      : "justify-self-start font-medium text-left"

  const textClass = cn(align, textTone, ellipsisClassName)

  const ellipsis =
    compactLabel != null ? (
      <>
        <EllipsisWithTooltip
          titleText={titleText}
          tapToReveal
          className={cn(textClass, "md:hidden")}
        >
          {compactLabel}
        </EllipsisWithTooltip>
        <EllipsisWithTooltip
          titleText={titleText}
          className={cn(textClass, "hidden md:block")}
        >
          {label}
        </EllipsisWithTooltip>
      </>
    ) : (
      <EllipsisWithTooltip titleText={titleText} className={textClass}>
        {label}
      </EllipsisWithTooltip>
    )

  const flag = <FlagSlot flagCode={flagCode} />

  if (layout === "label-flag") {
    return (
      <>
        {ellipsis}
        {flag}
      </>
    )
  }

  return (
    <>
      {flag}
      {ellipsis}
    </>
  )
}

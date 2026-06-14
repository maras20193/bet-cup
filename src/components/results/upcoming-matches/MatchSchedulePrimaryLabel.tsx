import { formatKickoffLabel } from "@/lib/match-schedule/formatKickoffLabel"
import type { MatchScheduleStatus } from "@/lib/match-schedule/getMatchScheduleStatus"
import { cn } from "@/lib/utils"

export type MatchSchedulePrimaryLabelProps = {
  status: MatchScheduleStatus
  kickoffAt: string
  className?: string
}

export function MatchSchedulePrimaryLabel({
  status,
  kickoffAt,
  className,
}: MatchSchedulePrimaryLabelProps) {
  if (status.kind === "upcoming") {
    const { dayLabel, timeLabel } = formatKickoffLabel(kickoffAt)
    return (
      <span className={cn("text-muted-foreground text-xs truncate", className)}>
        {dayLabel} · {timeLabel}
      </span>
    )
  }

  if (status.kind === "live") {
    return (
      <span
        className={cn(
          "inline-flex shrink-0 items-center gap-1.5 rounded-full",
          "bg-red-500/15 px-2 py-0.5 text-[0.65rem] font-semibold text-red-600 dark:text-red-400",
          className,
        )}
      >
        <span className="relative flex size-1.5" aria-hidden>
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-500 opacity-75" />
          <span className="relative inline-flex size-1.5 rounded-full bg-red-500" />
        </span>
        Trwa
      </span>
    )
  }

  return (
    <span
      className={cn(
        "inline-flex shrink-0 rounded-full bg-muted px-2 py-0.5",
        "text-[0.65rem] font-semibold text-muted-foreground ring-1 ring-border/50",
        className,
      )}
    >
      Zakończony
    </span>
  )
}

export function getMatchScheduleAriaLabel(
  status: MatchScheduleStatus,
  kickoffAt: string,
  homeName: string,
  awayName: string,
): string {
  if (status.kind === "upcoming") {
    const { dayLabel, timeLabel } = formatKickoffLabel(kickoffAt)
    return `${dayLabel}, ${timeLabel}, ${homeName} — ${awayName}`
  }
  if (status.kind === "live") {
    return `Trwa, ${homeName} — ${awayName}`
  }
  if (status.result !== null) {
    return `Zakończony, ${status.result.home}-${status.result.away}, ${homeName} — ${awayName}`
  }
  return `Zakończony, ${homeName} — ${awayName}`
}

import { TeamLabelWithFlag } from "@/components/shared/TeamLabelWithFlag"
import { teams } from "@/data/teams/teams"
import { cn } from "@/lib/utils"
import type { Match } from "@/types/match"

function teamPair(match: Match) {
  const home = match.homeId ? teams[match.homeId] : null
  const away = match.awayId ? teams[match.awayId] : null
  return { home, away }
}

export type MatchLabelProps = {
  match: Match
  /** Pełne nazwy + układ jak na desktopie w tabeli (np. nagłówek modala). */
  fullNames?: boolean
}

export function MatchLabel({ match, fullNames = false }: MatchLabelProps) {
  const { home, away } = teamPair(match)
  const homeLabel = home?.name ?? match.homeSlot ?? "—"
  const awayLabel = away?.name ?? match.awaySlot ?? "—"
  const homeTitle = home?.name ?? homeLabel
  const awayTitle = away?.name ?? awayLabel

  return (
    <div
      className={cn(
        "items-center grid w-full max-w-full text-sm leading-tight",
        fullNames
          ? "grid-cols-[minmax(0,1fr)_1.75rem_auto_1.75rem_minmax(0,1fr)] gap-x-1.5"
          : cn(
              "gap-x-1 grid-cols-[minmax(0,1fr)_1.5rem_auto_1.5rem_minmax(0,1fr)]",
              "md:gap-x-1.5 md:grid-cols-[minmax(0,1fr)_1.75rem_auto_1.75rem_minmax(0,1fr)]",
            ),
      )}
    >
      <TeamLabelWithFlag
        label={home ? home.name : homeLabel}
        compactLabel={fullNames ? undefined : home?.shortCode}
        titleText={homeTitle}
        flagCode={home?.code}
        layout="label-flag"
        teamResolved={Boolean(home)}
        ellipsisClassName="min-w-0"
      />
      <span className="text-muted-foreground text-center shrink-0" aria-hidden>
        —
      </span>
      <TeamLabelWithFlag
        label={away ? away.name : awayLabel}
        compactLabel={fullNames ? undefined : away?.shortCode}
        titleText={awayTitle}
        flagCode={away?.code}
        layout="flag-label"
        teamResolved={Boolean(away)}
        ellipsisClassName="min-w-0"
      />
    </div>
  )
}

import type { Match } from "@/types/match"

export type OfficialResultPillProps = {
  match: Match
}

export function OfficialResultPill({ match }: OfficialResultPillProps) {
  if (match.result) {
    return (
      <span className="inline-flex rounded-full bg-muted px-3 py-1 text-xs font-semibold tabular-nums text-foreground ring-1 ring-border/50 dark:bg-white dark:text-zinc-950 dark:ring-0">
        {match.result.home}-{match.result.away}
      </span>
    )
  }
  return (
    <span
      className="inline-flex bg-transparent px-3 py-1 border border-foreground/25 dark:border-white/35 rounded-full font-medium text-muted-foreground text-xs"
      title="Brak wyniku"
    >
      ?
    </span>
  )
}

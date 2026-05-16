import type { Match } from "@/types/match"

export type OfficialResultPillProps = {
  match: Match
}

export function OfficialResultPill({ match }: OfficialResultPillProps) {
  if (match.result) {
    return (
      <span className="inline-flex bg-white px-3 py-1 rounded-full font-semibold tabular-nums text-zinc-950 text-xs">
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

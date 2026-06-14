import { UpcomingMatchCard } from "@/components/results/upcoming-matches/UpcomingMatchCard"
import { UpcomingMatchesStripSkeleton } from "@/components/results/upcoming-matches/UpcomingMatchesStripSkeleton"
import { useUpcomingMatches } from "@/components/results/upcoming-matches/hooks/useUpcomingMatches"
import { cn } from "@/lib/utils"
import type { PlayerPredictionBundleInput } from "@/types/predictions"

export type UpcomingMatchesStripProps = {
  bundles: readonly PlayerPredictionBundleInput[]
}

export function UpcomingMatchesStrip({ bundles }: UpcomingMatchesStripProps) {
  const { rows, isLoading } = useUpcomingMatches({ bundles })

  if (isLoading) {
    return <UpcomingMatchesStripSkeleton />
  }

  if (rows.length === 0) {
    return null
  }

  return (
    <section
      aria-label="Mecze do rozegrania"
      className="flex flex-col gap-1.5 shrink-0"
    >
      <div
        className={cn(
          "flex gap-2 overflow-x-auto overscroll-x-contain scroll-smooth",
          "snap-x snap-mandatory [-webkit-overflow-scrolling:touch]",
          "pb-0.5"
        )}
      >
        {rows.map((row) => (
          <UpcomingMatchCard key={row.match.id} row={row} bundles={bundles} />
        ))}
      </div>
    </section>
  )
}

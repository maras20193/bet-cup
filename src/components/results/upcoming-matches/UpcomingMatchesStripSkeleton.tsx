import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

const CARD_CLASS =
  "flex shrink-0 snap-start flex-col gap-2 rounded-lg border border-border/60 p-2.5 w-44 sm:w-50"

function UpcomingMatchCardSkeleton() {
  return (
    <div className={CARD_CLASS} aria-hidden>
      <div className="flex items-center justify-between gap-2">
        <Skeleton className="h-3.5 w-20" />
        <Skeleton className="h-4 w-12 rounded-full" />
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
    </div>
  )
}

export type UpcomingMatchesStripSkeletonProps = {
  className?: string
}

export function UpcomingMatchesStripSkeleton({
  className,
}: UpcomingMatchesStripSkeletonProps) {
  return (
    <section
      aria-busy="true"
      aria-label="Ładowanie meczów do rozegrania"
      className={cn("flex shrink-0 flex-col gap-1.5", className)}
    >
      <Skeleton className="h-4 w-32" />
      <div
        className={cn(
          "flex gap-2 overflow-x-hidden pb-0.5",
          "snap-x snap-mandatory",
        )}
      >
        <UpcomingMatchCardSkeleton />
        <UpcomingMatchCardSkeleton />
        <UpcomingMatchCardSkeleton />
      </div>
    </section>
  )
}

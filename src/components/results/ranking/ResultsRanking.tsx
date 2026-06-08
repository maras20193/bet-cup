import { RankingPlaceGroup } from "@/components/results/ranking/RankingPlaceGroup"
import { useCompetitionResults } from "@/components/results/hooks/useCompetitionResults"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

const SKELETON_PLACE_COUNT = 3

const RankingSkeleton = () => (
  <div className="gap-4 md:gap-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mx-auto mt-1 mb-4 max-w-[1400px]">
    {Array.from({ length: SKELETON_PLACE_COUNT }, (_, i) => (
      <Card
        key={i}
        className="relative md:gap-3 md:py-3 ring-2 ring-foreground/10 min-w-[360px] overflow-hidden"
      >
        <CardHeader className="flex flex-row justify-between items-center gap-2 md:px-3 pb-2 md:pb-1.5">
          <Skeleton className="w-28 h-6" />
          <Skeleton className="w-12 h-5" />
        </CardHeader>
        <CardContent className="flex flex-col gap-3 md:gap-2 md:px-3">
          {Array.from({ length: 2 + i }, (_, j) => (
            <div key={j} className="flex flex-row items-center gap-3">
              <Skeleton className="rounded-full size-8 md:size-7 shrink-0" />
              <Skeleton className="flex-1 h-5" />
            </div>
          ))}
        </CardContent>
      </Card>
    ))}
  </div>
)

export const ResultsRanking = () => {
  const { ranking, isLoading } = useCompetitionResults()

  if (isLoading) {
    return <RankingSkeleton />
  }

  return (
    <div
      className={cn(
        "gap-4 md:gap-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
        "mx-auto mt-1 mb-4 max-w-[1400px]",
      )}
    >
      {ranking.map((group) => (
        <RankingPlaceGroup key={group.place} group={group} />
      ))}
    </div>
  )
}

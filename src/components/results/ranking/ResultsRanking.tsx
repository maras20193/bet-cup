import { RankingPlaceGroup } from "@/components/results/ranking/RankingPlaceGroup"
import { RankingSkeleton } from "@/components/results/ranking/RankingSkeleton"
import { useCompetitionResults } from "@/components/results/hooks/useCompetitionResults"
import { cn } from "@/lib/utils"

const rankingGridClassName = cn(
  "gap-4 md:gap-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
)

export const ResultsRanking = () => {
  const { ranking, isLoading } = useCompetitionResults()

  return (
    <div className={rankingGridClassName}>
      {isLoading
        ? <RankingSkeleton />
        : ranking.map((group) => (
            <RankingPlaceGroup key={group.place} group={group} />
          ))}
    </div>
  )
}

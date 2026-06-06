import { RankingPlaceGroup } from "@/components/results/ranking/RankingPlaceGroup"
import { useCompetitionResults } from "@/components/results/hooks/useCompetitionResults"

export const ResultsRanking = () => {
  const { ranking } = useCompetitionResults()

  return (
    <div className="gap-4 md:gap-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mx-auto mt-1 mb-4 max-w-[1400px]bg-red-400">
      {ranking.map((group) => (
        <RankingPlaceGroup key={group.place} group={group} />
      ))}
    </div>
  )
}

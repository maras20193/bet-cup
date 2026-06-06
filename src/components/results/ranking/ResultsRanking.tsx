import { useMemo } from "react"

import { RankingPlaceGroup } from "@/components/results/ranking/RankingPlaceGroup"
import { chartDataSource } from "@/components/results/chart/chartDataSource"
import { buildCompetitionRanking } from "@/lib/buildCompetitionRanking"

export const ResultsRanking = () => {
  const ranking = useMemo(
    () =>
      buildCompetitionRanking(
        chartDataSource.map((row) => ({
          name: row.month,
          points: row.points,
        }))
      ),
    []
  )

  return (
    <div className="gap-4 md:gap-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mx-auto mt-1 max-w-[1400px]">
      {ranking.map((group) => (
        <RankingPlaceGroup key={group.place} group={group} />
      ))}
    </div>
  )
}

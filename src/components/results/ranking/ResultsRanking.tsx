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
    <div className="flex flex-col flex-1 gap-5 p-2 min-h-0 [-webkit-overflow-scrolling:touch] overflow-y-auto">
      {ranking.map((group) => (
        <RankingPlaceGroup key={group.place} group={group} />
      ))}
    </div>
  )
}

import { useMemo } from "react"

import { buildResultsPhaseSections } from "@/components/results/utils/resultsPhases"
import { buildMultiPhaseResultsTableModel } from "@/components/results/results-table/utils/buildResultsTableModel"
import { appConfig } from "@/config/app.config"
import { playerPredictionBundles } from "@/data/player-bundles"
import { useMergedPhaseMatchBundles } from "@/hooks/useMergedPhaseMatchBundles"
import {
  buildCompetitionRanking,
  type RankingGroup,
} from "@/lib/buildCompetitionRanking"
import type { PlayerPredictionBundleInput } from "@/types/predictions"

export type PlayerScore = {
  playerId: string
  name: string
  points: number
}

export type UseCompetitionResultsArgs = {
  bundles?: readonly PlayerPredictionBundleInput[]
}

export function useCompetitionResults({
  bundles = playerPredictionBundles,
}: UseCompetitionResultsArgs = {}) {
  const scoring = appConfig.scoring
  const { mergedBundles } = useMergedPhaseMatchBundles()

  const sections = useMemo(
    () => buildResultsPhaseSections(appConfig, mergedBundles),
    [mergedBundles],
  )

  const playerScores = useMemo<PlayerScore[]>(() => {
    const { playerTotals } = buildMultiPhaseResultsTableModel(
      sections,
      bundles,
      scoring,
    )

    return bundles.map((b) => ({
      playerId: b.playerId,
      name: b.displayName,
      points: playerTotals[b.playerId] ?? 0,
    }))
  }, [sections, bundles, scoring])

  const ranking = useMemo<RankingGroup[]>(
    () =>
      buildCompetitionRanking(
        playerScores.map(({ name, points }) => ({ name, points })),
      ),
    [playerScores],
  )

  return { playerScores, ranking }
}

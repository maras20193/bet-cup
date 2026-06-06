import { useMemo } from "react"

import { buildResultsPhaseSections } from "@/components/results/utils/resultsPhases"
import { buildMultiPhaseResultsTableModel } from "@/components/results/results-table/utils/buildResultsTableModel"
import { appConfig } from "@/config/app.config"
import { phaseMatchBundles } from "@/data/matches/phase-bundles"
import { playerPredictionBundles } from "@/data/player-bundles"
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

  const sections = useMemo(
    () => buildResultsPhaseSections(appConfig, phaseMatchBundles),
    [],
  )

  const playerScores = useMemo<PlayerScore[]>(() => {
    const { playerTotals } = buildMultiPhaseResultsTableModel(
      sections,
      bundles,
      scoring,
    )

    return bundles
      .map((b) => ({
        playerId: b.playerId,
        name: b.displayName,
        points: playerTotals[b.playerId] ?? 0,
      }))
      .sort(
        (a, b) =>
          b.points - a.points || a.name.localeCompare(b.name, "pl"),
      )
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

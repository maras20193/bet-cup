import { useMemo } from "react"

import { appConfig } from "@/config/app.config"
import { buildResultsPhaseSections } from "@/components/results/utils/resultsPhases"
import { buildMultiPhaseResultsTableModel } from "@/components/results/results-table/utils/buildResultsTableModel"
import { useMergedPhaseMatchBundles } from "@/hooks/useMergedPhaseMatchBundles"
import { selectUnplayedMatchRows } from "@/lib/match-schedule/selectUnplayedMatchRows"
import type { PlayerPredictionBundleInput } from "@/types/predictions"

export type UseUpcomingMatchesArgs = {
  bundles: readonly PlayerPredictionBundleInput[]
}

export function useUpcomingMatches({ bundles }: UseUpcomingMatchesArgs) {
  const scoring = appConfig.scoring
  const { mergedBundles, isLoading } = useMergedPhaseMatchBundles()

  const sections = useMemo(
    () => buildResultsPhaseSections(appConfig, mergedBundles),
    [mergedBundles],
  )

  const rows = useMemo(() => {
    const { rows: tableRows } = buildMultiPhaseResultsTableModel(
      sections,
      bundles,
      scoring,
    )
    const matchRows = tableRows.filter((row) => row.kind === "match")
    return selectUnplayedMatchRows(matchRows)
  }, [sections, bundles, scoring])

  return { rows, isLoading }
}

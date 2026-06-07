import { useMemo } from "react"

import { appConfig } from "@/config/app.config"
import { phaseMatchBundles } from "@/data/matches/phase-bundles"
import { mergeMatchResults } from "@/lib/match-results/mergeMatchResults"

import { useMatchResults } from "./useMatchResults"

export function useMergedPhaseMatchBundles() {
  const { resultsByMatchId, isLoading, error } = useMatchResults(
    appConfig.tournament.id,
  )

  const mergedBundles = useMemo(
    () => mergeMatchResults(phaseMatchBundles, resultsByMatchId),
    [resultsByMatchId],
  )

  return { mergedBundles, isLoading, error }
}

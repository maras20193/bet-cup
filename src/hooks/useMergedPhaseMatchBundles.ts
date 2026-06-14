import { useMemo } from "react"

import { appConfig } from "@/config/app.config"
import { phaseMatchBundles } from "@/data/matches/phase-bundles"
import { mergeMatchResults } from "@/lib/match-results/mergeMatchResults"
import { mergeMatchSchedule } from "@/lib/match-results/mergeMatchSchedule"

import { useMatchResults } from "./useMatchResults"

export function useMergedPhaseMatchBundles() {
  const { resultsByMatchId, isLoading, error } = useMatchResults(
    appConfig.tournament.id,
  )

  const mergedBundles = useMemo(() => {
    const withSchedule = mergeMatchSchedule(phaseMatchBundles)
    return mergeMatchResults(withSchedule, resultsByMatchId)
  }, [resultsByMatchId])

  return { mergedBundles, isLoading, error }
}

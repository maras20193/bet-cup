import { useCallback, useEffect, useState } from "react"

import { fetchMatchResults } from "@/lib/match-results/fetchMatchResults"
import type { MatchResultRow } from "@/lib/match-results/types"

export type UseMatchResultsState = {
  resultsByMatchId: ReadonlyMap<string, MatchResultRow>
  isLoading: boolean
  error: string | null
}

export function useMatchResults(tournamentId: string): UseMatchResultsState {
  const [resultsByMatchId, setResultsByMatchId] = useState(
    () => new Map<string, MatchResultRow>(),
  )
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const results = await fetchMatchResults(tournamentId)
      setResultsByMatchId(results)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load match results")
    } finally {
      setIsLoading(false)
    }
  }, [tournamentId])

  useEffect(() => {
    void load()
  }, [load])

  return { resultsByMatchId, isLoading, error }
}

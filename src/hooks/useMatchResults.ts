import { useCallback, useEffect, useRef, useState } from "react"

import { fetchMatchResults } from "@/lib/match-results/fetchMatchResults"
import type { MatchResultRow } from "@/lib/match-results/types"

const REFETCH_DEBOUNCE_MS = 2_000

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
  const lastFetchAtRef = useRef(0)

  const load = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const results = await fetchMatchResults(tournamentId)
      setResultsByMatchId(results)
      lastFetchAtRef.current = Date.now()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load match results")
    } finally {
      setIsLoading(false)
    }
  }, [tournamentId])

  useEffect(() => {
    void load()
  }, [load])

  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.visibilityState !== "visible") return
      if (Date.now() - lastFetchAtRef.current < REFETCH_DEBOUNCE_MS) return
      void load()
    }

    document.addEventListener("visibilitychange", onVisibilityChange)
    return () =>
      document.removeEventListener("visibilitychange", onVisibilityChange)
  }, [load])

  return { resultsByMatchId, isLoading, error }
}

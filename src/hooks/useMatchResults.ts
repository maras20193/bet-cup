import { useQuery } from "@tanstack/react-query"

import { fetchMatchResults } from "@/lib/match-results/fetchMatchResults"
import type { MatchResultRow } from "@/lib/match-results/types"
import { matchResultsQueryKeys } from "@/lib/query/queryKeys"

const EMPTY_RESULTS = new Map<string, MatchResultRow>()

export type UseMatchResultsState = {
  resultsByMatchId: ReadonlyMap<string, MatchResultRow>
  isLoading: boolean
  error: string | null
}

export function useMatchResults(tournamentId: string): UseMatchResultsState {
  const { data, isPending, error } = useQuery({
    queryKey: matchResultsQueryKeys.byTournament(tournamentId),
    queryFn: () => fetchMatchResults(tournamentId),
  })

  return {
    resultsByMatchId: data ?? EMPTY_RESULTS,
    isLoading: isPending,
    error: error
      ? error instanceof Error
        ? error.message
        : "Failed to load match results"
      : null,
  }
}

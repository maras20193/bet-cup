export const matchResultsQueryKeys = {
  all: ["match-results"] as const,
  byTournament: (tournamentId: string) =>
    ["match-results", tournamentId] as const,
}

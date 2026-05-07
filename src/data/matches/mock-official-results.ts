import { groupStageMatches } from "@/data/matches/group-stage"
import type { Match, MatchResult } from "@/types/match"

/** Jawne wyniki dla części meczów (demo — podgląd tabeli i wykresu punktów). */
export const mockOfficialResultsByMatchId: Readonly<
  Record<string, MatchResult>
> = {
  "gs-a-001": { home: 2, away: 1 },
  "gs-a-002": { home: 0, away: 0 },
  "gs-a-003": { home: 3, away: 2 },
  "gs-a-004": { home: 1, away: 2 },
  "gs-a-005": { home: 2, away: 2 },
  "gs-b-001": { home: 0, away: 1 },
}

export function withOfficialResultsOverlay(
  matches: readonly Match[],
): Match[] {
  return matches.map((m) => ({
    ...m,
    result: mockOfficialResultsByMatchId[m.id] ?? m.result,
  }))
}

/** Faza grupowa z nałożonymi mockowymi wynikami (tylko wybrane mecze). */
export const groupStageMatchesWithDemoResults = withOfficialResultsOverlay([
  ...groupStageMatches.matches,
])

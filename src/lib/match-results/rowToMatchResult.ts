import type { MatchResult } from "@/types/match"

import type { MatchResultRow } from "./types"

export function rowToMatchResult(row: MatchResultRow | undefined): MatchResult {
  if (!row || row.home === null || row.away === null) return null
  return { home: row.home, away: row.away }
}

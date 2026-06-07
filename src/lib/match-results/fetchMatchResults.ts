import { getSupabaseClient } from "@/lib/supabase/client"

import type { MatchResultRow, SupabaseMatchResultRow } from "./types"

export async function fetchMatchResults(
  tournamentId: string
): Promise<Map<string, MatchResultRow>> {
  const client = getSupabaseClient()
  if (!client) return new Map()

  const { data, error } = await client
    .from("match_results")
    .select("match_id, home, away")
    .eq("tournament_id", tournamentId)

  if (error) throw error

  const map = new Map<string, MatchResultRow>()
  for (const row of (data ?? []) as SupabaseMatchResultRow[]) {
    map.set(row.match_id, { home: row.home, away: row.away })
  }

  return map
}

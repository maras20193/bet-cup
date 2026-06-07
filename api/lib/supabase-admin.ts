import { createClient, type SupabaseClient } from "@supabase/supabase-js"

import { tournamentId } from "../generated/tournament-catalog.js"

let client: SupabaseClient | null | undefined

function getSupabaseAdminClient(): SupabaseClient | null {
  if (client !== undefined) return client

  const url = process.env.SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceRoleKey) {
    client = null
    return client
  }

  client = createClient(url, serviceRoleKey)
  return client
}

export type UpdateMatchResultInput = {
  matchId: string
  home: number
  away: number
}

export type UpdateMatchResultOutput =
  | { ok: true; matchId: string; home: number; away: number; tournamentId: string }
  | { ok: false; status: number; error: string }

export async function updateMatchResultInSupabase(
  input: UpdateMatchResultInput,
): Promise<UpdateMatchResultOutput> {
  const supabase = getSupabaseAdminClient()
  if (!supabase) {
    return {
      ok: false,
      status: 503,
      error:
        "Supabase is not configured (SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)",
    }
  }

  const { data, error } = await supabase
    .from("match_results")
    .update({
      home: input.home,
      away: input.away,
      updated_at: new Date().toISOString(),
    })
    .eq("tournament_id", tournamentId)
    .eq("match_id", input.matchId)
    .select("match_id, home, away")
    .maybeSingle()

  if (error) {
    console.error("Supabase update failed", error)
    return { ok: false, status: 502, error: "Database update failed" }
  }

  if (!data) {
    return {
      ok: false,
      status: 404,
      error: `No match_results row for ${input.matchId} in tournament ${tournamentId}`,
    }
  }

  return {
    ok: true,
    matchId: data.match_id as string,
    home: data.home as number,
    away: data.away as number,
    tournamentId,
  }
}

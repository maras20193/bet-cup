import { groupStageAllMatches } from "@/data/matches/group-stage"
import type { MatchResult } from "@/types/match"

function hash32(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function resultForGroupStageId(id: string): MatchResult {
  const h = hash32(id)
  const home = h % 5
  const away = Math.floor(h / 11) % 5
  return { home, away }
}

export const mockOfficialResultsByMatchId: Readonly<
  Record<string, MatchResult>
> = Object.fromEntries(
  groupStageAllMatches.map((m) => [m.id, resultForGroupStageId(m.id)]),
) as Readonly<Record<string, MatchResult>>

import { teams } from "@/data/teams/teams"
import type { Match } from "@/types/match"

export function resolveMatchTeamLabels(match: Match) {
  const home = match.homeId ? teams[match.homeId] : null
  const away = match.awayId ? teams[match.awayId] : null

  return {
    homeName: home?.name ?? match.homeSlot ?? "—",
    awayName: away?.name ?? match.awaySlot ?? "—",
  }
}

import { appConfig } from "@/config/app.config"
import { teams } from "@/data/teams/teams"
import { buildAllMatches } from "@/mappers/matches"

export type ApiTeamCatalogEntry = {
  teamId: string
  name: string
}

export type ApiMatchCatalogEntry = {
  matchId: string
  phaseId: string
  phaseLabel: string
  groupId: string | null
  homeTeamId: string | null
  awayTeamId: string | null
  homeName: string | null
  awayName: string | null
  homeSlot: string | null
  awaySlot: string | null
  hasAssignedTeams: boolean
}

export type ApiTournamentCatalog = {
  tournamentId: string
  teams: ApiTeamCatalogEntry[]
  matches: ApiMatchCatalogEntry[]
}

/** Same source as the app: teams.ts + match files (via buildAllMatches / phase-bundles). */
export function buildApiTournamentCatalog(): ApiTournamentCatalog {
  const teamCatalog = Object.entries(teams)
    .map(([teamId, team]) => ({ teamId, name: team.name }))
    .sort((a, b) => a.name.localeCompare(b.name, "pl"))

  const matchCatalog = buildAllMatches().map((match) => {
    const phaseLabel = appConfig.phases[match.phaseId].label
    const homeName = match.homeId ? teams[match.homeId].name : null
    const awayName = match.awayId ? teams[match.awayId].name : null

    return {
      matchId: match.id,
      phaseId: match.phaseId,
      phaseLabel,
      groupId: match.groupId,
      homeTeamId: match.homeId,
      awayTeamId: match.awayId,
      homeName,
      awayName,
      homeSlot: match.homeSlot ?? null,
      awaySlot: match.awaySlot ?? null,
      hasAssignedTeams: match.homeId !== null && match.awayId !== null,
    }
  })

  return {
    tournamentId: appConfig.tournament.id,
    teams: teamCatalog,
    matches: matchCatalog,
  }
}

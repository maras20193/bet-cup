import { writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

import { buildApiTournamentCatalog } from "../src/lib/tournament-catalog/buildApiCatalog.ts"

const scriptDir = dirname(fileURLToPath(import.meta.url))
const outPath = join(scriptDir, "../api/generated/tournament-catalog.ts")

const catalog = buildApiTournamentCatalog()

const source = `// AUTO-GENERATED snapshot — api/generated/ — do not edit by hand.
// Source of truth: src/data/teams/teams.ts + src/data/matches/**
// Regenerated from the same data as the frontend (buildAllMatches → phase-bundles).
// After editing e.g. round-of-4.ts: npm run api:catalog (also runs on npm run build).

export const tournamentId = ${JSON.stringify(catalog.tournamentId)} as const

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

export const teamCatalog: readonly ApiTeamCatalogEntry[] = ${JSON.stringify(catalog.teams, null, 2)} as const

export const matchCatalog: readonly ApiMatchCatalogEntry[] = ${JSON.stringify(catalog.matches, null, 2)} as const

const matchIds = new Set(matchCatalog.map((m) => m.matchId))

export function isKnownMatchId(matchId: string): boolean {
  return matchIds.has(matchId)
}
`

writeFileSync(outPath, source, "utf8")
console.log(
  `Wrote ${catalog.teams.length} teams and ${catalog.matches.length} matches to ${outPath}`,
)

import { teams } from "@/data/teams/teams"
import type { Match, TeamId } from "@/types/match"
import type { PhasePredictions } from "@/types/predictions"

import type { MatchWithPhase } from "./matches"
import { parsePhasePredictionsFile } from "./predictions"

export type TeamCell = {
  id: TeamId
  code: string
  name: string
  flag: string
} | null

export type PlayerScorePredictionCell = {
  userId: string
  displayName: string
  prediction: { home: number; away: number } | null
}

export type MatchPredictionsTableRow = {
  match: MatchWithPhase
  homeTeam: TeamCell
  awayTeam: TeamCell
  result: Match["result"]
  players: PlayerScorePredictionCell[]
}

export type PlayerPredictionTableInput = {
  userId: string
  displayName: string
  phaseFiles: readonly PhasePredictions[]
}

function teamCell(teamId: TeamId | null): TeamCell {
  if (teamId === null) return null
  const row = teams[teamId]
  return { id: teamId, ...row }
}

function buildPredictionsByMatchId(
  players: readonly PlayerPredictionTableInput[]
): Map<string, Map<string, { home: number; away: number }>> {
  const byMatchId = new Map<
    string,
    Map<string, { home: number; away: number }>
  >()

  for (const player of players) {
    for (const file of player.phaseFiles) {
      parsePhasePredictionsFile(file)
      for (const pred of file.predictions) {
        let byUser = byMatchId.get(pred.matchId)
        if (!byUser) {
          byUser = new Map()
          byMatchId.set(pred.matchId, byUser)
        }
        byUser.set(player.userId, { home: pred.home, away: pred.away })
      }
    }
  }

  return byMatchId
}

export function buildMatchPredictionsTableRows(options: {
  matches: readonly MatchWithPhase[]
  players: readonly PlayerPredictionTableInput[]
}): MatchPredictionsTableRow[] {
  const predictionsByMatchId = buildPredictionsByMatchId(options.players)

  return options.matches.map((match) => {
    const rowPredictions = predictionsByMatchId.get(match.id)
    const players = options.players.map((p) => ({
      userId: p.userId,
      displayName: p.displayName,
      prediction: rowPredictions?.get(p.userId) ?? null,
    }))

    return {
      match,
      homeTeam: teamCell(match.homeId),
      awayTeam: teamCell(match.awayId),
      result: match.result,
      players,
    }
  })
}

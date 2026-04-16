import { teams } from "./teams/teams"

export type TeamId = keyof typeof teams

export type MatchResult = { home: number; away: number } | null

export type Match = {
  id: string
  groupId: "A" | "B" | null
  homeId: TeamId | null
  awayId: TeamId | null
  result: MatchResult
}

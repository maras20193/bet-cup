import { teams } from "@/data/teams/teams"

export type TeamId = keyof typeof teams

export type MatchResult = { home: number; away: number } | null

export const groupIds = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
] as const

export type GroupId = (typeof groupIds)[number]

export type MatchDefinition = {
  id: string
  groupId: GroupId | null
  homeId: TeamId | null
  awayId: TeamId | null
  homeSlot?: string
  awaySlot?: string
  kickoffAt?: string
}

export type Match = MatchDefinition & {
  result: MatchResult
  kickoffAt: string
}

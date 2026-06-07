import type { MatchDefinition } from "@/types/match"

export const groupStageGroupKMatches = [
  {
    id: "gs-k-001",
    groupId: "K",
    homeId: "PORTUGAL",
    awayId: "DR_CONGO",
  },
  {
    id: "gs-k-002",
    groupId: "K",
    homeId: "UZBEKISTAN",
    awayId: "COLOMBIA",
  },
  {
    id: "gs-k-003",
    groupId: "K",
    homeId: "PORTUGAL",
    awayId: "UZBEKISTAN",
  },
  {
    id: "gs-k-004",
    groupId: "K",
    homeId: "COLOMBIA",
    awayId: "DR_CONGO",
  },
  {
    id: "gs-k-005",
    groupId: "K",
    homeId: "DR_CONGO",
    awayId: "UZBEKISTAN",
  },
  {
    id: "gs-k-006",
    groupId: "K",
    homeId: "COLOMBIA",
    awayId: "PORTUGAL",
  },
] as const satisfies readonly MatchDefinition[]

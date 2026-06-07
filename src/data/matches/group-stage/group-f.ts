import type { MatchDefinition } from "@/types/match"

export const groupStageGroupFMatches = [
  {
    id: "gs-f-001",
    groupId: "F",
    homeId: "NETHERLANDS",
    awayId: "JAPAN",
  },
  {
    id: "gs-f-002",
    groupId: "F",
    homeId: "SWEDEN",
    awayId: "TUNISIA",
  },
  {
    id: "gs-f-003",
    groupId: "F",
    homeId: "NETHERLANDS",
    awayId: "SWEDEN",
  },
  {
    id: "gs-f-004",
    groupId: "F",
    homeId: "TUNISIA",
    awayId: "JAPAN",
  },
  {
    id: "gs-f-005",
    groupId: "F",
    homeId: "JAPAN",
    awayId: "SWEDEN",
  },
  {
    id: "gs-f-006",
    groupId: "F",
    homeId: "TUNISIA",
    awayId: "NETHERLANDS",
  },
] as const satisfies readonly MatchDefinition[]

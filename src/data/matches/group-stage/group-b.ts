import type { Match } from "@/types/match"

export const groupStageGroupBMatches = [
  {
    id: "gs-b-001",
    groupId: "B",
    homeId: "FRANCE",
    awayId: "ITALY",
    result: { home: 3, away: 2 },
  },
  {
    id: "gs-b-002",
    groupId: "B",
    homeId: "NETHERLANDS",
    awayId: "PORTUGAL",
    result: { home: 1, away: 1 },
  },
  {
    id: "gs-b-003",
    groupId: "B",
    homeId: "FRANCE",
    awayId: "NETHERLANDS",
    result: null,
  },
  {
    id: "gs-b-004",
    groupId: "B",
    homeId: "ITALY",
    awayId: "PORTUGAL",
    result: null,
  },
  {
    id: "gs-b-005",
    groupId: "B",
    homeId: "FRANCE",
    awayId: "PORTUGAL",
    result: null,
  },
  {
    id: "gs-b-006",
    groupId: "B",
    homeId: "ITALY",
    awayId: "NETHERLANDS",
    result: null,
  },
] as const satisfies readonly Match[]

import type { MatchDefinition } from "@/types/match"

export const groupStageGroupBMatches = [
  {
    id: "gs-b-001",
    groupId: "B",
    homeId: "CANADA",
    awayId: "BOSNIA_HERZEGOVINA",
  },
  {
    id: "gs-b-002",
    groupId: "B",
    homeId: "QATAR",
    awayId: "SWITZERLAND",
  },
  {
    id: "gs-b-003",
    groupId: "B",
    homeId: "CANADA",
    awayId: "QATAR",
  },
  {
    id: "gs-b-004",
    groupId: "B",
    homeId: "SWITZERLAND",
    awayId: "CANADA",
  },
  {
    id: "gs-b-005",
    groupId: "B",
    homeId: "BOSNIA_HERZEGOVINA",
    awayId: "QATAR",
  },
  {
    id: "gs-b-006",
    groupId: "B",
    homeId: "BOSNIA_HERZEGOVINA",
    awayId: "SWITZERLAND",
  },
] as const satisfies readonly MatchDefinition[]

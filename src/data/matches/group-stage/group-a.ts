import type { MatchDefinition } from "@/types/match"

export const groupStageGroupAMatches = [
  {
    id: "gs-a-001",
    groupId: "A",
    homeId: "MEXICO",
    awayId: "SOUTH_AFRICA",
  },
  {
    id: "gs-a-002",
    groupId: "A",
    homeId: "SOUTH_KOREA",
    awayId: "CZECHIA",
  },
  {
    id: "gs-a-003",
    groupId: "A",
    homeId: "MEXICO",
    awayId: "SOUTH_KOREA",
  },
  {
    id: "gs-a-004",
    groupId: "A",
    homeId: "SOUTH_AFRICA",
    awayId: "SOUTH_KOREA",
  },
  {
    id: "gs-a-005",
    groupId: "A",
    homeId: "CZECHIA",
    awayId: "MEXICO",
  },
  {
    id: "gs-a-006",
    groupId: "A",
    homeId: "CZECHIA",
    awayId: "SOUTH_AFRICA",
  },
] as const satisfies readonly MatchDefinition[]

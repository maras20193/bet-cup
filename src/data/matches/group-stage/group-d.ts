import type { MatchDefinition } from "@/types/match"

export const groupStageGroupDMatches = [
  {
    id: "gs-d-001",
    groupId: "D",
    homeId: "USA",
    awayId: "PARAGUAY",
  },
  {
    id: "gs-d-002",
    groupId: "D",
    homeId: "AUSTRALIA",
    awayId: "TURKEY",
  },
  {
    id: "gs-d-003",
    groupId: "D",
    homeId: "USA",
    awayId: "AUSTRALIA",
  },
  {
    id: "gs-d-004",
    groupId: "D",
    homeId: "PARAGUAY",
    awayId: "AUSTRALIA",
  },
  {
    id: "gs-d-005",
    groupId: "D",
    homeId: "TURKEY",
    awayId: "USA",
  },
  {
    id: "gs-d-006",
    groupId: "D",
    homeId: "PARAGUAY",
    awayId: "TURKEY",
  },
] as const satisfies readonly MatchDefinition[]

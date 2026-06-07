import type { MatchDefinition } from "@/types/match"

export const groupStageGroupJMatches = [
  {
    id: "gs-j-001",
    groupId: "J",
    homeId: "ARGENTINA",
    awayId: "ALGERIA",
  },
  {
    id: "gs-j-002",
    groupId: "J",
    homeId: "AUSTRIA",
    awayId: "JORDAN",
  },
  {
    id: "gs-j-003",
    groupId: "J",
    homeId: "ARGENTINA",
    awayId: "AUSTRIA",
  },
  {
    id: "gs-j-004",
    groupId: "J",
    homeId: "JORDAN",
    awayId: "ALGERIA",
  },
  {
    id: "gs-j-005",
    groupId: "J",
    homeId: "ALGERIA",
    awayId: "AUSTRIA",
  },
  {
    id: "gs-j-006",
    groupId: "J",
    homeId: "JORDAN",
    awayId: "ARGENTINA",
  },
] as const satisfies readonly MatchDefinition[]

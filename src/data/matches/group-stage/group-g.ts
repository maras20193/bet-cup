import type { MatchDefinition } from "@/types/match"

export const groupStageGroupGMatches = [
  {
    id: "gs-g-001",
    groupId: "G",
    homeId: "BELGIUM",
    awayId: "EGYPT",
  },
  {
    id: "gs-g-002",
    groupId: "G",
    homeId: "IRAN",
    awayId: "NEW_ZEALAND",
  },
  {
    id: "gs-g-003",
    groupId: "G",
    homeId: "BELGIUM",
    awayId: "IRAN",
  },
  {
    id: "gs-g-004",
    groupId: "G",
    homeId: "NEW_ZEALAND",
    awayId: "EGYPT",
  },
  {
    id: "gs-g-005",
    groupId: "G",
    homeId: "EGYPT",
    awayId: "IRAN",
  },
  {
    id: "gs-g-006",
    groupId: "G",
    homeId: "NEW_ZEALAND",
    awayId: "BELGIUM",
  },
] as const satisfies readonly MatchDefinition[]

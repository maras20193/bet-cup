import type { MatchDefinition } from "@/types/match"

export const groupStageGroupLMatches = [
  {
    id: "gs-l-001",
    groupId: "L",
    homeId: "ENGLAND",
    awayId: "CROATIA",
  },
  {
    id: "gs-l-002",
    groupId: "L",
    homeId: "GHANA",
    awayId: "PANAMA",
  },
  {
    id: "gs-l-003",
    groupId: "L",
    homeId: "ENGLAND",
    awayId: "GHANA",
  },
  {
    id: "gs-l-004",
    groupId: "L",
    homeId: "PANAMA",
    awayId: "CROATIA",
  },
  {
    id: "gs-l-005",
    groupId: "L",
    homeId: "CROATIA",
    awayId: "GHANA",
  },
  {
    id: "gs-l-006",
    groupId: "L",
    homeId: "PANAMA",
    awayId: "ENGLAND",
  },
] as const satisfies readonly MatchDefinition[]

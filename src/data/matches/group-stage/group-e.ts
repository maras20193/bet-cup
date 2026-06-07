import type { MatchDefinition } from "@/types/match"

export const groupStageGroupEMatches = [
  {
    id: "gs-e-001",
    groupId: "E",
    homeId: "GERMANY",
    awayId: "CURACAO",
  },
  {
    id: "gs-e-002",
    groupId: "E",
    homeId: "IVORY_COAST",
    awayId: "ECUADOR",
  },
  {
    id: "gs-e-003",
    groupId: "E",
    homeId: "GERMANY",
    awayId: "IVORY_COAST",
  },
  {
    id: "gs-e-004",
    groupId: "E",
    homeId: "ECUADOR",
    awayId: "CURACAO",
  },
  {
    id: "gs-e-005",
    groupId: "E",
    homeId: "CURACAO",
    awayId: "IVORY_COAST",
  },
  {
    id: "gs-e-006",
    groupId: "E",
    homeId: "ECUADOR",
    awayId: "GERMANY",
  },
] as const satisfies readonly MatchDefinition[]

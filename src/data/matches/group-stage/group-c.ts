import type { MatchDefinition } from "@/types/match"

export const groupStageGroupCMatches = [
  {
    id: "gs-c-001",
    groupId: "C",
    homeId: "BRAZIL",
    awayId: "MOROCCO",
  },
  {
    id: "gs-c-002",
    groupId: "C",
    homeId: "HAITI",
    awayId: "SCOTLAND",
  },
  {
    id: "gs-c-003",
    groupId: "C",
    homeId: "SCOTLAND",
    awayId: "MOROCCO",
  },
  {
    id: "gs-c-004",
    groupId: "C",
    homeId: "BRAZIL",
    awayId: "HAITI",
  },
  {
    id: "gs-c-005",
    groupId: "C",
    homeId: "MOROCCO",
    awayId: "HAITI",
  },
  {
    id: "gs-c-006",
    groupId: "C",
    homeId: "SCOTLAND",
    awayId: "BRAZIL",
  },
] as const satisfies readonly MatchDefinition[]

import type { MatchDefinition } from "@/types/match"

export const groupStageGroupIMatches = [
  {
    id: "gs-i-001",
    groupId: "I",
    homeId: "FRANCE",
    awayId: "SENEGAL",
  },
  {
    id: "gs-i-002",
    groupId: "I",
    homeId: "IRAQ",
    awayId: "NORWAY",
  },
  {
    id: "gs-i-003",
    groupId: "I",
    homeId: "FRANCE",
    awayId: "IRAQ",
  },
  {
    id: "gs-i-004",
    groupId: "I",
    homeId: "SENEGAL",
    awayId: "NORWAY",
  },
  {
    id: "gs-i-005",
    groupId: "I",
    homeId: "FRANCE",
    awayId: "NORWAY",
  },
  {
    id: "gs-i-006",
    groupId: "I",
    homeId: "SENEGAL",
    awayId: "IRAQ",
  },
] as const satisfies readonly MatchDefinition[]

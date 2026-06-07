import type { MatchDefinition } from "@/types/match"

export const groupStageGroupHMatches = [
  {
    id: "gs-h-001",
    groupId: "H",
    homeId: "SPAIN",
    awayId: "CAPE_VERDE",
  },
  {
    id: "gs-h-002",
    groupId: "H",
    homeId: "SAUDI_ARABIA",
    awayId: "URUGUAY",
  },
  {
    id: "gs-h-003",
    groupId: "H",
    homeId: "SPAIN",
    awayId: "SAUDI_ARABIA",
  },
  {
    id: "gs-h-004",
    groupId: "H",
    homeId: "URUGUAY",
    awayId: "CAPE_VERDE",
  },
  {
    id: "gs-h-005",
    groupId: "H",
    homeId: "CAPE_VERDE",
    awayId: "SAUDI_ARABIA",
  },
  {
    id: "gs-h-006",
    groupId: "H",
    homeId: "URUGUAY",
    awayId: "SPAIN",
  },
] as const satisfies readonly MatchDefinition[]

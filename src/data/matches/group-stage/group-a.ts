import type { Match } from "@/types/match"

export const groupStageGroupAMatches = [
  {
    id: "gs-a-001",
    groupId: "A",
    homeId: "POLAND",
    awayId: "BELGIUM",
    result: { home: 2, away: 1 },
  },
  {
    id: "gs-a-002",
    groupId: "A",
    homeId: "SPAIN",
    awayId: "GERMANY",
    result: { home: 0, away: 0 },
  },
  {
    id: "gs-a-003",
    groupId: "A",
    homeId: "POLAND",
    awayId: "SPAIN",
    result: { home: 1, away: 2 },
  },
  {
    id: "gs-a-004",
    groupId: "A",
    homeId: "BELGIUM",
    awayId: "GERMANY",
    result: { home: 1, away: 1 },
  },
  {
    id: "gs-a-005",
    groupId: "A",
    homeId: "POLAND",
    awayId: "GERMANY",
    result: null,
  },
  {
    id: "gs-a-006",
    groupId: "A",
    homeId: "BELGIUM",
    awayId: "SPAIN",
    result: null,
  },
] as const satisfies readonly Match[]

import type { Match } from "@/types/match"

export const groupStageGroupAMatches = [
  {
    id: "gs-a-001",
    groupId: "A",
    homeId: "MEXICO",
    awayId: "SOUTH_AFRICA",
    result: { home: 2, away: 0 },
  },
  {
    id: "gs-a-002",
    groupId: "A",
    homeId: "SOUTH_KOREA",
    awayId: "CZECHIA",
    result: { home: 1, away: 0 },
  },
  {
    id: "gs-a-003",
    groupId: "A",
    homeId: "MEXICO",
    awayId: "SOUTH_KOREA",
    result: { home: 0, away: 0 },
  },
  {
    id: "gs-a-004",
    groupId: "A",
    homeId: "SOUTH_AFRICA",
    awayId: "SOUTH_KOREA",
    result: { home: 0, away: 0 },
  },
  {
    id: "gs-a-005",
    groupId: "A",
    homeId: "CZECHIA",
    awayId: "MEXICO",
    result: { home: 1, away: 1 },
  },
  {
    id: "gs-a-006",
    groupId: "A",
    homeId: "CZECHIA",
    awayId: "SOUTH_AFRICA",
    result: { home: 1, away: 1 },
  },
] as const satisfies readonly Match[]

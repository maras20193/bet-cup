import type { Match } from "@/types/match"

export const roundOf4Matches = {
  phaseId: "round-of-4" as const,
  matches: [
    {
      id: "r4-001",
      groupId: null,
      homeId: null,
      awayId: null,
      result: null,
    },
    {
      id: "r4-002",
      groupId: null,
      homeId: null,
      awayId: null,
      result: null,
    },
  ] satisfies Match[],
}

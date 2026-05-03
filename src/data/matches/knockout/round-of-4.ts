import type { Match } from "@/types/match"

export const roundOf4Matches = {
  phaseId: "round-of-4" as const,
  matches: [
    {
      id: "r4-001",
      groupId: null,
      homeId: null,
      awayId: null,
      homeSlot: "#1 (ćwierćfinał)",
      awaySlot: "#2 (ćwierćfinał)",
      result: null,
    },
    {
      id: "r4-002",
      groupId: null,
      homeId: null,
      awayId: null,
      homeSlot: "#3 (ćwierćfinał)",
      awaySlot: "#4 (ćwierćfinał)",
      result: null,
    },
  ] satisfies Match[],
}

import type { MatchDefinition } from "@/types/match"

export const roundOf4Matches = {
  phaseId: "round-of-4" as const,
  matches: [
    {
      id: "r4-001",
      groupId: null,
      homeId: "FRANCE",
      awayId: "SPAIN",
      homeSlot: "#1 (ćwierćfinał)",
      awaySlot: "#2 (ćwierćfinał)",
    },
    {
      id: "r4-002",
      groupId: null,
      homeId: "ENGLAND",
      awayId: "ARGENTINA",
      homeSlot: "#3 (ćwierćfinał)",
      awaySlot: "#4 (ćwierćfinał)",
    },
  ] satisfies MatchDefinition[],
}

import type { Match } from "@/types/match"

export const finalMatch = {
  phaseId: "final" as const,
  matches: [
    {
      id: "final-001",
      groupId: null,
      homeId: null,
      awayId: null,
      homeSlot: "Zwycięzca półfinału 1",
      awaySlot: "Zwycięzca półfinału 2",
      result: null,
    },
  ] satisfies Match[],
}

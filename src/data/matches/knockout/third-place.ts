import type { Match } from "@/types/match"

export const thirdPlaceMatch = {
  phaseId: "third-place" as const,
  matches: [
    {
      id: "third-001",
      groupId: null,
      homeId: null,
      awayId: null,
      homeSlot: "Przegrany półfinału 1",
      awaySlot: "Przegrany półfinału 2",
      result: null,
    },
  ] satisfies Match[],
}

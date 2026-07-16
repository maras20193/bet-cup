import type { MatchDefinition } from "@/types/match"

export const finalsStageMatchLabels: Record<string, string> = {
  "third-001": "Mecz o 3. miejsce",
  "final-001": "Finał",
}

export const finalsStageMatches = {
  phaseId: "finals-stage" as const,
  matches: [
    {
      id: "third-001",
      groupId: null,
      homeId: "FRANCE",
      awayId: "ENGLAND",
      homeSlot: "Przegrany półfinału 1",
      awaySlot: "Przegrany półfinału 2",
    },
    {
      id: "final-001",
      groupId: null,
      homeId: "SPAIN",
      awayId: "ARGENTINA",
      homeSlot: "Zwycięzca półfinału 1",
      awaySlot: "Zwycięzca półfinału 2",
    },
  ] satisfies MatchDefinition[],
}

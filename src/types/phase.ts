export const phaseIds = [
  "group-stage",
  "round-of-32",
  "round-of-16",
  "round-of-8",
  "round-of-4",
  "finals-stage",
] as const

export type PhaseId = (typeof phaseIds)[number]

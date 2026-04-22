export const phaseIds = [
  "group-stage",
  "round-of-32",
  "round-of-16",
  "round-of-8",
  "round-of-4",
  "third-place",
  "final",
] as const

export type PhaseId = (typeof phaseIds)[number]

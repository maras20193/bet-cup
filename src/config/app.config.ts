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

export type AppConfig = {
  tournament: {
    id: string
    name: string
  }
  scoring: {
    exactScorePoints: number
    outcomePoints: number
  }
  phaseOrder: PhaseId[]
  phases: Record<
    PhaseId,
    {
      label: string
      tableVisible: boolean
      formVisible: boolean
    }
  >
  ui: {
    colors: {
      exactHitBg: string
      outcomeHitBg: string
      missBg: string
    }
  }
}

export const appConfig: AppConfig = {
  tournament: {
    id: "world-cup-2026",
    name: "World Cup 2026",
  },
  scoring: {
    exactScorePoints: 5,
    outcomePoints: 3,
  },
  phaseOrder: [
    "group-stage",
    "round-of-32",
    "round-of-16",
    "round-of-8",
    "round-of-4",
    "third-place",
    "final",
  ],
  phases: {
    "group-stage": {
      label: "Faza grupowa",
      tableVisible: true,
      formVisible: true,
    },
    "round-of-32": {
      label: "1/32",
      tableVisible: false,
      formVisible: false,
    },
    "round-of-16": {
      label: "1/16",
      tableVisible: false,
      formVisible: false,
    },
    "round-of-8": {
      label: "1/8",
      tableVisible: false,
      formVisible: false,
    },
    "round-of-4": {
      label: "1/4",
      tableVisible: false,
      formVisible: false,
    },
    "third-place": {
      label: "Mecz o 3. miejsce",
      tableVisible: false,
      formVisible: false,
    },
    final: {
      label: "Final",
      tableVisible: false,
      formVisible: false,
    },
  },
  ui: {
    colors: {
      exactHitBg: "#16a34a",
      outcomeHitBg: "#2563eb",
      missBg: "#111827",
    },
  },
}

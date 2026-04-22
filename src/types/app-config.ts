import type { PhaseId } from "./phase"

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

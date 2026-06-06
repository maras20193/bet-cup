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
      formVisible: boolean
    }
  >
  ui: {
    colors: {
      scores: {
        exactScorePoints: string
        outcomePoints: string
      }
      chart: string[]
    }
  }
}

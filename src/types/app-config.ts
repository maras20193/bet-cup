import type { PhaseId } from "./phase"

export type TournamentStatus = "not-started" | "in-progress" | "finished"

export type AppConfig = {
  tournament: {
    id: string
    name: string
    status: TournamentStatus
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
    avatars: {
      dicebearVersion: string
      dicebearStyle: string
    }
    colors: {
      scores: {
        exactScorePoints: string
        outcomePoints: string
      }
      chart: string[]
    }
  }
}

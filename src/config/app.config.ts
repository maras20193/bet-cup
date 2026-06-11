import type { AppConfig, TournamentStatus } from "@/types/app-config"

import { phaseIds, type PhaseId } from "@/types/phase"

export { phaseIds, type PhaseId }

export type { AppConfig, TournamentStatus }

export const appConfig: AppConfig = {
  tournament: {
    id: "world-cup-2026",
    name: "World Cup 2026",
    // status: "not-started",
    status: "in-progress",
  },
  scoring: {
    exactScorePoints: 5,
    outcomePoints: 3,
  },
  phaseOrder: [...phaseIds],
  phases: {
    "group-stage": {
      label: "Faza grupowa",
      formVisible: false,
    },
    "round-of-32": {
      label: "1/16 finału",
      formVisible: false,
    },
    "round-of-16": {
      label: "1/8 finału",
      formVisible: false,
    },
    "round-of-8": {
      label: "Ćwierćfinały",
      formVisible: false,
    },
    "round-of-4": {
      label: "Półfinały",
      formVisible: false,
    },
    "third-place": {
      label: "Mecz o 3. miejsce",
      formVisible: false,
    },
    final: {
      label: "Finał",
      formVisible: false,
    },
  },
  ui: {
    avatars: {
      dicebearVersion: "10.x",
      dicebearStyle: "fun-emoji",
    },
    colors: {
      scores: {
        exactScorePoints: "#3CAC3B",
        outcomePoints: "#2A398D",
      },
      chart: ["#3CAC3B", "#2A398D", "#E61D25"],
    },
  },
}

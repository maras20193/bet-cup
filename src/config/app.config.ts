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
        exactScorePoints: "#00C752",
        outcomePoints: "#304FFF",
      },
      chart: [
        "#004D40",
        "#64FEDA",
        "#6100E9",
        "#AFEA00",
        "#FF3D00",
        "#304FFF",
        "#B288FD",
        "#D40100",
        "#741311",
        "#2196F3",
        "#00C752",
        "#E81F63",
      ],
    },
  },
}

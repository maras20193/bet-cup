import type { AppConfig } from "@/types/app-config"
import { phaseIds, type PhaseId } from "@/types/phase"

export { phaseIds, type PhaseId }
export type { AppConfig }

export const appConfig: AppConfig = {
  tournament: {
    id: "world-cup-2026",
    name: "World Cup 2026",
  },
  scoring: {
    exactScorePoints: 5,
    outcomePoints: 3,
  },
  phaseOrder: [...phaseIds],
  /** `formVisible` — czy na stronie typowania renderuje się formularz dla danej fazy. */
  phases: {
    "group-stage": {
      label: "Faza grupowa",
      tableVisible: true,
      formVisible: true,
    },
    "round-of-32": {
      label: "1/16 finału",
      tableVisible: false,
      formVisible: false,
    },
    "round-of-16": {
      label: "1/8 finału",
      tableVisible: false,
      formVisible: false,
    },
    "round-of-8": {
      label: "Ćwierćfinały",
      tableVisible: false,
      formVisible: false,
    },
    "round-of-4": {
      label: "Półfinały",
      tableVisible: false,
      formVisible: false,
    },
    "third-place": {
      label: "Mecz o 3. miejsce",
      tableVisible: false,
      formVisible: false,
    },
    final: {
      label: "Finał",
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

import { buildAllMatches } from "@/mappers/matches"
import { phaseIds, type PhaseId } from "@/types/phase"
import type {
  PhasePredictions,
  PlayerPredictionBundleInput,
  ScorePrediction,
} from "@/types/predictions"

function hash32(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function predictionScore(
  matchId: string,
  playerIndex: number,
  phaseId: PhaseId
): Pick<ScorePrediction, "home" | "away"> {
  const h = (hash32(matchId) ^ hash32(`${playerIndex}:${phaseId}`)) >>> 0
  const home = h % 5
  const away = Math.floor(h / 13) % 5
  return { home, away }
}

const PLAYERS = [
  { userId: "ola-w", displayName: "Ola" },
  { userId: "tomek-k", displayName: "Tomek" },
  { userId: "kasia-m", displayName: "Kasia" },
  { userId: "marek-z", displayName: "Marek" },
  { userId: "ania-l", displayName: "Ania" },
  { userId: "piotr-s", displayName: "Piotr" },
  { userId: "zuza-p", displayName: "Zuza" },
  { userId: "karol-b", displayName: "Karol" },
  { userId: "ewa-n", displayName: "Ewa" },
  { userId: "michal-d", displayName: "Michał" },
  { userId: "natalia-g", displayName: "Natalia" },
  { userId: "lukasz-j", displayName: "Łukasz" },
  { userId: "magda-r", displayName: "Magda" },
  { userId: "adam-t", displayName: "Adam" },
  { userId: "julia-k", displayName: "Julia" },
] as const

const allMatches = buildAllMatches()

function phasePredictionsForPlayer(
  playerIndex: number,
  userId: string,
  displayName: string,
  phaseId: PhaseId
): PhasePredictions {
  const predictions: ScorePrediction[] = allMatches
    .filter((m) => m.phaseId === phaseId)
    .map((m) => {
      const { home, away } = predictionScore(m.id, playerIndex, phaseId)
      return { matchId: m.id, home, away }
    })

  const day = 1 + (playerIndex % 28)
  const submittedAt = `2026-05-${String(day).padStart(2, "0")}T${10 + (playerIndex % 8)}:${String((playerIndex * 7) % 60).padStart(2, "0")}:00.000Z`

  return {
    userId,
    displayName,
    phaseId,
    submittedAt,
    predictions,
  }
}

export const demoPlayerPredictionBundles = PLAYERS.map((p, playerIndex) => ({
  userId: p.userId,
  displayName: p.displayName,
  phaseFiles: phaseIds.map((phaseId) =>
    phasePredictionsForPlayer(playerIndex, p.userId, p.displayName, phaseId)
  ),
})) satisfies readonly PlayerPredictionBundleInput[]

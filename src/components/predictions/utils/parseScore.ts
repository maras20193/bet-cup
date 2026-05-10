import { SCORE_MAX } from "@/components/predictions/utils/scorePredictionFormConstants"

export const parseScore = (raw: string): number | null => {
  const t = raw.trim()
  if (t === "") return null
  if (!/^\d+$/.test(t)) return null
  const n = Number(t)
  if (!Number.isFinite(n) || n > SCORE_MAX) return null
  return n
}

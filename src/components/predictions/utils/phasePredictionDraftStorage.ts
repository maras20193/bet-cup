import type { PhaseId } from "@/types/phase"
import type { PhasePredictionFormValues } from "@/types/predictions"

const DRAFT_KEY_PREFIX = "bet-cup:phase-draft"
const DRAFT_SCHEMA_VERSION = 1

type DraftEnvelope = {
  version: number
  phaseId: PhaseId
  savedAt: string
  values: PhasePredictionFormValues
}

const buildStorageKey = (phaseId: PhaseId): string =>
  `${DRAFT_KEY_PREFIX}:v${DRAFT_SCHEMA_VERSION}:${phaseId}`

const getStorage = (): Storage | null => {
  if (typeof window === "undefined") return null
  try {
    return window.localStorage
  } catch {
    return null
  }
}

const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v)

const isScoreRow = (
  v: unknown
): v is { matchId: string; home: string; away: string } =>
  isPlainObject(v) &&
  typeof v.matchId === "string" &&
  typeof v.home === "string" &&
  typeof v.away === "string"

const isValidEnvelope = (
  raw: unknown,
  phaseId: PhaseId
): raw is DraftEnvelope => {
  if (!isPlainObject(raw)) return false
  if (raw.version !== DRAFT_SCHEMA_VERSION) return false
  if (raw.phaseId !== phaseId) return false
  if (!isPlainObject(raw.values)) return false
  const v = raw.values
  if (typeof v.displayName !== "string") return false
  if (typeof v.email !== "string") return false
  if (!Array.isArray(v.matchScores)) return false
  return v.matchScores.every(isScoreRow)
}

export const loadPhasePredictionDraft = (
  phaseId: PhaseId,
  expectedMatchIds: readonly string[]
): PhasePredictionFormValues | null => {
  const storage = getStorage()
  if (!storage) return null

  const raw = storage.getItem(buildStorageKey(phaseId))
  if (!raw) return null

  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch {
    return null
  }

  if (!isValidEnvelope(parsed, phaseId)) return null

  const savedScoresById = new Map(
    parsed.values.matchScores.map((row) => [row.matchId, row])
  )

  // Drop the draft entirely if the phase no longer contains any of the saved
  // matches — schedule likely changed and we shouldn't resurrect stale state.
  const overlaps = expectedMatchIds.some((id) => savedScoresById.has(id))
  if (!overlaps) return null

  return {
    displayName: parsed.values.displayName,
    email: parsed.values.email,
    matchScores: expectedMatchIds.map((matchId) => {
      const saved = savedScoresById.get(matchId)
      return {
        matchId,
        home: saved?.home ?? "",
        away: saved?.away ?? "",
      }
    }),
  }
}

export const savePhasePredictionDraft = (
  phaseId: PhaseId,
  values: PhasePredictionFormValues
): void => {
  const storage = getStorage()
  if (!storage) return

  const envelope: DraftEnvelope = {
    version: DRAFT_SCHEMA_VERSION,
    phaseId,
    savedAt: new Date().toISOString(),
    values,
  }

  try {
    storage.setItem(buildStorageKey(phaseId), JSON.stringify(envelope))
  } catch {
    // Quota exceeded / storage disabled — silently ignore: the draft is a
    // best-effort convenience, never a correctness requirement.
  }
}

export const clearPhasePredictionDraft = (phaseId: PhaseId): void => {
  const storage = getStorage()
  if (!storage) return
  try {
    storage.removeItem(buildStorageKey(phaseId))
  } catch {
    // ignore
  }
}

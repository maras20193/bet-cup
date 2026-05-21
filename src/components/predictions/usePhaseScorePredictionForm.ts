import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"

import { submitPhasePredictions } from "@/lib/submitPhasePredictions"

import { usePhasePredictionDraftPersistence } from "@/components/predictions/usePhasePredictionDraftPersistence"
import { buildPhasePredictionDefaultValues } from "@/components/predictions/utils/buildPhasePredictionDefaultValues"
import { groupMatchesForDisplay } from "@/components/predictions/utils/groupMatchesForDisplay"
import { parseScore } from "@/components/predictions/utils/parseScore"
import { loadPhasePredictionDraft } from "@/components/predictions/utils/phasePredictionDraftStorage"
import type { PhaseMatchBundle } from "@/types/phase-matches"
import type {
  PhasePredictionFormValues,
  PhasePredictions,
  ScoreInputFields,
  ScorePrediction,
} from "@/types/predictions"

export const usePhaseScorePredictionForm = (
  phaseMatches: PhaseMatchBundle,
  options?: {
    initialScores?: Partial<Record<string, ScoreInputFields>>
    devPredictionId?: string
  }
) => {
  // Explicit external initialScores take priority; otherwise try to restore a
  // locally persisted draft so users don't lose progress on reload / accidental
  // navigation.
  const defaultValues = useMemo<PhasePredictionFormValues>(() => {
    if (options?.initialScores) {
      return buildPhasePredictionDefaultValues(
        phaseMatches,
        options.initialScores
      )
    }

    const draft = loadPhasePredictionDraft(
      phaseMatches.phaseId,
      phaseMatches.matches.map((m) => m.id)
    )
    if (draft) return draft

    return buildPhasePredictionDefaultValues(phaseMatches)
    // We only want to compute defaults on mount; subsequent prop changes should
    // not silently overwrite what the user is currently typing.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const form = useForm<PhasePredictionFormValues>({ defaultValues })

  const { clearDraft } = usePhasePredictionDraftPersistence({
    form,
    phaseId: phaseMatches.phaseId,
    enabled: !options?.initialScores,
  })

  const sections = useMemo(
    () => groupMatchesForDisplay(phaseMatches.matches),
    [phaseMatches.matches]
  )

  const matchIndexById = useMemo(() => {
    const map = new Map<string, number>()
    phaseMatches.matches.forEach((m, i) => map.set(m.id, i))
    return map
  }, [phaseMatches.matches])

  const formIdPrefix = `phase-${phaseMatches.phaseId}`

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitFeedback, setSubmitFeedback] = useState<{
    kind: "success" | "error"
    message: string
  } | null>(null)

  const onSubmit = async (values: PhasePredictionFormValues) => {
    setSubmitFeedback(null)

    const predictions: ScorePrediction[] = values.matchScores.map(
      (row, i) => {
        const m = phaseMatches.matches[i]
        const home = parseScore(row.home)
        const away = parseScore(row.away)
        return { matchId: m.id, home: home!, away: away! }
      }
    )

    const payload: PhasePredictions = {
      predictionId: options?.devPredictionId ?? crypto.randomUUID(),
      displayName: values.displayName.trim(),
      contactEmail: values.email.trim(),
      phaseId: phaseMatches.phaseId,
      submittedAt: new Date().toISOString(),
      predictions,
    }

    setIsSubmitting(true)
    try {
      await submitPhasePredictions(payload)
      clearDraft()
      form.reset(buildPhasePredictionDefaultValues(phaseMatches))
      setSubmitFeedback({
        kind: "success",
        message:
          "Typy zostały wysłane. Organizator dostanie je na Slacku — dziękujemy!",
      })
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Nie udało się wysłać typów. Spróbuj ponownie za chwilę."
      setSubmitFeedback({ kind: "error", message })
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    form,
    formIdPrefix,
    sections,
    matchIndexById,
    onSubmit,
    isSubmitting,
    submitFeedback,
  }
}

import { useMemo } from "react"
import { useForm } from "react-hook-form"

import { buildPhasePredictionDefaultValues } from "@/components/predictions/utils/buildPhasePredictionDefaultValues"
import { groupMatchesForDisplay } from "@/components/predictions/utils/groupMatchesForDisplay"
import { parseScore } from "@/components/predictions/utils/parseScore"
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
    devUserId?: string
  }
) => {
  const form = useForm<PhasePredictionFormValues>({
    defaultValues: buildPhasePredictionDefaultValues(
      phaseMatches,
      options?.initialScores
    ),
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

  const onSubmit = (values: PhasePredictionFormValues) => {
    const predictions: ScorePrediction[] = values.matchScores.map(
      (row, i) => {
        const m = phaseMatches.matches[i]
        const home = parseScore(row.home)
        const away = parseScore(row.away)
        return { matchId: m.id, home: home!, away: away! }
      }
    )

    const payload: PhasePredictions = {
      userId: options?.devUserId ?? crypto.randomUUID(),
      displayName: values.displayName.trim(),
      contactEmail: values.email.trim(),
      phaseId: phaseMatches.phaseId,
      submittedAt: new Date().toISOString(),
      predictions,
    }

    console.log(JSON.stringify(payload, null, 2))
  }

  return { form, formIdPrefix, sections, matchIndexById, onSubmit }
}

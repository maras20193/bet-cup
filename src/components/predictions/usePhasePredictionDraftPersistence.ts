import { useCallback, useEffect, useRef } from "react"
import type { UseFormReturn } from "react-hook-form"

import {
  clearPhasePredictionDraft,
  savePhasePredictionDraft,
} from "@/components/predictions/utils/phasePredictionDraftStorage"
import type { PhaseId } from "@/types/phase"
import type { PhasePredictionFormValues } from "@/types/predictions"

const DEFAULT_DEBOUNCE_MS = 400

type Options = {
  form: UseFormReturn<PhasePredictionFormValues>
  phaseId: PhaseId
  enabled?: boolean
  debounceMs?: number
}

export const usePhasePredictionDraftPersistence = ({
  form,
  phaseId,
  enabled = true,
  debounceMs = DEFAULT_DEBOUNCE_MS,
}: Options) => {
  const timeoutRef = useRef<number | null>(null)

  const flushTimeout = () => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }

  useEffect(() => {
    if (!enabled) return

    const subscription = form.watch((value, { type }) => {
      // Only persist genuine user input — RHF emits an initial change event
      // on mount with type === undefined that we want to ignore.
      if (type !== "change") return
      if (!form.formState.isDirty) return

      flushTimeout()
      timeoutRef.current = window.setTimeout(() => {
        savePhasePredictionDraft(
          phaseId,
          value as PhasePredictionFormValues
        )
      }, debounceMs)
    })

    return () => {
      subscription.unsubscribe()
      flushTimeout()
    }
  }, [enabled, form, phaseId, debounceMs])

  const clearDraft = useCallback(() => {
    flushTimeout()
    clearPhasePredictionDraft(phaseId)
  }, [phaseId])

  return { clearDraft }
}

import { CheckCircle2, CircleAlert } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { MatchGroupSection } from "@/components/predictions/MatchGroupSection"
import { MatchScoreRow } from "@/components/predictions/MatchScoreRow"
import { PredictorIdentityFields } from "@/components/predictions/PredictorIdentityFields"
import { usePhaseScorePredictionForm } from "@/components/predictions/usePhaseScorePredictionForm"
import type { PhaseMatchBundle } from "@/types/phase-matches"
import type { ScoreInputFields } from "@/types/predictions"

export type { PhasePredictionFormValues } from "@/types/predictions"
export {
  PREDICTOR_DISPLAY_NAME_MAX,
  PREDICTOR_EMAIL_MAX,
} from "@/components/predictions/utils/scorePredictionFormConstants"

export type ScorePredictionFormProps = {
  phaseMatches: PhaseMatchBundle
  title: string
  initialScores?: Partial<Record<string, ScoreInputFields>>
  devPredictionId?: string
}

export const ScorePredictionForm = ({
  phaseMatches,
  title,
  initialScores,
  devPredictionId,
}: ScorePredictionFormProps) => {
  const {
    form,
    formIdPrefix,
    sections,
    matchIndexById,
    onSubmit,
    isSubmitting,
    submitFeedback,
  } = usePhaseScorePredictionForm(phaseMatches, {
    initialScores,
    devPredictionId,
  })

  return (
    <Card className="mx-auto w-full max-w-2xl overflow-visible">
      <CardHeader className="pb-4 border-border/80 border-b">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="min-h-0"
          noValidate
        >
          <CardContent className="space-y-6 pt-4">
            <PredictorIdentityFields />
            {sections.map((section) => (
              <MatchGroupSection key={section.key} title={section.label}>
                <ul className="space-y-3">
                  {section.matches.map((match) => {
                    const rowIndex = matchIndexById.get(match.id)
                    if (rowIndex === undefined) return null
                    const homeErr =
                      form.formState.errors.matchScores?.[rowIndex]?.home
                    const awayErr =
                      form.formState.errors.matchScores?.[rowIndex]?.away
                    return (
                      <MatchScoreRow
                        key={match.id}
                        match={match}
                        rowIndex={rowIndex}
                        formIdPrefix={formIdPrefix}
                        register={form.register}
                        homeError={homeErr}
                        awayError={awayErr}
                      />
                    )
                  })}
                </ul>
              </MatchGroupSection>
            ))}
          </CardContent>
          <CardFooter className="mt-6 flex-col items-stretch gap-4 px-4 pt-4 pb-6 sm:pb-7 border-t">
            {submitFeedback ? (
              <Alert
                variant={
                  submitFeedback.kind === "error" ? "destructive" : "default"
                }
              >
                {submitFeedback.kind === "success" ? (
                  <CheckCircle2 />
                ) : (
                  <CircleAlert />
                )}
                <AlertTitle>
                  {submitFeedback.kind === "success"
                    ? "Wysłano"
                    : "Błąd wysyłki"}
                </AlertTitle>
                <AlertDescription>{submitFeedback.message}</AlertDescription>
              </Alert>
            ) : null}
            <div className="flex justify-end">
              <Button
                type="submit"
                className="cursor-pointer"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Wysyłanie…" : "Wyślij typy"}
              </Button>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}

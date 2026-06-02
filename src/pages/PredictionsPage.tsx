import { ScorePredictionForm } from "@/components/predictions/ScorePredictionForm"
import { PredictionInstructionsCard } from "@/components/predictions/PredictionInstructionsCard"
import { PredictionsClosedNotice } from "@/components/predictions/PredictionsClosedNotice"
import { appConfig } from "@/config/app.config"
import {
  getPhaseIdsWithPredictionFormOpen,
  isPredictionFormOpenForAnyPhase,
} from "@/components/predictions/utils/predictionPhases"
import { phaseMatchBundles } from "@/data/matches/phase-bundles"

export const PredictionsPage = () => {
  const phasesWithOpenForm = getPhaseIdsWithPredictionFormOpen(appConfig)
  const predictionFormOpen = isPredictionFormOpenForAnyPhase(appConfig)
  const { exactScorePoints, outcomePoints } = appConfig.scoring

  return (
    <div className="space-y-6 pb-6 w-full">
      <div className="space-y-2">
        <h1 className="font-heading font-semibold text-foreground text-lg tracking-tight">
          Typowanie{" "}
        </h1>
      </div>

      <PredictionInstructionsCard
        exactScorePoints={exactScorePoints}
        outcomePoints={outcomePoints}
      />

      {!predictionFormOpen ? (
        <PredictionsClosedNotice />
      ) : (
        <div className="flex flex-col gap-8">
          {phasesWithOpenForm.map((phaseId) => (
            <ScorePredictionForm
              key={phaseId}
              phaseMatches={phaseMatchBundles[phaseId]}
              title={appConfig.phases[phaseId].label}
            />
          ))}
        </div>
      )}
    </div>
  )
}

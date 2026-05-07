import { ScorePredictionForm } from "@/components/predictions/score-prediction-form"
import { appConfig } from "@/config/app.config"
import { phaseMatchBundles } from "@/data/matches/phase-bundles"

export function PredictionsPage() {
  const phasesWithForm = appConfig.phaseOrder.filter(
    (phaseId) => appConfig.phases[phaseId].formVisible
  )

  return (
    <div className="w-full space-y-6 pb-6">
      <div className="space-y-2">
        <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
          Typowanie wyników
        </h1>
        <p className="text-muted-foreground text-sm">
          Widoczne fazy ustawiasz w konfiguracji (
          <code className="rounded bg-muted px-1 py-0.5 text-xs">formVisible</code>
          ). Po zatwierdzeniu formularza dane na razie trafiają wyłącznie do konsoli
          przeglądarki (JSON).
        </p>
      </div>

      {phasesWithForm.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          Żadna faza nie ma włączonego formularza typowania. Włącz{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">formVisible</code>{" "}
          dla wybranych faz w{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">
            src/config/app.config.ts
          </code>
          .
        </p>
      ) : (
        <div className="flex flex-col gap-8">
          {phasesWithForm.map((phaseId) => (
            <ScorePredictionForm
              key={phaseId}
              bundle={phaseMatchBundles[phaseId]}
              title={appConfig.phases[phaseId].label}
            />
          ))}
        </div>
      )}
    </div>
  )
}

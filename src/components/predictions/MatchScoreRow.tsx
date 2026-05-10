import type { UseFormRegister } from "react-hook-form"

import { Input } from "@/components/ui/input"
import { TeamLabelWithFlag } from "@/components/shared/TeamLabelWithFlag"
import { teams } from "@/data/teams/teams"
import { cn } from "@/lib/utils"
import type { Match } from "@/types/match"
import type { PhasePredictionFormValues } from "@/types/predictions"

import {
  MATCH_SCORE_ROW_MESSAGE,
  SCORE_MAX,
} from "@/components/predictions/utils/scorePredictionFormConstants"
import { parseScore } from "@/components/predictions/utils/parseScore"

const scoreInputClass =
  "h-8 w-11 min-w-0 shrink-0 px-1 text-center text-sm tabular-nums [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"

export type MatchScoreRowProps = {
  match: Match
  rowIndex: number
  formIdPrefix: string
  register: UseFormRegister<PhasePredictionFormValues>
  homeError?: { message?: string }
  awayError?: { message?: string }
}

export const MatchScoreRow = ({
  match,
  rowIndex,
  formIdPrefix,
  register,
  homeError,
  awayError,
}: MatchScoreRowProps) => {
  const home = match.homeId ? teams[match.homeId] : null
  const away = match.awayId ? teams[match.awayId] : null
  const homeLabel = home?.name ?? match.homeSlot ?? "—"
  const awayLabel = away?.name ?? match.awaySlot ?? "—"
  const homeTitle = home?.name ?? homeLabel
  const awayTitle = away?.name ?? awayLabel

  return (
    <li>
      <div
        className={cn(
          "items-center gap-x-2 gap-y-2 grid w-full min-w-0 text-sm leading-tight",
          "grid-cols-[minmax(0,1fr)_auto_auto_auto_auto_auto_minmax(0,1fr)]"
        )}
      >
        <TeamLabelWithFlag
          label={home ? home.name : homeLabel}
          titleText={homeTitle}
          flagCode={home?.code}
          layout="label-flag"
          teamResolved={Boolean(home)}
        />
        <Input
          id={`${formIdPrefix}-score-${match.id}-home`}
          type="number"
          inputMode="numeric"
          autoComplete="off"
          min={0}
          max={SCORE_MAX}
          step={1}
          className={cn(scoreInputClass, "justify-self-center")}
          aria-label={`Bramki gospodarzy: ${homeTitle}`}
          aria-invalid={homeError ? true : undefined}
          {...register(`matchScores.${rowIndex}.home`, {
            validate: (v) =>
              parseScore(String(v ?? "")) !== null || MATCH_SCORE_ROW_MESSAGE,
          })}
        />
        <span
          className="justify-self-center tabular-nums text-muted-foreground text-xs text-center shrink-0"
          aria-hidden
        >
          –
        </span>
        <Input
          id={`${formIdPrefix}-score-${match.id}-away`}
          type="number"
          inputMode="numeric"
          autoComplete="off"
          min={0}
          max={SCORE_MAX}
          step={1}
          className={cn(scoreInputClass, "justify-self-center")}
          aria-label={`Bramki gości: ${awayTitle}`}
          aria-invalid={awayError ? true : undefined}
          {...register(`matchScores.${rowIndex}.away`, {
            validate: (v) =>
              parseScore(String(v ?? "")) !== null || MATCH_SCORE_ROW_MESSAGE,
          })}
        />
        <TeamLabelWithFlag
          label={away ? away.name : awayLabel}
          titleText={awayTitle}
          flagCode={away?.code}
          layout="flag-label"
          teamResolved={Boolean(away)}
        />
      </div>
      {homeError || awayError ? (
        <p className="mt-1 text-destructive text-xs" role="alert">
          {MATCH_SCORE_ROW_MESSAGE}
        </p>
      ) : null}
    </li>
  )
}

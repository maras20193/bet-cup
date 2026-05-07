import {
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { teams } from "@/data/teams/teams"
import { cn } from "@/lib/utils"
import type { PhasePredictions, ScorePrediction } from "@/types/predictions"
import type { Match } from "@/types/match"
import type { PhaseMatchBundle } from "@/types/phase-matches"

type ScoreFields = { home: string; away: string }

function flagCdnUrl(code: string): string {
  return `https://flagcdn.com/24x18/${code.toLowerCase()}.webp`
}

function TeamFlag({ code }: { code: string }) {
  return (
    <img
      src={flagCdnUrl(code)}
      alt=""
      width={24}
      height={18}
      loading="lazy"
      decoding="async"
      className="inline-block shrink-0 rounded-sm object-cover shadow-sm ring-1 ring-black/5 dark:ring-white/10"
      aria-hidden
    />
  )
}

/** Obcięcie z „…”; `title` (podpowiedź przeglądarki) tylko gdy tekst rzeczywiście nie mieści się w polu. */
function EllipsisWithTooltip({
  titleText,
  className,
  children,
}: {
  titleText: string
  className?: string
  children: ReactNode
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const [overflowing, setOverflowing] = useState(false)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    function measure() {
      const node = ref.current
      if (!node) return
      setOverflowing(node.scrollWidth > node.clientWidth + 1)
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [children, titleText])

  return (
    <span
      ref={ref}
      className={cn("block min-w-0 w-full truncate", className)}
      title={overflowing ? titleText : undefined}
    >
      {children}
    </span>
  )
}

const SCORE_MAX = 30

function parseScore(raw: string): number | null {
  const t = raw.trim()
  if (t === "") return null
  if (!/^\d+$/.test(t)) return null
  const n = Number(t)
  if (!Number.isFinite(n) || n > SCORE_MAX) return null
  return n
}

function groupMatchesForDisplay(matches: readonly Match[]) {
  const entries = new Map<string, Match[]>()
  for (const m of matches) {
    const key = m.groupId ?? "__knockout"
    const list = entries.get(key)
    if (list) list.push(m)
    else entries.set(key, [m])
  }
  const sortedKeys = [...entries.keys()].sort((a, b) => {
    if (a === "__knockout") return 1
    if (b === "__knockout") return -1
    return a.localeCompare(b)
  })
  return sortedKeys.map((key) => ({
    key,
    label: key === "__knockout" ? null : `Grupa ${key}`,
    matches: entries.get(key)!.slice().sort((x, y) => x.id.localeCompare(y.id)),
  }))
}

export type ScorePredictionFormProps = {
  bundle: PhaseMatchBundle
  title: string
  /** Domyślne wartości dla dev / późniejszego edytowania */
  initialScores?: Partial<Record<string, ScoreFields>>
  demoUser?: Pick<PhasePredictions, "userId" | "displayName">
}

export function ScorePredictionForm({
  bundle,
  title,
  initialScores,
  demoUser = { userId: "local-demo", displayName: "Demo" },
}: ScorePredictionFormProps) {
  const [scores, setScores] = useState<Record<string, ScoreFields>>(() => {
    const next: Record<string, ScoreFields> = {}
    for (const m of bundle.matches) {
      const preset = initialScores?.[m.id]
      next[m.id] = {
        home: preset?.home ?? "",
        away: preset?.away ?? "",
      }
    }
    return next
  })
  const [error, setError] = useState<string | null>(null)

  const sections = useMemo(
    () => groupMatchesForDisplay(bundle.matches),
    [bundle.matches]
  )

  function updateScore(
    matchId: string,
    side: "home" | "away",
    value: string
  ) {
    setScores((prev) => ({
      ...prev,
      [matchId]: { ...prev[matchId], [side]: value },
    }))
    setError(null)
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const predictions: ScorePrediction[] = []
    for (const m of bundle.matches) {
      const row = scores[m.id]
      const home = parseScore(row.home)
      const away = parseScore(row.away)
      if (home === null || away === null) {
        setError("Uzupełnij poprawne wyniki (0–30) dla wszystkich meczów.")
        return
      }
      predictions.push({ matchId: m.id, home, away })
    }

    const payload: PhasePredictions = {
      ...demoUser,
      phaseId: bundle.phaseId,
      submittedAt: new Date().toISOString(),
      predictions,
    }

    setError(null)
    console.log(JSON.stringify(payload, null, 2))
  }

  const inputClass =
    "h-8 w-11 shrink-0 rounded-md border border-input bg-background px-1 text-center text-sm tabular-nums outline-none transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"

  return (
    <Card className="mx-auto w-full max-w-2xl overflow-visible">
      <CardHeader className="border-b border-border/80 pb-4">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit} className="min-h-0">
        <CardContent className="space-y-6 pt-4">
          {sections.map((section) => (
            <div key={section.key} className="space-y-3">
              {section.label ? (
                <p className="font-heading text-muted-foreground text-xs font-semibold uppercase tracking-wide">
                  {section.label}
                </p>
              ) : null}
              <ul className="space-y-3">
                {section.matches.map((match) => {
                  const home = match.homeId ? teams[match.homeId] : null
                  const away = match.awayId ? teams[match.awayId] : null
                  const homeLabel = home?.name ?? match.homeSlot ?? "—"
                  const awayLabel = away?.name ?? match.awaySlot ?? "—"
                  const homeTitle = home?.name ?? homeLabel
                  const awayTitle = away?.name ?? awayLabel

                  return (
                    <li key={match.id}>
                      <div
                        className={cn(
                          "grid w-full min-w-0 items-center gap-x-2 gap-y-2 text-sm leading-tight",
                          "grid-cols-[minmax(0,1fr)_auto_auto_auto_auto_auto_minmax(0,1fr)]"
                        )}
                      >
                        <EllipsisWithTooltip
                          titleText={homeTitle}
                          className={cn(
                            "justify-self-end text-right font-medium",
                            home ? "text-foreground" : "text-muted-foreground"
                          )}
                        >
                          {home ? home.name : homeLabel}
                        </EllipsisWithTooltip>
                        <span className="flex h-[18px] w-7 shrink-0 items-center justify-center justify-self-center">
                          {home ? <TeamFlag code={home.code} /> : null}
                        </span>
                        <input
                          id={`score-${match.id}-home`}
                          type="number"
                          inputMode="numeric"
                          autoComplete="off"
                          min={0}
                          max={SCORE_MAX}
                          step={1}
                          value={scores[match.id]?.home ?? ""}
                          onChange={(ev) =>
                            updateScore(match.id, "home", ev.target.value)
                          }
                          className={cn(inputClass, "justify-self-center")}
                          aria-label={`Bramki gospodarzy: ${homeTitle}`}
                        />
                        <span
                          className="shrink-0 justify-self-center text-center text-muted-foreground text-xs tabular-nums"
                          aria-hidden
                        >
                          –
                        </span>
                        <input
                          id={`score-${match.id}-away`}
                          type="number"
                          inputMode="numeric"
                          autoComplete="off"
                          min={0}
                          max={SCORE_MAX}
                          step={1}
                          value={scores[match.id]?.away ?? ""}
                          onChange={(ev) =>
                            updateScore(match.id, "away", ev.target.value)
                          }
                          className={cn(inputClass, "justify-self-center")}
                          aria-label={`Bramki gości: ${awayTitle}`}
                        />
                        <span className="flex h-[18px] w-7 shrink-0 items-center justify-center justify-self-center">
                          {away ? <TeamFlag code={away.code} /> : null}
                        </span>
                        <EllipsisWithTooltip
                          titleText={awayTitle}
                          className={cn(
                            "justify-self-start text-left font-medium",
                            away ? "text-foreground" : "text-muted-foreground"
                          )}
                        >
                          {away ? away.name : awayLabel}
                        </EllipsisWithTooltip>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
          {error ? (
            <p className="text-destructive text-sm" role="alert">
              {error}
            </p>
          ) : null}
        </CardContent>
        <CardFooter className="justify-end border-t">
          <Button type="submit">Zapisz typy (dev)</Button>
        </CardFooter>
      </form>
    </Card>
  )
}

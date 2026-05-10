import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table"
import { useMemo } from "react"

import { cn } from "@/lib/utils"
import {
  demoPlayerPredictionBundles,
  type PlayerPredictionBundleInput,
} from "@/data/predictions"
import { groupStageMatchesWithDemoResults } from "@/data/matches/mock-official-results"
import { teams } from "@/data/teams/teams"
import { appConfig } from "@/config/app.config"
import type { Match } from "@/types/match"
import type { PhaseId } from "@/types/phase"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  buildResultsTableModel,
  type PlayerMatchCell,
  type ResultsTableRow,
} from "@/components/results/build-results-table-data"
import { TeamLabelWithFlag } from "@/components/shared/TeamLabelWithFlag"

/** Stała szerokość kolumny meczu — spójne `left` dla kolumny wyniku i pion wyrównania flag. */
const MATCH_COL_WIDTH_CLASS = "w-56 min-w-56 max-w-56"
const STICKY_MATCH_LEFT = "left-0"
const STICKY_RESULT_LEFT = "left-56"

const teamPair = (match: Match) => {
  const home = match.homeId ? teams[match.homeId] : null
  const away = match.awayId ? teams[match.awayId] : null
  return { home, away }
}

const MatchLabel = ({ match }: { match: Match }) => {
  const { home, away } = teamPair(match)
  const homeLabel = home?.name ?? match.homeSlot ?? "—"
  const awayLabel = away?.name ?? match.awaySlot ?? "—"
  const homeTitle = home?.name ?? homeLabel
  const awayTitle = away?.name ?? awayLabel

  return (
    <div
      className={cn(
        "items-center gap-x-1.5 grid w-full max-w-full text-sm leading-tight",
        "grid-cols-[minmax(0,1fr)_1.75rem_auto_1.75rem_minmax(0,1fr)]"
      )}
    >
      <TeamLabelWithFlag
        label={home ? home.name : homeLabel}
        titleText={homeTitle}
        flagCode={home?.code}
        layout="label-flag"
        teamResolved={Boolean(home)}
        ellipsisClassName="min-w-0"
      />
      <span className="text-muted-foreground text-center shrink-0" aria-hidden>
        —
      </span>
      <TeamLabelWithFlag
        label={away ? away.name : awayLabel}
        titleText={awayTitle}
        flagCode={away?.code}
        layout="flag-label"
        teamResolved={Boolean(away)}
        ellipsisClassName="min-w-0"
      />
    </div>
  )
}

const OfficialResultPill = ({ match }: { match: Match }) => {
  if (match.result) {
    return (
      <span className="inline-flex bg-white px-3 py-1 rounded-full font-semibold tabular-nums text-zinc-950 text-xs">
        {match.result.home}-{match.result.away}
      </span>
    )
  }
  return (
    <span
      className="inline-flex bg-transparent px-3 py-1 border border-foreground/25 dark:border-white/35 rounded-full font-medium text-muted-foreground text-xs"
      title="Brak wyniku"
    >
      ?
    </span>
  )
}

const predictionPillClass = (cell: PlayerMatchCell): string => {
  if (!cell.hasOfficialResult) {
    return "rounded-full border border-foreground/20 bg-transparent px-3 py-1 text-xs font-semibold tabular-nums text-foreground dark:border-white/40"
  }
  switch (cell.tier) {
    case "exact":
      return "rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold tabular-nums text-white dark:bg-emerald-500"
    case "outcome":
      return "rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold tabular-nums text-white dark:bg-blue-500"
    default:
      return "rounded-full border border-muted-foreground/20 bg-muted/55 px-3 py-1 text-xs font-semibold tabular-nums text-muted-foreground dark:border-white/15 dark:bg-muted/35"
  }
}

const formatPrediction = (cell: PlayerMatchCell): string => {
  if (!cell.prediction) return "—"
  return `${cell.prediction.home}-${cell.prediction.away}`
}

const PlayerColumnHeader = ({
  displayName,
  points,
}: {
  displayName: string
  points: number
}) => {
  return (
    <div className="flex min-h-14 flex-col items-center justify-center gap-1 px-0.5 py-1 text-center leading-tight">
      <span className="max-w-[6rem] truncate font-semibold text-sm">
        {displayName}
      </span>
      <span className="font-semibold tabular-nums text-base text-foreground tracking-tight">
        {points}{" "}
        <span className="font-medium text-muted-foreground text-xs">pkt</span>
      </span>
    </div>
  )
}

const PlayerPredictionCell = ({ cell }: { cell: PlayerMatchCell }) => {
  return (
    <div className="flex justify-center items-center py-0.5">
      <span className={predictionPillClass(cell)}>
        {formatPrediction(cell)}
      </span>
    </div>
  )
}

const stickyCellClass = (
  columnId: string,
  row: "header" | "body"
): string | undefined => {
  if (columnId === "match") {
    const base = cn(
      MATCH_COL_WIDTH_CLASS,
      "sticky border-0 bg-card shadow-[4px_0_12px_-6px_rgba(0,0,0,0.2)] dark:bg-zinc-950 dark:shadow-[4px_0_12px_-6px_rgba(0,0,0,0.5)]",
      STICKY_MATCH_LEFT
    )
    if (row === "header") {
      return cn(base, "top-0 z-50")
    }
    return cn(base, "z-30")
  }
  if (columnId === "result") {
    const base = cn(
      "sticky bg-card dark:bg-zinc-950 shadow-[4px_0_12px_-6px_rgba(0,0,0,0.2)] dark:shadow-[4px_0_12px_-6px_rgba(0,0,0,0.5)] border-0 w-24 min-w-24 text-center align-middle shrink-0",
      STICKY_RESULT_LEFT
    )
    if (row === "header") {
      return cn(base, "top-0 z-50")
    }
    return cn(base, "z-30")
  }
  if (row === "header" && columnId.startsWith("player-")) {
    return cn(
      "top-0 z-40 sticky bg-card dark:bg-zinc-950 border-0",
      "shadow-[0_1px_0_0_var(--border)] dark:shadow-[0_1px_0_0_rgba(255,255,255,0.12)]"
    )
  }
  return undefined
}

const ResultsLegend = () => {
  const { exactScorePoints, outcomePoints } = appConfig.scoring
  const awaitingLegend =
    "inline-flex items-center px-3 py-1.5 border border-foreground/25 dark:border-white/40 rounded-full font-medium text-muted-foreground text-xs"
  const missLegend =
    "inline-flex items-center px-3 py-1.5 border border-muted-foreground/20 rounded-full bg-muted/55 font-medium text-muted-foreground text-xs dark:border-white/15 dark:bg-muted/35"
  return (
    <div className="flex flex-wrap gap-2">
      <span className="inline-flex items-center bg-emerald-600 dark:bg-emerald-500 px-3 py-1.5 rounded-full font-medium text-white text-xs">
        Dokładny wynik ({exactScorePoints} pkt)
      </span>
      <span className="inline-flex items-center bg-blue-600 dark:bg-blue-500 px-3 py-1.5 rounded-full font-medium text-white text-xs">
        Trafiony typ ({outcomePoints} pkt)
      </span>
      <span className={awaitingLegend}>Oczekuje na wynik</span>
      <span className={missLegend}>Błędny typ (0 pkt)</span>
    </div>
  )
}

export type ResultsTableProps = {
  phaseId?: PhaseId
  matches?: readonly Match[]
  bundles?: readonly PlayerPredictionBundleInput[]
  /** `fill` — tabela wypełnia rodzica; scroll tylko wewnątrz siatki (np. dashboard). */
  layout?: "default" | "fill"
}

export const ResultsTable = ({
  phaseId = "group-stage",
  matches = groupStageMatchesWithDemoResults,
  bundles = demoPlayerPredictionBundles,
  layout = "default",
}: ResultsTableProps) => {
  const scoring = appConfig.scoring

  const { rows, playerTotals } = useMemo(
    () => buildResultsTableModel(matches, bundles, phaseId, scoring),
    [matches, bundles, phaseId, scoring]
  )

  const columns = useMemo<ColumnDef<ResultsTableRow>[]>(() => {
    const playerCols: ColumnDef<ResultsTableRow>[] = bundles.map((b) => ({
      id: `player-${b.userId}`,
      header: () => (
        <PlayerColumnHeader
          displayName={b.displayName}
          points={playerTotals[b.userId] ?? 0}
        />
      ),
      cell: ({ row }) => {
        const r = row.original
        if (r.kind !== "match") return null
        const cell = r.cellsByPlayerId[b.userId]
        if (!cell) return null
        return <PlayerPredictionCell cell={cell} />
      },
    }))

    return [
      {
        id: "match",
        header: () => (
          <div className="flex items-center min-h-12">
            <span className="font-semibold text-muted-foreground text-xs uppercase tracking-wide">
              Mecz
            </span>
          </div>
        ),
        cell: ({ row }) => {
          const r = row.original
          if (r.kind !== "match") return null
          return <MatchLabel match={r.match} />
        },
      },
      {
        id: "result",
        header: () => (
          <div className="flex justify-center items-center w-full min-h-12">
            <span className="font-semibold text-muted-foreground text-xs uppercase tracking-wide">
              Wynik
            </span>
          </div>
        ),
        cell: ({ row }) => {
          const r = row.original
          if (r.kind !== "match") return null
          return (
            <div className="flex justify-center">
              <OfficialResultPill match={r.match} />
            </div>
          )
        },
      },
      ...playerCols,
    ]
  }, [bundles, playerTotals])

  /* eslint-disable-next-line react-hooks/incompatible-library -- useReactTable is the supported API */
  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row, index) =>
      row.kind === "group" ? `group-${index}-${row.groupLabel}` : row.match.id,
  })

  const colCount = table.getAllColumns().length

  const tableChromeClass = cn(
    "[&_[data-slot=table-container]]:border [&_[data-slot=table-container]]:border-border/60 dark:[&_[data-slot=table-container]]:border-white/10 [&_[data-slot=table-container]]:rounded-lg",
    "[&_td]:border-0 [&_th]:border-0",
    "[&_tbody_tr]:border-b [&_tbody_tr]:border-border/50 dark:[&_tbody_tr]:border-white/10 [&_tbody_tr:last-child]:border-0",
    "[&_thead_tr]:border-b [&_thead_tr]:border-border/60 dark:[&_thead_tr]:border-white/10"
  )

  const scrollContainerClass =
    layout === "fill"
      ? "h-full min-h-0 flex-1 overflow-auto overscroll-x-contain"
      : "max-h-[min(70dvh,44rem)] overflow-auto overscroll-x-contain"

  return (
    <section
      className={cn(
        "bg-card shadow-sm p-4 border border-border rounded-xl",
        "dark:border-white/10 dark:bg-zinc-950 dark:shadow-none",
        layout === "fill"
          ? "flex min-h-0 flex-1 flex-col gap-4 overflow-hidden"
          : "space-y-4"
      )}
    >
      <div className="space-y-1 shrink-0">
        <h2 className="font-heading font-semibold text-foreground text-lg tracking-tight">
          Tabela wyników
        </h2>
        <ResultsLegend />
      </div>

      <div
        className={cn(
          tableChromeClass,
          layout === "fill" && "flex min-h-0 flex-1 flex-col"
        )}
      >
        <Table containerClassName={scrollContainerClass}>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id} className="hover:bg-transparent border-0">
                {hg.headers.map((header) => {
                  const sticky = stickyCellClass(header.column.id, "header")
                  const isPlayer = header.column.id.startsWith("player-")
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        "border-0 h-auto min-h-10 text-foreground align-middle",
                        sticky,
                        isPlayer && "min-w-[5.5rem] px-2 text-center"
                      )}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => {
              const original = row.original
              if (original.kind === "group") {
                return (
                  <TableRow
                    key={row.id}
                    className="hover:bg-transparent border-0"
                  >
                    <TableCell
                      colSpan={colCount}
                      className="bg-muted/50 dark:bg-white/5 py-2 border-0 font-heading font-semibold text-foreground text-sm tracking-tight"
                    >
                      {original.groupLabel}
                    </TableCell>
                  </TableRow>
                )
              }

              return (
                <TableRow
                  key={row.id}
                  className="hover:bg-muted/30 dark:hover:bg-white/[0.04] border-0"
                >
                  {row.getVisibleCells().map((cell) => {
                    const sticky = stickyCellClass(cell.column.id, "body")
                    const isPlayer = cell.column.id.startsWith("player-")
                    return (
                      <TableCell
                        key={cell.id}
                        className={cn(
                          "border-0 align-middle",
                          sticky,
                          isPlayer && "min-w-[5.5rem] px-2 text-center",
                          cell.column.id === "match" &&
                            "max-w-56 py-2 whitespace-normal",
                          cell.column.id === "result" && "py-2"
                        )}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </section>
  )
}

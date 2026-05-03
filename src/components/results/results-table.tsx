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
import { groupStageMatches } from "@/data/matches/group-stage"
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

const STICKY_MATCH = "min-w-44 max-w-[13rem] md:min-w-52 md:max-w-none"
const STICKY_MATCH_LEFT = "left-0"
const STICKY_RESULT_LEFT = "left-44 md:left-52"

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

function teamPair(match: Match) {
  const home = match.homeId ? teams[match.homeId] : null
  const away = match.awayId ? teams[match.awayId] : null
  return { home, away }
}

function MatchLabel({ match }: { match: Match }) {
  const { home, away } = teamPair(match)
  return (
    <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-sm leading-tight">
      {home ? (
        <>
          <span className="font-medium text-foreground">{home.name}</span>
          <TeamFlag code={home.code} />
        </>
      ) : (
        <span>—</span>
      )}
      <span className="text-muted-foreground">—</span>
      {away ? (
        <>
          <TeamFlag code={away.code} />
          <span className="font-medium text-foreground">{away.name}</span>
        </>
      ) : (
        <span>—</span>
      )}
    </div>
  )
}

function OfficialResultPill({ match }: { match: Match }) {
  if (match.result) {
    return (
      <span className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold tabular-nums text-zinc-950">
        {match.result.home}-{match.result.away}
      </span>
    )
  }
  return (
    <span
      className="inline-flex rounded-full border border-foreground/25 bg-transparent px-3 py-1 text-xs font-medium text-muted-foreground dark:border-white/35"
      title="Brak wyniku"
    >
      ?
    </span>
  )
}

function predictionPillClass(cell: PlayerMatchCell): string {
  if (!cell.hasOfficialResult) {
    return "rounded-full border border-foreground/20 bg-transparent px-3 py-1 text-xs font-semibold tabular-nums text-foreground dark:border-white/40"
  }
  switch (cell.tier) {
    case "exact":
      return "rounded-full bg-white px-3 py-1 text-xs font-semibold tabular-nums text-zinc-950"
    case "outcome":
      return "rounded-full bg-zinc-500 px-3 py-1 text-xs font-semibold tabular-nums text-white dark:bg-zinc-600"
    default:
      return "rounded-full bg-red-600 px-3 py-1 text-xs font-semibold tabular-nums text-white"
  }
}

function formatPrediction(cell: PlayerMatchCell): string {
  if (!cell.prediction) return "—"
  return `${cell.prediction.home}-${cell.prediction.away}`
}

function PlayerPredictionCell({ cell }: { cell: PlayerMatchCell }) {
  const showPoints = cell.hasOfficialResult && cell.points > 0

  return (
    <div className="flex flex-col items-center gap-1 py-0.5">
      <span className={predictionPillClass(cell)}>{formatPrediction(cell)}</span>
      {showPoints ? (
        <span className="text-[10px] font-medium tabular-nums text-muted-foreground">
          +{cell.points} pkt
        </span>
      ) : null}
    </div>
  )
}

function stickyCellClass(columnId: string): string | undefined {
  if (columnId === "match") {
    return cn(
      STICKY_MATCH,
      "sticky z-30 border-0 bg-card shadow-[4px_0_12px_-6px_rgba(0,0,0,0.2)] dark:bg-zinc-950 dark:shadow-[4px_0_12px_-6px_rgba(0,0,0,0.5)]",
      STICKY_MATCH_LEFT,
    )
  }
  if (columnId === "result") {
    return cn(
      "sticky z-30 w-24 min-w-24 shrink-0 border-0 bg-card text-center align-middle shadow-[4px_0_12px_-6px_rgba(0,0,0,0.2)] dark:bg-zinc-950 dark:shadow-[4px_0_12px_-6px_rgba(0,0,0,0.5)]",
      STICKY_RESULT_LEFT,
    )
  }
  return undefined
}

function ResultsLegend() {
  const { exactScorePoints, outcomePoints } = appConfig.scoring
  return (
    <div className="flex flex-wrap gap-2">
      <span className="inline-flex items-center rounded-full bg-white px-3 py-1.5 text-xs font-medium text-zinc-950">
        Dokładny wynik ({exactScorePoints} pkt)
      </span>
      <span className="inline-flex items-center rounded-full bg-zinc-500 px-3 py-1.5 text-xs font-medium text-white dark:bg-zinc-600">
        Trafiony typ ({outcomePoints} pkt)
      </span>
      <span className="inline-flex items-center rounded-full bg-red-600 px-3 py-1.5 text-xs font-medium text-white">
        Błędny typ (0 pkt)
      </span>
      <span className="inline-flex items-center rounded-full border border-foreground/25 px-3 py-1.5 text-xs font-medium text-muted-foreground dark:border-white/40">
        Oczekuje na wynik
      </span>
    </div>
  )
}

export type ResultsTableProps = {
  phaseId?: PhaseId
  matches?: readonly Match[]
  bundles?: readonly PlayerPredictionBundleInput[]
}

export function ResultsTable({
  phaseId = "group-stage",
  matches = groupStageMatches.matches,
  bundles = demoPlayerPredictionBundles,
}: ResultsTableProps) {
  const scoring = appConfig.scoring

  const { rows, playerTotals } = useMemo(
    () => buildResultsTableModel(matches, bundles, phaseId, scoring),
    [matches, bundles, phaseId, scoring],
  )

  const columns = useMemo<ColumnDef<ResultsTableRow>[]>(() => {
    const playerCols: ColumnDef<ResultsTableRow>[] = bundles.map((b) => ({
      id: `player-${b.userId}`,
      header: () => (
        <div className="flex flex-col items-center gap-1 py-1 text-center leading-tight">
          <span className="max-w-[6rem] truncate text-xs font-semibold">
            {b.displayName}
          </span>
          <span className="text-[10px] text-muted-foreground">
            {playerTotals[b.userId] ?? 0} pkt
          </span>
        </div>
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
          <span className="text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Mecz
          </span>
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
          <span className="text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Wynik
          </span>
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

  return (
    <section
      className={cn(
        "space-y-4 rounded-xl border border-border bg-card p-4 shadow-sm",
        "dark:border-white/10 dark:bg-zinc-950 dark:shadow-none",
      )}
    >
      <div className="space-y-1">
        <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground">
          Tabela wyników
        </h2>
        <ResultsLegend />
      </div>

      <div
        className={cn(
          "[&_[data-slot=table-container]]:rounded-lg [&_[data-slot=table-container]]:border [&_[data-slot=table-container]]:border-border/60 dark:[&_[data-slot=table-container]]:border-white/10",
          "[&_td]:border-0 [&_th]:border-0",
          "[&_tbody_tr]:border-b [&_tbody_tr]:border-border/50 [&_tbody_tr:last-child]:border-0 dark:[&_tbody_tr]:border-white/10",
          "[&_thead_tr]:border-b [&_thead_tr]:border-border/60 dark:[&_thead_tr]:border-white/10",
        )}
      >
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id} className="border-0 hover:bg-transparent">
                {hg.headers.map((header) => {
                  const sticky = stickyCellClass(header.column.id)
                  const isPlayer = header.column.id.startsWith("player-")
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        "h-auto min-h-10 border-0 align-bottom text-foreground",
                        sticky,
                        isPlayer && "min-w-[5.5rem] px-2 text-center",
                      )}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
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
                  <TableRow key={row.id} className="border-0 hover:bg-transparent">
                    <TableCell
                      colSpan={colCount}
                      className="border-0 bg-muted/50 py-2 font-heading text-sm font-semibold tracking-tight text-foreground dark:bg-white/5"
                    >
                      {original.groupLabel}
                    </TableCell>
                  </TableRow>
                )
              }

              return (
                <TableRow
                  key={row.id}
                  className="border-0 hover:bg-muted/30 dark:hover:bg-white/[0.04]"
                >
                  {row.getVisibleCells().map((cell) => {
                    const sticky = stickyCellClass(cell.column.id)
                    const isPlayer = cell.column.id.startsWith("player-")
                    return (
                      <TableCell
                        key={cell.id}
                        className={cn(
                          "border-0 align-middle",
                          sticky,
                          isPlayer && "min-w-[5.5rem] px-2 text-center",
                          cell.column.id === "match" && "py-2",
                          cell.column.id === "result" && "py-2",
                        )}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
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

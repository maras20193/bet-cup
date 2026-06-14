import { flexRender, type Table as TanstackTable } from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ResultColumnSkeleton } from "@/components/results/results-table/parts/ResultsTableMainColumnSkeleton"
import type { ResultsTableRow } from "@/components/results/results-table/utils/buildResultsTableModel"
import { cn } from "@/lib/utils"

const MATCH_COL_WIDTH =
  "w-40 min-w-40 max-w-40 md:w-72 md:min-w-72 md:max-w-72"
const RESULT_COL_WIDTH = "w-20 min-w-20 md:w-24 md:min-w-24"

const stickyOpaqueBgBase = "bg-card dark:bg-zinc-950"

/** Nagłówek: nieprzezroczyste tło także przy hover wiersza nagłówka. */
const stickyOpaqueBgHeader = cn(
  stickyOpaqueBgBase,
  "[tr:hover_&]:bg-card [tr:hover_&]:dark:bg-zinc-950"
)

/** Nieprzezroczyste tło komórek — półprzezroczysty hover prześwieca przy scrollu poziomym. */
const dataRowCellBg = stickyOpaqueBgBase

/** Tło hover na każdej komórce — tr:hover nie maluje się na td przy border-separate + sticky. */
const dataRowHoverBg =
  "group-hover/row:bg-muted group-hover/row:dark:bg-zinc-900"

const stickyEdgeSeparator = "border-r border-border/60 dark:border-r-0"

const headerCellBottomBorder = "border-b border-border/60 dark:border-white/10"

/** Poniżej z-50 (header app + sheet nawigacji). Wewnątrz tabeli: header > body > group. */
const zHeaderMatch = "z-[30]"
const zHeaderResult = "z-[29]"
const zHeaderPlayer = "z-[28]"
const zBodyMatch = "z-[20]"
const zBodyResultMd = "md:z-[19]"
const zGroup = "z-[15]"

const groupLabelCellClass = cn(
  MATCH_COL_WIDTH,
  "sticky left-0 border-0 bg-muted py-2 font-heading text-sm font-semibold tracking-tight text-foreground dark:bg-zinc-900",
  zGroup
)

const groupRestCellClass = "border-0 bg-muted py-2 dark:bg-zinc-900"

const tableChromeClass = cn(
  "[&_[data-slot=table-container]]:border [&_[data-slot=table-container]]:border-border/60 dark:[&_[data-slot=table-container]]:border-white/10 [&_[data-slot=table-container]]:rounded-lg",
  "[&_td]:border-0",
  "[&_tbody_tr]:border-b [&_tbody_tr]:border-border/50 dark:[&_tbody_tr]:border-white/10 [&_tbody_tr:last-child]:border-0"
)

function stickyCellClass(
  columnId: string,
  row: "header" | "body"
): string | undefined {
  const stickyBg = row === "header" ? stickyOpaqueBgHeader : stickyOpaqueBgBase

  if (columnId === "match") {
    const base = cn(MATCH_COL_WIDTH, stickyBg, stickyEdgeSeparator)
    if (row === "header") {
      return cn(base, "sticky top-0 left-0", zHeaderMatch)
    }
    return cn(base, "sticky left-0", zBodyMatch)
  }
  if (columnId === "result") {
    const base = cn(
      RESULT_COL_WIDTH,
      "shrink-0 text-center align-middle",
      stickyBg,
      stickyEdgeSeparator,
      "md:sticky md:left-72"
    )
    if (row === "header") {
      return cn(base, "sticky top-0", zHeaderResult)
    }
    return cn(base, zBodyResultMd)
  }
  if (row === "header" && columnId.startsWith("player-")) {
    return cn("top-0 sticky", zHeaderPlayer, stickyOpaqueBgHeader)
  }
  return undefined
}

export type DataGridProps = {
  table: TanstackTable<ResultsTableRow>
  colCount: number
  scrollContainerClass?: string
  /** Scroll pionowy i poziomy w kontenerze tabeli zamiast na stronie. */
  fillHeight?: boolean
  isLoading?: boolean
}

export function DataGrid({
  table,
  colCount,
  scrollContainerClass,
  fillHeight = false,
  isLoading = false,
}: DataGridProps) {
  const hasPlayerColumns = table
    .getAllColumns()
    .some((col) => col.id.startsWith("player-"))

  return (
    <div
      className={cn(
        tableChromeClass,
        fillHeight && "flex min-h-0 flex-1 flex-col"
      )}
    >
      <Table
        className={cn(
          "border-separate border-spacing-0",
          hasPlayerColumns ? "w-max min-w-full" : "w-max table-fixed"
        )}
        containerClassName={cn(
          scrollContainerClass,
          !hasPlayerColumns && "w-fit max-w-full",
          fillHeight
            ? "min-h-0 flex-1 overflow-auto overscroll-contain"
            : "overscroll-x-contain"
        )}
      >
        {!hasPlayerColumns && (
          <colgroup>
            <col />
            <col />
          </colgroup>
        )}
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
                      "border-x-0 border-t-0 h-auto min-h-10 text-foreground align-middle",
                      sticky,
                      headerCellBottomBorder,
                      header.column.id === "result" && "px-1 md:px-2",
                      isPlayer &&
                        "min-w-[5rem] px-1 text-center md:min-w-[5.5rem] md:px-2"
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
                  <TableCell className={groupLabelCellClass}>
                    {original.groupLabel}
                  </TableCell>
                  <TableCell
                    colSpan={colCount - 1}
                    className={groupRestCellClass}
                  />
                </TableRow>
              )
            }

            return (
              <TableRow
                key={row.id}
                className="group/row border-0 hover:bg-transparent data-[state=selected]:bg-transparent has-aria-expanded:bg-transparent"
              >
                {row.getVisibleCells().map((cell) => {
                    const sticky = stickyCellClass(cell.column.id, "body")
                    const isPlayer = cell.column.id.startsWith("player-")
                    return (
                      <TableCell
                        key={cell.id}
                        className={cn(
                          "border-0 align-middle",
                          dataRowCellBg,
                          dataRowHoverBg,
                          sticky,
                          isPlayer &&
                            "min-w-[5rem] px-1 text-center md:min-w-[5.5rem] md:px-2",
                          cell.column.id === "match" &&
                            cn(
                              "py-2 whitespace-normal",
                              hasPlayerColumns
                                ? "max-w-40 md:max-w-72"
                                : "max-w-40 overflow-hidden md:max-w-72",
                              "cursor-pointer",
                            ),
                          cell.column.id === "result" && "px-1 py-2 md:px-2"
                        )}
                      >
                        {isLoading &&
                        original.kind === "match" &&
                        cell.column.id === "result" ? (
                          <ResultColumnSkeleton />
                        ) : (
                          flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )
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
  )
}

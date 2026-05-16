import { flexRender, type Table as TanstackTable } from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { ResultsTableRow } from "@/components/results/results-table/utils/buildResultsTableModel"
import { cn } from "@/lib/utils"

const MATCH_COL_WIDTH = "w-56 min-w-56 max-w-56"
const RESULT_COL_WIDTH = "w-20 min-w-20 md:w-24 md:min-w-24"

const stickyOpaqueBg =
  "bg-card dark:bg-zinc-950 [tr:hover_&]:bg-card [tr:hover_&]:dark:bg-zinc-950"

/** W light: border zamiast box-shadow; w dark: cień przy przewijaniu. */
const stickyEdgeSeparator =
  "border-r border-border/60 dark:border-r-0 dark:shadow-[4px_0_12px_-4px_rgba(0,0,0,0.65)]"

const headerCellBottomBorder =
  "border-b border-border/60 dark:border-white/10"

/** Poniżej z-50 (header app + sheet nawigacji). Wewnątrz tabeli: header > body > group. */
const zHeaderMatch = "z-[30]"
const zHeaderResult = "z-[29]"
const zHeaderPlayer = "z-[28]"
const zBodyMatch = "z-[20]"
const zBodyResultMd = "md:z-[19]"
const zGroup = "z-[15]"

const groupLabelCellClass = cn(
  MATCH_COL_WIDTH,
  "sticky left-0 border-0 bg-muted py-2 font-heading font-semibold text-foreground text-sm tracking-tight dark:bg-zinc-900",
  zGroup,
)

const groupRestCellClass =
  "border-0 bg-muted py-2 dark:bg-zinc-900"

const tableChromeClass = cn(
  "[&_[data-slot=table-container]]:border [&_[data-slot=table-container]]:border-border/60 dark:[&_[data-slot=table-container]]:border-white/10 [&_[data-slot=table-container]]:rounded-lg",
  "[&_td]:border-0",
  "[&_tbody_tr]:border-b [&_tbody_tr]:border-border/50 dark:[&_tbody_tr]:border-white/10 [&_tbody_tr:last-child]:border-0",
)

function stickyCellClass(
  columnId: string,
  row: "header" | "body",
): string | undefined {
  if (columnId === "match") {
    const base = cn(MATCH_COL_WIDTH, stickyOpaqueBg, stickyEdgeSeparator)
    if (row === "header") {
      return cn(base, "sticky top-0 left-0", zHeaderMatch)
    }
    return cn(base, "sticky left-0", zBodyMatch)
  }
  if (columnId === "result") {
    const base = cn(
      RESULT_COL_WIDTH,
      "shrink-0 text-center align-middle",
      stickyOpaqueBg,
      stickyEdgeSeparator,
      "md:sticky md:left-56",
    )
    if (row === "header") {
      return cn(base, "sticky top-0", zHeaderResult)
    }
    return cn(base, zBodyResultMd)
  }
  if (row === "header" && columnId.startsWith("player-")) {
    return cn("sticky top-0", zHeaderPlayer, stickyOpaqueBg)
  }
  return undefined
}

export type DataGridProps = {
  table: TanstackTable<ResultsTableRow>
  colCount: number
  scrollContainerClass?: string
  /** Scroll pionowy i poziomy w kontenerze tabeli zamiast na stronie. */
  fillHeight?: boolean
}

export function DataGrid({
  table,
  colCount,
  scrollContainerClass,
  fillHeight = false,
}: DataGridProps) {
  return (
    <div
      className={cn(
        tableChromeClass,
        fillHeight && "flex min-h-0 flex-1 flex-col",
      )}
    >
      <Table
        className="w-max min-w-full border-separate border-spacing-0"
        containerClassName={cn(
          scrollContainerClass,
          fillHeight
            ? "min-h-0 flex-1 overflow-auto overscroll-contain"
            : "overscroll-x-contain",
        )}
      >
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
                      "h-auto min-h-10 border-x-0 border-t-0 text-foreground align-middle",
                      sticky,
                      headerCellBottomBorder,
                      header.column.id === "result" && "px-1 md:px-2",
                      isPlayer &&
                        "min-w-[5rem] px-1 text-center md:min-w-[5.5rem] md:px-2",
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
                <TableRow key={row.id} className="hover:bg-transparent border-0">
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
                        isPlayer &&
                          "min-w-[5rem] px-1 text-center md:min-w-[5.5rem] md:px-2",
                        cell.column.id === "match" &&
                          "max-w-56 py-2 whitespace-normal",
                        cell.column.id === "result" && "px-1 py-2 md:px-2",
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
  )
}

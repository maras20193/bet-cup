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
const STICKY_MATCH_LEFT = "left-0"
const STICKY_RESULT_LEFT = "md:left-56"

const groupLabelCellClass = cn(
  MATCH_COL_WIDTH,
  "sticky z-30 border-0 bg-muted py-2 font-heading font-semibold text-foreground text-sm tracking-tight dark:bg-zinc-900",
  STICKY_MATCH_LEFT,
)

const groupRestCellClass =
  "border-0 bg-muted/50 py-2 dark:bg-white/5"

const tableChromeClass = cn(
  "[&_[data-slot=table-container]]:border [&_[data-slot=table-container]]:border-border/60 dark:[&_[data-slot=table-container]]:border-white/10 [&_[data-slot=table-container]]:rounded-lg",
  "[&_td]:border-0 [&_th]:border-0",
  "[&_tbody_tr]:border-b [&_tbody_tr]:border-border/50 dark:[&_tbody_tr]:border-white/10 [&_tbody_tr:last-child]:border-0",
  "[&_thead_tr]:border-b [&_thead_tr]:border-border/60 dark:[&_thead_tr]:border-white/10",
)

function stickyCellClass(
  columnId: string,
  row: "header" | "body",
): string | undefined {
  if (columnId === "match") {
    const base = cn(
      MATCH_COL_WIDTH,
      "sticky border-0 bg-card shadow-[4px_0_12px_-6px_rgba(0,0,0,0.2)] dark:bg-zinc-950 dark:shadow-[4px_0_12px_-6px_rgba(0,0,0,0.5)]",
      STICKY_MATCH_LEFT,
    )
    if (row === "header") {
      return cn(base, "top-0 z-50")
    }
    return cn(base, "z-30")
  }
  if (columnId === "result") {
    const base = cn(
      RESULT_COL_WIDTH,
      "shrink-0 border-0 text-center align-middle",
      "md:sticky md:bg-card md:shadow-[4px_0_12px_-6px_rgba(0,0,0,0.2)] md:dark:bg-zinc-950 md:dark:shadow-[4px_0_12px_-6px_rgba(0,0,0,0.5)]",
      STICKY_RESULT_LEFT,
    )
    if (row === "header") {
      return cn(base, "md:top-0 md:z-50")
    }
    return cn(base, "md:z-30")
  }
  if (row === "header" && columnId.startsWith("player-")) {
    return cn(
      "top-0 z-40 sticky bg-card dark:bg-zinc-950 border-0",
      "shadow-[0_1px_0_0_var(--border)] dark:shadow-[0_1px_0_0_rgba(255,255,255,0.12)]",
    )
  }
  return undefined
}

export type DataGridProps = {
  table: TanstackTable<ResultsTableRow>
  colCount: number
  scrollContainerClass?: string
}

export function DataGrid({
  table,
  colCount,
  scrollContainerClass,
}: DataGridProps) {
  return (
    <div className={tableChromeClass}>
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

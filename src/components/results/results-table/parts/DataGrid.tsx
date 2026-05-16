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
const STICKY_MATCH_LEFT = "left-0"
const STICKY_RESULT_LEFT = "left-56"

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
      "sticky bg-card dark:bg-zinc-950 shadow-[4px_0_12px_-6px_rgba(0,0,0,0.2)] dark:shadow-[4px_0_12px_-6px_rgba(0,0,0,0.5)] border-0 w-24 min-w-24 text-center align-middle shrink-0",
      STICKY_RESULT_LEFT,
    )
    if (row === "header") {
      return cn(base, "top-0 z-50")
    }
    return cn(base, "z-30")
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
  scrollContainerClass: string
  layout: "default" | "fill"
}

export function DataGrid({
  table,
  colCount,
  scrollContainerClass,
  layout,
}: DataGridProps) {
  return (
    <div
      className={cn(
        tableChromeClass,
        layout === "fill" && "flex min-h-0 flex-1 flex-col",
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
                <TableRow key={row.id} className="hover:bg-transparent border-0">
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
  )
}

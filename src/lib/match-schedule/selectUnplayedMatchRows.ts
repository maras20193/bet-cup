import type { Dayjs } from "dayjs"

import { matchScheduleConfig } from "@/config/match-schedule.config"
import type { ResultsTableMatchRow } from "@/components/results/results-table/utils/buildResultsTableModel"
import { dayjs } from "@/lib/dayjs"
import { parseKickoffUtc } from "@/lib/match-schedule/parseKickoff"

export function selectUnplayedMatchRows(
  rows: readonly ResultsTableMatchRow[],
  now: Dayjs = dayjs(),
): ResultsTableMatchRow[] {
  const { timeAfterMatchStartedHours } = matchScheduleConfig
  const stripStartCutoff = now.subtract(timeAfterMatchStartedHours, "hour")

  return rows
    .filter((row) => {
      const kickoff = parseKickoffUtc(row.match.kickoffAt)
      return !kickoff.isBefore(stripStartCutoff)
    })
    .sort(
      (a, b) =>
        parseKickoffUtc(a.match.kickoffAt).valueOf() -
        parseKickoffUtc(b.match.kickoffAt).valueOf(),
    )
}

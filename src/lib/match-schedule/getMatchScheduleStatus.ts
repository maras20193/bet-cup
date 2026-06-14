import type { Dayjs } from "dayjs"

import { matchScheduleConfig } from "@/config/match-schedule.config"
import { dayjs } from "@/lib/dayjs"
import { parseKickoffUtc } from "@/lib/match-schedule/parseKickoff"
import type { Match } from "@/types/match"

export type MatchScheduleStatus =
  | { kind: "upcoming" }
  | { kind: "live" }
  | { kind: "finished"; result: { home: number; away: number } | null }

export function getMatchScheduleStatus(
  match: Match,
  now: Dayjs = dayjs(),
): MatchScheduleStatus {
  const kickoff = parseKickoffUtc(match.kickoffAt)
  const liveEnd = kickoff.add(matchScheduleConfig.liveWindowHours, "hour")

  if (match.result !== null) {
    return { kind: "finished", result: match.result }
  }

  if (now.isBefore(kickoff)) {
    return { kind: "upcoming" }
  }

  if (now.isBefore(liveEnd)) {
    return { kind: "live" }
  }

  return { kind: "finished", result: null }
}

import { parseKickoffLocal } from "@/lib/match-schedule/parseKickoff"

export type KickoffLabel = {
  dayLabel: string
  timeLabel: string
}

export function formatKickoffLabel(kickoffAt: string): KickoffLabel {
  const kickoff = parseKickoffLocal(kickoffAt)

  let dayLabel: string
  if (kickoff.isToday()) {
    dayLabel = "Dzisiaj"
  } else if (kickoff.isTomorrow()) {
    dayLabel = "Jutro"
  } else {
    dayLabel = kickoff.format("D MMMM")
  }

  return {
    dayLabel,
    timeLabel: kickoff.format("HH:mm"),
  }
}

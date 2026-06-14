import { dayjs } from "@/lib/dayjs"

/** Kickoff zapisany jako ISO UTC → dayjs w lokalnej strefie użytkownika (do wyświetlania). */
export function parseKickoffLocal(kickoffAtUtc: string) {
  return dayjs.utc(kickoffAtUtc).local()
}

/** Kickoff UTC do porównań z bieżącym czasem (timestampy). */
export function parseKickoffUtc(kickoffAtUtc: string) {
  return dayjs.utc(kickoffAtUtc)
}

import type { MatchDefinition } from "@/types/match"

export type MatchDisplaySection = {
  key: string
  label: string | null
  matches: MatchDefinition[]
}

export const groupMatchesForDisplay = (
  matches: readonly MatchDefinition[]
): MatchDisplaySection[] => {
  const entries = new Map<string, MatchDefinition[]>()
  for (const m of matches) {
    const key = m.groupId ?? "__knockout"
    const list = entries.get(key)
    if (list) list.push(m)
    else entries.set(key, [m])
  }
  const sortedKeys = [...entries.keys()].sort((a, b) => {
    if (a === "__knockout") return 1
    if (b === "__knockout") return -1
    return a.localeCompare(b)
  })
  return sortedKeys.map((key) => ({
    key,
    label: key === "__knockout" ? null : `Grupa ${key}`,
    matches: entries
      .get(key)!
      .slice()
      .sort((x, y) => x.id.localeCompare(y.id)),
  }))
}

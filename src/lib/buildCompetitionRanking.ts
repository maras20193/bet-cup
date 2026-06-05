export type RankingPlayer = {
  name: string
  points: number
}

export type RankingGroup = {
  place: number
  players: RankingPlayer[]
}

export const buildCompetitionRanking = (
  players: RankingPlayer[]
): RankingGroup[] => {
  const sorted = [...players].sort((a, b) => b.points - a.points)
  const groups: RankingGroup[] = []
  let place = 1

  for (let i = 0; i < sorted.length; ) {
    const points = sorted[i].points
    const tied: RankingPlayer[] = []

    while (i < sorted.length && sorted[i].points === points) {
      tied.push(sorted[i])
      i++
    }

    groups.push({ place, players: tied })
    place += tied.length
  }

  return groups
}

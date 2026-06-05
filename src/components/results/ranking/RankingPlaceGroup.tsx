import { MedalIcon, TrophyIcon } from "lucide-react"

import { RankingPlayerRow } from "@/components/results/ranking/RankingPlayerRow"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { RankingGroup } from "@/lib/buildCompetitionRanking"
import { cn } from "@/lib/utils"

type RankingPlaceGroupProps = {
  group: RankingGroup
}

const getTieLabel = (count: number): string => {
  if (count >= 2 && count <= 4) return `${count} osoby`
  return `${count} osób`
}

const getPlaceRingClass = (place: number): string => {
  if (place === 1) return "ring-amber-400/70"
  if (place === 2) return "ring-slate-400/70"
  if (place === 3) return "ring-amber-700/70"
  return "ring-foreground/20"
}

const getPlaceInnerGradientClass = (place: number): string | null => {
  if (place === 1) return "from-amber-400/20 via-amber-500/5"
  if (place === 2) return "from-slate-400/18 via-slate-400/5"
  if (place === 3) return "from-amber-700/18 via-amber-700/5"
  return null
}

const PlaceIcon = ({ place }: { place: number }) => {
  if (place === 1) {
    return <TrophyIcon className="size-7 text-amber-400 shrink-0" />
  }
  if (place === 2) {
    return <MedalIcon className="size-7 text-slate-400 shrink-0" />
  }
  if (place <= 3) {
    return <MedalIcon className="size-7 text-amber-700 shrink-0" />
  }
  return null
}

export const RankingPlaceGroup = ({ group }: RankingPlaceGroupProps) => {
  const { place, players } = group
  const points = players[0]?.points ?? 0
  const innerGradientClass = getPlaceInnerGradientClass(place)

  return (
    <Card
      className={cn(
        "relative ring-2 overflow-hidden shrink-0",
        getPlaceRingClass(place)
      )}
    >
      {innerGradientClass && (
        <div
          aria-hidden
          className={cn(
            "absolute inset-0 bg-gradient-to-b to-transparent pointer-events-none",
            innerGradientClass
          )}
        />
      )}
      <CardHeader className="z-10 relative flex flex-row justify-between items-center gap-2 pb-2">
        <CardTitle className="flex flex-row items-center gap-2 text-lg">
          <PlaceIcon place={place} />
          Miejsce {place}
        </CardTitle>
        <p className="tabular-nums text-muted-foreground text-base shrink-0">
          {points} pkt
        </p>
      </CardHeader>
      <CardContent className="z-10 relative flex flex-col gap-3">
        {players.map((player) => (
          <RankingPlayerRow key={player.name} player={player} />
        ))}
        {players.length > 1 && (
          <Badge variant="outline" className="self-end p-4 text-sm">
            Remis · {getTieLabel(players.length)}
          </Badge>
        )}
      </CardContent>
    </Card>
  )
}

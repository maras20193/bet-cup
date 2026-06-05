import { CustomAvatar } from "@/components/shared/CustomAvatar"
import { EllipsisWithTooltip } from "@/components/shared/EllipsisWithTooltip"
import type { RankingPlayer } from "@/lib/buildCompetitionRanking"

type RankingPlayerRowProps = {
  player: RankingPlayer
}

const getAvatarFallback = (name: string): string =>
  name.slice(0, 2).toUpperCase()

export const RankingPlayerRow = ({ player }: RankingPlayerRowProps) => {
  return (
    <div className="flex flex-row items-center gap-3 min-w-0">
      <CustomAvatar
        seed={player.name}
        fallback={getAvatarFallback(player.name)}
      />
      <EllipsisWithTooltip
        titleText={player.name}
        className="flex-1 min-w-0 font-medium text-sm"
      >
        {player.name}
      </EllipsisWithTooltip>
      {/* <span className="tabular-nums text-muted-foreground text-sm shrink-0">
        {player.points}
      </span> */}
    </div>
  )
}

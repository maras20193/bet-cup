import { CustomAvatar } from "@/components/shared/CustomAvatar"

export type PlayerColumnHeaderProps = {
  displayName: string
  points: number
}

export function PlayerColumnHeader({
  displayName,
  points,
}: PlayerColumnHeaderProps) {
  return (
    <div className="flex flex-col justify-center items-center gap-1 px-0.5 pt-2 min-h-14 text-center leading-tight">
      <CustomAvatar
        seed={displayName}
        fallback={displayName.slice(0, 2).toUpperCase()}
      />
      <span className="max-w-[6rem] font-semibold text-sm truncate">
        {displayName}
      </span>
      <span className="font-semibold tabular-nums text-foreground text-base tracking-tight">
        {points}{" "}
        <span className="font-medium text-muted-foreground text-xs">pkt</span>
      </span>
    </div>
  )
}

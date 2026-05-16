export type PlayerColumnHeaderProps = {
  displayName: string
  points: number
}

export function PlayerColumnHeader({
  displayName,
  points,
}: PlayerColumnHeaderProps) {
  return (
    <div className="flex min-h-14 flex-col items-center justify-center gap-1 px-0.5 py-1 text-center leading-tight">
      <span className="max-w-[6rem] truncate font-semibold text-sm">
        {displayName}
      </span>
      <span className="font-semibold tabular-nums text-base text-foreground tracking-tight">
        {points}{" "}
        <span className="font-medium text-muted-foreground text-xs">pkt</span>
      </span>
    </div>
  )
}

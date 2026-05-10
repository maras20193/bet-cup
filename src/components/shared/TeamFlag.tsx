import { flagCdnUrl } from "@/lib/flagCdnUrl"
import { cn } from "@/lib/utils"

export type TeamFlagProps = {
  code: string
  className?: string
}

export const TeamFlag = ({ code, className }: TeamFlagProps) => {
  return (
    <img
      src={flagCdnUrl(code)}
      alt=""
      width={24}
      height={18}
      loading="lazy"
      decoding="async"
      className={cn(
        "inline-block shadow-sm rounded-sm ring-1 ring-black/5 dark:ring-white/10 object-cover shrink-0",
        className
      )}
      aria-hidden
    />
  )
}

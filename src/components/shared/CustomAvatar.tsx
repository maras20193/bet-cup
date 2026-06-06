import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getPlayerAvatarUrl } from "@/lib/getPlayerAvatarUrl"
import { cn } from "@/lib/utils"

type CustomAvatarProps = {
  seed: string
  fallback?: string
  className?: string
}

export const CustomAvatar = ({
  seed,
  fallback = "KJ",
  className,
}: CustomAvatarProps) => {
  return (
    <Avatar className={cn("w-8 h-8", className)}>
      <AvatarImage src={getPlayerAvatarUrl(seed)} />
      <AvatarFallback className="text-xs">{fallback}</AvatarFallback>
    </Avatar>
  )
}

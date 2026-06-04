import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getPlayerAvatarUrl } from "@/lib/getPlayerAvatarUrl"

type CustomAvatarProps = {
  seed: string
  fallback?: string
}

export const CustomAvatar = ({ seed, fallback = "KJ" }: CustomAvatarProps) => {
  return (
    <Avatar className="w-8 h-8">
      <AvatarImage src={getPlayerAvatarUrl(seed)} />
      <AvatarFallback className="text-xs">{fallback}</AvatarFallback>
    </Avatar>
  )
}

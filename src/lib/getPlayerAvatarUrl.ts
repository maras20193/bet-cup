import { appConfig } from "@/config/app.config"

export const getPlayerAvatarUrl = (seed: string): string => {
  const { dicebearVersion, dicebearStyle } = appConfig.ui.avatars
  const params = new URLSearchParams({ seed })
  return `https://api.dicebear.com/${dicebearVersion}/${dicebearStyle}/svg?${params}`
}

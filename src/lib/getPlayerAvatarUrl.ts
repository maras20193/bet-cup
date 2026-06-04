const DICEBEAR_VERSION = "10.x"
const DICEBEAR_STYLE = "fun-emoji"

export const getPlayerAvatarUrl = (seed: string): string => {
  const params = new URLSearchParams({ seed })
  return `https://api.dicebear.com/${DICEBEAR_VERSION}/${DICEBEAR_STYLE}/svg?${params}`
}

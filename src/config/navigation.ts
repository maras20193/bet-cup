import type { LucideIcon } from "lucide-react"
import {
  BarChart3Icon,
  ClipboardListIcon,
  HomeIcon,
  ListOrderedIcon,
  TrophyIcon,
} from "lucide-react"

export const navLinkIcons = {
  "/": HomeIcon,
  "/tabela": ClipboardListIcon,
  "/wykres": BarChart3Icon,
  "/ranking": ListOrderedIcon,
  "/typowanie": TrophyIcon,
} as const satisfies Record<string, LucideIcon>

export const navItems = [
  { to: "/", label: "Strona główna", end: true as const },
  { to: "/tabela", label: "Tabela wyników", end: false as const },
  { to: "/wykres", label: "Wykres punktów", end: false as const },
  { to: "/ranking", label: "Ranking", end: false as const },
  { to: "/typowanie", label: "Typowanie", end: false as const },
] as const

export const mainPageLinks = navItems.filter((item) => item.to !== "/")

const breadcrumbNavItems = navItems.filter((item) => item.to !== "/")

export function getBreadcrumbLabel(pathname: string): string | undefined {
  return breadcrumbNavItems.find((item) => item.to === pathname)?.label
}

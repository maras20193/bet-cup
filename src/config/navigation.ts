import type { LucideIcon } from "lucide-react"
import {
  BarChart3Icon,
  ClipboardListIcon,
  HomeIcon,
  ListOrderedIcon,
  TrophyIcon,
} from "lucide-react"

import { routes } from "@/config/routes"

export const navLinkIcons = {
  [routes.home]: HomeIcon,
  [routes.table]: ClipboardListIcon,
  [routes.chart]: BarChart3Icon,
  [routes.ranking]: ListOrderedIcon,
  [routes.predictions]: TrophyIcon,
} as const satisfies Record<string, LucideIcon>

export const navItems = [
  { to: routes.home, label: "Strona główna", end: true as const },
  { to: routes.table, label: "Tabela wyników", end: false as const },
  { to: routes.chart, label: "Wykres punktów", end: false as const },
  { to: routes.ranking, label: "Ranking", end: false as const },
  { to: routes.predictions, label: "Typowanie", end: false as const },
] as const

export const mainPageLinks = navItems.filter((item) => item.to !== routes.home)

const breadcrumbNavItems = navItems.filter((item) => item.to !== routes.home)

export function getBreadcrumbLabel(pathname: string): string | undefined {
  return breadcrumbNavItems.find((item) => item.to === pathname)?.label
}

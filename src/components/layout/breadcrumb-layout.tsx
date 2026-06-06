import { Outlet, useLocation } from "react-router"

import { AppBreadcrumb } from "@/components/layout/app-breadcrumb"
import { cn } from "@/lib/utils"

const TABLE_PATH = "/tabela"
const FULL_BLEED_PATHS = new Set([TABLE_PATH, "/wykres"])

const pagePadding = "px-4 sm:px-6 lg:px-8"

export function BreadcrumbLayout() {
  const { pathname } = useLocation()
  const isTablePage = pathname === TABLE_PATH
  const isFullBleedPage = FULL_BLEED_PATHS.has(pathname)

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4">
      <div className={cn("shrink-0", pagePadding)}>
        <AppBreadcrumb />
      </div>
      <div
        className={cn(
          "flex min-h-0 flex-1 flex-col",
          isTablePage
            ? "overflow-hidden"
            : "overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch]"
        )}
      >
        {isFullBleedPage ? (
          <Outlet />
        ) : (
          <div className={pagePadding}>
            <Outlet />
          </div>
        )}
      </div>
    </div>
  )
}

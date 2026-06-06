import { Outlet, useLocation } from "react-router"

import { AppBreadcrumb } from "@/components/layout/app-breadcrumb"
import { TournamentNotStartedNotice } from "@/components/tournament/TournamentNotStartedNotice"
import { routes } from "@/config/routes"
import { isTournamentNotStarted } from "@/lib/tournamentStatus"
import { cn } from "@/lib/utils"

const pagePadding = "px-4 sm:px-6 lg:px-8"

export function BreadcrumbLayout() {
  const { pathname } = useLocation()
  const showNotice =
    isTournamentNotStarted() && pathname !== routes.predictions

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4">
      <div className={cn("shrink-0", pagePadding)}>
        <AppBreadcrumb />
      </div>
      <div
        className={cn(
          "flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch]",
          pagePadding,
        )}
      >
        {showNotice ? <TournamentNotStartedNotice /> : <Outlet />}
      </div>
    </div>
  )
}

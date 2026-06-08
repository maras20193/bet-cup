import { Outlet, useLocation } from "react-router"

import { AppBreadcrumb } from "@/components/layout/app-breadcrumb"
import { TournamentNotStartedNotice } from "@/components/tournament/TournamentNotStartedNotice"
import { routes } from "@/config/routes"
import { isTournamentNotStarted } from "@/lib/tournamentStatus"
import { cn } from "@/lib/utils"

const pagePadding = "px-3 sm:px-6 lg:px-8"

export function BreadcrumbLayout() {
  const { pathname } = useLocation()
  const showNotice = isTournamentNotStarted() && pathname !== routes.predictions

  return (
    <div className="flex flex-col flex-1 gap-4 min-h-0">
      <div className={cn("shrink-0", pagePadding)}>
        <AppBreadcrumb />
      </div>
      <div
        className={cn(
          "flex flex-col flex-1 min-h-0 [-webkit-overflow-scrolling:touch] overflow-y-auto overscroll-contain",
          pagePadding
        )}
      >
        {showNotice ? <TournamentNotStartedNotice /> : <Outlet />}
      </div>
    </div>
  )
}

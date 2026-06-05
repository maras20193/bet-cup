import { Outlet } from "react-router"

import { AppBreadcrumb } from "@/components/layout/app-breadcrumb"

export function BreadcrumbLayout() {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4">
      <AppBreadcrumb />
      <Outlet />
    </div>
  )
}

import { Link, useLocation } from "react-router"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { appConfig } from "@/config/app.config"
import { getBreadcrumbLabel } from "@/config/navigation"

export function AppBreadcrumb() {
  const { pathname } = useLocation()
  const pageLabel = getBreadcrumbLabel(pathname)

  if (!pageLabel) {
    return null
  }

  const { tournament } = appConfig

  return (
    <Breadcrumb className="shrink-0">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">{tournament.name}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{pageLabel}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

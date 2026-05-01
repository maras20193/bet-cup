import { Outlet } from "react-router"

import { AppHeader } from "@/components/layout/app-header"

export function AppShell() {
  return (
    <div className="flex min-h-svh flex-col bg-background text-foreground">
      <AppHeader />
      <main className="flex-1">
        <div className="w-full px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

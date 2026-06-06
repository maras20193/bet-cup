import { Outlet } from "react-router"

import { AppHeader } from "@/components/layout/app-header"

export function AppShell() {
  return (
    <div className="flex flex-col bg-background mx-auto max-w-[2400px] h-svh min-h-0 overflow-hidden text-foreground">
      <AppHeader />
      <main className="flex flex-col flex-1 min-h-0 overflow-hidden">
        <div className="flex flex-col flex-1 pt-6 w-full min-h-0 overflow-hidden">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

import * as React from "react"
import { Link, NavLink } from "react-router"
import { MenuIcon, XIcon } from "lucide-react"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { navItems, navLinkIcons } from "@/config/navigation"
import { cn } from "@/lib/utils"

// import { Squash as Hamburger } from "hamburger-react"

const navLinkClassName = ({
  isActive,
}: {
  isActive: boolean
  isPending: boolean
  isTransitioning: boolean
}) =>
  cn(
    "font-medium text-sm transition-colors",
    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
  )

export function AppHeader() {
  const [mobileOpen, setMobileOpen] = React.useState(false)

  return (
    <header className="top-0 z-50 sticky bg-background/95 supports-backdrop-filter:bg-background/80 backdrop-blur border-border border-b">
      <div className="flex justify-between items-center gap-4 px-4 sm:px-6 lg:px-8 w-full h-16">
        <div className="flex flex-1 items-center gap-8 min-w-0">
          <Link
            to="/"
            className="font-heading font-semibold text-foreground text-base no-underline tracking-tight shrink-0"
          >
            Bet Cup
          </Link>

          <nav
            className="hidden md:flex items-center gap-6"
            aria-label="Główna nawigacja"
          >
            {navItems.map(({ to, label, end }) => (
              <NavLink key={to} to={to} end={end} className={navLinkClassName}>
                {label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="md:hidden flex items-center shrink-0">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <MenuIcon className="size-7" />
            </SheetTrigger>
            <SheetContent
              side="right"
              showCloseButton={false}
              className="gap-0 p-0 w-[min(100%,20rem)]"
            >
              <SheetHeader className="flex flex-row justify-between items-center px-4 py-0 border-border border-b h-16">
                <SheetTitle className="m-0 font-heading">Bet Cup</SheetTitle>
                <SheetClose asChild>
                  <XIcon className="size-7" />
                </SheetClose>
              </SheetHeader>
              <nav
                className="flex flex-col gap-1 p-4 pt-2"
                aria-label="Menu mobilne"
              >
                {navItems.map(({ to, label, end }) => {
                  const Icon = navLinkIcons[to]

                  return (
                    <NavLink
                      key={to}
                      to={to}
                      end={end}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-2 px-3 py-2.5 rounded-md font-medium text-sm transition-colors",
                          isActive
                            ? "bg-muted text-foreground"
                            : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                        )
                      }
                      onClick={() => setMobileOpen(false)}
                    >
                      <Icon />
                      {label}
                    </NavLink>
                  )
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

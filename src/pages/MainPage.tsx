import { Link } from "react-router"

import fifaLogoDark from "@/assets/fifa-2026-dark.svg"
import fifaLogoLight from "@/assets/fifa-2026-light.svg"
import { Button } from "@/components/ui/button"
import { appConfig } from "@/config/app.config"
import { mainPageLinks, navLinkIcons } from "@/config/navigation"

export function MainPage() {
  const { tournament } = appConfig

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch]">
      <div className="flex flex-col items-center gap-6 mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full max-w-lg text-center">
        <div className="flex flex-col items-center gap-6">
          <div className="flex justify-center items-center w-full max-w-44 sm:max-w-50">
            <img
              src={fifaLogoDark}
              alt={`Logo ${tournament.name}`}
              className="dark:hidden w-full h-auto"
              width={228}
              height={351}
            />
            <img
              src={fifaLogoLight}
              alt={`Logo ${tournament.name}`}
              className="hidden dark:block w-full h-auto"
              width={228}
              height={351}
            />
          </div>
          <div className="space-y-2">
            <h1 className="font-heading font-semibold text-foreground text-3xl tracking-tight">
              {tournament.name}
            </h1>
          </div>
        </div>

        <nav
          className="flex flex-col gap-3 w-full"
          aria-label="Przejdź do sekcji aplikacji"
        >
          {mainPageLinks.map(({ to, label }) => {
            const Icon = navLinkIcons[to]
            return (
              <Button
                key={to}
                variant="outline"
                size="lg"
                className="w-full h-11"
                asChild
              >
                <Link to={to}>
                  <Icon className="size-5" />
                  {label}
                </Link>
              </Button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

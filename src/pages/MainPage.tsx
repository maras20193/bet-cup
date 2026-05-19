import { Link } from "react-router"
import { BarChart3Icon, ClipboardListIcon, TrophyIcon } from "lucide-react"

import fifaLogoDark from "@/assets/fifa-2026-dark.svg"
import fifaLogoLight from "@/assets/fifa-2026-light.svg"
import { Button } from "@/components/ui/button"
import { appConfig } from "@/config/app.config"
import { mainPageLinks } from "@/config/navigation"

const linkIcons = {
  "/tabela": ClipboardListIcon,
  "/wykres": BarChart3Icon,
  "/typowanie": TrophyIcon,
} as const

export function MainPage() {
  const { tournament } = appConfig

  return (
    <div className="flex flex-col items-center gap-8 mx-auto py-8 sm:py-12 w-full max-w-lg text-center">
      <div className="flex flex-col items-center gap-4">
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
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            {tournament.name} — typuj wyniki meczów, śledź punkty w tabeli i na
            wykresie. Wybierz sekcję poniżej lub skorzystaj z nawigacji u góry.
          </p>
        </div>
      </div>

      <nav
        className="flex flex-col gap-3 w-full"
        aria-label="Przejdź do sekcji aplikacji"
      >
        {mainPageLinks.map(({ to, label }) => {
          const Icon = linkIcons[to]
          return (
            <Button
              key={to}
              variant="outline"
              size="lg"
              className="w-full h-11"
              asChild
            >
              <Link to={to}>
                <Icon />
                {label}
              </Link>
            </Button>
          )
        })}
      </nav>
    </div>
  )
}

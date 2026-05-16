import { Link } from "react-router"
import { BarChart3Icon, ClipboardListIcon, TrophyIcon } from "lucide-react"

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
    <div className="mx-auto flex w-full max-w-lg flex-col items-center gap-8 py-8 text-center sm:py-12">
      <div className="flex flex-col items-center gap-4">
        <div className="flex size-16 items-center justify-center rounded-2xl border border-border/60 bg-muted/30 ring-1 ring-border/40 dark:bg-white/5 dark:ring-white/10">
          <TrophyIcon className="size-8 text-primary" aria-hidden />
        </div>
        <div className="space-y-2">
          <h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground">
            Bet Cup
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
            {tournament.name} — typuj wyniki meczów, śledź punkty w tabeli i na
            wykresie. Wybierz sekcję poniżej lub skorzystaj z nawigacji u góry.
          </p>
        </div>
      </div>

      <nav
        className="flex w-full flex-col gap-3"
        aria-label="Przejdź do sekcji aplikacji"
      >
        {mainPageLinks.map(({ to, label }) => {
          const Icon = linkIcons[to]
          return (
            <Button
              key={to}
              variant="outline"
              size="lg"
              className="h-11 w-full"
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
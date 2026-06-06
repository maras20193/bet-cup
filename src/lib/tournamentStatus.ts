import { appConfig } from "@/config/app.config"

export const isTournamentNotStarted = (): boolean =>
  appConfig.tournament.status === "not-started"

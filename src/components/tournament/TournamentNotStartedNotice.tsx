import { Info } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { appConfig } from "@/config/app.config"

export const TournamentNotStartedNotice = () => {
  const { name } = appConfig.tournament

  return (
    <Alert>
      <Info />
      <AlertTitle>Turniej jeszcze się nie rozpoczął</AlertTitle>
      <AlertDescription>
        {name} wciąż przed nami. Tabela wyników, wykres punktów i ranking
        pojawią się dopiero po starcie turnieju.
      </AlertDescription>
    </Alert>
  )
}
